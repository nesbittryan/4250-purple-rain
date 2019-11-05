import { createStackNavigator } from 'react-navigation-stack'

import ViewMessagesScreen from '../screens/messages/ViewMessagesScreen'
import ViewConversationScreen from '../screens/messages/ViewConversationScreen'
import NewConversationScreen from '../screens/messages/NewConversationScreen'

export const MessagesNavigator = createStackNavigator(
  {
    Messages: ViewMessagesScreen,
    Conversation: ViewConversationScreen,
    NewConversation: NewConversationScreen
  },
  {
    initialRouteName: 'Messages',
  },
)

export default MessagesNavigator;