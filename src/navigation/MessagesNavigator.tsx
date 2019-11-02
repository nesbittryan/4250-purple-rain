import { createStackNavigator } from 'react-navigation-stack'

import ViewMessagesScreen from '../screens/messages/ViewMessagesScreen';
import ViewConversationScreen from '../screens/messages/ViewConversationScreen';

export const MessagesNavigator = createStackNavigator(
  {
    Messages: ViewMessagesScreen,
    Conversation: ViewConversationScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Messages',
  },
)

export default MessagesNavigator;