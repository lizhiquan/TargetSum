import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Game from './src/components/Game';

export default class App extends React.Component {
  state = {
    gameId: 1,
    score: 0
  };

  resetGame = () => {
    this.setState((prevState) => ({ gameId: prevState.gameId + 1 }));
  }

  userDidWon = () => {
    this.setState((prevState) => ({ score: prevState.score + 10 }));
  }

  userDidLost = () => {
    this.setState((prevState) => ({ score: prevState.score - 10 }));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.score}>Score: {this.state.score}</Text>
        <Game
          key={this.state.gameId}
          onPlayAgain={this.resetGame}
          randomNumberCount={6}
          initialSeconds={10}
          onWon={this.userDidWon}
          onLost={this.userDidLost}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  score: {
    fontSize: 24,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10
  }
});
