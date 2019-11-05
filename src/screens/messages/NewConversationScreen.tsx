import React from 'react'
import { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import { Contact } from '../../common/models/contact';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import ChatService from '../../service/ChatService';
import { APIService } from '../../service/APIService';

import { User } from '../../common/models/user';
import { userInfo } from 'os';
import { MainApp } from '../../res/Styles';
import { ListItem } from 'react-native-elements';







export default class ViewConversationScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
    };
  };
  user: User
  relatives: User[]
  constructor(props: any) {
    super(props)
    this.user = this.props.navigation.dangerouslyGetParent().getParam("user")
    this.fetchData = this.fetchData.bind(this)
    this.relatives = new Array
  }
  componentDidMount(){
    this.fetchData()
  }
  fetchData(){
    APIService.getRelatedUsers(this.user.id)
      .then((response: Response) => {
        if (response.code === 200) {
          //console.log(response.data)
          response.data.forEach((user: any) => {
            this.relatives.push(new User({
              email: user.email,
              firstName: user.first_name,
              lastName: user.last_name,
              id: user.id
            }))
          })
        }
        
        //response.data.requested_payments.forEach((payment: any) => {
      }).then(()=> {
        //console.log(this.relatives)
      })
      
  }
  
  componentWillUnmount() {

  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={styles.heading} 
          >Your Contacts</Text>
        <FlatList
          style={ MainApp.flatList }
          data={this.relatives}
          renderItem={({ item }) => (<MessageUserRow user={item}/>)}
        />
      </View>
    )
  }
}

class MessageUserRow extends Component<{user: User},{}> {
  render(){
    return (
      <TouchableOpacity
      >
        <ListItem
          title={this.props.user.firstName + " " + this.props.user.lastName}
          leftAvatar={{rounded: false, source: {uri: 'https://i.imgur.com/oZwRNgx.png'}}}
        />
      </TouchableOpacity>
    )
  }
}

var styles = StyleSheet.create({
  rowContainer: {
    flex:1
  },
  heading: {
    fontSize: 35,
    textAlign: "center"
  }

})
