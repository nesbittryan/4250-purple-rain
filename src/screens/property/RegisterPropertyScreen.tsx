import * as React from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Property } from 'common/models/property';

interface State {
  propertdy: Property
}


export default class LoginScreen extends Component {
  readonly state: State = {
      
  }

  constructor(props: any) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleLoginPress = this.handleLoginPress.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(email: string) {
    this.setState({ email: email });
  }

  handlePasswordChange(password: string) {
    this.setState({ password: password });
  }

  handleLoginPress() {
    console.log(this.state.email + "FUCKIN LAZERS");
  }

  render() {
    return (
      <View style={looking_fresh.container}>
        <Input value={ this.state.email }
          onChangeText={ this.handleEmailChange }
          placeholder="email"
          returnKeyType="next"/>
        <Input value={ this.state.password }
          onChangeText={ this.handlePasswordChange }
          placeholder="password"
          returnKeyType="go"
          secureTextEntry={ true }/>
        <Button onPress={ this.handleLoginPress }
          title="Login"/>
      </View>
    );
  }
}