import React from "react";
import { View, Picker, Alert } from "react-native";
import { Text, Button } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';

import { createPayment, Response } from "../../service/APIService";
import NotificationService from '../../service/NotificationService'

import { MainApp } from "../../res/Styles";
import { Colours } from "../../res/Colours";

interface State {
    dueDate: Date
    schedule: number
}

export default class ReoccuringSelectionScreen extends React.Component {
    
    notifService = new NotificationService(this.onNotification.bind(this))

    readonly state: State = {
        dueDate: new Date(Date.now()),
        schedule: 1
    }

    onNotification(notif: any) {
        Alert.alert(notif.title, notif.message,
            [
                {text: 'Ok', onPress: () => {
                    let date = new Date(Date.now())
                    createPayment(notif.data.payment.payer, notif.data.payment.requester, notif.data.payment.description, notif.data.payment.amount,date.toISOString())
                    .then((response: Response) => {
                        if (response.status === 200) {
                            this.notifService.schedulePaymentNotification(date, notif.data.periodInDays, notif.data.payment)
                            this.props.navigation.state.params.onGoBack()
                        }
                    })
                }},
                {text: 'Cancel Payments', onPress: () => {}},
              ],
              {cancelable: false},)
    }

    handleSendPayment() {
        let payment = this.props.navigation.state.params.payment
        createPayment(payment.payer, payment.requester, payment.description, payment.amount, this.state.dueDate.toISOString())
        .then((response) => {
            if (response.status === 200) {
                this.notifService.schedulePaymentNotification(new Date(Date.now()), this.state.schedule, payment)
                this.props.navigation.state.params.onGoBack()
                this.props.navigation.popToTop()
            } else {
                alert("Payment was not able to be created")
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return(
            <View style={ MainApp.container}>
                <View style={ MainApp.form }>
                    <View>
                        <Text style={[MainApp.title, {fontStyle: 'italic'}]}>Please select the due date</Text>
                        <DateTimePicker
                            value={this.state.dueDate}
                            onChange={ (event, val) => { this.setState({ dueDate: val })}} /> 
                    </View>

                    <View>
                        <Text style={[MainApp.title, {fontStyle: 'italic'}]}>Select the schedule</Text>
                        <Picker
                            itemStyle={{height: 200, color: Colours.accent_blue}}
                            mode="dropdown"
                            selectedValue={this.state.schedule}
                            onValueChange={ (val) => this.setState({ schedule: val})}>
                            <Picker.Item label="Daily" value={1}></Picker.Item>
                            <Picker.Item label="Weekly" value={7}></Picker.Item>
                            <Picker.Item label="Monthly" value={30}></Picker.Item>
                            <Picker.Item label="Yearly" value={365}></Picker.Item>
                        </Picker>
                    </View>
                    
                    <View>
                        <Button 
                            style={{margin: '0.5%', marginTop: '1%'}}
                            title="Create"
                            onPress={ () => { this.handleSendPayment()}}></Button>
                        <Button
                            style={{margin: '0.5%', marginTop: '1%'}}
                            type="outline"
                            title="Back"
                            onPress={ () => { this.props.navigation.goBack() }}></Button>
                    </View>
                </View>
            </View>
    )}
}