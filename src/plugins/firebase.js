import Vue from 'vue';
import * as firebase from 'firebase/app';
import firebaseConfig from '@/../firebaseConfig';
import store from '@/store';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/firebase-storage';
// import 'firebase/database'

// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// console.log('firebase plusgin loaded')

// // firebase.firestore().collection('test').add({ test: 'aaa' })
// //   .then(r => console.log(r))
// //   .catch(e => console.error(e))

Vue.prototype.$firebase = firebase;

firebase.auth().onAuthStateChanged(async user => {
	if (!user) {
		store.commit('SET_IS_EMAIL_SEND', false);
		store.commit('SET_IS_EMAIL_VERIFIED', false);
	}
	if (user) {
		// const increment = Vue.prototype.$firebase.firestore.FieldValue.increment(1);
		// await Vue.prototype.$firebase
		// 	.firestore()
		// 	.collection('user')
		// 	.doc(user.uid)
		// 	.update({
		// 		visitedAt: new Date(),
		// 		visitCount: increment,
		// 	});
	}
  // store.commit('SET_USER', user);
  store.dispatch('FETCH_USER', user.uid)
	store.commit('SET_IS_FIREBASE_LOADED', true);

	// console.log(user);
});
