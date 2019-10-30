import React from "react";
import { Component } from "react";
import { Button, Input } from 'react-native-elements';
import { Text, View, ImageBackground, Picker, FlatList, TextInput } from "react-native";
import { MainApp } from '../../styles/Styles';
import { StyleSheet } from 'react-native';
import { Property } from "../../common/models/Property";
import { User } from "../../common/models/user";
import { APIService } from "../../service/APIService";
import TenantOptionsScreen from "./TenantOptionsScreen";
import TenantListItem from "../../common/components/TenantListItem";



interface State {
    address: string,
    city: string,
    country: string,
    description: string,
    id: string,
    maxOccupancy: number,
    state: string,
    newTenant: string,
  }

export default class LandlordOptionsScreen extends Component {
  readonly state: State = {
    address: "",
    city: "",
    country: "",
    description: "",
    id: "",
    maxOccupancy: 1,
    state: "",
    newTenant: ""
  }
  property : Property
  tenants:User[] = new Array()
  constructor(props: any) {
    super(props)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.HandleAddTenant = this.HandleAddTenant.bind(this)
    this.property =  this.props.navigation.getParam('property', 'error')
    this.state.address = this.property.address
    this.state.description = this.property.description
    this.state.id = this.property.id
  }

  componentDidMount() {
    APIService.getTenantsInProperty(this.property.id).then((users: any)  => {
      this.tenants = users
      this.forceUpdate();
    })
  }

  HandleAddTenant()
  {
    APIService.addTenantToPropertyByEmail(this.property.id, this.state.newTenant).then((response) => {
      if (response.code != 200) {
        alert("error adding tenant")
      } else {
        alert("tenant has been added please refresh")
      }
    })
  }

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={LandLordOptionsStyles.container}>
        <View style={LandLordOptionsStyles.form}>
          <Text style={LandLordOptionsStyles.heading}>Tenants in Property</Text>
          <FlatList
            data={ this.tenants }
            style={{
              
            }}
            renderItem={({item}) => <TenantListItem user={ item } property={this.property} navigation={this.props.navigation}></TenantListItem> }>
          </FlatList>     
          <View style={LandLordOptionsStyles.form}>
            <Input 
                style={ LandLordOptionsStyles.input }
                value={ this.state.newTenant }
                returnKeyType="next"
                placeholder="new tenant email"
                onChangeText={(txt) => this.handleStateChange("newTenant", txt)}
            />
            <Button
              style={ MainApp.button }
              onPress={this.HandleAddTenant}
              title="Add New Tenant" />
          </View>       
         
        </View>
      </View>
    );
  }
}

const LandLordOptionsStyles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    
    paddingTop: 30
  },
  heading: {
    textAlign: "left",
    fontSize: 30,
    width: "100%"
  },
  input :{
    width: 300,
    height: 30

  }, 
  formContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
  }
})