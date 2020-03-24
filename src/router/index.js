import Vue from 'vue'
import Router from 'vue-router'
import New from '@/components/New'
import Create from '@/components/Create'
import List from '@/components/List'
import See from '@/components/See'
import See2 from '@/components/See2'
import Star from '@/components/Star'
import Intro from '@/components/Intro'
import Update from '@/components/Update'
import MyApp from '@/components/MyApp'
import Extension from '@/components/Extension'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'New',
      component: New
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/star',
      name: 'Star',
      component: Star
    },
    {
      path: '/s/:id/:index',
      name: 'S',
      component: See
    },
    {
      path: '/see/:id/:lev/:index',
      name: 'See2',
      component: See2
    },
    {
      path: '/intro',
      name: 'Intro',
      component: Intro
    },
    { path: '/update/:id',
      name: 'Update',
      component: Update
    },
    {
      path: '/myapp',
      name: 'MyApp',
      component: MyApp
    },
    { path: '/extension',
      name: 'Extension',
      component: Extension
    },
    { path: '/chat',
      name: 'Chat',
      component: Chat
    }
  ]
})
