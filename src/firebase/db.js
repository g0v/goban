// Get a RTDB instance
import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
  .initializeApp({ databaseURL: 'https://goban-hub.firebaseio.com/' })
  .database()

export const gobansRef = db.ref('gobans')
export const chatsRef = db.ref('chats')
