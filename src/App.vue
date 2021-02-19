<template lang="pug">
  portal-target#app(name="semantic-ui-vue")
    .ui.fixed.top.labeled.icon.menu.fat-only.no-print#nav1
      router-link.item(to='/')
        i.home.icon
        | 首頁
      a.item(@click="$router.go(-1)" v-if = "$router.currentRoute.path != '/'")
        i.left.arrow.icon
        | 回上一頁
      router-link.item(to='/list')
        i.search.icon
        | 搜尋
      router-link.item(to='/intro')
        i.question.icon
        | 導覽
      sui-dropdown.item(icon="save outline")
        | 工具
        sui-dropdown-menu
          //sui-dropdown-item(@click="$router.push('/myapp')")
            | 手機App
          sui-dropdown-item(@click="$router.push('/extension')")
            | 瀏覽器插件
      .right.menu
        a.item#sign-out(v-if = "user" @click="signOut")
          img(:src="user.photoURL")
          span 登出
        router-link.item(to = "/chat")
          i.chat.icon
          | 留言板
        a.item(href="https://github.com/g0v/goban", target="_blank", rel="noopener noreferrer")
          i.github.icon
          | 原始碼
        a.item(href="https://www.facebook.com/sharer/sharer.php?u=https://goban.tw",target="_blank", rel="noopener noreferrer")
          i.facebook.icon
          | 分享
    .ui.fixed.top.menu.thin-only.no-print#nav1
      router-link.item(to='/')
        sui-icon(name='home', data-content="首頁", title="首頁")
      a.item(@click="$router.go(-1)" v-if = "$router.currentRoute.path != '/'", data-content="回上一頁", title="回上一頁")
        sui-icon(name='left arrow')
      router-link.item(to='/star', data-content="珍藏", title="珍藏")
        sui-icon(name='star')
      router-link.item(to='/intro')
        sui-icon(name='question', data-content="導覽", title="導覽")
      //sui-dropdown.item(icon="save outline", data-content="工具", title="工具")
        sui-dropdown-menu
          sui-dropdown-item(@click="$router.push('/myapp')")
            | 手機App
          sui-dropdown-item(@click="$router.push('/extension')")
            | 瀏覽器插件
      .right.menu
        a.item#sign-out-thin(v-if = "user" @click="signOut")
          img(:src="user.photoURL")
          span 登出
        router-link.item(to = "/chat", target="_blank")
          i.chat.icon
        //a.item(href="https://github.com/g0v/goban", target="_blank")
          i.github.icon
    router-view(:uid="uid", :user ="user", :myUser="myUser", :users="users", :gobans='gobans', :starsFire="starsFire", :mydata="mydata" @create='create', :chats = "chats", :myName="myName", :myWindowWidth = "myWindowWidth",
     @onResize = "onResize",
     @submit = "submit",
     @setDataToFireBase = "setDataToFireBase",
     @loadDataFromFireBase = "loadDataFromFireBase",
     @reload = "reload",
     @loginGoogle = "loginGoogle",
     @tryIt="user = tryIt()")
</template>

<script>

/* eslint-disable */

import mixin from './mixins/mixin.js'
import ss from './mixins/stars.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import { db, gobansRef, chatsRef, starsRef } from './firebase/db'

