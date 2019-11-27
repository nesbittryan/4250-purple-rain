import * as React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { Input, Button, Avatar, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'
import { Style } from '../../res/Styles';
import { loginUser } from '../../service/APIService'
import UserContext from '../../context/UserContext';
import { getCurrentUser } from '../../../App';
import { Colours } from '../../res/Colours';



interface State {
  email: string,
  password: string
}

export default class LoginScreen extends Component {
  readonly state: State = {
    email: "ryannesb@gmail.com",
    password: "12121212"
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

    await this.setUserContext();
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
      <View style={[Style.full_container,{justifyContent:'center'}]}>
       
        <Avatar size='xlarge'
          source={require('../../res/img/logo.jpg')} />
        <Text style={{fontSize:35, fontStyle:'italic', marginTop:'-5%', marginBottom:'5%', 
          color:Colours.accent_green, fontWeight:'700'}}>manager</Text>
        
        <View style={{width:'80%'}}>
          <Input
            containerStyle={{marginTop:'5%'}}
            value={this.state.email}
            onChangeText={(txt) => this.handleStateChange("email", txt)}
            placeholder="Email"
            returnKeyType="next" />
          <Input
            containerStyle={{marginVertical:'5%'}}
            value={this.state.password}
            onChangeText={(txt) => this.handleStateChange("password", txt)}
            placeholder="Password"
            returnKeyType="go"
            secureTextEntry={true} />
          <Button
            style={{ marginVertical: '2%' }}
            onPress={this.handleLoginPress}
            title="Login" />
          <Button
            type="outline"
            style={{ marginBottom: '2%' }}
            onPress={this.handleSignupPress}
            title="Sign Up" />
        </View>
        
      </View>
    );
  }
}

LoginScreen.contextType = UserContext;
