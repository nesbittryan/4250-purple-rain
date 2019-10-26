import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import PropertyHomeScreen from './screens/property/PropertyHomeScreen'
import LoginScreen from './screens/login/LoginScreen'
import RegisterPropertyScreen from './screens/property/RegisterPropertyScreen'
import SignUpScreen from './screens/sign-up/SignUpScreen'
import ViewPropertyScreen from './screens/property/ViewPropertyScreen'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ViewUserScreen from './screens/user/ViewUserScreen';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { MainApp } from './styles/Styles';
import { View, Text } from 'react-native';
import { AppColours } from './styles/AppColours'

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
        Tabs: {
            screen: MainTabNav,
            navigationOptions: ({ navigation }) => ({
                headerTitle: "Purple Rain",
                headerLeft: (
                <TouchableHighlight style={ MainApp.button } onPress={ () => { navigation.popToTop(); } } underlayColor="white">
                    <View>
                        <Text>Sign Out</Text>
                    </View>
                </TouchableHighlight>
                )
            }),
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                headerTitle: 'Log In'
            },
        },
        SignUp: {
            screen: SignUpScreen
        },
    },
    {
        initialRouteName: 'Login',
    }
);

const AppContainer = createAppContainer(MainAppStack)

export default AppContainer 
