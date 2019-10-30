import React from 'react'
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import { MainApp } from '../../styles/Styles'

export default class NewPaymentScreen extends React.Component {

    userId: string = ''

    constructor(props: any) {
        super(props)
        this.userId =  this.props.navigation.getParam('userId', 'error')
    }

    /*
    payment type: [recurring, single]
    payment amount: number greater than zero
    label: a text field describing what it is for
    requester: user id of who is requesting the money
    payer: user id of who is paying the money
    status: status of the payment request [requested, sent, received]
    */
    
    render() {
        return (
            <View style={ MainApp.container}>
                <View style={ MainApp.form }>
                    <View style={ MainApp.horizontal_container }>
                        <Button 
                            style={ MainApp.button }
                            title="Cancel"
                            onPress={ () => { this.props.navigation.goBack() } }></Button>
                        <Button 
                            style={ MainApp.button }
                            title="Create Payment"></Button>
                    </View>
                </View>
            </View>
        )
    }
}