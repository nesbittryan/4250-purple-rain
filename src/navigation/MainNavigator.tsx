import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoginScreen from '../screens/login/LoginScreen'
import SignUpScreen from '../screens/sign-up/SignUpScreen'

import UserNavigator from './UserNavigator'
import PropertyNavigator from './PropertyNavigator'

import { AppColours } from '../styles/AppColours'

const MainTabNav = createBottomTabNavigator(
    {
        Property: PropertyNavigator,
        User: UserNavigator,
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
