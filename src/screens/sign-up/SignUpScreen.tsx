import * as React from 'react';
import { Component } from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { default_style } from '../../styles/views'
import { APIService } from '../../service/APIService'

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
    if (!this.validateFields()) {
      return
    }
    
    let response = APIService.createUser(this.state.email, this.state.password, this.state.name)
    if (response.code != 201) {
      alert("Account was unable to be created, please try again")
      return
    } else {
      alert("Account successfully created! Please login to continue")
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
                placeholder="Full Name"
                returnKeyType="next"/>
            <Input style={ default_style.input }
                value={ this.state.email }
                onChangeText={(txt) => this.handleStateChange("email", txt)}
                placeholder="Email"
                returnKeyType="next"/>
            <Input style={ default_style.input }
                value={ this.state.password }
                onChangeText={(txt) => this.handleStateChange("password", txt)}
                placeholder="Password"
                returnKeyType="next"
                secureTextEntry={ true }/>
            <Text>Must be longer than 8 characters</Text>
            <Input style={ default_style.input }
                value={ this.state.confirmPassword }
                onChangeText={(txt) => this.handleStateChange("confirmPassword", txt)}
                placeholder="Confirm Password"
                returnKeyType="go"
                secureTextEntry={ true }/>
            <Button style={ default_style.button }
                onPress={ this.handleCreateAccountPress }
                title="Sign Up"/>
        </View>
      </View>
    );      
  }

  validateFields() : boolean {

    let nameRegex = /^([A-z]+(\s)?){2,}$/
    if (!nameRegex.test(this.state.name)) {
      alert("Please provide a valid name")
      return false
    }

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
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