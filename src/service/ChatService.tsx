import firebase from 'firebase'
import { thisExpression } from '@babel/types'

class ChatService {
  uid = ''
  username = ''
  messagesRef = null
  conversationUid = ''

  constructor() {
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

  setconversationUid(userId, contactId) {
    let ids = [userId, contactId]
    ids.sort()
    this.conversationUid = ids.join()
  }

  loadMessages(callback) {
    let messagesPath = this.conversationUid + '/messages'
    this.messagesRef = firebase.database().ref(messagesPath)
    this.messagesRef.off()
    const onReceive = (data) => {
      const message = data.val()
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user : {
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
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
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
