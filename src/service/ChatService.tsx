import firebase from 'firebase'
import { thisExpression } from '@babel/types'
import { resolve } from 'path'

class ChatService {
  uid = ''
  username = ''
  messagesRef = null
  conversationRef = null

  constructor() {
    this.getConversationsId = this.getConversationsId.bind(this)
    firebase.initializeApp({
      apiKey: "AIzaSyArS9sNG2L12Z9-nxitqzXFiFP3lruWyug",
      authDomain: "purplerain-1513a.firebaseapp.com",
      databaseURL: "https://purplerain-1513a.firebaseio.com",
      projectId: "purplerain-1513a",
      storageBucket: "purplerain-1513a.appspot.com",
      messagingSenderId: "529070849960",
      appId: "1:529070849960:web:afebcd864096d73573679d",
      measurementId: "G-DJV3SFR0ND"
    })
  }

  setUid(value) {
    this.uid = value
  }

  getUid() {
    return this.uid
  }

  setUserName(value) {
    this.username = value
  }

  getUserName() {
    return this.username
  }

  getConversationsId(uid: string, callback) {
    this.conversationRef = firebase.database().ref('conversations')
    this.conversationRef.off()

    let contacts = []

    const foundUser = (data) => {
      if (data.val()) {
        contacts.push(data)
      }
      callback(contacts)
    }
    this.conversationRef.orderByChild("uid_1").equalTo(1).on("value", foundUser)
    this.conversationRef.orderByChild("uid_2").equalTo(2).on("value", foundUser)
  }

  loadMessages(callback) {
    this.messagesRef = firebase.database().ref('messages')
    this.messagesRef.off()
    const onReceive = (data) => {
      const message = data.val()
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      })
    }
    this.messagesRef.limitToLast(20).on('child_added', onReceive)
  }

  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        convo: {
          user1: "1",
          user2: "2",
          messages: {
            text: message[i].text,
            user: message[i].user,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
          }
        }
      })
    }
  }

  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new ChatService();