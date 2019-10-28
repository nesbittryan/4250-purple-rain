import React from "react";
import { Component } from "react";
import { Button, Input } from 'react-native-elements';
import { View } from "react-native";
import { MainApp } from '../../styles/Styles';

interface State {
  address: string,
  description: string,
  id: string,
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

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={MainApp.container}>
        <View style={MainApp.form}>
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