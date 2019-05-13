import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Button, StyleSheet } from 'react-native';

import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

const GameStatus = {
  PLAYING: 'PLAYING',
  WON: 'WON',
  LOST: 'LOST'
};

export default class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    hardLevel: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
    onWon: PropTypes.func,
    onLost: PropTypes.func
  };

  // States
  state = {
    // Indices of selected numbers
    selectedIds: [],
    // Current remaining seconds
    remainingSeconds: this.props.initialSeconds
  };

  // Current status of the game
  gameStatus = GameStatus.PLAYING;

  // Generated random numbers
  randomNumbers = Array
    .from({ length: this.props.randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()) + this.props.hardLevel);

  // Calculates the target by adding some generated numbers
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((accu, curr) => accu + curr);
  
  // Shuffles the random numbers
  shuffledRandomNumbers = shuffle(this.randomNumbers);

  flag = false;

  componentDidMount() {
    // Setup countdown timer
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        return { remainingSeconds: prevState.remainingSeconds - 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    // Recalculates the game status if the user selects a number or the time is up
    if (nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0) {
      this.gameStatus = this.calcGameStatus(nextState);
      if (this.gameStatus !== GameStatus.PLAYING) {
        clearInterval(this.intervalId);
        
        // Workaround to prevent the code from being called multiple times after timeout
        if (!this.flag) {
          if (this.gameStatus === GameStatus.WON) {
            this.props.onWon();
          } else if (this.gameStatus === GameStatus.LOST) {
            this.props.onLost();
          }
          this.flag = true;
        }
      }
    }
  }

  // Checks the index is selected
  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  }

  // Selects a number's index
  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex] 
    }));
  }

  // Calculates the game status from a state
  calcGameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds
      .reduce((accu, curr) => accu + this.shuffledRandomNumbers[curr], 0);
    if (nextState.remainingSeconds === 0) {
      return GameStatus.LOST;
    }
    if (sumSelected < this.target) {
      return GameStatus.PLAYING;
    }
    if (sumSelected === this.target) {
      return GameStatus.WON;
    }
    if (sumSelected > this.target) {
      return GameStatus.LOST;
    }
  }

  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) => 
            <RandomNumber
              key={index}
              id={index}
              number={randomNumber}
              isDisabled={this.isNumberSelected(index) || gameStatus !== GameStatus.PLAYING}
              onPress={this.selectNumber}
            />
          )}
        </View>
        {(gameStatus !== GameStatus.PLAYING) &&
          (<Button onPress={this.props.onPlayAgain} title='Play Again'/>)
        }
        <Text>{this.state.remainingSeconds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1
  },

  target: {
    marginTop: 30,
    fontSize: 50,
    marginHorizontal: 50,
    textAlign: 'center'
  },

  randomContainer: {
    marginVertical: 30,
    marginHorizontal: 50
  },

  STATUS_PLAYING: {
    backgroundColor: '#aaa'
  },

  STATUS_WON: {
    backgroundColor: 'green'
  },

  STATUS_LOST: {
    backgroundColor: 'red'
  }
});
