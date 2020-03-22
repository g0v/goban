// Get a RTDB instance
import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
  .initializeApp(
    {
      apiKey: 'AIzaSyD9-cYNqpEr_eBIVEnOQ83aSYGj9iktexs',
      authDomain: 'goban-hub.firebaseapp.com',
      databaseURL: 'https://goban-hub.firebaseio.com',
      projectId: 'goban-hub',
      storageBucket: 'goban-hub.appspot.com',
      messagingSenderId: '617915978149',
      appId: '1:617915978149:web:42d4aff6becb2abb54584c'
    }
  )
  .database()

export const gobansRef = db.ref('gobans')
export const chatsRef = db.ref('chats')
