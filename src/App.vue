<template>
  <div id="app">
    <h1>Hello</h1>
    {{ gobans }}
    <router-view :gobans = "gobans"/>
  </div>
</template>

<script>

import { db } from './firebase/db'

export default {
  name: 'App',
  data () {
    return {
      gobans: []
    }
  },
  firestore: {
    gobans: db.collection('gobans')
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
