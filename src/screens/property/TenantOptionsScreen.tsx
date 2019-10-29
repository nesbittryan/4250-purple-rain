import React from "react";
import { Component } from "react";
import { Button, Input } from 'react-native-elements';
import { Text, View, ImageBackground, Picker } from "react-native";
import { MainApp } from '../../styles/Styles';
import { StyleSheet } from 'react-native';


interface State {
    address: string,
    city: string,
    country: string,
    description: string,
    id: string,
    maxOccupancy: number,
    state: string
  }

export default class TenantOptionsScreen extends Component {
    readonly state: State = {
        address: "",
        city: "",
        country: "",
        description: "",
        id: "",
        maxOccupancy: 1,
        state: ""
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
          
        </View>
      </View>
    );
  }
}

const ViewPropertyStyles = StyleSheet.create({
  
})