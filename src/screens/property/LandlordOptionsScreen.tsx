import React from "react";
import { Component } from "react";
import { Button, Input } from 'react-native-elements';
import { Text, View, FlatList, Alert } from "react-native";
import { StyleSheet } from 'react-native';
import { User } from "../../common/models/user";
import { removeLandlordFromProperty, addTenantToPropertyByEmail, getTenantsInProperty } from "../../service/APIService";
import TenantListItem from "../../common/components/TenantListItem";
import { Colours } from "../../res/Colours";

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
    let response = Alert.alert(
      'Confirmation Needed',
      'Are you sure you would like to remove the property from your owned properties?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel',
        },
        {text: 'Confirm', onPress: () => this.deleteProperty()},
      ],
      {cancelable: false},
    );
  }

  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }

  render() {
    return (
      <View style={{backgroundColor:Colours.accent_blue}}>
        <Text style={{ borderBottomWidth:1,textAlign:'center',fontSize:20, color:Colours.accent_green, marginBottom:'3%', marginTop:'12%'}}>Tenants</Text>
        <View style={{ borderTopWidth:1, borderColor:Colours.darker_blue, backgroundColor:Colours.white, width:'100%'}}>
          <View style={{height: '92%', width:'100%'}}>
          
            <TenantList
              tenants={this.state.tenants}
              propertyId={this.state.id}
              fetchData={this.fetchData}>
            </TenantList>

            <TenantAddForm
              handleAddTenant={this.handleAddTenant}
              handleStateChange={this.handleStateChange}>
            </TenantAddForm>
            <Button 
              buttonStyle={{backgroundColor: Colours.accent_green}}
              style={{marginHorizontal: '5%', marginTop:'2%'}}
              title="Remove Property" 
              onPress={ () => { this.handleDeleteProperty() }}/>
            <Button 
              style={{marginHorizontal: '5%', marginTop:'2%'}}
              type="outline" title="Back" 
              onPress={ () => { this.props.navigation.goBack() } } />   
          </View>
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
      <View style={LandLordOptionsStyles.form}>
        <Input 
          style={ LandLordOptionsStyles.input }
          returnKeyType="next"
          placeholder="new tenant email"
          onChangeText={(txt) => this.props.handleStateChange("newTenant", txt)}
          />
        <Button
          style={{marginHorizontal: '4%', marginTop:'2%'}}
          onPress={this.props.handleAddTenant}
          title="Add New Tenant" />      
      </View> 
    )
  }
}

const LandLordOptionsStyles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  form: {
    alignItems: "stretch",
    justifyContent: "center",
    width: "98%",
    alignSelf:"center",
    paddingTop: 30
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
    width: "100%",
    textDecorationLine: "underline"
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