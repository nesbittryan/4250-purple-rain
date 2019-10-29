import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from '../screens/property/HomeScreen'
import RegisterPropertyScreen from '../screens/property/RegisterPropertyScreen'
import ViewPropertyScreen from '../screens/property/ViewPropertyScreen'

export const PropertyNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Register: RegisterPropertyScreen,
        View: ViewPropertyScreen,
    },
    { 
        initialRouteName: 'Home'
    }
)

export default PropertyNavigator;