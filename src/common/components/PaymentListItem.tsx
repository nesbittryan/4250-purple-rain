import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from 'react-native-elements';

import { Payment } from "../models/payment";

export default class PaymentListItem extends Component {
    payment:Payment

    constructor(props: any) {
        super(props)
        this.payment = props.payment
    }

    render() {
        
        return (
        <View>
            <View>
                <Text>{this.payment.description}</Text>
                <Text>{this.payment.amount}</Text>
            </View>
        </View>
        )
  }
}