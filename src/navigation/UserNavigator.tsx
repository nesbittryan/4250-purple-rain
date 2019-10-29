import { createStackNavigator } from 'react-navigation-stack'

import ViewUserScreen from '../screens/user/ViewUserScreen';
import ChangePasswordScreen from '../screens/user/ChangePasswordScreen'

export const UserNavigator = createStackNavigator(
    {
        ChangePassword: ChangePasswordScreen,
        Profile: ViewUserScreen
    },
    {
        initialRouteName: 'Profile'
    }
)

export default UserNavigator;