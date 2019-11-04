import React from "react";
import { Component } from "react";
import { Button, Input } from 'react-native-elements';
import { Text, View, ImageBackground, Picker, FlatList, TextInput } from "react-native";
import { MainApp } from '../../res/Styles';
import { StyleSheet } from 'react-native';
import { Property } from "../../common/models/Property";
import { User } from "../../common/models/user";
import { APIService } from "../../service/APIService";
import TenantOptionsScreen from "./TenantOptionsScreen";
import CoTenantListItem from "./components/CoTenantListItem";



interface State {
    address: string,
    city: string,
    country: string,
    description: string,
    id: string,
    maxOccupancy: number,
    state: string,
    newTenant: string,
    tenants: User[]
  }

export default class LandlordOptionsScreen extends Component<{propertyId: string}> {
  readonly state: State = {
    address: "",
    city: "",
    country: "",
    description: "",
    id: "",
    maxOccupancy: 1,
    state: "",
    newTenant: "",
    tenants: new Array
  }
  tenants:User[] = new Array()
  propertyId :string 
  constructor(props: any) {
    super(props)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleAddTenant = this.handleAddTenant.bind(this)
    this.getNewTenant = this.getNewTenant.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.propertyId =  this.props.navigation.getParam('propertyId', 'error')
    this.state.id = this.propertyId
    //console.log(this.propertyId)
  }

  componentDidMount() {
    //this.propertyId = this.props.propertyId
    //console.log(this.props.propertyId)
    this.fetchData()
  }
  
  fetchData() {
    APIService.getTenantsInProperty(this.state.id).then((users: any)  => {
      this.setState({tenants: users})
      this.forceUpdate()
    })
  }

  getNewTenant(tenant: string) {
    this.setState({newTenant: tenant})
  }

  handleAddTenant()
  {
    APIService.addTenantToPropertyByEmail(this.state.id, this.state.newTenant).then((response) => {
      if (response.code != 200) {
        alert("error adding tenant")
      } else {
        //alert("tenant has been added please refresh")
        this.fetchData()
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
          
          <TenantList
            tenants={this.state.tenants}
            propertyId={this.state.id}
            fetchData={this.fetchData}
            style={{
              width:"100%",
            }}
          >

          </TenantList>
          <Button style={{margin: '0.5%', marginTop:'1%', alignSelf: "stretch"}} type="outline" title="Back" onPress={ () => { this.props.navigation.goBack() } } />   
        </View>
      </View>
    );
  }
}

class TenantList extends React.Component<{tenants: User[], propertyId: string},{}> {

  render() {
    console.log("property ID: " + this.props.propertyId)
    return (
      <FlatList
        data={ this.props.tenants }
        style={{
          alignSelf: "stretch",
        }}
        contentContainerStyle={LandLordOptionsStyles.listContainer}
        renderItem={({item}) => <CoTenantListItem user={ item } propertyId={this.props.propertyId} navigation={this.props.navigation} fetchData={this.props.fetchData}></CoTenantListItem> }>
      </FlatList>    
    )
  }
}


const LandLordOptionsStyles = StyleSheet.create({
  listContainer: {  
    alignItems: "center"
  },
  container: {
    alignItems: "flex-start",
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "98%",
    margin:"auto",
    paddingTop: 30
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
    width: "100%",
    textDecorationLine: "underline"
  }, 
  formContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
  }
})