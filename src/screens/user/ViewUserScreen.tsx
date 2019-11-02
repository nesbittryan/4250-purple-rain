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

    let user = this.props.navigation.dangerouslyGetParent().getParam("user")

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
      <View style={ MainApp.container }>
        <View style={ MainApp.form }>
          <View>
            <Text style={[MainApp.title, { textAlign: 'center'}]}>About you</Text> 
          </View>
          <View style={{ display:'flex', flexDirection:'column', alignContent:'space-between'}}>
            <Input
              label="First Name"
              style={ MainApp.input }
              value={ this.state.firstName }
              onChangeText={(txt) => this.handleStateChange("firstName", txt)}
              returnKeyType="next"/>
            <Input
              label="Last Name"
              style={ MainApp.input }
              value={ this.state.lastName }
              onChangeText={(txt) => this.handleStateChange("lastName", txt)}
              returnKeyType="next"/>
            <Input
              label="Email"
              style={ MainApp.input }
              value={ this.state.email }
              onChangeText={(txt) => this.handleStateChange("email", txt)}
              returnKeyType="next"/>
          </View>
          <View>
            <Button
              style={{margin: '0.5%', marginTop:'5%'}}
              title="Update Profile"
              onPress={ () => { this.handleUserUpdate } } />
            <Button
              type="outline"
              style={{margin: '0.5%', marginTop:'1%'}}
              title="Change Password"
              onPress={ () => { this.props.navigation.navigate("ChangePassword", { user_id: this.state.id, email: this.state.email })} }/>
            <Button
              buttonStyle={{backgroundColor:Colours.accent_green}}
              style={{margin: '0.5%', marginTop:'10%'}}
              title="Log Out"
              onPress={ () => { this.props.navigation.dangerouslyGetParent().popToTop() }}/>
          </View>
        </View>
      </View>
    );
  }
}