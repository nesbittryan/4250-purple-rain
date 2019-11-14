import React from 'react'
import { View, Picker, PickerItem, Alert } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';

import { MainApp } from '../../res/Styles'
import { createPayment } from '../../service/APIService';
import { Switch } from 'react-native-gesture-handler';
import { Colours } from '../../res/Colours';
import { Payment } from '../../common/models/payment';

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

    constructor(props: any) {
        super(props)
        this.handleSendPayment = this.handleSendPayment.bind(this)
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
        let p = new Payment({
            amount: this.state.amount,
            description: this.state.description,
            payer: (this.state.isSelfPaying === true) ? this.state.userId : this.state.selectedUserId,
            requester: (this.state.isSelfPaying === true) ? this.state.selectedUserId : this.state.userId, 
            other_name: this.state.connectedUsers[this.state.connectedUsers.findIndex(u => u.id === this.state.selectedUserId)].name,
            paid_at: '',
            received_at: '',
            requested_at: '', 
            status: '',
            id: '',
            due_date: ''
        })

        if (this.state.createNotifications === true) {
            this.props.navigation.navigate("Reoccuring", { 
                onGoBack: () => this.props.navigation.state.params.onGoBack(),
                payment: p, 
            })
        } else {
            createPayment(p.payer, p.requester, p.description, p.amount, '')
            .then((response) => {
                if (response.status === 200) {
                    this.props.navigation.state.params.onGoBack()
                    this.props.navigation.goBack()
                } else {
                    alert("Payment was not able to be created")
                }
            }).catch((error) => {
                console.log(error)
            })
        }
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

                    <View>
                        <Picker
                            itemStyle={{height: 120, color: Colours.accent_blue}}
                            mode="dropdown"
                            selectedValue={ this.state.isSelfPaying }
                            onValueChange={ (val) => this.setState({ isSelfPaying: val})}>
                            <PickerItem label="Send Money To" value={true}></PickerItem>
                            <PickerItem label="Request Money From" value={false}></PickerItem>
                        </Picker>
                        
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
                        <Text style={ MainApp.title }>Create reoccuring payment</Text>
                        <Switch
                            value={this.state.createNotifications}
                            onValueChange={ (val) => { this.setState({ createNotifications: val})}}></Switch>
                        
                    </View>
                    
                    <View>
                        <Button 
                            style={{margin: '0.5%', marginTop: '1%'}}
                            title={ (this.state.createNotifications) ? "Continue" : "Create" }
                            onPress={ () => { this.handleSendPayment() }}></Button>
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