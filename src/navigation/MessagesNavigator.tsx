import { createStackNavigator } from 'react-navigation-stack'

import ViewMessagesScreen from '../screens/messages/ViewMessagesScreen';
import ViewConversationScreen from '../screens/messages/ViewConversationScreen';
import { Colours } from '../res/Colours';

export const MessagesNavigator = createStackNavigator(
  {
    Messages: ViewMessagesScreen,
    Conversation: ViewConversationScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle:{
        backgroundColor:Colours.accent_blue,
      },
      headerTintColor: Colours.accent_green,
      headerTitleStyle: {
        textAlign:'center',fontSize:20, color:Colours.accent_green, fontWeight:'400'
      },
      title: 'Messages',
    },
    initialRouteName: 'Messages',
  },
)

export default MessagesNavigator;