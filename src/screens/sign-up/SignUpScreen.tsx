import * as React from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { MainApp } from '../../styles/Styles'

import { APIService } from '../../service/APIService'

interface State {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
}

export default class AccountCreationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Sign Up',
    }
  }
  
  readonly state: State = {
    firstName: "",
    lastName:"",
    email: "",
    password: "",
    confirmPassword: ""
  }

  constructor(props: any) {
    super(props)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleCreateAccountPress = this.handleCreateAccountPress.bind(this)
    this.handleToLoginPress = this.handleToLoginPress.bind(this)

  }
  
  
  handleToLoginPress(){
    this.props.navigation.popToTop()
  }

  handleCreateAccountPress() {
    if (!this.validateFields()) {
      return
    }
    
    APIService.createUser(this.state.email, this.state.password, this.state.firstName, this.state.lastName)
      .then((response: any) => {
        if (response.code != 201) {
          alert("Account was unable to be created, please try again")
          return
        } else {
          alert("Account successfully created! Please login to continue")
          this.props.navigation.popToTop()
        }  
    })
  }

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={ MainApp.container } >
        <View style={ MainApp.form }>
            <Text>Account Creation</Text>
            <Input style={ MainApp.input }
                value={ this.state.firstName }
                onChangeText={(txt) => this.handleStateChange("firstName", txt)}
                placeholder="First Name"
                returnKeyType="next"/>
            <Input style={ MainApp.input }
                value={ this.state.lastName }
                onChangeText={(txt) => this.handleStateChange("lastName", txt)}
                placeholder="Last Name"
                returnKeyType="next"/>
            <Input style={ MainApp.input }
                value={ this.state.email }
                onChangeText={(txt) => this.handleStateChange("email", txt)}
                placeholder="Email"
                returnKeyType="next"/>
            <Input style={ MainApp.input }
                value={ this.state.password }
                onChangeText={(txt) => this.handleStateChange("password", txt)}
                placeholder="Password"
                returnKeyType="next"
                secureTextEntry={ true }/>
            <Text>Must be longer than 8 characters</Text>
            <Input 
                style={ MainApp.input }
                value={ this.state.confirmPassword }
                onChangeText={(txt) => this.handleStateChange("confirmPassword", txt)}
                placeholder="Confirm Password"
                returnKeyType="go"
                secureTextEntry={ true }/>
            <Button 
                style={ MainApp.button }
                onPress={ this.handleCreateAccountPress }
                title="Sign Up"/>
            <Button 
                style={ MainApp.button }
                onPress={ this.handleToLoginPress }
                title="Cancel"/>
        </View>
      </View>
    );      
  }

  validateFields() : boolean {

    let nameRegex = /^([A-z]+){1,}$/
    if (!nameRegex.test(this.state.firstName) || !nameRegex.test(this.state.lastName)) {
      alert("Please provide both name fields")
      return false
    }

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
    if (!emailRegex.test(this.state.email)) {
      alert("Please provide a valid email")
      return false
    }

    if (this.state.password.length < 8) {
      alert("Password must be at least 8 characters")
      return false
    }

    if (this.state.password != this.state.confirmPassword) {
      alert("Passwords do not match")
      return false
    }

    return true
  }
}