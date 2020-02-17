<template lang="pug">
  #app
    .ui.fixed.top.menu
      router-link.item(to='/')
        sui-icon(name='home')
      router-link.item(to='/star')
        sui-icon(name='star')
      .right.menu
        .item
          iframe(src="https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fgobantw&layout=button_count&size=small&appId=485195848253155&width=71&height=20" width="71" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media")
    router-view(:gobans='gobans', @create='create')
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
