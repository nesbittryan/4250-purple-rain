import React from 'react'
import { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Contact } from '../../common/models/contact';
import { FlatList } from 'react-native-gesture-handler';
import { APIService } from '../../service/APIService';
import { Colours } from '../../res/Colours';


export default class ViewMessagesScreen extends Component {

  contacts: Contact[] = new Array()

  constructor(props:  any) {
    super(props)
  }

  readonly state = {
    refresh: true
  }

  componentDidMount() {
    let user = this.props.navigation.dangerouslyGetParent().getParam("user")

    APIService.getRelatedUsers(user.id)
      .then((response: Response) => {
        if (response.code === 200) {
          console.log(response.data)
          response.data.forEach((user: any) => {
            this.contacts.push(new Contact({
              name: user.first_name + ' ' + user.last_name,
              id: user.id.toString(),
              relationship: user.relation,
            }))
          })
        }
      }).then(() => {
        console.log(this.contacts)
        this.setState({ refresh: !this.state.refresh})
      })
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.contacts}
          extraData={this.state.refresh}
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
