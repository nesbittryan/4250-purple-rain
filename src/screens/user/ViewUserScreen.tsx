import React from "react";
import { Component } from "react";
import { View } from "react-native";
import { Button, Input, Text, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont()

import { updateUser } from "../../service/APIService";

import { Colours } from "../../res/Colours";
import UserContext from "../../context/UserContext";
import AsyncStorage from "@react-native-community/async-storage";

interface State {
  firstName: string,
  lastName: string,
  email: string,
  id: string,
}

export default class ViewUserScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Profile',
        tabBarLabel: 'Profile',
        tabBarIcon: ({ }) => {
          return<Icon name="user" size={33} color="#554971" />
        }
    };

  readonly state: State = {
    firstName: "",
    lastName: "",
    email: "",
    id: "",
  }

  constructor(props: any) {
    super(props)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleUserUpdate = this.handleUserUpdate.bind(this)
  }

  componentDidMount() {
    const {user} = this.context;
    this.setState(state => {
      state.email = user.email
      state.firstName = user.first_name
      state.lastName = user.last_name
      state.id = user.id

      return state;
    })
  }

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  handleUserUpdate() {
    updateUser(this.state.id, this.state.email, this.state.firstName, this.state.lastName)
    .then((response: any) => {
      if (response.status != 200) {
        alert("User profile was unable to be updated")
        return
      } else {
        alert("User profile updated")
      }
    })
  }

  handleLogOut = async () => {
    await AsyncStorage.removeItem('token')
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={{backgroundColor:Colours.accent_blue}}>
        <Text style={{textAlign:'center',fontSize:20, color:Colours.accent_green, marginBottom:'3%', marginTop:'12%'}}>You</Text>
        <View style={{backgroundColor:Colours.white, width:'100%'}}>
          <View style={{ display:'flex', flexDirection:'column', alignContent:'flex-start'}}>
            <Avatar rounded size="xlarge"
              title={ this.state.firstName[0] + this.state.lastName[0]}
              containerStyle={{alignSelf:'center', marginTop:'5%'}}/>
            <Input
              label="First Name"
              value={ this.state.firstName }
              onChangeText={(txt) => this.handleStateChange("firstName", txt)}
              returnKeyType="next"/>
            <Input
              label="Last Name"
              containerStyle={{marginTop:'5%'}}
              value={ this.state.lastName }
              onChangeText={(txt) => this.handleStateChange("lastName", txt)}
              returnKeyType="next"/>
            <Input
              label="Email"
              containerStyle={{marginTop:'5%', marginBottom:'25%'}}
              value={ this.state.email }
              onChangeText={(txt) => this.handleStateChange("email", txt)}
              returnKeyType="next"/>
          </View>
          <View>
            <Button
              style={{marginHorizontal: '5%'}}
              title="Update Profile"
              onPress={ () => { this.handleUserUpdate() } } />
            <Button
              type="outline"
              style={{marginHorizontal: '5%', marginTop:'2%'}}
              title="Change Password"
              onPress={ () => { this.props.navigation.navigate("ChangePassword", { user_id: this.state.id, email: this.state.email })} }/>
            <Button
              buttonStyle={{backgroundColor:Colours.accent_green}}
              style={{marginHorizontal: '5%', marginTop:'10%'}}
              title="Log Out"
              onPress={ this.handleLogOut }
            />
          </View>
        </View>
      </View>
    );
  }
}

ViewUserScreen.contextType = UserContext;
