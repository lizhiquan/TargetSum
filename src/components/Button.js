import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = props => {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    maxHeight: 60,
    padding: 10
  },

  text: {
    fontSize: 30,
    color: 'black'
  }
});

export default Button;
