import firebase from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'




const firebaseConfig = {
    apiKey: "AIzaSyCbLcKAhQWY0zpcWNAsjyRCsQ_fFhwCwgE",
    authDomain: "react-test-be.firebaseapp.com",
    projectId: "react-test-be",
    storageBucket: "react-test-be.appspot.com",
    messagingSenderId: "310018747890",
    appId: "1:310018747890:web:bc44e070dfa71778a08f6b"
  };


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()  

export{
  db,
  firebase
}
