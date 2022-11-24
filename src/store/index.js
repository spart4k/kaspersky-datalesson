import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    session: null,
  },
  mutations: {
    updateSession(state, session) {
      state.session = session
    },
  },
  actions: {
    setSession({ commit }, session) {
      commit('updateSession', session)
    },
  },
  modules: {

  },
})

export default store;
export const useStore = () => store
