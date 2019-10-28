import React from "react";
import { Component } from "react";
import { View } from "react-native";
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { APIService } from "../../service/APIService";

import { MainApp } from '../../styles/Styles';

interface State {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  id: string,
}

export default class ViewUserScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ }) => {
          Icon.loadFont();
          return<Icon name="user-circle" size={33} color="#554971" />
        }
    }

  readonly state: State = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    id: "",
  }

  constructor(props: any) {
    super(props)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleUserUpdate = this.handleUserUpdate.bind(this)

    const user =  this.props.navigation.getParam('user', 'error')
    
    this.state.firstName = user.f
    this.state.lastName = user.l
    this.state.email = user.e
    this.state.id = user.id
  }

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  handleUserUpdate() {
    APIService.updateUser(this.state.id, this.state.email, this.state.password, this.state.firstName, this.state.lastName)
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
      <View style={MainApp.container}>
        <View style={MainApp.form}>
          <View style= {{
            borderBottomWidth: 40,
            borderBottomColor: 'transparent',
          }}>
            <Input value={ this.state.firstName }
              onChangeText={(txt) => this.handleStateChange("address", txt)}
              returnKeyType="next"/>
            <Input value={ this.state.lastName }
              onChangeText={(txt) => this.handleStateChange("description", txt)}
              returnKeyType="next"/>
            <Input value={ this.state.email }
              onChangeText={(txt) => this.handleStateChange("description", txt)}
              returnKeyType="next"/>
            <Input value={ this.state.password }
              onChangeText={(txt) => this.handleStateChange("description", txt)}
              returnKeyType="next"/>
            < Input value={ this.state.id }
              onChangeText={(txt) => this.handleStateChange("id", txt)}
              returnKeyType="go"/>
          </View>
          <Button
            title="Update Profile" onPress={ () => { this.handleUserUpdate } }
          />
        </View>
      </View>
    );
  }
}