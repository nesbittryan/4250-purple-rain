import React, { Component } from "react";
import { TouchableHighlight, View, Text,Image } from "react-native";
import { Property } from "../models/property";
import { Button } from 'react-native-elements';

export default class PropertyButton extends Component {

  property: Property

  constructor(props: any) {
    super(props)
    this.property = props.property
  }

  render() {
    return (
      <View style={{
          flexDirection:'',
          borderWidth:5,
          borderColor:'transparent',
          width:'100%',
        }}>

        <View style={{ flex:1 }}>
          <Image
            style={{
              width: '100%',
              height: 50,
            }}
            source={require('../../res/img/house1.jpg')}
          />
        </View>
        <View style={{ flex:1 }}>
          <Button
          title="View Property"
          onPress={ () => { this.props.navigation.navigate("View", {
            property: this.property,
          }) }}/>
        </View>
      </View>
    )
  }
}