import React from 'react'
import { View, Picker, PickerItem } from 'react-native';
import { Button, Input, Text, ButtonGroup } from 'react-native-elements';

import { MainApp } from '../../styles/Styles'
import { APIService } from '../../service/APIService';

interface State {
    amount: string
    description: string
    isSelfPaying: boolean
    selectedUserId: string
    connectedUsers: { id: string, name: string }[]
    userId: string
}
export default class NewPaymentScreen extends React.Component {

    readonly state: State = {
        amount: '',
        description: '',
        isSelfPaying: true,
        selectedUserId: '',
        connectedUsers: new Array(),
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
        APIService.createPayment({
            amount: this.state.amount,
            description: this.state.description,
            payer: (this.state.isSelfPaying === true) ? this.state.userId : this.state.selectedUserId,
            requester: (this.state.isSelfPaying === true) ? this.state.selectedUserId : this.state.userId,
        }).then((response) => {
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
                    <Text>Label/Info:</Text>
                    <Input
                        style= { MainApp.input }
                        value={ this.state.description }
                        onChangeText={(txt) => this.setState({ description: txt })}></Input>
                    <Text>Amount</Text>
                    <Input
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
                        <PickerItem label="Request Money From" value={false}></PickerItem></Picker>
                    <Picker
                        style={ MainApp.picker }
                        mode="dropdown"
                        selectedValue={this.state.selectedUserId}
                        onValueChange={ (text) => this.setState({ selectedUserId: text})}>
                            {this.state.connectedUsers.map((item, index) => {
                            return (<Picker.Item label={item.name} value={item.id} key={index}/>) 
                        })}</Picker>
                    <View style={ MainApp.horizontal_container }>
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