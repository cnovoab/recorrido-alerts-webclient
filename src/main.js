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

Vue.config.productionTip = false;
Vue.http.options.emulateJSON = true;
Vue.http.options.root = api.url + api.path.default

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
