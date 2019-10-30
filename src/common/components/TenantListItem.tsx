import React, { Component } from "react";
import { TouchableHighlight, View, Text,Image } from "react-native";
import { Property } from "../models/property";
import { Button } from 'react-native-elements';
import { User } from "../models/user";
import { StyleSheet } from 'react-native';
import { APIService } from "../../service/APIService";

interface State {
  propertyId: string,
  userId: string
}

export default class TenantListItem extends Component {
  readonly state: State = {
    propertyId : "",
    userId : "",
  }
  userId: string
  propertyId: string
  user : User
  property: Property

  constructor(props: any) {
    super(props)
    this.user = props.user
    this.userId = props.user.id
    this.propertyId = props.property.id
    this.property = props.property
    this.removeTenant = this.removeTenant.bind(this)
  }

  componentDidMount() {  
    this.setState({propertyId: this.property.id})
    this.setState({userId : this.user.id})
    //console.log(this.state.propertyId)
  }



  removeTenant() {
    APIService.removeTenantFromProperty( this.state.propertyId,this.state.userId).then((response) => {
      if (response.code != 200) {
        alert("error removing tenant")
      } else {
        alert("tenant has been removed please refresh")
      }
    })
    //console.log(this.user)
    //console.log(this.state.userId)
    //console.log(this.state.propertyId)
  }

  render() {
    return (
      <View style={TenantListItemStyles.container}>
        <View style={TenantListItemStyles.item}>
          <Text>{this.user.email}</Text> 
        </View>
        
        <View style={TenantListItemStyles.deleteButton}>
          <Button
            onPress={ this.removeTenant }
            title="remove Tenant"
          />
        </View>
      </View>
    )
  }
}
const TenantListItemStyles = StyleSheet.create({
  item: {
    width: "50%"
  },
  container: {
    flexDirection: "row",
    borderWidth:5,
    borderColor:'transparent',
    width:'100%',
  },
  deleteButton:{

  }
})