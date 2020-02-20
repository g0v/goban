import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import See from '@/components/See'
import Star from '@/components/Star'
import Intro from '@/components/Intro'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/star',
      name: 'Star',
      component: Star
    },
    {
      path: '/see/:id/:lev/:index',
      name: 'See',
      component: See
    },
    {
      path: '/intro',
      name: 'Intro',
      component: Intro
    }
  ]
})
