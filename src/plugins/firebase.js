import Vue from 'vue'
import * as firebase from 'firebase/app'
import firebaseConfig from '@/../firebaseConfig'
import store from '@/store'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/firebase-storage'
// import 'firebase/database'

// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
// firebase.analytics();

// console.log('firebase plusgin loaded')

// // firebase.firestore().collection('test').add({ test: 'aaa' })
// //   .then(r => console.log(r))
// //   .catch(e => console.error(e))

Vue.prototype.$firebase = firebase

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    store.state.emailSend = false
    store.state.emailVerified = false
  }
  store.commit('setUser', user)
  store.commit('setFirebaseLoaded')
  console.log(user);
})
