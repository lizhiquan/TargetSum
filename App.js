import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Game from './src/components/Game';

export default class App extends React.Component {
  state = {
    gameId: 1,
    score: 0,
    hardLevel: 1
  };

  resetGame = () => {
    this.setState(prevState => ({ gameId: prevState.gameId + 1 }));
  };

  userDidWon = () => {
    this.setState(prevState => {
      const score = prevState.score + 1;
      const hardLevel = Math.max(1, score);
      return { score: score, hardLevel: hardLevel };
    });
  };

  userDidLost = () => {
    this.setState(prevState => {
      const score = prevState.score - 1;
      const hardLevel = Math.max(1, score);
      return { score: score, hardLevel: hardLevel };
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.score}>Score: {this.state.score}</Text>
        <Game
          key={this.state.gameId}
          onPlayAgain={this.resetGame}
          randomNumberCount={6}
          initialSeconds={10}
          hardLevel={this.state.hardLevel}
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
