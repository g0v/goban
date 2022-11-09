// Get a RTDB instance
import { initializeApp } from 'firebase/app'
import { ref, getDatabase } from 'firebase/database' 
import { getAuth } from 'firebase/auth'

export const fb = initializeApp(
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

export const auth = getAuth(fb)
export const db = getDatabase(fb)
export const gobansRef = ref(db, 'gobans')
export const chatsRef = ref(db, 'chats')
export const starsRef = ref(db, 'stars')
