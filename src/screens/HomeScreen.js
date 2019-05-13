import React from 'react';
import PropTypes from 'prop-types';
import { Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Button from '../components/Button';

const HomeScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>TARGET SUM</Text>
      <Button 
        style={styles.button}
        onPress={() => props.navigation.navigate('Game')} 
        title='START'
      />
    </SafeAreaView>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object
};

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#292C33',
  },

  title: {
    fontSize: 45,
    color: 'white',
    marginBottom: 30,
    fontFamily: 'Cochin',
    fontWeight: 'bold'
  },

  button: {
    backgroundColor: '#D39C44'
  }
});

export default HomeScreen;
