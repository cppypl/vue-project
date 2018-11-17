// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Axios from 'Axios'
import App from './App'
// import VueRouter from 'vue-router'
import store from './vuex/store'


Vue.config.productionTip = false

/* eslint-disable no-new */
// Vue.use(VueRouter);

let vm=new Vue({
  el: '#app',
  //router,
  store,  //一定要小写！
  components: { App },
  template: '<App/>'
})
