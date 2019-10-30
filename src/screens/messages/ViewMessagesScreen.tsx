import React from 'react'
import { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Contact } from '../../common/models/contact';
import { FlatList } from 'react-native-gesture-handler';


export default class ViewMessagesScreen extends Component {

  contacts:Contact[] = new Array()

  static navigationOptions = {
    headerTitle: 'Messages',
  };

  constructor(props:  any) {
    super(props)

    this.contacts = this.dummyApiGetContacts()
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
        <FlatList
          data={this.contacts}
          renderItem={({item}) =>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Conversation", {
                contact: item,
              })}
            >
              <ListItem
                title={item.name}
                subtitle={item.relationship}
                leftAvatar={{source: {uri: 'https://placeimg.com/180/180/animals'}}}
              />
            </TouchableOpacity>
          }
          keyExtractor={item=>item.id}
        />
      </View>
    )
  }
}
