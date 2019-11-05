import React, { Component } from "react";
import { TouchableHighlight, View, Text,Image, TouchableOpacity } from "react-native";
import { Property } from "../../../common/models/property";
import { Button } from 'react-native-elements';
import { User } from "../../../common/models/user";
import { StyleSheet } from 'react-native';
import { APIService } from "../../../service/APIService";

interface State {
  propertyId: string,
  userId: string
}

export default class CoTenantListItem extends Component {
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
  }

  componentDidMount() {  
    this.setState({propertyId: this.propertyId})
    this.setState({userId : this.user.id})
  }
  
  messageTenant () {
    alert("Message tenant stub")
  }
  setupPayment() {
    this.props.navigation.navigate("New", { userId: this.userId, onGoBack: () => this.fetchData(), connectedUsers: this.state.userIdList })
    alert("Setup Payment Stub")
  }

  render() {
    return (
      <View style={TenantListItemStyles.container}>
        <View style={TenantListItemStyles.item}>
          <Text>{this.user.email}</Text> 
        </View>
        
        <View style={TenantListItemStyles.buttonContainer}>
          
          <TouchableOpacity 
            onPress={this.messageTenant}
            style={TenantListItemStyles.buttonBackground}
          >
            <Text style={TenantListItemStyles.buttonText}>
              Chat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={this.setupPayment}
            style={TenantListItemStyles.buttonBackground}
          >
            <Text style={TenantListItemStyles.buttonText}>
              Pay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const TenantListItemStyles = StyleSheet.create({
  item: {
    width: "50%"
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
  container: {
    flexDirection: "row",
    borderWidth:5,
    borderColor:'transparent',
    width:'100%',
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