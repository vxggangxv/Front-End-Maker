import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		drawer: null,
		emailSend: false,
		emailVerified: false,
		firebaseLoaded: false,
		user: null,
		boards: [],
		board: {},
	},
	mutations: {
		SET_DRAWER(state, toggle) {
			state.drawer = toggle;
		},
		SET_EMAIL_SEND(state, toggle) {
			state.emailSend = toggle;
		},
		SET_EMAIL_VERIFIED(state, toggle) {
			state.emailVerified = toggle;
		},
		SET_FIREBASE_LOADED(state, toggle) {
			state.firebaseLoaded = toggle;
		},
		SET_USER(state, user) {
			state.user = user;
		},
		SET_BOARDS(state, boards) {
			state.boards = boards;
		},
		SET_BOARD(state, board) {
			state.board = board;
		},
	},
	actions: {
		async SIGN_IN_WITH_GOOGLE() {
			const provider = new Vue.prototype.$firebase.auth.GoogleAuthProvider();
			Vue.prototype.$firebase.auth().languageCode = 'ko';
			await Vue.prototype.$firebase.auth().signInWithPopup(provider);
			const user = Vue.prototype.$firebase.auth().currentUser;
			await user.updateProfile({ displayName: null });
		},
		async SIGN_IN_WITH_EMAIL_LINK(_, email) {
			var actionCodeSettings = {
				// URL you want to redirect back to. The domain (www.example.com) for this
				// URL must be whitelisted in the Firebase Console.
				// url: "https://front-end-maker.firebaseapp.com",
				// url: 'http://localhost:8080/',
				url: window.location.href,
				// This must be true.
				handleCodeInApp: true,
			};
			await Vue.prototype.$firebase
				.auth()
				.sendSignInLinkToEmail(email, actionCodeSettings);
			await window.localStorage.setItem('emailForSignIn', email);
		},
		CREATE_BOARD(_, { title, content }) {
			Vue.prototype.$firebase
				.firestore()
				.collection('board')
				.add({
					title,
					content,
				});
		},
		DELETE_BOARD(id) {
			Vue.prototype.$firebase
				.firestore()
				.collection('board')
				.doc(id)
				.delete();
		},
		async FETCH_BOARDS({ state }) {
			const snapshot = await Vue.prototype.$firebase
				.firestore()
				.collection('board')
				.get();
			snapshot.forEach(doc => {
				const { title, content } = doc.data();
				state.boards.push({
					title,
					content,
					id: doc.id,
				});
			});
		},
	},
});
