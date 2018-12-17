import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { routes } from './routes';
import store from './store';
import VueRouter from 'vue-router'
import 'es6-promise/auto'

require('bootstrap');

const router = new VueRouter({
  routes
});


Vue.use(Vuex);
Vue.use(VueRouter);

/////

Vue.filter('removeHash', (value)=>{
    let arr = hashword.split('');
    for (let i = 0; i < arr.length; i++) {
      if (arr[0] === '#') {
        arr.splice(0, 1);
      }
    }
    return arr.join('');
});

////

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
