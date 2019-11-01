import * as React from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { Payment } from '../../../common/models/payment';
import { APIService } from '../../../service/APIService';

export default class PaymentListRow extends React.Component<{userId:string, payment:Payment, onCallBack: () => void},{}> {
    
    constructor(props: any) {
        super(props)
        this.handleMarkPayed = this.handleMarkPayed.bind(this)
        this.handleMarkedRecieved = this.handleMarkedRecieved.bind(this)
    }

    handleMarkPayed() {
        APIService.markPaymentPayed(this.props.payment.id, this.props.userId)
            .then((response) => {
                if (response.code != 200) {
                    alert("There was an error in your request")
                }

                this.props.onCallBack();
            })
    }

    handleMarkedRecieved() {
        APIService.markPaymentReceived(this.props.payment.id, this.props.userId)
            .then((response) => {
                if (response.code != 200) {
                    alert("There was an error in your request")
                }
                this.props.onCallBack();
            })
    }

    render() {
        var button
        if(this.props.payment.status === 'requested') {
            if (this.props.payment.payer === this.props.userId)
                button = <Button title="Mark Payed" onPress={ () => this.handleMarkPayed() }></Button>
        }
        if(this.props.payment.status === 'paid') {
            if (this.props.payment.requester === this.props.userId)
                button = <Button title="Mark Recieved" onPress={ () => this.handleMarkedRecieved() }></Button>
        }

        return (
            <View style={ Payment_Style.view }>
                <Text>{this.props.payment.description}</Text>
                <Text>{this.props.payment.amount}</Text>
                <Text>{this.props.payment.status}</Text>
                <Text>{this.props.payment.other_name}</Text>
                {button}
            </View>
        )
    }
}

const Payment_Style = StyleSheet.create({
    
    subtitle: {

    },
    title: {

    },
    view: {

    },
})