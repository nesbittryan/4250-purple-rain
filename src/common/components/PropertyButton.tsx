import React, { Component } from "react";
import { TouchableHighlight, View, Text } from "react-native";
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
        flexDirection:'row',
        borderWidth:5,
        borderColor:'transparent',
        }}>
        <View style={{ flex:0.5 }}>
          <Text>{ this.property.address}</Text>
          <Text>{ this.property.description}</Text>
        </View>
          <View style={{ flex:0.5 }}>
          <Button
          title="View Property"
          onPress={ () => { this.props.navigation.navigate("ViewProperty", {
            property: this.property,
          }) }}/>
        </View>
      </View>
    )
  }
}