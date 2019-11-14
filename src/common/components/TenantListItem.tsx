import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from 'react-native-elements';
import { User } from "../models/user";
import { StyleSheet } from 'react-native';
import { removeTenantFromProperty } from "../../service/APIService";

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

  constructor(props: any) {
    super(props)
    this.user = props.user
    this.userId = props.user.id
    this.propertyId = props.propertyId
    this.removeTenant = this.removeTenant.bind(this)
  }

  componentDidMount() {  
    this.setState({propertyId: this.propertyId})
    this.setState({userId : this.user.id})
  }



  removeTenant() {
    console.log(this.state.propertyId)
    console.log( this.state.userId)
    removeTenantFromProperty( this.state.propertyId,this.state.userId).then((response) => {
      if (response.status != 200) {
        alert("error removing tenant")
      } else {
        this.props.fetchData()
      }
    })
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

  },
  buttonBackground:{ 
    width: "25%",
    backgroundColor: "#1B80AE",
    alignItems: "center",
    justifyContent: "center",
    height: 40
  },
  buttonText:{
    color: "#ffffff"
  },
  button:{
    width: "50%",
    alignSelf: 'stretch',
  },
  buttonContainer: {
    
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
})