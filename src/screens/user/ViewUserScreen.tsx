import React from "react";
import { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { Button, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont()

import { APIService } from "../../service/APIService";

import { MainApp } from '../../res/Styles';

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
        alert("Account updated")
      }
    })
  }

  render() {
    return (
      <View style={ MainApp.container }>
        <View style={ MainApp.form }>
          <View style= {{ borderBottomWidth: 40, borderBottomColor: 'transparent' }}>
            <Text>First Name</Text>
            <Input
              style={ MainApp.input }
              value={ this.state.firstName }
              onChangeText={(txt) => this.handleStateChange("firstName", txt)}
              returnKeyType="next"/>
            <Text>Last Name</Text>
            <Input
              style={ MainApp.input }
              value={ this.state.lastName }
              onChangeText={(txt) => this.handleStateChange("lastName", txt)}
              returnKeyType="next"/>
            <Text>Email</Text>
            <Input
              style={ MainApp.input }
              value={ this.state.email }
              onChangeText={(txt) => this.handleStateChange("email", txt)}
              returnKeyType="next"/>
          </View>
          <Button
            style={ MainApp.button }
            title="Update Profile"
            onPress={ () => { this.handleUserUpdate } } />
          <Button
            style={ MainApp.button }
            title="Change Password"
            onPress={ () => { this.props.navigation.navigate("ChangePassword", { user_id: this.state.id, email: this.state.email })} }/>
        </View>
      </View>
    );
  }
}