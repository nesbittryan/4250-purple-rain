import React from "react";
import { Component } from "react";
import { Button, Input } from 'react-native-elements';
import { View, ImageBackground, AsyncStorage } from "react-native";
import { MainApp } from '../../styles/Styles';
import { StyleSheet } from 'react-native';
import { Property } from "../../common/models/property";
import { bool } from "prop-types";
import { User } from "../../common/models/user";
import { APIService } from '../../service/APIService';


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
  property: Property

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
    };
  };

  constructor(props: any) {
    super(props)

    this.handleStateChange = this.handleStateChange.bind(this)
    this.property =  this.props.navigation.getParam('property', 'error')
    this.props.navigation.setParams({ title: this.property.address })
    this.state.address = this.property.address
    this.state.description = this.property.description
    this.state.id = this.property.id

  }
  componentDidMount(){
    AsyncStorage.getItem("user")
      .then((response: any) => {
        this.user = JSON.parse(response)

      }).then(() => {
        APIService.isLandlordByPropertyId( this.user.id,this.property.id).then((isLandlord: boolean)  => {
          this.setState({
            isLandlord: isLandlord
          })
        })
      })
  }
  handleStateChange(name: string, input: string) {
    this.setState(() => ({ [name]: input }));
  }
  handleOptionsPress(){
    //this.props.navigation.navigate(PropertyInfoScreen)
  }

  render() {
    return (
      <View style={MainApp.container}>
        <View style={ViewPropertyStyles.form}>
          <View style={ViewPropertyStyles.imageContainer}>
            <ImageBackground source={require('../../res/img/house1.jpg')} style={ViewPropertyStyles.imageHeader}>

            </ImageBackground>
          </View>
          <View style={ViewPropertyStyles.options}>
            {this.state.isLandlord && <Button
              style={ViewPropertyStyles.optionButtons}
              title="Landlord Options"
              onPress={ () => { this.props.navigation.navigate("LandlordOptions", {
                property: this.property,
              }) }}
            />}

            <Button
              style={ViewPropertyStyles.optionButtons}
              title="Tenant Options"
              onPress={ () => { this.props.navigation.navigate("TenantOptions", {
                property: this.property,
              }) }}
            />
            <Button
              style={ViewPropertyStyles.optionButtons}
              title="Messages Options"
            />
            <Button
              style={ViewPropertyStyles.optionButtons}
              title="Payments"
              onPress={ () => { this.props.navigation.navigate("Payment", { 
                property: this.property,
              }) }}
            />
            <Button
              style={ViewPropertyStyles.optionButtons}
              title="Property Info"
              onPress={ () => { this.props.navigation.navigate("Info", {
                property: this.property,
              }) }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const ViewPropertyStyles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    flex: 1,
    justifyContent: "flex-start",
    width: "95%",
  },
  imageHeader: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    alignItems: "flex-start"
  },
  imageContainer: {
    maxHeight: 200,
  },
  options: {

  },
  optionButtons: {
    marginBottom: 20,
  }
})