import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from '../screens/payment/HomeScreen'
import NewPaymentScreen from '../screens/payment/NewPaymentScreen'
import ReoccuringSelectionScreen from '../screens/payment/ReoccuringSelectionScreen'

export const PaymentNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        New: NewPaymentScreen,
        Reoccuring: ReoccuringSelectionScreen
    },
    { 
        headerMode: 'none',
        initialRouteName: 'Home',
    }
)

export default PaymentNavigator;