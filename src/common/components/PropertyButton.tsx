import React, { Component } from "react";
import { TouchableHighlight, View, Text } from "react-native";
import { Property } from "../models/Property";

export default class PropertyButton extends Component {

    property: Property

    constructor(props: any) {
        super (props)
        this.property = props.property
    }

    render() {
        return (
            <View>
                <Text>{ this.property.address}</Text>
                <Text>{ this.property.description}</Text>
            </View>
        )
    }
}