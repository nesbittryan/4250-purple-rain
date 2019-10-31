import React from 'react'
import { View, FlatList } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { MainApp } from '../../styles/Styles'

import { Payment } from '../../common/models/payment';
import { APIService, Response } from '../../service/APIService';
import PaymentListItem from '../../common/components/PaymentListItem';

interface State {
    payedPayments:Payment[]
    requestedPayments: Payment[]
  }  

export default class HomeScreen extends React.Component {

    userId = ''

    readonly state: State = {
        requestedPayments: new Array(),
        payedPayments: new Array(),
    }

    componentDidMount() {

        this.userId = this.props.navigation.dangerouslyGetParent().getParam("user").id
        
        APIService.getPaymentsByUserId(this.userId)
            .then((response: Response) => {
                if (response.code === 200) {
                    var requested:Payment[] = new Array()
                    var payed:Payment[] = new Array()

                    console.log(response)
                    response.data.requested_payments.forEach((payment: any) => {
                        requested.push(new Payment({
                            id: payment.id,
                            amount: payment.amount,
                            description: payment.description,
                            payer: payment.payer,
                            requester: payment.requester,
                            requested_at: payment.requested_at,
                            paid_at: payment.paid_at,
                            received_at: payment.received_at,
            
                        })) 
                    })

                    response.data.payed_payments.forEach((payment: any) => {
                        payed.push(new Payment({
                            id: payment.id,
                            amount: payment.amount,
                            description: payment.description,
                            payer: payment.payer,
                            requester: payment.requester,
                            requested_at: payment.requested_at,
                            paid_at: payment.paid_at,
                            received_at: payment.received_at,
                        }))
                    })
                    this.setState({ requestedPayments: requested, payedPayments: payed })
                }
            })
            .catch((error: any) => {
                alert("Could not complete the request. Please restart the application")
                console.log(error)
            })
    }

    render() {
        return (
            <View style={ MainApp.container}>
                <View style={ MainApp.form }>
                    <Text>Request to you</Text>
                    <FlatList
                        data={ this.state.payedPayments }
                        renderItem={({item}) => <PaymentListItem payment={ item } navigation={ this.props.navigation }></PaymentListItem> }>
                    </FlatList>
                    <Text>Your requests</Text>
                    <FlatList
                        data={ this.state.requestedPayments }
                        renderItem={({item}) => <PaymentListItem payment={ item } navigation={ this.props.navigation }></PaymentListItem> }>
                    </FlatList>
                    <Button 
                        style={ MainApp.button }
                        title="New Payment" 
                        onPress={ () => { this.props.navigation.navigate("New", { userId: this.state.userId })}}></Button>
                </View>
            </View>
        )
    }
}