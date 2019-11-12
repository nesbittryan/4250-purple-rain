import * as React from 'react'
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { Payment } from '../../../common/models/payment';
import { markPaymentPayed, markPaymentReceived } from '../../../service/APIService';
import { Colours } from '../../../res/Colours';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont()

export default class PaymentListRow extends React.Component<{ index: number, userId:string, payment:Payment, onCallBack: () => void},{}> {
    
    constructor(props: any) {
        super(props)
        this.handleMarkPayed = this.handleMarkPayed.bind(this)
        this.handleMarkedRecieved = this.handleMarkedRecieved.bind(this)
        this.props.payment.status = this.props.payment.status.toUpperCase()
        if (!String(this.props.payment.amount).includes('.'))
            this.props.payment.amount += '.00'
        if (this.props.payment.amount[this.props.payment.amount.length-1] == '.')
            this.props.payment.amount += '0'
    }

    handleMarkPayed() {
        markPaymentPayed(this.props.payment.id, this.props.userId)
            .then((response: any) => {
                if (response.code != 200) {
                    alert("There was an error in your request")
                }

                this.props.onCallBack();
            })
    }

    handleMarkedRecieved() {
        markPaymentReceived(this.props.payment.id, this.props.userId)
            .then((response: any) => {
                if (response.code != 200) {
                    alert("There was an error in your request")
                }
                this.props.onCallBack();
            })
    }

    render() {
        var button
        if (this.props.payment.payer === this.props.userId)
            button = 
                <Button icon={<Icon name="check" size={15} color={Colours.accent_green} />}
                    disabled={this.props.payment.status != 'REQUESTED'}
                    containerStyle={{margin:'2%', width:'23%'}}
                    style={{flex:1, marginTop:'12%'}}
                    title="Sent" onPress={ () => this.handleMarkPayed() }></Button>
        if (this.props.payment.requester === this.props.userId)
            button = 
                <Button icon={<Icon name="check" size={15} color={Colours.accent_green} />}
                    disabled={this.props.payment.status != 'PAID'}
                    containerStyle={{margin:'2%', width:'23%'}}
                    style={{flex:1, marginTop:'12%'}}
                    title="Recieved" onPress={ () => this.handleMarkedRecieved() }></Button>

        let bgColour = ((this.props.index % 2) === 0) ? Colours.white : Colours.light_blue
        let statusColour = (this.props.payment.status == 'REQUESTED') ? Colours.status_requested : 
            ((this.props.payment.status == 'PAID') ? Colours.status_paid : Colours.status_recieved)

        return (
            <View style={{ alignItems:'center', flexDirection:'row',  alignContent:'center',
                justifyContent:'space-between', display:'flex', backgroundColor: bgColour}}>
                <View style={{flex:1.4}}>
                    <Text style={{fontSize:14, fontWeight:'500'}}>{this.props.payment.description}</Text>
                    <Text style={{fontSize:14, fontWeight:'300'}}>{this.props.payment.other_name}</Text>
                </View>
                
                <View style={{flex:0.8}}>
                    <Text style={{fontSize:13, textAlign:'center'}}>{this.props.payment.amount}</Text>
                </View>
                
                <View style={{flex:1}}>
                    <Text style={{fontSize:13, textAlign:'right'}}>{this.props.payment.requested_at.slice(0,10)}</Text>
                </View>
                
                <View style={{flex:1}}>
                    <Text style={{fontSize:11, textAlign:'right', color:statusColour}}>{this.props.payment.status}</Text>
                </View>
                
                {button}
            </View>
        )
    }
}