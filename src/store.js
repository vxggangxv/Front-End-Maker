import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: null,
    signType: true,
    user: null,
    emailSend: false,
    firebaseLoaded: false,
  },
  mutations: {
    setSignType(state, payload) {
      state.signType = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    setFirebaseLoaded(state) {
      state.firebaseLoaded = true
    },
  },
  actions: {}
})
