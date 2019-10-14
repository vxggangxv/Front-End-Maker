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
		DELETE_BOARD(state, id) {
			state.boards = state.boards.filter(item => item.id !== id);
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
		async CREATE_BOARD(_, { title, content, createdAt, updatedAt, visitedAt }) {
			const docRef = await Vue.prototype.$firebase
				.firestore()
				.collection('board')
				.add({
					title,
					content,
					createdAt,
					updatedAt,
					visitedAt,
				});
			return docRef;
		},
		async FETCH_BOARDS({ commit }) {
			const snapshot = await Vue.prototype.$firebase
				.firestore()
				.collection('board')
				.get();

			// console.log(snapshot);
			const items = [];
			snapshot.forEach(doc => {
				const { title, content, createdAt, updatedAt, visitedAt } = doc.data();
				items.push({
					title,
					content,
					createdAt,
					updatedAt,
					visitedAt,
					id: doc.id,
				});
			});

			commit('SET_BOARDS', items);
		},
		async FETCH_BOARD({ commit }, id) {
			const snapshot = await Vue.prototype.$firebase
				.firestore()
				.collection('board')
				.doc(id)
				.get();

			const item = {};
			const { title, content } = snapshot.data();
			item.title = title;
			item.content = content;

			commit('SET_BOARD', item);
		},
		UPDATE_BOARD(_, { bid, title, content }) {
			Vue.prototype.$firebase
				.firestore()
				.collection('board')
				.doc(bid)
				.set({
					title,
					content,
				});
		},
		DELETE_BOARD({ commit }, id) {
			Vue.prototype.$firebase
				.firestore()
				.collection('board')
				.doc(id)
				.delete();

			commit('DELETE_BOARD', id);
		},
	},
});
