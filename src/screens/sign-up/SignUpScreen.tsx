import * as React from 'react';
import { Component } from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { default_style } from '../../styles/views'
import { onSignUp } from '../../Auth'

interface State {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

export default class AccountCreationScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'Sign Up',
        headerLeft: (
            <Button title="Cancel" onPress={ () => navigation.popToTop() }/>
        )
    }
  }
  readonly state: State = {
    name: "",
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
    if (this.state.password.valueOf() != this.state.confirmPassword.valueOf()) {
      alert("Please confirm the passwords you have provided match")
      return
    }
    if (this.state.email.length < 1) {
      alert("Please fill in an email")
      return
    }
    if (this.state.name.length < 1) {
      alert("Please input a name")
      return
    }
    if (this.state.password.length < 8) {
      alert("Please make sure your password is longer than 8 characters")
      return
    }

    let response = onSignUp(this.state.name, this.state.email, this.state.password)
    if (!response.isSuccess) {
      alert("Account Creation Error: Try Again")
      return
    }
    
    this.props.navigation.popToTop()
  }

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={ default_style.container } >
        <View style={ default_style.form }>
            <Text>Account Creation</Text>
            <Input style={ default_style.input }
                value={ this.state.name }
                onChangeText={(txt) => this.handleStateChange("name", txt)}
                placeholder="name"
                returnKeyType="next"/>
            <Input style={ default_style.input }
                value={ this.state.email }
                onChangeText={(txt) => this.handleStateChange("email", txt)}
                placeholder="email"
                returnKeyType="next"/>
            <Input style={ default_style.input }
                value={ this.state.password }
                onChangeText={(txt) => this.handleStateChange("password", txt)}
                placeholder="password"
                returnKeyType="next"
                secureTextEntry={ true }/>
            <Text>Must be longer than 8 characters</Text>
            <Input style={ default_style.input }
                value={ this.state.confirmPassword }
                onChangeText={(txt) => this.handleStateChange("confirmPassword", txt)}
                placeholder="confirm password"
                returnKeyType="go"
                secureTextEntry={ true }/>
            <Button style={ default_style.button }
                onPress={ this.handleCreateAccountPress }
                title="Create Account"/>
        </View>
      </View>
    );      
  }
}