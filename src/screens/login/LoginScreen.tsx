import * as React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { MainApp } from '../../styles/Styles';
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
    this.props.navigation.navigate("Tabs")

    /*APIService.loginUser(this.state.email, this.state.password)
      .then((response) => {
        if (response.code != 200) {
          alert("Please check your email and password are correct")
        } else {
          this.props.navigation.navigate("Tabs")
          // user response.data to get token when it comes back and save it somewhere
        }
      })*/
    }

  handleSignupPress() {
    this.props.navigation.navigate("SignUp")
  }

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={ MainApp.container }>
        <View style={ MainApp.form }>
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