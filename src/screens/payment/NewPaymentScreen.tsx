import React from 'react'
import { View, Picker, Alert, } from 'react-native';
import { Button, Input, Text, ButtonGroup, Overlay, Divider } from 'react-native-elements';
import { Switch } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

import { AxiosResponse } from 'axios';
import { createPayment } from '../../service/APIService';
import NotificationService from '../../service/NotificationService'

import { Payment } from '../../common/models/payment';

import { MainApp } from '../../res/Styles'
import { Colours } from '../../res/Colours';

interface State {
    amount: string
    connectedUsers: { id: string, name: string }[]
    createDueDate:boolean
    createReccuringPayment:boolean
    dueDate: Date
    dueTime: Date
    description: string
    isPopupVisible: boolean
    isSelfPaying: boolean
    periodDays: number
    selectedUserId: string
    userId: string
}

export default class NewPaymentScreen extends React.Component {

    notifService = new NotificationService(this.onNotification.bind(this))

    readonly state: State = {
        amount: '',
        connectedUsers: new Array(),
        createDueDate: true,
        createReccuringPayment: false,
        dueDate: new Date(Date.now()),
        dueTime: new Date(Date.now()),
        description: '',
        isPopupVisible: false,
        isSelfPaying: true,
        periodDays: 1,
        selectedUserId: '',
        userId: '',
    }

    constructor(props: any) {
        super(props)
        this.createPayment = this.createPayment.bind(this)
        this.handleButtonPress = this.handleButtonPress.bind(this)
        this.handleUpdateIndexForButtonGroup = this.handleUpdateIndexForButtonGroup.bind(this)
    }

    componentDidMount() {
        this.state.connectedUsers = this.props.navigation.state.params.connectedUsers
        
        this.setState({ userId: this.props.navigation.state.params.userId })
        this.setState({ connectedUsers: this.props.navigation.state.params.connectedUsers })
        this.setState({ selectedUserId: this.state.connectedUsers[0].id })
    }

    createPayment() {
        let dateString = ''

        if (this.state.createDueDate) {
            dateString = this.state.dueDate.getFullYear() + "-" + 
                (this.state.dueDate.getMonth() <9 ? '0' : '' ) + (this.state.dueDate.getMonth() + 1) + "-" + 
                (this.state.dueDate.getDate() <9 ? '0' : '' ) + (this.state.dueDate.getDate() + 1) + "T" + 
                (this.state.dueTime.getUTCHours() <10 ? '0' : '' ) + this.state.dueTime.getUTCHours() + ":" + 
                (this.state.dueTime.getUTCMinutes() <10 ? '0' : '' ) + this.state.dueTime.getUTCMinutes() + ":00.000Z"
        }

        let payment: Payment = new Payment({
            amount: this.state.amount,
            payer: (this.state.isSelfPaying === true) ? this.state.userId : this.state.selectedUserId,
            requester: (this.state.isSelfPaying === true) ? this.state.selectedUserId : this.state.userId,
            id: '',
            requested_at: '',
            paid_at: '',
            received_at: '',
            description: this.state.description,
            status: '',
            other_name: '',
            due_date: dateString,
        })

        createPayment(payment.payer, payment.requester, payment.description, payment.amount, payment.due_date)
        .then((response: AxiosResponse<any> | undefined) => {
            if (response.status === 200) {
                if (this.state.createReccuringPayment)
                    this.notifService.schedulePaymentNotification(new Date(Date.parse(dateString)), this.state.periodDays, payment)   
                this.props.navigation.state.params.onGoBack()
                this.props.navigation.goBack()
            } else {
                alert("Payment was not able to be created")
            }
        })
    }

    handleButtonPress() {
        let numRegex = /^[0-9]+(.[0-9]{1,2})?$/
        if (!numRegex.test(this.state.amount)) {
            alert("Please provide a valid dollar amount")
            return
        }
        else if (this.state.description.length < 1) {
            alert("Please provide a description")
            return
        }

        if (this.state.createDueDate) {
            this.setState({ isPopupVisible: true})
        } else {
            this.createPayment()
        }
    }

    handleUpdateIndexForButtonGroup (selectedIndex: number) {
        let boolVal = selectedIndex == 0
        this.setState({ isSelfPaying: boolVal})
    }

