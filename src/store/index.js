import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    session: null,
    level: null,
    progress: [0, 2, 0, 0, 0, 0],
  },
  mutations: {
    setSession(state, session) {
      state.session = session
    },
    setLevel(state, level) {
      state.level = level
    },
    setProgress(state, payload) {
      state.progress[payload[0] - 1] = payload[1]
    },
  },
  actions: {
    updateSession({ commit }, session) {
      commit('setSession', session)
    },
    updateLevel({ commit }, level) {
      commit('setLevel', level)
    },
    updateProgress({ commit }, payload) {
      commit('setProgress', payload)
    },
  },
  modules: {

  },
})

export default store;
export const useStore = () => store
