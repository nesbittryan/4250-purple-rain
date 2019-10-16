
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from './screens/home/HomeScreen'
import LoginScreen from './screens/login/LoginScreen'
import RegisterPropertyScreen from './screens/property/RegisterPropertyScreen'
import SignUpScreen from './screens/sign-up/SignUpScreen'

const AppStack = createStackNavigator(
    {
        SignUp: {
            screen: SignUpScreen
        },
        Home: {
            screen: HomeScreen,
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
    },
    {
        initialRouteName: 'Login',
    }
);

export default createAppContainer(AppStack)