export default {
  name: 'App',
  data () {
    return {
      txt: '',
      myWindowWidth: 420,
      myName: '',
      uid: '',   // main id
      user: undefined, // user object
      users: [],
      myUser: undefined, // user on firebase
      stars: {'goban_intro': 5},
      gobans: undefined,
      chats: undefined,
      starsFire: undefined,
      mydata: [{"name":"零時黑板共筆頁","url":"https://hackmd.io/3pvyN_W9TjSsuBok4w2XYA","note":"","type":"link"}]
    }
  },
  mixins: [ss, mixin],
  firebase: {
    gobans: gobansRef,
    chats: chatsRef,
    starsFire: starsRef
  },
  methods: {
    onResize (w) {
      this.myWindowWidth = w || window.innerWidth
    },
    loginGoogle: function () {
      var vm = this
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        vm.provider = 'google'
        vm.token = result.credential.accessToken
        // The signed-in user info.
        vm.uid = result.user.uid
        console.log(vm.uid)
        vm.user = result.user
        vm.photoURL = vm.user.photoURL

        var obj = {
          id: vm.uid,
          name: vm.user.displayName,
          photoURL: vm.photoURL,
          email: vm.user.email
        }
        //vm.setUserToFireBase(vm.uid, obj , this)
        //this.$forceUpdate()
        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        console.log(errorCode + errorMessage + email + credential)
      })
    },
    submit: function (n, email, t, photoURL) {
      var o = {
        n: n,
        email: email,
        t: t,
        time: (new Date()).getTime(),
        photoURL: photoURL || 'null'
      }
      if (t) {
        this.$firebaseRefs.chats.push(o)
        window.alert('留言已送出')
      } else {
        window.alert('請輸入留言')
      }
    },
    srcURL: function () {
      var ans
      if (this.gobans && this.gobans[this.$route.params.id] && this.gobans[this.$route.params.id].use_lev) {
        ans = 'https://ethercalc.net/' + this.$route.params.id + (this.$route.params.lev || '') + '.csv.json'
      } else {
        ans = 'https://ethercalc.net/' + this.$route.params.id + '.csv.json'
      }
      return ans
    },
    reload: function (newTab, to, from, myWindowWidth) {
      console.log('reload...')
      // GET /someUrl
      this.$http.get(this.srcURL(), { headers: {
          'X-Requested-With': 'XMLHttpRequest'
        } 
      }).then(response => {
        //this.$http.get(csv_api_source).pipe(CSV.parse).done(compile_json);   <--先抓CSV, 再compile成JSON
        // get body mydata
        console.log(response.data)
        this.mydata = this.parse(response.data)
        if (this.$route.params.id) {
          this.setDataToFireBase(this.$route.params.id, this.$route.params.lev, this.mydata)
        }
        if (newTab && myWindowWidth <= 500) {
          console.log('opening...')
          var t;
          if (to.params.index === 'new') {
            t = 'https://ethercalc.net/' + to.params.id + (to.params.lev || '')
          } else {
            t = this.mydata[to.params.index].url
          }
          // window.open(t, '_blank')
        }
        this.$forceUpdate()
      }, response => {
        this.mydata = []
      })
    },
    loadStars: function () {
      this.stars = JSON.parse(localStorage.getItem('stars'))
    }
  },
  mounted: function () {
    this.reload()
    if (this.checkJSON(localStorage.getItem('stars'))) {
      this.loadStars()
    } else {
      localStorage.setItem('stars', JSON.stringify(this.stars))
    }
  },
  watch: {
    $route (to, from) {
      //console.log(from.path)
      //console.log(to.path)
      console.log(from)
      console.log(to)
      this.$gtag.event('action', {
        event_category: 'navigate',
        event_action: 'from:' + from.path + ' to:' + to.path,
        event_label: 'from:' + from.path + ' to:' + to.path,
        value: 'from:' + from.path + ' to:' + to.path
      })
      this.reload(true, to, from)
    },
    gobans (n, o) {
      if (o) {
        this.loadDataFromFireBase()
      }
    }
  }
}
</script>
<style>

body {
  background-color: hsla(120, 30%, 30%, 1) !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif,
               'Microsoft JhengHei',
                'Microsoft YaHei',
                'STHeiti',
                'Apple LiGothic Medium';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white !important;
  margin-top: 60px;
}

.ui.menu {
  background-color: hsla(30, 55%, 33%, 1) !important;
  border: none !important;
}

.ui.menu .item {
  color: white !important;
}

.router-link-exact-active {
  background-color: hsla(30, 55%, 16%, 1) !important;
}

.ui.header {
  color: white !important;
}

h3.sub.header {
  color: yellow !important;
}

a {
    color: white !important;
    text-decoration: none;
}

a.r {
  margin: 0 1em !important;
}

.ui.segment {
  background-color: hsla(30, 55%, 33%, 1) !important;
}

.yellow {
  color: yellow !important;
}

.gray {
  color: #ccc !important;
}

.white {
  color: white !important;
}

a, button, a * {
  cursor: pointer !important;
}

@media screen and (max-width: 420px) {
  .fat-only {
    display: none !important;
  }

  p {
    overflow-x: scroll !important;
  }
}

@media screen and (min-width: 600px) {
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

.markdown-body img {
  max-width: 80vw !important;
}

.markdown-body a {
  text-decoration: underline !important;
}

#sign-out span {
  margin-top: .5em !important;
}

#sign-out-thin span {
  position: absolute !important;
  top: 20px !important;
  left: 20px !important;
  color: black !important;
  text-shadow: 2px 2px white;
}

.print-only {
  visibility: hidden !important;
  display: none;
}

@media print {
  .no-print, .no-print * {
    height: 0 !important;
    visibility: hidden !important;
  }
  .print-only {
    visibility: visible !important;
    display: block;
  }
  #navbar, #nav1, #navbar *, #nav1 * {
    height: 0 !important;
    visibility: hidden !important;
  }
}

.ui.fixed.menu+.ui.grid {
  padding-top: 0;
}
</style>
