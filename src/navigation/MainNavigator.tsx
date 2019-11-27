import React from 'react';
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import OtherIcon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont()
OtherIcon.loadFont()

import LoginScreen from '../screens/login/LoginScreen'
import SignUpScreen from '../screens/sign-up/SignUpScreen'
import AuthLoadingScreen from '../screens/auth-loading/AuthLoadingScreen'

import UserNavigator from './UserNavigator'
import PropertyNavigator from './PropertyNavigator'
import MessagesNavigator from './MessagesNavigator';
import PaymentNavigator from './PaymentNavigator';

import { Colours } from '../res/Colours'

const MainTabNav = createBottomTabNavigator(
    {
        Property: PropertyNavigator,
        Payment: PaymentNavigator,
        Messages: MessagesNavigator,
        User: UserNavigator,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName = "";
            if (routeName === 'Property') {
              iconName = 'home';
            } else if (routeName === 'Payment') {
              iconName = 'payment';
              return <OtherIcon name={iconName} size={45} color={tintColor}/>
            } else if (routeName === 'Messages') {
              iconName = 'comments';
            } else if (routeName === 'User') {
              iconName = 'user';
            }
            return <Icon name={iconName} size={30} color={tintColor} />;
          },
        }),
        tabBarOptions: {
          activeBackgroundColor: Colours.darker_blue,
          activeTintColor: Colours.accent_green,
          inactiveBackgroundColor: Colours.accent_blue,
          inactiveTintColor: Colours.white,
          labelStyle: {
            fontSize: 15,
            fontWeight: '300',
          },
          style: {
            height: (Platform.OS === 'android') ? 60 : 80,
            backgroundColor: Colours.accent_blue,
          }
        }
    }
  );

const MainAppStack = createStackNavigator(
    {
        Loading: AuthLoadingScreen,
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
