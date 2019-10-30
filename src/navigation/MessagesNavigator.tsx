import { createStackNavigator } from 'react-navigation-stack'

import ViewMessagesScreen from '../screens/messages/ViewMessagesScreen';

export const MessagesNavigator = createStackNavigator(
  {
    Messages: ViewMessagesScreen,
  },
  {
    initialRouteName: 'Messages',
  },
)

export default MessagesNavigator;