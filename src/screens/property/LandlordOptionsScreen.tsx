import React from "react";
import { Component } from "react";
import { Button, Input } from 'react-native-elements';
import { Text, View, FlatList, Alert } from "react-native";
import { StyleSheet } from 'react-native';
import { User } from "../../common/models/user";
import { removeLandlordFromProperty, addTenantToPropertyByEmail, getTenantsInProperty } from "../../service/APIService";
import TenantListItem from "./components/TenantListItem";
import { Colours } from "../../res/Colours";
import ButtonlessHeader from "../../common/components/ButtonlessHeader";
import { Style } from "../../res/Styles";

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

export default class LandlordOptionsScreen extends Component<{navigation:Navigator, propertyId: string}> {
  
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

  callbackRefresh: () => void

  propertyId: string 
  userId: string
  tenants: User[] = new Array()

  constructor(props: any) {
    super(props)

    this.deleteProperty = this.deleteProperty.bind(this)
    this.handleDeleteProperty = this.handleDeleteProperty.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleAddTenant = this.handleAddTenant.bind(this)
    this.getNewTenant = this.getNewTenant.bind(this)
    this.fetchData = this.fetchData.bind(this)

    this.userId = this.props.navigation.getParam('userId', '-1')
    this.propertyId =  this.props.navigation.getParam('propertyId', 'error')
    this.callbackRefresh = this.props.navigation.getParam('refreshList', null)

    this.state.id = this.propertyId
  }

  componentDidMount() {
    this.fetchData()
  }

  deleteProperty() {
    removeLandlordFromProperty(this.propertyId, this.userId)
      .then((response:any) => {
        if (response.status == 200) {
          this.callbackRefresh()
          this.props.navigation.popToTop()
        } else {
          alert("Request failed. Unable to remove property")
        }
      })
  }
  
  fetchData() {
    getTenantsInProperty(this.state.id).then((users: any)  => {
      this.setState({tenants: users})
      this.forceUpdate()
    })
  }

  getNewTenant(tenant: string) {
    this.setState({newTenant: tenant})
  }

  handleAddTenant() {
    addTenantToPropertyByEmail(this.state.id, this.state.newTenant).then((response) => {
      if (response.status != 200) {
        alert("error adding tenant")
      } else {
        this.fetchData()
      }
    })
  }

  handleDeleteProperty() {
    Alert.alert(
      'Confirmation Needed',
      'Are you sure you would like to remove the property from your owned properties?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {text: 'Confirm', onPress: () => this.deleteProperty() },
      ],
      {cancelable: false},
    );
  }

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={Style.full_container}>

        <ButtonlessHeader text="Landlord Controls"></ButtonlessHeader> 

        <TenantList
          tenants={this.state.tenants}
          propertyId={this.state.id}
          fetchData={this.fetchData}>
        </TenantList>

        <TenantAddForm
          handleAddTenant={this.handleAddTenant}
          handleStateChange={this.handleStateChange}>
        </TenantAddForm>
        
        <View style={{width:'95%'}}>
          <Button 
            buttonStyle={{backgroundColor: Colours.light_red}}
            style={{marginBottom:'2%'}}
            title="Remove Property" 
            onPress={ () => { this.handleDeleteProperty() }}/>
          <Button 
            style={{marginBottom:'2%'}}
            type="outline" title="Back" 
            onPress={ () => { this.props.navigation.goBack() } } />   
        </View>
      </View>
    );
  }
}



class TenantList extends React.Component<{tenants: User[], propertyId: string, fetchData: () => void},{}> {

  render() {
    return (
      <FlatList
        data={ this.props.tenants }
        style={{
          alignSelf: "stretch",
        }}
        renderItem={({item}) => <TenantListItem user={ item } propertyId={this.props.propertyId} navigation={this.props.navigation} fetchData={this.props.fetchData}></TenantListItem> }>
      </FlatList>    
    )
  }
}

class TenantAddForm extends React.Component<{ handleAddTenant: () => void, handleStateChange: (name: any, input: any) => void}> {
  render () {
    return (
      <View style={{width:'95%'}}>
        <Input
          returnKeyType="next" placeholder="new tenant email"
          onChangeText={(txt) => this.props.handleStateChange("newTenant", txt)}
          />
        <Button
          buttonStyle={{backgroundColor: Colours.accent_green}}
          style={{marginVertical: '2%'}}
          onPress={this.props.handleAddTenant}
          title="Add New Tenant" />      
      </View> 
    )
  }
}