import * as React from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { default_style } from '../../styles/views'

interface State {
  email: string,
  password: string,
  confirmPassword: string
}

export default class AccountCreationScreen extends Component {
  readonly state: State = {
    email: "",
    password: "",
    confirmPassword: ""
  }

  constructor(props: any) {
    super(props)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleCreateAccountPress = this.handleCreateAccountPress.bind(this)
  }

  handleCreateAccountPress() {
    console.log(this.state.email + " FUCKIN LAZERS " + this.state.password)
  }

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={ default_style.container } >
        <View style={ default_style.form }>
            <Text>Account Creation</Text>
            <Input value={ this.state.email }
                onChangeText={(txt) => this.handleStateChange("email", txt)}
                placeholder="email"
                returnKeyType="next"/>
            <Input value={ this.state.password }
                onChangeText={(txt) => this.handleStateChange("password", txt)}
                placeholder="password"
                returnKeyType="next"
                secureTextEntry={ true }/>
            <Input value={ this.state.confirmPassword }
                onChangeText={(txt) => this.handleStateChange("confirmPassword", txt)}
                placeholder="confirm password"
                returnKeyType="go"
                secureTextEntry={ true }/>
            <Button onPress={ this.handleCreateAccountPress }
                title="Create Account"/>
        </View>
      </View>
    );      
  }
}