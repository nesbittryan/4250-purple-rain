import * as React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { default_style } from '../../styles/views';

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
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleLoginPress = this.handleLoginPress.bind(this);
  }

  handleLoginPress() {
    console.log(this.state.email + " FUCKIN LAZERS " + this.state.password);
  }

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={default_style.container}>
        <View style={default_style.form}>
          <Input value={ this.state.email }
            onChangeText={(txt) => this.handleStateChange("email", txt)}
            placeholder="email"
            returnKeyType="next"/>
          <Input value={ this.state.password }
            onChangeText={(txt) => this.handleStateChange("password", txt)}
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