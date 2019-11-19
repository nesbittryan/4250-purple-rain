import * as React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'
import { MainApp } from '../../res/Styles';
import { loginUser } from '../../service/APIService'
import { User } from '../../common/models/user';
import { getDocument, addDocument } from '../../service/S3';
import UserContext from '../../context/UserContext';
import { getCurrentUser } from '../../../App';

interface State {
  email: string,
  password: string
}

export default class LoginScreen extends Component {
  readonly state: State = {
    email: "jordanchalupka@gmail.com",
    password: "password"
  }

  constructor(props: any) {
    super(props)
  }

  async componentDidMount() {
    await this.setUserContext();
    // If we already have a user, skip login.
    const {user} = this.context;
    if (user) {
      this.props.navigation.navigate('Tabs');
      return
    }
  }

  setUserContext = async () => {
    const user = await getCurrentUser();

    const { update } = this.context;
    update(user);
  }

  handleLoginPress = async () => {
    const response = await loginUser(this.state.email, this.state.password)

    const token = response.data.tokens.access_token;
    await AsyncStorage.setItem('token', token);

    if (response === undefined || response.status !== 200) {
      alert("Please check your email and password are correct")
    }

    this.setUserContext();

    this.props.navigation.navigate("Tabs")
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

LoginScreen.contextType = UserContext;
