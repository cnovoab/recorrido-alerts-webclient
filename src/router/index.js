import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import RemindersList from '@/components/reminders/List'
import RemindersShow from '@/components/reminders/Show'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/reminders',
      name: 'List',
      component: RemindersList
    },
    {
      path: '/reminders/:id',
      name: 'Show',
      component: RemindersShow,
      props: true
    }
  ]
})
