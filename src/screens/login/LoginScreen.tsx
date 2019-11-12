import * as React from 'react';
import { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import { MainApp } from '../../res/Styles';
import { loginUser } from '../../service/APIService'
import { User } from '../../common/models/user';

interface State {
  email: string,
  password: string
}

export default class LoginScreen extends Component {
  readonly state: State = {
    email: "colinmoffat1@gmail.com",
    password: "password"
  }

  constructor(props: any) {
    super(props)
  }

  handleLoginPress = async () => {
    const response = await loginUser(this.state.email, this.state.password)

    if (response === undefined || response.status !== 200) {
      alert("Please check your email and password are correct")
    }

    AsyncStorage.setItem("user",
      JSON.stringify(new User({
        id: response.data.id,
        email: response.data.email,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
      })
      ))

    this.props.navigation.navigate("Tabs", {
      user: new User({
        id: response.data.id,
        email: response.data.email,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
      })
    })
  }

  handleSignupPress = async () => {
    this.props.navigation.navigate("SignUp")
  }

  handleStateChange = async (name: string, input: string) => {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={MainApp.container}>
        <View style={[MainApp.form, { marginTop: '50%' }]}>
          <Image
            source={require('../../res/img/logo.jpg')}
            style={{ height: '60%', }} />
          <Input
            value={this.state.email}
            onChangeText={(txt) => this.handleStateChange("email", txt)}
            placeholder="Email"
            returnKeyType="next" />
          <Input
            value={this.state.password}
            onChangeText={(txt) => this.handleStateChange("password", txt)}
            placeholder="Password"
            returnKeyType="go"
            secureTextEntry={true} />
          <Button
            style={{ margin: '0.5%', marginTop: '5%' }}
            onPress={this.handleLoginPress}
            title="Login" />
          <Button
            type="outline"
            style={{ margin: '0.5%', marginTop: '1%' }}
            onPress={this.handleSignupPress}
            title="Sign Up" />
        </View>
      </View>
    );
  }
}