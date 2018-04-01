import Vue from 'vue'
import Router from 'vue-router'
import UpLoad from '@/client/upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: UpLoad
    }
  ]
})