    onNotification(notif: any) {
        Alert.alert(notif.title, notif.message,
        [
            { text: 'OK', onPress: () => {
                let date = new Date(Date.now())
                date.setMinutes(date.getMinutes() + notif.data.periodInDays)
                createPayment(notif.data.payment.payer, notif.data.payment.requester, notif.data.payment.description, notif.data.payment.amount, date.toISOString())
                .then((response: AxiosResponse<any> | undefined) => {
                    if (response.status === 200) {
                        this.notifService.schedulePaymentNotification(date, notif.data.periodInDays, notif.data.payment)
                        this.props.navigation.state.params.onGoBack()
                    }
                })
            }},
            { text: 'Stop Recurring Payment', onPress: () => {} },
        ],
        {cancelable: false},)
    }


    render() {
        return (
            <View style={ MainApp.container}>
                <Overlay isVisible={this.state.isPopupVisible}
                    containerStyle={{display:'flex', alignContent:'stretch', flexDirection:'column'}}>
                    <View>
                        <DateTimePicker
                            onChange={ (event, val) => { this.setState({ dueDate: val })}}
                            value={this.state.dueDate}
                            mode="date"/>
                        <Divider style={{marginHorizontal:'2%',marginVertical:'2%'}}/>
                        <DateTimePicker
                            onChange={ (event, val) => { this.setState({ dueTime: val })}}
                            value={this.state.dueTime}
                            is24Hour={false}
                            mode="time"/>
                        <Divider style={{marginHorizontal:'2%',marginVertical:'2%'}}/>
                        <Picker
                            itemStyle={{height: 130, color: Colours.accent_blue}}
                            mode="dropdown"
                            selectedValue={this.state.periodDays}
                            onValueChange={ (val) => this.setState({ periodDays: val })}>
                            <Picker.Item label="Daily" value={1}></Picker.Item>
                            <Picker.Item label="Weekly" value={7}></Picker.Item>
                            <Picker.Item label="Monthly" value={30}></Picker.Item>
                            <Picker.Item label="Yearly" value={365}></Picker.Item>
                        </Picker>
                        <Divider style={{marginHorizontal:'2%',marginVertical:'2%'}}/>
                        <Button 
                            containerStyle={{marginHorizontal:'2%'}}
                            title='Create' 
                            onPress={ () => this.createPayment() }></Button>
                        <Button 
                            containerStyle={{marginHorizontal:'2%', marginTop:'1%'}}
                            type="outline"
                            title='Cancel' 
                            onPress={ () => this.setState({ isPopupVisible: false})}></Button>
                        
                    </View>
                </Overlay>
                <View style={ MainApp.form }>
                    <ButtonGroup 
                        buttons={ ['Send Money', 'Request Money']}
                        onPress={this.handleUpdateIndexForButtonGroup}
                        selectedIndex={(this.state.isSelfPaying) ? 0 : 1}
                    />
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

                    <View>
                        <Picker
                            itemStyle={{height: 120, color: Colours.accent_blue}}
                            mode="dropdown"
                            selectedValue={this.state.selectedUserId}
                            onValueChange={ (text) => this.setState({ selectedUserId: text})}>
                                {this.state.connectedUsers.map((item, index) => {
                                return (<Picker.Item label={item.name} value={item.id} key={index}/>) 
                            })}
                        </Picker>
                    </View>
                    
                    <View style={ MainApp.horizontal_container }>
                        <Text style={{ color: Colours.darker_green, fontSize: 24, fontWeight: '400'}}>Add a Due Date</Text>
                        <Switch
                            value={this.state.createDueDate}
                            onValueChange={ (val) => { this.setState({ createDueDate: val})}}></Switch>
                    </View>
                    <View style={ MainApp.horizontal_container }>
                        <Text style={{ color: Colours.darker_green, fontSize: 24, fontWeight: '400'}}>Create Reccuring Payment</Text>
                        <Switch
                            disabled={!this.state.createDueDate}
                            value={this.state.createReccuringPayment}
                            onValueChange={ (val) => { this.setState({ createReccuringPayment: val})}}></Switch>
                    </View>
                    
                    <View>
                        <Button
                            style={{margin: '0.5%', marginTop: '1%'}}
                            title={ (this.state.createDueDate) ? "Select Due Date" : "Create Payment" }
                            onPress={ () => { this.handleButtonPress() }}></Button>
                        <Button
                            style={{margin: '0.5%', marginTop: '1%'}}
                            type="outline"
                            title="Cancel"
                            onPress={ () => { this.props.navigation.goBack() }}></Button>
                    </View>
                </View>
            </View>
        )
    }
}