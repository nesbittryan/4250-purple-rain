import { createStackNavigator } from 'react-navigation-stack'
import { } from 'react-native-elements'

import HomeScreen from '../screens/property/HomeScreen'
import LandlordOptionsScreen from '../screens/property/LandlordOptionsScreen'
import PropertyInfoScreen from '../screens/property/PropertyInfoScreen'
import RegisterPropertyScreen from '../screens/property/RegisterPropertyScreen'
import TenantOptionsScreen from '../screens/property/TenantOptionsScreen'
import ViewPropertyScreen from '../screens/property/ViewPropertyScreen'
import { Colours } from '../res/Colours'
import React from 'react'
import { Text } from 'react-native'


const PropertyNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Register: RegisterPropertyScreen,
        View: ViewPropertyScreen,
        Info: PropertyInfoScreen,
        LandlordOptions: LandlordOptionsScreen,
        TenantOptions: TenantOptionsScreen
    },
    {   
        headerMode:'none',
        initialRouteName: 'Home',
    }
)

export default PropertyNavigator;