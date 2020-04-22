import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios;
Vue.config.productionTip = false

Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg)
});

import Scroller from './components/Scroll'
Vue.component('Scroller',Scroller) ;//注册全局组件



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
