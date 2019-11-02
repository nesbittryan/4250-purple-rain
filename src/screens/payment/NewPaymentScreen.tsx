import React from 'react'
import { View, Picker, PickerItem, Alert } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import { MainApp } from '../../res/Styles'
import { APIService } from '../../service/APIService';
import NotificationService from '../../service/NotificationService';
import { Switch } from 'react-native-gesture-handler';

interface State {
    amount: string
    connectedUsers: { id: string, name: string }[]
    createNotifications:boolean
    dueDate: Date
    description: string
    isSelfPaying: boolean
    selectedUserId: string
    userId: string
}

export default class NewPaymentScreen extends React.Component {

    readonly state: State = {
        amount: '',
        connectedUsers: new Array(),
        createNotifications: true,
        dueDate: new Date(Date.now()),
        description: '',
        isSelfPaying: true,
        selectedUserId: '',
        userId: '',
    }

    notifService: NotificationService

    constructor(props: any) {
        super(props)
        this.handleSendPayment = this.handleSendPayment.bind(this)
        this.notifService = new NotificationService(this.onNotif.bind(this))
    }

    onNotif(notif: any) {
        Alert.alert(notif.title, notif.message);
        console.log(notif)
        //this.notifService.schedulePaymentNotification(10, notif.data.payment)
    }

    componentDidMount() {
        this.setState({ userId: this.props.navigation.state.params.userId })
        this.state.connectedUsers = this.props.navigation.state.params.connectedUsers
        this.setState({ connectedUsers: this.props.navigation.state.params.connectedUsers })
        this.setState({ selectedUserId: this.state.connectedUsers[0].id })
    }

    handleSendPayment() {
        let numRegex = /^[0-9]+(.[0-9]{1,2})?$/
        if (!numRegex.test(this.state.amount)) {
            alert("Please provide a valid dollar amount")
            return
        }
        if (this.state.description.length < 1) {
            alert("Please provide a description")
            return
        }
        APIService.createPayment(
            (this.state.isSelfPaying === true) ? this.state.userId : this.state.selectedUserId,
            (this.state.isSelfPaying === true) ? this.state.selectedUserId : this.state.userId, 
            this.state.description, this.state.amount)
        .then((response) => {
            if (response.code === 200) {
                this.props.navigation.state.params.onGoBack()
                this.props.navigation.goBack()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <View style={ MainApp.container}>
                <View style={ MainApp.form }>
                    <Input
                        label= "Memo"
                        style= { MainApp.input }
                        value={ this.state.description }
                        onChangeText={(txt) => this.setState({ description: txt })}></Input>
                
                    <Input
                        label= "Amount"
                        style= { MainApp.input }
                        keyboardType='numeric'
                        onChangeText={(text)=> this.setState({ amount: text })}
                        value={this.state.amount.toString()}></Input>
                       
                    <Picker
                        style={ MainApp.picker }
                        mode="dropdown"
                        selectedValue={ this.state.isSelfPaying }
                        onValueChange={ (val) => this.setState({ isSelfPaying: val})}>
                        <PickerItem label="Send Money To" value={true}></PickerItem>
                        <PickerItem label="Request Money From" value={false}></PickerItem>
                    </Picker>
                    
                    <Picker
                        style={ MainApp.picker }
                        mode="dropdown"
                        selectedValue={this.state.selectedUserId}
                        onValueChange={ (text) => this.setState({ selectedUserId: text})}>
                            {this.state.connectedUsers.map((item, index) => {
                            return (<Picker.Item label={item.name} value={item.id} key={index}/>) 
                        })}
                    </Picker>
                

                    <View style={ MainApp.horizontal_container }>
                        <Text style={ MainApp.title }>Create reccuring payment</Text>
                        <Switch
                            value={this.state.createNotifications}
                            onValueChange={ (val) => { this.setState({ createNotifications: val})}}></Switch>
                    </View>
                    
                    { this.state.createNotifications &&
                        <DateTimePicker 
                            style={ MainApp.datePicker }
                            value={this.state.dueDate}
                            onChange={ (val) => { this.setState({ dueDate: val })}} />
                    }

                    <View style={ MainApp.horizontal_container}>
                        <Button 
                            style={ MainApp.button }
                            title="Cancel"
                            onPress={ () => { this.props.navigation.goBack() }}></Button>
                        <Button 
                            style={ MainApp.button }
                            title="Send"
                            onPress={ () => { this.handleSendPayment() }}></Button>
                    </View>
                </View>
            </View>
        )
    }
}