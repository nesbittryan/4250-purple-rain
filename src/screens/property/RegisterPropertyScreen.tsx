import * as React from 'react';
import { Component } from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { PropertyInterface } from '../../common/models/Property';
import { MainApp } from '../../styles/Styles';

interface State {
  property: PropertyInterface
}

export default class RegisterPropertyScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Register Property',
  };
  
  readonly state: State = {
      property:  {
        address: "",
        description: "",
        id: "-1"
      }
  }

  constructor(props: any) {
    super(props);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.handleRegisterProperty = this.handleRegisterProperty.bind(this);
  }

  handleRegisterProperty() {
    //send api call with (this.state.property)
  }

  handlePropertyChange(name: string, input: any) {
    var prop = this.state.property
    if ("address" == name)
      prop.address = input
    if ("description" == name)
      prop.description = input

    this.setState({ property: prop})
  }

  render() {
    return (
      <View style={ MainApp.container }>
        <View style={ MainApp.form }>
          <Text>Property Registration</Text>
          <Input 
            style= { MainApp.input }
            value={ this.state.property.address }
            onChangeText={(txt) => this.handlePropertyChange("address", txt)}
            placeholder="address"
            returnKeyType="next"/>
          <Input 
            style= { MainApp.input }
            value={ this.state.property.description }
            onChangeText={(txt) => this.handlePropertyChange("description", txt)}
            placeholder="description"
            returnKeyType="next"/>
          <Button 
            style= { MainApp.button }
            onPress={ this.handleRegisterProperty }
            title="Register Property"/>
        </View>
      </View>
    );
  }
}