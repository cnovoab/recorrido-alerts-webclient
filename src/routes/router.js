import Vue from 'vue'
import Router from 'vue-router'
import Crud from './routes/Crud.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'crud',
      component: Crud
    },
    {
      path: '/',
      name: 'login',
      component: LoginForm
    }
  ]
})

export default router
