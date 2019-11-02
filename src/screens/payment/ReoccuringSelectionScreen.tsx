import React from "react";
import { View, Picker } from "react-native";
import { Text, Button } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';

import { APIService } from "../../service/APIService";

import { MainApp } from "../../res/Styles";
import { Colours } from "../../res/Colours";

interface State {
    dueDate: Date
    schedule: number
}

export default class ReoccuringSelectionScreen extends React.Component {
    
    readonly state: State = {
        dueDate: new Date(Date.now()),
        schedule: 1
    }

    handleSendPayment() {

        let payment = this.props.navigation.state.params.payment
        console.log(payment)
        console.log(this.state.dueDate)
        console.log(this.state.schedule)
        APIService.createPayment(payment.payer, payment.requester, payment.description, payment.amount)
        .then((response) => {
            if (response.code === 200) {
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
                            <Picker.Item label="Weekly" value={2}></Picker.Item>
                            <Picker.Item label="Monthly" value={3}></Picker.Item>
                            <Picker.Item label="Yearly" value={4}></Picker.Item>
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