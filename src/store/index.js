import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { coursesModule } from './modules/courses'
import { sessionModule } from './modules/session'

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    coursesModule,
    sessionModule
  }
})
