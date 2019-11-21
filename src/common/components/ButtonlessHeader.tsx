import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements"

import { Colours } from "../../res/Colours";

export default class ButtonlessHeader extends Component<{text: string},{}> {

  render() {
    return (
        <View style={{backgroundColor:Colours.accent_blue, alignItems:'center', alignSelf:'stretch'}}>
            <Text style={{color:Colours.accent_green, fontSize:20, marginTop:'12%', marginBottom:'3%'}}>
                {this.props.text}
            </Text>
        </View>
    )
  }
}