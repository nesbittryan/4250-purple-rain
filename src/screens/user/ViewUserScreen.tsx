import React from "react";
import { Component } from "react";
import { View } from "react-native";
import { Button, Input, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont()

import { updateUser } from "../../service/APIService";

import { Colours } from "../../res/Colours";
import UserContext from "../../context/UserContext";
import AsyncStorage from "@react-native-community/async-storage";
import ButtonlessHeader from "../../common/components/ButtonlessHeader";
import { Style } from "../../res/Styles";

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
    const { remove } = this.context;
    remove()
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={Style.full_container}>
                
        <ButtonlessHeader text="Your Profile"/>
       
        <Avatar rounded size="xlarge"
          title={ this.state.firstName[0] + this.state.lastName[0]}/>

        <Input
          label="First Name"
          value={ this.state.firstName }
          onChangeText={(txt) => this.handleStateChange("firstName", txt)}
          returnKeyType="next"/>
        <Input
          label="Last Name"
          value={ this.state.lastName }
          onChangeText={(txt) => this.handleStateChange("lastName", txt)}
          returnKeyType="next"/>
        <Input
          label="Email"
          value={ this.state.email }
          onChangeText={(txt) => this.handleStateChange("email", txt)}
          returnKeyType="next"/>
        <View style={{width:'95%'}}>
          <Button
            style={{marginBottom:'1%'}}
            title="Update Profile"
            onPress={ () => { this.handleUserUpdate() } } />
          <Button
            buttonStyle={{backgroundColor: Colours.accent_green}}
            style={{marginBottom:'5%'}}
            title="Change Password"
            onPress={ () => { this.props.navigation.navigate("ChangePassword", { user_id: this.state.id, email: this.state.email })} }/>
          <Button
            buttonStyle={{backgroundColor:Colours.light_red}}
            style={{marginBottom:'2%'}}
            title="Log Out"
            onPress={ this.handleLogOut }
          />
        </View>
      </View>
    );
  }
}

ViewUserScreen.contextType = UserContext;
