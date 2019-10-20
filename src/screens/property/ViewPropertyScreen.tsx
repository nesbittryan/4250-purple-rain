import React from "react";
import { Component } from "react";
import { AuthService } from '../../service/AuthService'
import { Button, Input } from 'react-native-elements';
import { View } from "react-native";
import { default_style } from '../../styles/views';

interface State {
  address: string,
  description: string,
  id: string,
}

const logOut = (navigation) => {
  if (AuthService.logout())
  navigation.popToTop()
}

export default class ViewPropertyScreen extends Component {
  readonly state: State = {
    address: "",
    description: "",
    id: "",
  }

  constructor(props: any) {
    super(props)
    this.handleStateChange = this.handleStateChange.bind(this)

    const property =  this.props.navigation.getParam('property', 'error')
    this.state.address = property.address
    this.state.description = property.description
    this.state.id = property.id
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Dashboard',
      headerLeft: (
        <Button title="Log Out" onPress={ () => logOut(navigation) }/>
      )
    }
  }

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={default_style.container}>
        <View style={default_style.form}>
          <View style= {{
            borderBottomWidth: 40,
            borderBottomColor: 'transparent',
          }}>
            <Input value={ this.state.address }
              onChangeText={(txt) => this.handleStateChange("address", txt)}
              returnKeyType="next"/>
            <Input value={ this.state.description }
              onChangeText={(txt) => this.handleStateChange("description", txt)}
              returnKeyType="next"/>
            < Input value={ this.state.id }
              onChangeText={(txt) => this.handleStateChange("id", txt)}
              returnKeyType="go"/>
          </View>
          <Button
            title="Update Address"
          />
        </View>
      </View>
    );
  }
}