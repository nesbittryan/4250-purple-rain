import React from 'react'
import { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Contact } from '../../common/models/contact';
import { FlatList } from 'react-native-gesture-handler';
import ChatService from '../../service/ChatService';
import { User } from '../../common/models/user';


interface State {
  empty: string,
}
export default class ViewMessagesScreen extends Component {
  readonly state: State = {
    empty: " "
  }

  contacts: Contact[] = new Array()
  user: User

  static navigationOptions = {
    headerTitle: 'Messages',
  };

  constructor(props: any) {
    super(props)

    this.user = this.props.navigation.dangerouslyGetParent().getParam("user")

    ChatService.setUid(this.user.id)
    ChatService.setUserName(this.user.email)

    ChatService.getConversationsId(this.user.id, (value) => {
      this.contacts = value
    })
  }

  dummyApiGetContacts() {
    let contacts = [
      {
        name: 'Billy',
        relationship: 'Tennant',
        id: '22',
      },
      {
        name: 'Bobby',
        relationship: 'Tennant',
        id: '33',
      },
      {
        name: 'Kevin',
        relationship: 'Landlord',
        id: '44',
      },
      {
        name: 'Brody',
        relationship: 'Tennant',
        id: '55',
      },

    ];
    return contacts
  }

  goToConversation() {
    alert('hello')
  }

  render() {
    return (
      <View>
        <CreateConvo
          navigation={this.props.navigation}
        />


        <FlatList
          data={this.contacts}
          renderItem={({ item }) =>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Conversation", {
                contact: item,
              })}
            >
              <ListItem
                title={item.name}
                subtitle={item.relationship}
                leftAvatar={{ source: { uri: 'https://placeimg.com/180/180/animals' } }}
              />
            </TouchableOpacity>
          }
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

class CreateConvo extends Component<{ navigation: Navigator }, {}> {
  render() {
    return (
      <Button
        title="new convo"
        onPress={() => this.props.navigation.navigate("NewConversation")}
      />

    )

  }
}