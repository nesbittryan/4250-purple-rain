import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from '../screens/property/HomeScreen'
import LandlordOptionsScreen from '../screens/property/LandlordOptionsScreen'
import PropertyInfoScreen from '../screens/property/PropertyInfoScreen'
import RegisterPropertyScreen from '../screens/property/RegisterPropertyScreen'
import TenantOptionsScreen from '../screens/property/TenantOptionsScreen'
import ViewPropertyScreen from '../screens/property/ViewPropertyScreen'
import PaymentNavigator from './PaymentNavigator'

const PropertyNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Register: RegisterPropertyScreen,
        View: ViewPropertyScreen,
        Info: PropertyInfoScreen,
        LandlordOptions: LandlordOptionsScreen,
        Payment: PaymentNavigator,
        TenantOptions: TenantOptionsScreen
    },
    { 
        initialRouteName: 'Home',
    }
)

export default PropertyNavigator;