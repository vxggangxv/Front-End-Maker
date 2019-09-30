import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: null,
    emailSend: false,
    emailVerified: false,
    user: null,
    firebaseLoaded: false,
    // signType: true,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setFirebaseLoaded(state) {
      state.firebaseLoaded = true
    },
  },
  actions: {}
})
