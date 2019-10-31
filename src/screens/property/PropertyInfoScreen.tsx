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

export default class ViewPropertyScreen extends Component {
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
    this.handlePropertyDelete = this.handlePropertyDelete.bind(this)
    const property =  this.props.navigation.getParam('property', 'error')
    this.state.address = property.address
    this.state.city = property.city
    this.state.country = property.country
    this.state.description = property.description
    this.state.id = property.id
    this.state.maxOccupancy = property.maxOccupancy
    this.state.state = property.state
  }
  handlePropertyDelete() {

  }
  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={MainApp.container}>
        <View style={MainApp.form}>
          <View style= {{ borderBottomWidth: 40, borderBottomColor: 'transparent' }}>
            <Input 
              style={ MainApp.input }
              value={ this.state.address }
              onChangeText={(txt) => this.handleStateChange("address", txt)}
              returnKeyType="next"/>
            <Input 
              style={ MainApp.input }
              value={ this.state.city }
              onChangeText={(txt) => this.handleStateChange("city", txt)}
              returnKeyType="next"/>
            <Input 
              style={ MainApp.input }
              value={ this.state.state }
              onChangeText={(txt) => this.handleStateChange("state", txt)}
              returnKeyType="next"/>
            <Input 
              style={ MainApp.input }
              value={ this.state.country }
              onChangeText={(txt) => this.handleStateChange("country", txt)}
              returnKeyType="next"/>
            <Input 
              style={ MainApp.input }
              value={ this.state.description }
              onChangeText={(txt) => this.handleStateChange("description", txt)}
              returnKeyType="next"/>
            <Input 
              style={ MainApp.input }
              value={ this.state.id }
              onChangeText={(txt) => this.handleStateChange("id", txt)}
              returnKeyType="go"/>
            <Input 
              style={ MainApp.input }
              value={ this.state.address }
              onChangeText={(txt) => this.handleStateChange("address", txt)}
              returnKeyType="next"/>
            <Text>Max Occupancy:</Text>
          <Picker
            selectedValue={ this.state.maxOccupancy}
            onValueChange={(num) => this.handleStateChange("maxOccupancy", num)}>
              <Picker.Item label="1" value="1"></Picker.Item>
              <Picker.Item label="2" value="2"></Picker.Item>
              <Picker.Item label="3" value="3"></Picker.Item>
              <Picker.Item label="4" value="4"></Picker.Item>
              <Picker.Item label="5" value="5"></Picker.Item>
              <Picker.Item label="6" value="6"></Picker.Item>
              <Picker.Item label="7" value="7"></Picker.Item>
              <Picker.Item label="8" value="8"></Picker.Item>
              <Picker.Item label="9" value="9"></Picker.Item>
              <Picker.Item label="10" value="10"></Picker.Item>
          </Picker>
          </View>
          <Button
            style={ MainApp.button }
            title="Update Property" />
          <Button 
            style={ MainApp.button }
            onPress={this.handlePropertyDelete}
            title="Delete Property" />
        </View>
      </View>
    );
  }
}

const ViewPropertyStyles = StyleSheet.create({
  
})