import React from "react";
import { Component } from "react";
import { View } from "react-native";
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont()

import { APIService } from "../../service/APIService";

import { MainApp } from '../../res/Styles';
import { Colours } from "../../res/Colours";

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

    var user
    if (this.state.id == "")
      user = this.props.navigation.dangerouslyGetParent().getParam("user")

    this.state.email = user.email
    this.state.firstName = user.firstName
    this.state.lastName = user.lastName
    this.state.id = user.id
}

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  handleUserUpdate() {
    APIService.updateUser(this.state.id, this.state.email, this.state.firstName, this.state.lastName)
    .then((response: any) => {
      if (response.code != 200) {
        alert("User profile was unable to be updated")
        return
      } else {
        alert("User profile updated")
      }
    })
  }

  render() {
    return (
      <View style={{backgroundColor:Colours.accent_blue}}>
        <Text style={{textAlign:'center',fontSize:20, color:Colours.accent_green, marginBottom:'3%', marginTop:'12%'}}>You</Text>
        <View style={{backgroundColor:Colours.white, width:'100%'}}>
          <View style={{ marginTop:'30%',display:'flex', flexDirection:'column', alignContent:'space-between'}}>
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
              style={{marginHorizontal: '5%', marginTop:'10%'}}
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
              onPress={ () => { this.props.navigation.dangerouslyGetParent().popToTop() }}/>
          </View>
        </View>
      </View>
    );
  }
}