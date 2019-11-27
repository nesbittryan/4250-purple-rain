import React from 'react'
import { View } from 'react-native';
import { Button, SearchBar, Text } from 'react-native-elements';

import { Payment } from '../../common/models/payment';
import { getRelatedUsers, getPaymentsByUserId } from '../../service/APIService';
import PaymentTabView from './components/PaymentTabView';
import { Colours } from '../../res/Colours';
import { AxiosResponse } from 'axios';
import UserContext from '../../context/UserContext';
import ButtonlessHeader from '../../common/components/ButtonlessHeader';
import { Style } from '../../res/Styles';

interface State {
    filterValue: string
    filteredPayedPayments:Payment[]
    filteredRequestedPayments:Payment[]
    payedPayments:Payment[]
    requestedPayments: Payment[]
    userIdList: { id: string, name: string }[]
  }  

export default class HomeScreen extends React.Component {

    readonly state: State = {
        filterValue: '',
        filteredPayedPayments: new Array(),
        filteredRequestedPayments: new Array(),
        requestedPayments: new Array(),
        payedPayments: new Array(),
        userIdList: new Array(),
    }

    userId = ''

    constructor(props:any) {
        super(props)
        this.fetchData = this.fetchData.bind(this)
        this.onFilter = this.onFilter.bind(this)
    }

    componentDidMount() {
        const {user} = this.context;
        console.log("CURRENT USER")
        console.log(user)
        this.userId = user.id;
        this.fetchData()
    }

    fetchData = () => {
        getRelatedUsers(this.userId)
        .then((response: AxiosResponse<any> | undefined) => {
            if (response.status === 200) {
                var users = new Array()

                response.data.forEach((user: any) => {
                    let filtered = users.filter(c => c.id === user.id)
                    if (filtered.length === 0)
                        users.push({id: user.id, name: user.first_name + ' ' + user.last_name })
                })

                getPaymentsByUserId(this.userId)
                .then((response: AxiosResponse<any> | undefined) => {
                    if (response.status === 200) {
                        var requested:Payment[] = new Array()
                        var payed:Payment[] = new Array()

                        response.data.requested_payments.forEach((payment: any) => {
                            let user = users.filter(user => String(user.id).includes(payment.payer) || String(user.id).includes(payment.requester))
                            requested.push(new Payment({
                                id: payment.id,
                                amount: payment.amount,
                                description: payment.description,
                                payer: payment.payer,
                                requester: payment.requester,
                                requested_at: payment.requested_at,
                                paid_at: payment.paid_at,
                                received_at: payment.received_at,
                                status: payment.status,
                                other_name: user[0].name,
                                due_date: payment.due_date
                            }))
                        })

                        response.data.payed_payments.forEach((payment: any) => {
                            let user = users.filter(user => String(user.id).includes(payment.payer) || String(user.id).includes(payment.requester))
                            payed.push(new Payment({
                                id: payment.id,
                                amount: payment.amount,
                                description: payment.description,
                                payer: payment.payer,
                                requester: payment.requester,
                                requested_at: payment.requested_at,
                                paid_at: payment.paid_at,
                                received_at: payment.received_at,
                                status: payment.status,
                                other_name: user[0].name,
                                due_date: payment.due_date
                            })) 
                        })
                        
                        this.setState({ requestedPayments: requested, payedPayments: payed,
                            filteredRequestedPayments: requested, filteredPayedPayments: payed })
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

    onFilter(val: string) {
        this.state.filterValue = val
        let filterBy = val.toLowerCase()
        this.setState({ filteredPayedPayments: this.state.payedPayments.filter(item => 
            String(item.description.toLowerCase()).includes(filterBy) ||
            String(item.other_name.toLowerCase()).includes(filterBy) ||
            String(item.amount).includes(filterBy) ||
            String(item.requested_at.toLowerCase()).includes(filterBy))
        })
        
        this.setState({ filteredRequestedPayments: this.state.requestedPayments.filter(item => 
            String(item.description.toLowerCase()).includes(filterBy) ||
            String(item.other_name.toLowerCase()).includes(filterBy) ||
            String(item.amount).includes(this.state.filterValue) ||
            String(item.requested_at.toLowerCase()).includes(filterBy))
        })
    }

    render() {
        return (
            <View style={Style.full_container}>
                
                <ButtonlessHeader text="Payments"/>

                <SearchBar
                    inputContainerStyle={{backgroundColor: Colours.white}}
                    inputStyle={{color: Colours.accent_green}}
                    containerStyle={{backgroundColor: Colours.light_blue, width:'100%'}}
                    placeholder="Filter payments..."
                    onChangeText={(txt) => this.onFilter(txt) }
                    value={this.state.filterValue}/>
                
                <PaymentTabView
                    userId={this.userId}
                    payedPayments={ this.state.filteredPayedPayments} 
                    requestedPayments={ this.state.filteredRequestedPayments}
                    onCallBack={ () => { this.fetchData() } }></PaymentTabView>   

                <View style={{width:'95%'}}>
                    <Button
                        style={{marginVertical:'2%'}}
                        title="New Payment" 
                        onPress={ () => { this.props.navigation.navigate("New", { userId: this.userId, onGoBack: () => this.fetchData(), connectedUsers: this.state.userIdList })}}></Button>
                </View>
            </View>   
        )
    }
}

HomeScreen.contextType = UserContext;
