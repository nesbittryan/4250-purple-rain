import * as React from 'react'
import { View, FlatList } from 'react-native'
import { Payment } from '../../../common/models/payment'
import PaymentListRow from './PaymentListRow'
import { Text, Divider } from 'react-native-elements'
import { Colours } from '../../../res/Colours'

export default class PaymentList extends React.Component<{
    userId:string, payments:Payment[], onCallBack: () => void },{}> {

    render() {

        this.props.payments.sort((a, b) => b.requested_at.localeCompare(a.requested_at))
        return(
            <View>
                <FlatList
                    style={{height:'100%', width:'100%'}}
                    data={this.props.payments}
                    renderItem={({ item, index }) => (<PaymentListRow index={index} userId={this.props.userId} payment={item} onCallBack={this.props.onCallBack}/>)}
                    keyExtractor={item => item.id}/>
            </View>
        )
    }
}
