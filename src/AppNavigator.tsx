import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from './screens/home/HomeScreen'
import LoginScreen from './screens/login/LoginScreen'
import RegisterPropertyScreen from './screens/property/RegisterPropertyScreen'
import SignUpScreen from './screens/sign-up/SignUpScreen'
import ViewPropertyScreen from './screens/property/ViewPropertyScreen'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
const TabNavigator = createBottomTabNavigator({
    Home: HomeScreen,
    Profile: SignUpScreen,
});
/*const TabNavigator = createMaterialTopTabNavigator({
    Home: HomeScreen,
    Signup: SignUpScreen,
})*/
const AppStack = createStackNavigator(
    {
        SignUp: {
            screen: SignUpScreen
        },
        Tabs: {
            screen: TabNavigator,
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                headerTitle: 'Log In'
            },
        },
        RegisterProperty: {
            screen: RegisterPropertyScreen,
        },
        ViewProperty: {
            screen: ViewPropertyScreen,
        }
    },
    {
        initialRouteName: 'Login',
    }
);

const AppTest = createAppContainer(AppStack)
export default AppTest 


//export default createAppContainer(AppStack)