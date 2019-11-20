import firebase from 'firebase'

class BroadcastService {

  sendBroadcast(userId: any, contactIds: any, message: any) {
    contactIds.forEach((contactId: any) => {
        const conversationUid  = this.buildConversationUid(userId, contactId)
        const messagesRef = this.buildMessageRef(conversationUid)
        this.sendMessage(messagesRef, message)
    })
  }

  buildConversationUid(userId: any, contactId: any) {
    let ids = [userId, contactId]
    ids.sort()
    return ids.join()
  }

  buildMessageRef(conversationUid: any) {
    let messagesPath = conversationUid + '/messages'
    return firebase.database().ref(messagesPath)
  }

  sendMessage(messagesRef: any, message: any) {
    messagesRef.push({
      text: message.text,
      user: message.user,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    })
    if (messagesRef) {
      messagesRef.off();
    }
  }
}

export default new BroadcastService();
