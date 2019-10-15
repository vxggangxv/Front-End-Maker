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
		searchTitle: '',
		searchList: [],
	},
	mutations: {
		SET_IS_DRAWER(state, toggle) {
			state.drawer = toggle;
		},
		SET_IS_EMAIL_SEND(state, toggle) {
			state.emailSend = toggle;
		},
		SET_IS_EMAIL_VERIFIED(state, toggle) {
			state.emailVerified = toggle;
		},
		SET_IS_FIREBASE_LOADED(state, toggle) {
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
		SET_SEARCH_TITLE(state, searchTitle) {
			state.searchTitle = searchTitle;
		},
		SET_SEARCH_LIST(state, searchList) {
			state.searchList = searchList;
		},
	},
	actions: {
		async SIGN_IN_WITH_GOOGLE() {
			const provider = new Vue.prototype.$firebase.auth.GoogleAuthProvider();
			Vue.prototype.$firebase.auth().languageCode = 'ko';
			await Vue.prototype.$firebase.auth().signInWithPopup(provider);
			const user = Vue.prototype.$firebase.auth().currentUser;
			user.updateProfile({ displayName: null });
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
			window.localStorage.setItem('emailForSignIn', email);
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

			// const items = [];
			// snapshot.forEach(doc => {
			// 	const { title, content, createdAt, updatedAt, visitedAt } = doc.data();
			// 	items.push({
			// 		title,
			// 		content,
			// 		createdAt,
			// 		updatedAt,
			// 		visitedAt,
			// 		id: doc.id,
			// 	});
			// });

			let item = {};
			let items = [];
			snapshot.forEach(doc => {
				item = doc.data();
				item.id = doc.id;
				items.push(item);
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
		UPDATE_BOARD({ dispatch }, { bid, title, content }) {
			Vue.prototype.$firebase
				.firestore()
				.collection('board')
				.doc(bid)
				.set({
					title,
					content,
				});

			dispatch('FETCH_BOARD', bid);
		},
		DELETE_BOARD({ dispatch }, id) {
			Vue.prototype.$firebase
				.firestore()
				.collection('board')
				.doc(id)
				.delete();

			dispatch('FETCH_BOARD', id);
		},
		async SEARCH_LIST({ commit }, title) {
			// let titleList = [];
			// titleList.push(title);
			const querySnapshot = await Vue.prototype.$firebase
				.firestore()
				.collection('board')
				// .where('title', '>=', title)
				// .where('title', '==', title)
				.where('title', '>=', title)
				// .where('title', 'array-contains', titleList)
				// .where('title', '<=', 'title')
				.get();
			let item = {};
			let items = [];
			querySnapshot.forEach(doc => {
				item = doc.data();
				item.id = doc.id;
				items.push(item);
			});

			commit('SET_SEARCH_TITLE', title);
			commit('SET_SEARCH_LIST', items);
		},
	},
});
