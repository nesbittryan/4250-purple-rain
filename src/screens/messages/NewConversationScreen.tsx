import React from 'react'
import { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import { Contact } from '../../common/models/contact';
import { View, Text, StyleSheet } from 'react-native';

import ChatService from '../../service/ChatService';

export default class ViewConversationScreen extends Component {


  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
    };
  };

  constructor(props: any) {
    super(props)
  }

  componentWillUnmount() {

  }


  render() {
    return (
      <View style={{ flex: 1 }}>

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

  title: {
    marginTop: 5,
    fontSize: 22,
  },

  subtitle: {
    fontSize: 12,
    marginBottom: 2,
  },
})
