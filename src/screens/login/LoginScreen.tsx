import * as React from 'react';
import { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { MainApp } from '../../styles/Styles';
import { APIService } from '../../service/APIService'

interface State {
  email: string,
  password: string
}

export default class LoginScreen extends Component {
  readonly state: State = {
    email: "Ryannesb@gmail.com",
    password: "12121212"
  }

  constructor(props: any) {
    super(props)

    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleLoginPress = this.handleLoginPress.bind(this)
    this.handleSignupPress = this.handleSignupPress.bind(this)
  }

  handleLoginPress() {
    APIService.loginUser(this.state.email, this.state.password)
      .then((response) => {
        if (response.code != 200) {
          alert("Please check your email and password are correct")
        } else {
          this.props.navigation.navigate("Tabs")
          AsyncStorage.setItem("user", JSON.stringify(response.data))
        }
      }
    )
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
          <Input 
            style={ MainApp.input }
            value={ this.state.email }
            onChangeText={(txt) => this.handleStateChange("email", txt)}
            placeholder="email"
            returnKeyType="next"/>
          <Input 
            style={ MainApp.input }
            value={ this.state.password }
            onChangeText={(txt) => this.handleStateChange("password", txt)}
            placeholder="password"
            returnKeyType="go"
            secureTextEntry={ true }/>
          <Button 
            style={ MainApp.button } 
            onPress={ this.handleLoginPress }
            title="Login"/>
          <Button 
            style={ MainApp.button } 
            onPress={ this.handleSignupPress }
            title="Sign Up"/>
        </View>
      </View>
    );
  }
}