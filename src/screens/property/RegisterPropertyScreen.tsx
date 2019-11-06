import * as React from 'react';
import { Text, View, AsyncStorage, Picker } from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont()

import { PropertyInterface } from '../../common/models/Property';

import { MainApp } from '../../res/Styles';
import { APIService } from '../../service/APIService';

interface State {
  property: PropertyInterface
  isLandlord: boolean
  userId: string
}

export default class RegisterPropertyScreen extends React.Component<{navigation: Navigator},{}> {
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
        let r = JSON.parse(response)
        this.setState({ userId: r.id })
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
    APIService.createProperty(this.state.property, this.state.isLandlord, this.state.userId)
    this.props.navigation.state.params.onGoBack({wentBack: true})
    this.props.navigation.goBack();
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
          <CheckBox
            title="Are you the landlord?"
            onPress={ () => this.setState({ isLandlord: !this.state.isLandlord }) }
            checked={ this.state.isLandlord}></CheckBox>
          <Button 
            onPress={ this.handleRegisterProperty }
            title="Register Property"/>
          <Button 
            onPress={ () => this.props.navigation.popToTop() }
            type="outline"
            title="Back"/>
        </View>
      </View>
    );
  }
}