import * as React from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

interface State {
  email: string,
  password: string
}

export default class LoginScreen extends Component {
  readonly state: State = {
    email: "",
    password: ""
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
        <View style={looking_fresh.form}>
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
      </View>
    );      
  }
}

const looking_fresh = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    flex: 1,
    width: "80%",
    resizeMode: "cotain",
    alignSelf: "center",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
  },
})