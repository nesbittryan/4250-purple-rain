import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from '../screens/payment/HomeScreen'
import NewPaymentScreen from '../screens/payment/NewPaymentScreen'

export const PaymentNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        New: NewPaymentScreen
    },
    { 
        initialRouteName: 'Home',
        headerMode: 'none',
    }
)

export default PaymentNavigator;