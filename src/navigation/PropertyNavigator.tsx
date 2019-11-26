import { createStackNavigator } from 'react-navigation-stack'
import { } from 'react-native-elements'

import HomeScreen from '../screens/property/HomeScreen'
import LandlordOptionsScreen from '../screens/property/LandlordOptionsScreen'
import MaintenanceRequestsScreen from '../screens/maintenance/MaintenanceRequestsScreen'
import RegisterPropertyScreen from '../screens/property/RegisterPropertyScreen'
import ViewPropertyScreen from '../screens/property/ViewPropertyScreen'
import ViewMaintenanceRequest from '../screens/maintenance/ViewMaintenanceRequest'
import DocumentsScreen from '../screens/property/DocumentsScreen'

const PropertyNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Register: RegisterPropertyScreen,
        View: ViewPropertyScreen,
        LandlordOptions: LandlordOptionsScreen,
        MaintenanceRequests: MaintenanceRequestsScreen,
        ViewMaintenanceRequest: ViewMaintenanceRequest,
        Documents: DocumentsScreen,
    },
    {   
        headerMode:'none',
        initialRouteName: 'Home',
    }
)

export default PropertyNavigator;