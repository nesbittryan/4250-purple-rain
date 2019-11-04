import * as React from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { Payment } from '../../../common/models/payment';
import PaymentList from './PaymentList';
import { Colours } from '../../../res/Colours';

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
          renderTabBar={ props =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: Colours.accent_green }}
              style={{ backgroundColor: Colours.accent_blue }}/>
          }
          style={{width: '100%', height:'100%', borderBottomColor: Colours.darker_blue, borderBottomWidth:1}}
          navigationState={this.state}
          renderScene={SceneMap({
            first: () => <PaymentList userId={this.props.userId} payments={this.props.payedPayments} onCallBack={this.props.onCallBack}/> ,
            second: () => <PaymentList userId={this.props.userId} payments={this.props.requestedPayments} onCallBack={this.props.onCallBack}/>,
          })}
          onIndexChange={index => this.setState({ index })}/>
      );
    }
}