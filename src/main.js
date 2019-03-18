import "babel-polyfill"
import Vue from 'vue'
import i18n from './locales/index.js'
import './plugins/vuetify'
import './plugins/vue-resource'
import './plugins/custom/'
import App from './App.vue'
import router from './router'
import store from './store'
import './register-service-worker'
import { api } from './config/api'

Vue.config.productionTip = true
Vue.http.options.emulateJSON = true;
Vue.http.options.root = api.url
Vue.http.interceptors.push((request, next) => {
  if (localStorage.getItem('token')) {
    request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }
  next(response => {
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      store.commit('auth/logout')
      router.push({path: '/login'})
    }
  })
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
