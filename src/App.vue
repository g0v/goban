<template>
  <div id="app">
    <router-view :gobans = "gobans"/>
  </div>
</template>

<script>

import { gobansRef } from './firebase/db'

export default {
  name: 'App',
  data () {
    return {
      gobans: undefined
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
</style>
