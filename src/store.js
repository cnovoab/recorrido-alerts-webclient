import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: {},
    token: null,
    reminders: []
  },
  getters: {
    currentUserId (state) {
      return state.currentUser && state.currentUser.id
    }
  },
  mutations: {
    setCurrentUser (state, { currentUser, token }) {
      state.currentUser = currentUser
      state.signedIn = true
      state.token = token
    },
    unsetCurrentUser (state) {
      state.currentUser = {}
      state.signedIn = false
      state.token = null
    },
    refresh (state, token) {
      state.signedIn = true
      state.token = token
    }
  },
  plugins: [createPersistedState()]
})
