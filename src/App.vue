<template lang="pug">
  portal-target#app(name="semantic-ui-vue")
    .ui.fixed.top.labeled.icon.menu.fat-only
      router-link.item(to='/')
        i.home.icon
        | 首頁
      a.item(@click="$router.go(-1)" v-if = "$router.currentRoute.path != '/'")
        i.left.arrow.icon
        | 回上一頁
      router-link.item(to='/star')
        i.star.icon
        | 珍藏
      router-link.item(to='/intro')
        i.question.icon
        | 介紹
      sui-dropdown.item(icon="save outline")
        | 工具
        sui-dropdown-menu
          sui-dropdown-item(v-show="!iOS()", @click="$router.push('/myapp')")
            | 手機App
          sui-dropdown-item(@click="$router.push('/extension')")
            | 瀏覽器插件
      .right.menu
        a.item(href="https://github.com/g0v/goban", target="_blank")
          i.github.icon
          | 原始碼
        .item
          iframe(src="https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fgoban.tw&layout=button_count&size=small&appId=485195848253155&width=71&height=20" width="71" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media")
    .ui.fixed.top.menu.thin-only
      router-link.item(to='/')
        sui-icon(name='home', data-content="首頁", title="首頁")
      a.item(@click="$router.go(-1)" v-if = "$router.currentRoute.path != '/'", data-content="回上一頁", title="回上一頁")
        sui-icon(name='left arrow')
      router-link.item(to='/star', data-content="珍藏", title="珍藏")
        sui-icon(name='star')
      router-link.item(to='/intro')
        sui-icon(name='question', data-content="介紹", title="介紹")
      sui-dropdown.item(icon="save outline", data-content="工具", title="工具")
        sui-dropdown-menu
          sui-dropdown-item(v-show="!iOS()", @click="$router.push('/myapp')")
            | 手機App
          sui-dropdown-item(@click="$router.push('/extension')")
            | 瀏覽器插件
      .right.menu
        a.item(href="https://github.com/g0v/goban", target="_blank", data-content="原始碼", title="原始碼")
          i.github.icon
    app-view(:gobans='gobans', @create='create')
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
    iOS: function () {
      var ans = false
      var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ]
      console.log(navigator.platform)
      if (navigator.platform) {
        while (iDevices.length) {
          if (navigator.platform === iDevices.pop()) { ans = true }
        }
      }
      console.log(ans)
      return ans
    },
    create: function (k, o) {
      var obj = o || {id: k}
      obj.id = k
      obj.t = obj.t || k
      obj.hex = obj.hex || 'black'
      obj.tags = obj.tags || [k]
      obj.related = obj.related || [k]
      db.ref('gobans/' + k).set(obj)
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

.yellow {
  color: yellow;
}
.gray {
  color: gray;
}

.router-link-exact-active {
  background-color: #ccf !important;
}

a, button {
  cursor:pointer;
}

@media screen and (max-width: 420px) {
  .fat-only {
    display: none !important;
  }

  p {
    overflow-x: scroll;
  }
}

@media screen and (min-width: 420px) {
  .thin-only {
    display: none !important;
  }
  #app {
    margin-top: 100px;
  }
  #navbar {
    height: 74px;
  }
}
</style>
