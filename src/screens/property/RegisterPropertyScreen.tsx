import * as React from 'react';
import { Text, View, AsyncStorage, Picker, CheckBox } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { PropertyInterface } from '../../common/models/Property';

import { MainApp } from '../../styles/Styles';
import { APIService } from '../../service/APIService';

interface State {
  property: PropertyInterface
  isLandlord: boolean
  userId: string
}

export default class RegisterPropertyScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Register Property',
  };
  
  readonly state: State = {
      property:  {
        address: "",
        city: "",
        country: "",
        description: "",
        id: "-1",
        maxOccupancy: 1,
        state:""
      },
      isLandlord: true,
      userId: ""
  }

  constructor(props: any) {
    super(props);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.handleRegisterProperty = this.handleRegisterProperty.bind(this);

    AsyncStorage.getItem("user")
      .then((response: any) => {
        let user = JSON.parse(response)
        this.state.userId
    })
    
  }

  handlePropertyChange(name: string, input: any) {
    var prop = this.state.property
    if ("address" == name)
      prop.address = input
    if ("city" == name)
      prop.city = input
    if ("country" == name)
      prop.country = input
    if ("description" == name)
      prop.description = input
    if ("state" == name)
      prop.state = input
    if ("maxOccupancy" == name)
      prop.maxOccupancy = input

    this.setState({ property: prop})
  }

  handleRegisterProperty() {
    APIService.createProperty(this.state.property, this.state.isLandlord, this.s)
    this.props.navigation.navigate("Home")
  }

  handleStateChange(name: string, input: boolean) {
    this.setState(() => ({ [name]: input }));
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
            value={ this.state.property.city }
            onChangeText={(txt) => this.handlePropertyChange("city", txt)}
            placeholder="city"
            returnKeyType="next"/>
          <Input 
            style= { MainApp.input }
            value={ this.state.property.state }
            onChangeText={(txt) => this.handlePropertyChange("state", txt)}
            placeholder="state"
            returnKeyType="next"/>
          <Input 
            style= { MainApp.input }
            value={ this.state.property.country }
            onChangeText={(txt) => this.handlePropertyChange("country", txt)}
            placeholder="country"
            returnKeyType="next"/>
          <Input 
            style= { MainApp.input }
            value={ this.state.property.description }
            onChangeText={(txt) => this.handlePropertyChange("description", txt)}
            placeholder="description"
            returnKeyType="next"/>
          <Text>Max Occupancy:</Text>
          <Picker
            selectedValue={ this.state.property.maxOccupancy}
            onValueChange={(num) => this.handlePropertyChange("maxOccupancy", num)}>
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
          <Text>Are you the landlord: </Text>
          <CheckBox
            value= { this.state.isLandlord }
            onChange={ (check) => this.handleStateChange("isLandlord", check) }></CheckBox>
          <Button 
            style= { MainApp.button }
            onPress={ this.handleRegisterProperty }
            title="Register Property"/>
        </View>
      </View>
    );
  }
}