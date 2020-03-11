// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { rtdbPlugin } from 'vuefire'
import VueResource from 'vue-resource'
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import VueLocalStorage from 'vue-localstorage'
import autofocus from 'vue-autofocus-directive'
import '@babel/polyfill'
import PortalVue from 'portal-vue'

import ErrorPage from 'vue-error-page'

window.eventBus = new Vue()

Vue.use(ErrorPage, {
  tagName: 'app-view',
  bus: 'eventBus',
  event: 'error-page',
  resolver: (component) => {
    return require('./views/Errors/' + component).default
  }
})

Vue.use(PortalVue)

Vue.directive('autofocus', autofocus)

Vue.use(VueLocalStorage)

require('semantic-ui-css/semantic.css')

Vue.use(SuiVue)
Vue.use(VueResource)
Vue.use(rtdbPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
