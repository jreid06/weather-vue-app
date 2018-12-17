import Vue from 'vue'
import appjs from './app'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appjs
  }
})