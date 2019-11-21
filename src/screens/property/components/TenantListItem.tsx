import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { User } from "../../../common/models/user";
import { StyleSheet } from 'react-native';
import { removeTenantFromProperty } from "../../../service/APIService";
import { Colours } from "../../../res/Colours";

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
      <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', padding:'5%', alignItems:'center'}}>
        <Text style={{fontSize:20, color:Colours.darker_blue}}>{this.user.email}</Text> 
        <Icon raised reverse name='minus' type='font-awesome' color={Colours.light_red}
          onPress={ this.removeTenant } />
      </View>
    )
  }
}