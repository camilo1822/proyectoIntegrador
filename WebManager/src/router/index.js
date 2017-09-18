import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Places from '@/components/Places'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Places',
      component: Places
    }
  ]
})
