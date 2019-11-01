import * as React from 'react'
import { TabView, SceneMap } from 'react-native-tab-view'
import { Payment } from '../../../common/models/payment';
import PaymentList from './PaymentList';

export default class PaymentTabView extends React.Component<{
  userId: string, payedPayments: Payment[], requestedPayments: Payment[], onCallBack: () => void }, {}> {
  
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Paid' },
      { key: 'second', title: 'Requested' },
    ],
  };

  render() {
      return (
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: () => <PaymentList userId={this.props.userId} payments={this.props.payedPayments} onCallBack={this.props.onCallBack}/> ,
            second: () => <PaymentList userId={this.props.userId} payments={this.props.requestedPayments} onCallBack={this.props.onCallBack}/>,
          })}
          onIndexChange={index => this.setState({ index })}
        />
      );
    }
}