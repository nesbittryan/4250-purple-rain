import React from 'react'
import { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import { Contact } from '../../common/models/contact';
import { View, Text, StyleSheet } from 'react-native';

import ChatService from '../../service/ChatService';

export default class ViewConversationScreen extends Component {

  contact: Contact

  state = {
    messages: []
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
    };
  };

  constructor(props: any) {
    super(props)

    this.contact = this.props.navigation.getParam('contact', 'error')
    this.props.navigation.setParams({ title: this.contact.name })
    let user = this.props.navigation.dangerouslyGetParent().getParam("user")

    ChatService.setUid(user.id)
    ChatService.setUserName(
      user.firstName + user.lastName
    )
    ChatService.setConversationUid(user.id, this.contact.id)

    ChatService.loadMessages((message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        }
      })
    })
  }

  componentWillUnmount() {
    ChatService.closeChat()
  }


  render() {
    return (
      <View style = {{ flex:1 }}>
        <GiftedChat
          messages={ this.state.messages }
          onSend={(message) =>
            ChatService.sendMessage(message)
          }
          user={{
            _id: ChatService.getUid(),
            name: ChatService.getUserName(),
          }}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  topbox: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
  },

  title:{
    marginTop: 5,
    fontSize: 22,
  },

  subtitle: {
    fontSize: 12,
    marginBottom: 2,
  },
})
