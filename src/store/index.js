import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: null
  },
  mutations: {
    setUserinfo (state, userinfo) {
      state.userinfo = userinfo
    }
  },
  actions: {
  },
  modules: {
  }
})
