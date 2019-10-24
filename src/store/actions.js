import Vue from 'vue'

const actions = {
  async SIGN_IN_WITH_GOOGLE({ dispatch }) {
    const provider = new Vue.prototype.$firebase.auth.GoogleAuthProvider();
    const auth = Vue.prototype.$firebase.auth();
    auth.languageCode = 'ko';
    await auth.signInWithPopup(provider);

    const db = Vue.prototype.$firebase.firestore();
    const user = auth.currentUser;
    const { uid } = user;
    
    const increment = Vue.prototype.$firebase.firestore.FieldValue.increment(1);

    db.collection('user').doc(uid).get().then(r => {
      if (!r.exists) return user.updateProfile({ displayName: null });
      console.log(r);
      db.collection('user').doc(uid)
        .update({
          visitedAt: new Date(),
          visitCount: increment,
        });

      })
      .then(() => {
        dispatch('FETCH_USER', uid);
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
  async FETCH_USER({ commit }, uid) {
    // const user = Vue.prototype.$firebase.auth().currentUser;
    const snapshot = await Vue.prototype.$firebase
      .firestore().collection('user').doc(uid).get();
      let item = {};
      item = snapshot.data();
      item.id = uid;

    commit('SET_USER', item);
  },
  async UPDATE_USER({ dispatch }, { uid, updatedAt, displayName, aboutMe, github, homepage }) {
    await Vue.prototype.$firebase.auth().currentUser.updateProfile({ displayName });
    const db = Vue.prototype.$firebase.firestore();
    await db.collection("user")
      .doc(uid)
      .set({ updatedAt, displayName, aboutMe, social: {github, homepage} }, { merge: true });

      dispatch('FETCH_USER', uid);
    // commit('SET_USER', user);
    // console.log(user);
  },
  async UPDATE_AVATAR({ state, dispatch }, { uid, updatedAt, file }){
    state.avatarLoading = true;
    // function getExtension(fileName) {
    //   var fileLength = fileName.length;
    //   var lastDot = fileName.lastIndexOf(".");
    //   var fileExtension = fileName.substring(lastDot + 1, fileLength);
    //   return fileExtension;
    // }
    // const fileExtension = getExtension(file.name);
    const storageRef = Vue.prototype.$firebase.storage().ref();
    
    // const uploadTask = storageRef.child(user.uid).put(this.files)

    // const config = {
    //   quality: 0.5,
    //   maxWidth: 500,
    //   maxHeight: 500,
    //   autoRotate: true
    // };
    // const resizedImage = await readAndCompressImage(this.file, config);
    // var metadata = {
    //   contentType: 'image/jpeg'
    // };

    const uploadTask = storageRef
      .child("images/users/" + uid + "/" + file.name)
      .put(file);

    await uploadTask.on(
      Vue.prototype.$firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      snapshot => {
        this.progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case Vue.prototype.$firebase.storage.TaskState.PAUSED: // or 'paused'
            this.$toasted.global.error("Upload is paused");
            break;
          case Vue.prototype.$firebase.storage.TaskState.RUNNING: // or 'running'
            // this.$toasted.global.notice('Upload is running')
            break;
        }
      },
      error => {
        Vue.prototype.$toasted.global.error(error.code);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(async photoURL => {
          // const updatedAt = this.getTodayType1();
          await Vue.prototype.$firebase.auth().currentUser.updateProfile({ photoURL });
          await Vue.prototype.$firebase
            .firestore()
            .collection("user")
            .doc(uid)
            .update({ updatedAt, photoURL });

          dispatch('FETCH_USER', uid);
          state.avatarLoading = false;
        });
      }
    );


  },
  async CREATE_BOARD(_, { title, content, titleImg, summary, email, uid, photoURL, createdAt, updatedAt}) {
    const docRef = await Vue.prototype.$firebase
      .firestore()
      .collection('board')
      .add({
        title,
        content,
        titleImg, 
        summary,
        email,
        uid,
        photoURL,
        createdAt,
        updatedAt,
      });
    return docRef;
  },
  async FETCH_BOARD_LIST({ commit }) {
    try {
      const snapshot = await Vue.prototype.$firebase
        .firestore()
        .collection('board')
        .orderBy('createdAt', 'desc')
        .orderBy('title')
        .get();
        
      let item = {};
      let items = [];
      snapshot.forEach(doc => {
        item = doc.data();
        item.id = doc.id;
        items.push(item);
      });

      return commit('SET_BOARD_LIST', items);
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
  UPDATE_BOARD({ dispatch }, { id, title, content, titleImg, summary, email, uid, photoURL, updatedAt }) {
    Vue.prototype.$firebase
      .firestore()
      .collection('board')
      .doc(id)
      .set({
        title,
        content,
        titleImg,
        summary,
        email,
        uid,
        photoURL,
        updatedAt
      }, { merge: true } ).then(() => {
        dispatch('FETCH_BOARD', id);
      }).catch(error => {
        console.log(error);
      });
  },
  async DELETE_BOARD(_, id) {
    // console.log('call ' , id);
    await Vue.prototype.$firebase
      .firestore()
      .collection('board')
      .doc(id)
      .delete();
  },
  async FETCH_USER_BOARD_LIST({ commit }, uid) {
    try {
      const snapshot = await Vue.prototype.$firebase
        .firestore()
        .collection('board')
        .where('uid', '==', uid)
        .orderBy('createdAt', 'desc')
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
  },
  async FETCH_BOARD_USER({ commit }, id) {
    try {
      const snapshot = await Vue.prototype.$firebase
        .firestore()
        .collection('user')
        .doc(id)
        .get();

      let item = {};
      item = snapshot.data();
      item.id = id;
      
      return commit('SET_BOARD_USER', item);
    } catch (error) {
      console.log(error.message);
    }
  },
  async SEARCH_BOARD_LIST({ commit }, title) {
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

    commit('SET_BOARD_LIST', items);
  },
  // async visitUser ({ state }) {
  //   if (!state.user.displayName) return false
  //   const increment = Vue.prototype.$firebase.firestore.FieldValue.increment(1)
  //   await Vue.prototype.$firebase.firestore().collection('user').doc(state.user.uid)
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
  //   await Vue.prototype.$firebase.firestore().collection('user').doc(user.uid).update({ updatedAt, photoURL })
  //   this.loading = false
  // })
}

export default actions