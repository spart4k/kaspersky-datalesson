import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    session: null,
    level: null,
  },
  mutations: {
    setSession(state, session) {
      state.session = session
    },
    setLevel(state, level) {
      state.level = level
    },
  },
  actions: {
    updateSession({ commit }, session) {
      commit('setSession', session)
    },
    updateLevel({ commit }, level) {
      commit('setLevel', level)
    },
  },
  modules: {

  },
})

export default store;
export const useStore = () => store
