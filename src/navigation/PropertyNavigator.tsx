import { createStackNavigator } from 'react-navigation-stack'
import { } from 'react-native-elements'

import HomeScreen from '../screens/property/HomeScreen'
import LandlordOptionsScreen from '../screens/property/LandlordOptionsScreen'
import MaintenanceRequestsScreen from '../screens/maintenance/MaintenanceRequestsScreen'
import RegisterPropertyScreen from '../screens/property/RegisterPropertyScreen'
import ViewPropertyScreen from '../screens/property/ViewPropertyScreen'

const PropertyNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Register: RegisterPropertyScreen,
        View: ViewPropertyScreen,
        LandlordOptions: LandlordOptionsScreen,
        MaintenanceRequests: MaintenanceRequestsScreen
    },
    {   
        headerMode:'none',
        initialRouteName: 'Home',
    }
)

export default PropertyNavigator;