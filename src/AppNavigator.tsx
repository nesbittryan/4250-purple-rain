import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { TouchableHighlight } from 'react-native-gesture-handler';

import PropertyHomeScreen from './screens/property/PropertyHomeScreen'
import RegisterPropertyScreen from './screens/property/RegisterPropertyScreen'
import ViewPropertyScreen from './screens/property/ViewPropertyScreen'

import LoginScreen from './screens/login/LoginScreen'
import SignUpScreen from './screens/sign-up/SignUpScreen'

import ViewUserScreen from './screens/user/ViewUserScreen';

import { AppColours } from './styles/AppColours'
import { MainApp } from './styles/Styles';

const PropertyNavStack = createStackNavigator(
    {
        Home: PropertyHomeScreen,
        Register: RegisterPropertyScreen,
        View: ViewPropertyScreen,
    },
    { 
        initialRouteName: 'Home'
    }
)

const MainTabNav = createBottomTabNavigator(
    {
        Property: PropertyNavStack,
        User: ViewUserScreen,
    },
    {
        tabBarOptions: {
            activeTintColor: '#36213E',
            activeBackgroundColor: '#B8F3FF',
            inactiveBackgroundColor: AppColours.background,
            showIcon: true,
            labelStyle: {
                fontSize: 20,
                fontWeight: '500',
                alignContent: 'center'
            },
        }
    }
  );

const MainAppStack = createStackNavigator(
    {
        Tabs: MainTabNav,
        Login: LoginScreen,
        SignUp: SignUpScreen,
    },
    {
        initialRouteName: 'Login',
    }
);

const AppContainer = createAppContainer(MainAppStack)

export default AppContainer 
