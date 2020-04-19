// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { rtdbPlugin } from 'vuefire'
import axios from 'axios'
import VueAxios from 'vue-axios'
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import VueLocalStorage from 'vue-localstorage'
import autofocus from 'vue-autofocus-directive'
import '@babel/polyfill'
import PortalVue from 'portal-vue'
import ErrorPage from 'vue-error-page'
import vueHeadful from 'vue-headful'
import VueSimpleMarkdown from 'vue-simple-markdown'
import VueGtag from 'vue-gtag'

Vue.use(VueAxios, axios)

Vue.use(VueGtag, {
  config: { id: 'UA-26178243-14' }
})

Vue.use(VueSimpleMarkdown)

Vue.component('vue-headful', vueHeadful)

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

Vue.use(SuiVue)
Vue.use(rtdbPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
