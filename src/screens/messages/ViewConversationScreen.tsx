import React from 'react'
import { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import { Contact } from '../../common/models/contact';
import { View, Text, StyleSheet } from 'react-native';

export default class ViewConversationScreen extends Component {

  contact: Contact

  mean_messages = [
    {
      _id: 2,
      text: "Please pay quickly or face EVICTION",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/180/180/animals',
      },
    },
    {
      _id: 1,
      text: 'Hey you are late on your rent :(',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/180/180/animals',
      },
    },
  ]

  nice_messages = [
    {
      _id: 2,
      text: "You're the bomb.com",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/180/180/animals',
      },
    },
    {
      _id: 1,
      text: 'Hey thanks for doing your dishes',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/180/180/animals',
      },
    },
  ]

  state = {
    messages: []
  }

  constructor(props: any) {
    super(props)
    this.contact = this.props.navigation.getParam('contact', 'error')
    this.state.messages = this.contact.relationship === 'Tennant' ? this.nice_messages : this.mean_messages
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }


  render() {
    return (
      <View style = {{ flex:1 }}>
        <View style={styles.topbox}>
          <Text style={styles.title}>
            {this.contact.name}
          </Text>
          <Text style={styles.subtitle}>
            {this.contact.relationship}
          </Text>
        </View>
        <GiftedChat
          messages={ this.state.messages }
          onSend={ messages => this.onSend(messages) }
          user={{
            _id: 1,
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
