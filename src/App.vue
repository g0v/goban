<template>
  <div id="app">
    <router-view :gobans = "gobans" @create = "create"/>
  </div>
</template>

<script>

import { db, gobansRef } from './firebase/db'

export default {
  name: 'App',
  data () {
    return {
      gobans: undefined
    }
  },
  methods: {
    create: function (k) {
      db.ref('gobans/' + k).set(k)
    }
  },
  firebase: {
    gobans: gobansRef
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.router-link-exact-active {
  background-color: #ccf !important;
}

</style>
