import React from 'react'
import { Component } from 'react';
import { Text, View } from 'react-native';
import LoginScreen from './src/screens/login/LoginScreen';
export default class HelloWorldApp extends Component {
  render() {
    return (
      <LoginScreen />
    );
  }
}
