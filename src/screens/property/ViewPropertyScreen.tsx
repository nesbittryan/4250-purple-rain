import React from "react";
import { Component } from "react";
import { Button, Input, Image, Text } from 'react-native-elements';
import { View, AsyncStorage } from "react-native";
import { MainApp } from '../../res/Styles';
import { User } from "../../common/models/user";
import { APIService } from '../../service/APIService';
import { Colours } from "../../res/Colours";

const url = 'https://maps.googleapis.com/maps/api/streetview?size=300x200&location='
const key = '&key=AIzaSyCO4E3Yhrq01Y56FCm_bbj2dhF73PyzJiE'

interface State {
  address: string,
  city: string,
  country: string,
  description: string,
  id: string,
  maxOccupancy: number,
  state: string,
  isLandlord: any
}

export default class ViewPropertyScreen extends Component {
  readonly state: State = {
    address: "",
    city: "",
    country: "",
    description: "",
    id: "",
    maxOccupancy: 1,
    state: "",
    isLandlord: false
  }

  user: User | any

  constructor(props: any) {
    super(props)

    this.handleUpdateProperty = this.handleUpdateProperty.bind(this)
    let property =  this.props.navigation.getParam('property', 'error')
    this.state.address = property.address
    this.state.description = property.description
    this.state.id = property.id
    this.state.city = property.city
    this.state.country = property.country
    this.state.state = property.state
  }

  componentDidMount(){
    AsyncStorage.getItem("user")
    .then((response: any) => {
      this.user = JSON.parse(response)
    }).then(() => {
      APIService.isLandlordByPropertyId(this.user.id, this.state.id)
      .then((isLandlord: boolean)  => {
        this.setState({
          isLandlord: isLandlord
        })
      })
    })
  }

  handleUpdateProperty() {
    APIService.updateProperty(this.state.id, this.state.address, this.state.city, 
      this.state.state, this.state.country, this.state.description)
  }

  render() {
    return (
      <View style={MainApp.container}>
        <View style={MainApp.form}>
        <Image
          source={{ uri: url + this.state.address + ', ' + this.state.city + ', ' + this.state.state + ', ' + this.state.country + key }}
          style={{height: '50%', width: '100%'}}
          containerStyle={{ marginBottom:-200}}/>
          { this.state.isLandlord &&  //landlord view
            <View>
              <Input
                value={this.state.address}
                onChangeText={ (txt) => { this.setState({ address: txt })}}
                label="Address"></Input>
              <Input
                value={this.state.city}
                onChangeText={ (txt) => { this.setState({ city: txt })}}
                label="City"></Input>
              <Input
                value={this.state.state}
                onChangeText={ (txt) => { this.setState({ state: txt })}}
                label="Province/State"></Input>
              <Input
                value={this.state.country}
                onChangeText={ (txt) => { this.setState({ country: txt })}}
                label="Country"></Input>
              <Input
                value={this.state.description}
                onChangeText={ (txt) => { this.setState({ description: txt })}}
                label="Description"></Input>
              <Button
                style={{margin: '0.5%', marginTop: '5%'}}
                title="Landlord Options"
                onPress={ () => { this.props.navigation.navigate("LandlordOptions", {
                  propertyId: this.state.id,
                }) }}/>
              <Button
                style={{margin: '0.5%', marginTop: '1%'}}
                buttonStyle={{backgroundColor:Colours.accent_green}}
                title="Update Property"
                onPress={ () => { this.handleUpdateProperty()}}/>
              <Button
                style={{margin: '0.5%', marginTop: '1%'}}
                type="outline"
                title="Back"
                onPress={ () => { 
                  this.props.navigation.popToTop()}
                }/>
            </View>
          }
          
          { !this.state.isLandlord && //tenant view
            <View>
              <View>
                <Text style={MainApp.subtitle}>{"Address: " + this.state.address}</Text>
                <Text style={MainApp.subtitle}>{"City: " + this.state.city}</Text>
                <Text style={MainApp.subtitle}>{"Province/State: " + this.state.state}</Text>
                <Text style={MainApp.subtitle}>{"Country: " + this.state.country}</Text>
                <Text style={MainApp.subtitle}>{"Description: " + this.state.description}</Text>
              </View>
             
              <Button
                style={{margin: '0.5%', marginTop: '5%'}}
                title="Tenant Options"
                onPress={ () => { this.props.navigation.navigate("TenantOptions", {
                  propertyId: this.state.id,
                }) }}/>
              <Button
                style={{margin: '0.5%', marginTop: '1%'}}
                title="Back"
                onPress={ () => {
                  this.props.navigation.popToTop()}
                }/>
            </View>
          }
        </View>
      </View>
    );
  }
}