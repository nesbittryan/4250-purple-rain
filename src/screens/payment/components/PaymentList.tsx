import * as React from 'react'
import { View, FlatList } from 'react-native'
import { Payment } from '../../../common/models/payment'
import { MainApp } from '../../../res/Styles'
import PaymentListRow from './PaymentListRow'

export default class PaymentList extends React.Component<{
    userId:string, payments:Payment[], onCallBack: () => void },{}> {

    render() {
        return(
            <View>
                <FlatList
                    style={ MainApp.flatList }
                    data={this.props.payments}
                    renderItem={({ item }) => (<PaymentListRow userId={this.props.userId} payment={item} onCallBack={this.props.onCallBack}/>)}
                    keyExtractor={item => item.id}/>
            </View>
        )
    }
}
