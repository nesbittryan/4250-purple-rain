import React from "react";
import { Component } from "react";
import { Button, Input, Text, Avatar, Icon } from 'react-native-elements';
import { Style } from '../../res/Styles';
import { Colours } from "../../res/Colours";
import UserContext from "../../context/UserContext";
import ButtonlessHeader from "../../common/components/ButtonlessHeader";
import { StyleSheet, View, ScrollView } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import { User } from "../../common/models/user";
import { isLandlordByPropertyId, updateProperty } from '../../service/APIService';
import { relative } from "path";



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
  isLandlord: any,
  landlordId:string
}

export default class ViewPropertyScreen extends Component<{navigation:Navigator}> {
  readonly state: State = {
    address: "",
    city: "",
    country: "",
    description: "",
    id: "",
    maxOccupancy: 1,
    state: "",
    isLandlord: false,
    landlordId: ""
  }

  callBackRefresh: ()=> void
  user: User | any

  constructor(props: any) {
    super(props)

    this.handleUpdateProperty = this.handleUpdateProperty.bind(this)
    let property = this.props.navigation.getParam('property', 'error')
    this.callBackRefresh = this.props.navigation.getParam('refreshList', null)
    this.state.address = property.address
    this.state.description = property.description
    this.state.id = property.id
    this.state.city = property.city
    this.state.country = property.country
    this.state.state = property.state
    this.setState({landlordId: property.landlordId})
    console.log("landlord ID: " + this.state.landlordId )
  }

  componentDidMount(){
    const {user} = this.context;
    this.user = user;
    isLandlordByPropertyId(this.user.id, this.state.id)
    .then((isLandlord: boolean)  => {
      this.setState({
        isLandlord: isLandlord
      })
    })
  }

  
  handleUpdateProperty() {
    updateProperty(this.state.id, this.state.address, this.state.city, 
      this.state.state, this.state.country, this.state.description)
  }

  render() {
    return (
      <View style={Style.full_container}>
        <ButtonlessHeader text={this.state.address}></ButtonlessHeader>
        
        <Avatar rounded size="xlarge" source={{ uri: url + this.state.address + ', ' + this.state.city + ', ' + this.state.state + ', ' + this.state.country + key }}></Avatar>
        
        { this.state.isLandlord && 
          <Icon raised reverse name='save' type='font-awesome' color={Colours.accent_green} 
            containerStyle={{position: 'absolute', right:'0%', top:'35%'}}
            onPress={() => this.handleUpdateProperty() } />
        }
          <View style={{width:'95%'}}>
            <Input disabled={!this.state.isLandlord}
              value={this.state.address}
              onChangeText={ (txt) => { this.setState({ address: txt })}}
              label="Address"></Input>
            <Input disabled={!this.state.isLandlord}
              value={this.state.city}
              onChangeText={ (txt) => { this.setState({ city: txt })}}
              label="City"></Input>
            <Input disabled={!this.state.isLandlord}
              value={this.state.state}
              onChangeText={ (txt) => { this.setState({ state: txt })}}
              label="Province/State"></Input>
            <Input disabled={!this.state.isLandlord}
              value={this.state.country}
              onChangeText={ (txt) => { this.setState({ country: txt })}}
              label="Country"></Input>
            <Input disabled={!this.state.isLandlord}
              value={this.state.description}
              onChangeText={ (txt) => { this.setState({ description: txt })}}
              label="Description"></Input>
          </View>

        
        
          { this.state.isLandlord &&  //landlord view
            <View style={{width:'95%'}}>
              <Button
                style={{marginVertical: '2%'}}
                buttonStyle={{backgroundColor:Colours.accent_green}}
                title="Landlord Controls"
                onPress={ () => { this.props.navigation.navigate("LandlordOptions", {
                  userId: this.user.id,
                  refreshList: this.callBackRefresh,
                  propertyId: this.state.id,
                }) }}/>
              <Button
                style={{marginBottom: '2%'}}
                title="Maintenance Requests"
                onPress={ () => { this.props.navigation.navigate("MaintenanceRequests", {
                  propertyId: this.state.id,
                  isUserLandlord: true
                }) }}/>
              <Button
                style={{marginBottom: '2%'}}
                title="Documents"
                onPress={ () => { this.props.navigation.navigate("Documents", {
                  propertyId: this.state.id,
                  isUserLandlord: true
                }) }}/>
              <Button
                style={{marginBottom: '2%'}}
                type="outline"
                title="Back"
                onPress={ () => { 
                  this.callBackRefresh()
                  this.props.navigation.popToTop()}
                }/>
            </View>
          }
          
          { !this.state.isLandlord && //tenant view
            <View style={{width:'95%'}}>   
              <Button
                style={{marginVertical: '2%'}}
                title="Maintenance Requests"
                onPress={ () => { this.props.navigation.navigate("MaintenanceRequests", {
                  propertyId: this.state.id,
                  isUserLandlord: false
                }) }}/>
              <Button
                style={{marginBottom: '2%'}}
                title="Documents"
                onPress={ () => { this.props.navigation.navigate("Documents", {
                  propertyId: this.state.id,
                  isLandlord: false
                }) }}/>
              <Button
                style={{marginBottom: '2%'}}
                type="outline"
                title="Back"
                onPress={ () => {
                  this.props.navigation.popToTop()}
                }/>
            </View>
          }
        </View>
    );
  }
}

const propertyStyles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "100%",  
  },
  contentContainer: {
    alignItems: "center",
    flexGrow: 1,
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    height: '90%',
    justifyContent: 'space-between',
    width: "90%",
  },
  scrollView: { 
    width: "100%",
    height:20,
  }
})
ViewPropertyScreen.contextType = UserContext;
