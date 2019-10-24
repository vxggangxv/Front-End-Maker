import Vue from 'vue';
import Vuex from 'vuex';
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import auth from './module/auth/'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
  },
	state,
  getters,
	mutations,
	actions
});
