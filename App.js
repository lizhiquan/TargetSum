import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Game from './src/components/Game';

export default class App extends React.Component {
  state = {
    gameId: 1
  };

  resetGame = () => {
    this.setState((prevState) => ({ gameId: prevState.gameId + 1}));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
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
  }
});
