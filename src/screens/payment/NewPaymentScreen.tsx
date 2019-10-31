import React from 'react'
import { View, Picker } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';

import { MainApp } from '../../styles/Styles'
import { APIService } from '../../service/APIService';

interface State {
    amount: string
    connectedUsers: { name: string, id: string }[]
    description: string
    selectedUserId: string
    userId: string
}
export default class NewPaymentScreen extends React.Component {

    readonly state: State = {
        amount: '',
        connectedUsers: new Array(),
        description: '',
        selectedUserId: '',
        userId: '',
    }

    constructor(props: any) {
        super(props)
        this.handleSendPayment = this.handleSendPayment.bind(this)
    }

    componentDidMount() {
        let userId = this.props.navigation.getParam('userId', '-1')
        this.setState({ userId: userId})
        let connectedUsers = [ {id:"1", name: "Ryan" }, { id: "2", name: "Connor" }] // Set this to API call
        this.setState({ connectedUsers: connectedUsers})
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
                        //style={ MainApp.picker }
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