import React from 'react'
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import { MainApp } from '../../styles/Styles'

import { Payment } from '../../common/models/payment';
import { APIService, Response } from '../../service/APIService';
import PaymentTabView from './components/PaymentTabView';

interface State {
    payedPayments:Payment[]
    requestedPayments: Payment[]
    userIdList: { id: string, name: string }[]
  }  

export default class HomeScreen extends React.Component {

    userId = ''

    readonly state: State = {
        requestedPayments: new Array(),
        payedPayments: new Array(),
        userIdList: new Array(),
    }

    constructor(props:any) {
        super(props)
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        this.userId = this.props.navigation.dangerouslyGetParent().getParam("user").id
        this.fetchData()
    }

    fetchData() {
        APIService.getRelatedUsers(this.userId)
        .then((response: Response) => {
            if (response.code === 200) {
                var users = new Array()

                response.data.forEach((user: any) => {
                    users.push({
                        id: user.id,
                        name: user.first_name + ' ' + user.last_name
                    })
                })

                APIService.getPaymentsByUserId(this.userId)
                .then((response: Response) => {
                    if (response.code === 200) {
                        var requested:Payment[] = new Array()
                        var payed:Payment[] = new Array()

                        response.data.requested_payments.forEach((payment: any) => {
                            let user = users.find(user => user.id === payment.payer || user.id === payment.requester)
                            let p = new Payment({
                                id: payment.id,
                                amount: payment.amount,
                                description: payment.description,
                                payer: payment.payer,
                                requester: payment.requester,
                                requested_at: payment.requested_at,
                                paid_at: payment.paid_at,
                                received_at: payment.received_at,
                                status: payment.status,
                            })
                            p.other_name = user.name
                            requested.push(p) 
                        })

                        response.data.payed_payments.forEach((payment: any) => {
                            let user = users.find(user => user.id === payment.payer || user.id === payment.requester)
                            let p = new Payment({
                                id: payment.id,
                                amount: payment.amount,
                                description: payment.description,
                                payer: payment.payer,
                                requester: payment.requester,
                                requested_at: payment.requested_at,
                                paid_at: payment.paid_at,
                                received_at: payment.received_at,
                                status: payment.status,
                            })
                            p.other_name = user.name
                            payed.push(p) 
                        })
                        this.setState({ requestedPayments: requested, payedPayments: payed })
                    }
                })
                .catch((error: any) => {
                    alert("Could not complete the request. Please restart the application")
                    console.log(error)
                })
                
                this.setState({ userIdList: users })
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
                    <PaymentTabView 
                        userId={this.userId}
                        payedPayments={ this.state.payedPayments} 
                        requestedPayments={ this.state.requestedPayments}
                        onCallBack={ () => { this.fetchData() } }></PaymentTabView>
                    <Button 
                        style={ MainApp.button }
                        title="New Payment" 
                        onPress={ () => { this.props.navigation.navigate("New", { userId: this.userId, onGoBack: () => this.fetchData(), connectedUsers: this.state.userIdList })}}></Button>
                </View>
            </View>
        )
    }
}