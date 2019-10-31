import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoginScreen from '../screens/login/LoginScreen'
import SignUpScreen from '../screens/sign-up/SignUpScreen'

import UserNavigator from './UserNavigator'
import PropertyNavigator from './PropertyNavigator'
import MessagesNavigator from './MessagesNavigator';
import PaymentNavigator from './PaymentNavigator';

import { AppColours } from '../styles/AppColours'

const MainTabNav = createBottomTabNavigator(
    {
        Property: PropertyNavigator,
        Payment: PaymentNavigator,
        Messages: MessagesNavigator,
        User: UserNavigator,
    },
    {
        tabBarOptions: {
            activeTintColor: '#36213E',
            activeBackgroundColor: '#B8F3FF',
            inactiveBackgroundColor: AppColours.blue_purple,
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
        headerMode: 'none'
    }
);

const AppContainer = createAppContainer(MainAppStack)

export default AppContainer
