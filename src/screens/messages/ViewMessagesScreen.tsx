import React from 'react'
import { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Contact } from '../../common/models/contact';
import { FlatList } from 'react-native-gesture-handler';


export default class ViewMessagesScreen extends Component {

  contacts:Contact[] = new Array()

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
        <View style={styles.topbox}>
          <Text style={styles.title}>
            Messages
          </Text>
        </View>
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
                leftAvatar={{source: require("../../res/img/house4.jpg")}}
              />
            </TouchableOpacity>
          }
          keyExtractor={item=>item.id}
        />
      </View>
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
    marginTop: 10,
    marginBottom:10,
    fontSize: 22,
  }
})