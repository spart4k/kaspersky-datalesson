import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    session: null,
    level: null,
    progress: [0, 0, 0, 0, 0, 0],
    currentLesson: 1,
  },
  mutations: {
    setSession(state, session) {
      state.session = session
    },
    setLevel(state, level) {
      state.level = level
    },
    setProgress(state, payload) {
      const arr = [...state.progress]
      arr[payload[0] - 1] = payload[1]
      state.progress = arr
    },
    setCurrentLesson(state, lesson) {
      state.currentLesson = lesson
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
    updateCurrentLesson({ commit }, lesson) {
      commit('setCurrentLesson', lesson)
    },
  },
  modules: {

  },
})

export default store;
export const useStore = () => store
