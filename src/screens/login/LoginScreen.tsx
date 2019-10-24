import * as React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { default_style } from '../../styles/views';
import { AuthService } from '../../service/AuthService'
import { APIService } from '../../service/APIService'

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
    super(props)

    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleLoginPress = this.handleLoginPress.bind(this)
    this.handleSignupPress = this.handleSignupPress.bind(this)
  }

  handleLoginPress() {
    if (AuthService.login(this.state.email, this.state.password))
      this.props.navigation.navigate("Tabs", { email: this.state.email })
  }

  handleSignupPress() {
    this.props.navigation.navigate("SignUp", { })
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
          <Button onPress={ this.handleSignupPress }
            title="Sign Up"/>
        </View>
      </View>
    );
  }
}