import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
      state.drawer = toggle
    },
    SET_EMAIL_SEND(state, toggle) {
      state.emailSend = toggle
    },
    SET_EMAIL_VERIFIED(state, toggle) {
      state.emailVerified = toggle
    },
    SET_FIREBASE_LOADED(state, toggle) {
      state.firebaseLoaded = toggle
    },
    SET_USER(state, user) {
      state.user = user
    },
  },
  actions: {}
})
