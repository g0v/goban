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
