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
		boardList: [],
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
		SET_BOARD_LIST(state, boardList) {
			state.boardList = boardList;
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
      const auth = Vue.prototype.$firebase.auth();
			auth.languageCode = 'ko';
			await auth.signInWithPopup(provider);

      const user = auth.currentUser;
      const db = Vue.prototype.$firebase.firestore();
      
      user.updateProfile({ displayName: null });
      const increment = Vue.prototype.$firebase.firestore.FieldValue.increment(1);

      db.collection('user').get().then(r => {
        if (!r.exists) return false;
        db.collection('user').doc(user.uid)
          .update({
            visitedAt: new Date(),
            visitCount: increment,
          });
      });
		},
		async SIGN_IN_WITH_EMAIL_LINK({ commit }, email) {
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

			commit('SET_IS_EMAIL_SEND', true);
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
		async FETCH_BOARD_LIST({ commit }) {
      try {
        const snapshot = await Vue.prototype.$firebase
          .firestore()
          .collection('board')
          .orderBy('title')
          .get();
          
        let item = {};
        let items = [];
        snapshot.forEach(doc => {
          item = doc.data();
          item.id = doc.id;
          items.push(item);
        });
  
        commit('SET_BOARD_LIST', items);
      } catch (error) {
        console.log(error);
      }
      
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
		},
		async FETCH_BOARD({ commit }, id) {
      try {
        const snapshot = await Vue.prototype.$firebase
          .firestore()
          .collection('board')
          .doc(id)
          .get();
  
        let item = {};
        item = snapshot.data();
        item.id = id;
        
        commit('SET_BOARD', item);
      } catch (error) {
        console.log(error.message);
      }
		},
		UPDATE_BOARD_TITLE({ dispatch }, { bid, titleImg }) {
			Vue.prototype.$firebase
				.firestore()
				.collection('board')
				.doc(bid)
				.set({
					titleImg
				}, { merge: true }).then(_ => {
          dispatch('FETCH_BOARD', bid);
        });

		},
		UPDATE_BOARD({ dispatch }, { bid, titleImg, title, content }) {
			Vue.prototype.$firebase
				.firestore()
				.collection('board')
				.doc(bid)
				.set({
          titleImg,
					title,
					content,
				}).then(() => {
          dispatch('FETCH_BOARD', bid);
        }).catch(error => {
          console.log(error);
        });
		},
		async DELETE_BOARD(_, id) {
			await Vue.prototype.$firebase
				.firestore()
				.collection('board')
				.doc(id)
				.delete();
		},
		async SEARCH_LIST({ commit }, title) {
			// let titleList = [];
			// titleList.push(title);
			const querySnapshot = await Vue.prototype.$firebase
				.firestore()
				.collection('board')
				// .where('title', '==', title)
				.where('title', '>=', title)
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
		// async visitUser ({ state }) {
		//   if (!state.user.displayName) return false
		//   const increment = Vue.prototype.$firebase.firestore.FieldValue.increment(1)
		//   await Vue.prototype.$firebase.firestore().collection('users').doc(state.user.uid)
		//     .update({
		//       displayName: state.user.displayName,
		//       visitedAt: new Date(),
		//       visitCount: increment
		//     })
		//   return true
		// },
		// uploadTask.snapshot.ref.getDownloadURL().then(async (photoURL) => {
		//   const updatedAt = new Date()
		//   await user.updateProfile({ updatedAt, photoURL })
		//   await this.$firebase.firestore().collection('users').doc(user.uid).update({ updatedAt, photoURL })
		//   this.loading = false
		// })
	},
});
