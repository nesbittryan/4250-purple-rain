
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './screens/home/HomeScreen'
import LoginScreen from './screens/login/LoginScreen'
import RegisterPropertyScreen from './screens/property/RegisterPropertyScreen'


const AppNavigator = createStackNavigator(
    {
    Home: { screen: HomeScreen, },
    Login: { screen: LoginScreen, },
    RegisterProperty: { screen: RegisterPropertyScreen, }
    },
    {
        initialRouteName: 'Login',
    }
);

export default createAppContainer(AppNavigator)