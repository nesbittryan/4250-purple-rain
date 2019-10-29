import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from '../screens/payment/HomeScreen'

export const PaymentNavigator = createStackNavigator(
    {
        Home: HomeScreen,
    },
    { 
        initialRouteName: 'Home'
    }
)

export default PaymentNavigator;