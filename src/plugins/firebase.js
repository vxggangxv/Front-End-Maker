import Vue from 'vue'
import * as firebase from 'firebase/app'
import firebaseConfig from '@/firebaseConfig'
// import store from '../store'

// import 'firebase/auth'
// import 'firebase/firestore'
// import 'firebase/firebase-storage'
// import 'firebase/database'

console.log('firebase plusgin loaded')

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics();

// // firebase.firestore().collection('test').add({ test: 'aaa' })
// //   .then(r => console.log(r))
// //   .catch(e => console.error(e))

Vue.prototype.$firebase = firebase

// firebase.auth().onAuthStateChanged((user) => {
//   store.dispatch('getUser', user)
// })
