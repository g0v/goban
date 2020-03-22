<template lang="pug">
  portal-target#app(name="semantic-ui-vue")
    .ui.fixed.top.labeled.icon.menu.fat-only
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
        | 介紹
      sui-dropdown.item(icon="save outline")
        | 工具
        sui-dropdown-menu
          sui-dropdown-item(@click="$router.push('/myapp')")
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
        a.item(href="https://github.com/g0v/goban", target="_blank")
          i.github.icon
          | 原始碼
        .item
          iframe(src="https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fgoban.tw&layout=button_count&size=small&appId=485195848253155&width=71&height=20" width="80" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media")
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
        a.item(href="https://github.com/g0v/goban", target="_blank")
          i.github.icon
    router-view(:uid="uid", :user ="user", :myUser="myUser", :users="users", :gobans='gobans', :mydata="mydata" @create='create', :chats = "chats", :myName="myName" @submit = "submit", @setData="setData", @loadData="loadData", @reload = "reload", @loginGoogle = "loginGoogle", @tryIt="tryIt()")
</template>

<script>

/* eslint-disable */

import mixin from './mixins/stars.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import { db, gobansRef, chatsRef } from './firebase/db'

export default {
  name: 'App',
  data () {
    return {
      myName: '',
      uid: undefined,   // main id
      user: undefined, // user object
      users: [],
      myUser: undefined, // user on firebase
      stars: {'goban_intro': 5},
      gobans: undefined,
      chats: undefined,
      mydata: [{"name":"零時黑板共筆頁","url":"https://hackmd.io/3pvyN_W9TjSsuBok4w2XYA","note":"","type":"link"}]
    }
  },
  mixins: [mixin],
  methods: {
    setUser: function (id, obj) {
      console.log(obj)
      if (!this.users[id]) {
        db.ref('users/' + id).set(obj)
      } else {
        this.users.child(id).update(obj)
      }
    },
    tryIt: function () {
      this.user = {
        uid: undefined,
        photoURL: '/static/favicon.png'
      }
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
        vm.user = result.user
        vm.photoURL = vm.user.photoURL

        var obj = {
          id: vm.uid,
          name: vm.user.displayName,
          photoURL: vm.photoURL,
          email: vm.user.email
        }
        vm.setUser(vm.uid, obj)
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
    signOut: function() {
      firebase.auth().signOut().then(() => {
        this.user = null
      }).catch(err => console.log(error))
    },
    parse: function (d) {
      console.log( d )
      if (d[1]) { this.myName = d[1][1] || 'User' }
      var ans = d.slice(2)
      var idx
      ans = ans.map(function (l) {
        var obj = {}
        obj.name = l[1]
        obj.url = l[0].replace('%20', '').replace(' ', '')
        obj.note = l[2]
        return obj
      }).filter(function (o) {
        return o.name
      }).map(function (obj, index) {
        if (!obj.url || obj.url === 'folder') {
          obj.type = 'folder'
          obj.open = true
          if ((obj.note + '').match(/close/)) {
            obj.open = false
          }
          idx = index
        } else {
          obj.type = 'link'
          obj.parentIndex = idx
        }
        return obj
      })
      console.log(ans)
      return ans
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
        ans = 'https://ethercalc.org/' + this.$route.params.id + (this.$route.params.lev === '_' ? '' : this.$route.params.lev) + '.csv.json'
      } else {
        ans = 'https://ethercalc.org/' + this.$route.params.id + '.csv.json'
      }
      return ans
    },
    create: function (k, o) {
      var obj = o || {id: k}
      obj.id = k
      obj.t = obj.t || k
      obj.hex = obj.hex || 'black'
      obj.tags = obj.tags || [k]
      obj.photoURL = obj.photoURL || ''
      obj.related = obj.related || [k]
      obj.use_lev = obj.use_lev || true
      obj.mydata = obj.mydata || [0, 1, 2, 3]
      db.ref('gobans/' + k).set(obj)
      this.$router.push('/see/' + k + '/0/new')
    },
    loadData: function () {
      console.log('loading mydata from firebase...')
     // var gs = this.gobans.child(this.$route.params.id)
     // this.mydata = array
      console.log(this.mydata)
      console.log('mydata loaded from firebase...')
    },
    reload: function () {
      console.log('reload...')
      // GET /someUrl
      this.$http.get(this.srcURL()).then(response => {
        // get body mydata
        this.mydata = this.parse(response.body)
        if (this.$route.params.id) {
          this.setData(this.$route.params.id, this.$route.params.lev, this.mydata)
        }
        this.$forceUpdate()
      }, response => {
        this.mydata = [{"name":"零時黑板共筆頁","url":"https://hackmd.io/3pvyN_W9TjSsuBok4w2XYA","note":"","type":"link"},{"name":"簡介短片","url":"https://www.youtube.com/embed/uZo8eCfoS_Q","note":"","type":"link"},{"name":"臉書專頁","url":"https://www.facebook.com/%E9%9B%B6%E6%99%82%E9%BB%91%E6%9D%BF-110565913890537/","note":"blank","type":"link"},{"name":"原始碼","url":"https://github.com/g0v/goban/","note":"blank","type":"link"},{"name":"錯誤回報","url":"https://github.com/g0v/goban/issues","note":"{\"target\":\"blank\"}","type":"link"},{"name":"資料後台","url":"","note":"closed","type":"folder","open":false},{"name":"Ethercalc","url":"https://ethercalc.org","note":"","type":"link","parentIndex":5},{"name":"Ethercalc@github","url":"https://github.com/audreyt/ethercalc","note":"{\"target\":\"_blank\"}","type":"link","parentIndex":5},{"name":"隱私政策","url":"https://github.com/audreyt/ethercalc/blob/master/privacy.png","note":"{\"target\":\"_blank\"}","type":"link","parentIndex":5},{"name":"行動App","url":"","note":"","type":"folder","open":true},{"name":"Google Play","url":"https://play.google.com/store/apps/details?id=tw.goban.app","note":"","type":"link","parentIndex":9},{"name":"App Store","url":"https://apps.apple.com/us/app/%E9%9B%B6%E6%99%82%E9%BB%91%E6%9D%BF/id1500095725?l=zh&ls=1","note":"blank","type":"link","parentIndex":9},{"name":"瀏覽器插件","url":"","note":"","type":"folder","open":true},{"name":"Firefox","url":"https://addons.mozilla.org/zh-TW/firefox/addon/%E9%9B%B6%E6%99%82%E9%BB%91%E6%9D%BF/","note":"blank","type":"link","parentIndex":12}]
        // this.$router.push('/see/' + this.$route.params.id + '/' + (this.$route.params.lev === '_' ? '' : this.$route.params.lev) + '/new')
      })
    },
    setData: function (id, lev, d) {
      console.log('set mydata to firebase...')

      var obj = d || []
      if (!obj) {
        obj = {name: d, t: d}
      }
      var goban = {
        id: id,
        t: this.gobans[id].t || id || '',
        hex: this.gobans[id].hex || 'black',
        tags: this.gobans[id].tags || [id],
        related: this.gobans[id].related || [id],
        use_lev: this.gobans[id].use_lev || true,
        stars: this.gobans[id].stars || true,
        mydata: this.gobans[id].mydata || [0, 1, 2, 3]
      }
      db.ref('gobans/' + id).set(goban)
      d.forEach(function (l, idx) {
        var list = {
          name: l.name || 'happy',
          url: l.url || 'folder',
          note: l.note || 'happy',
          type: l.type || 'folder',
          parentIndex: l.parentIndex || -1
        }
        var url = 'gobans/' + id + '/mydata/' + idx
        db.ref(url).set(list)
      })
    },
    loadStars: function () {
      this.stars = JSON.parse(localStorage.getItem('stars'))
    }
  },
  firebase: {
    gobans: gobansRef,
    chats: chatsRef
  },
  mounted: function () {
    this.reload()
    if (this.checkJSON(localStorage.getItem('stars'))) {
      this.loadStars()
    } else {
      localStorage.setItem('stars', JSON.stringify(this.stars))
    }
  },
  created: function () {
    var vm = this
    vm.$i18n.locale = 'zh-TW'
  },
  watch: {
    $route (to, from) {
      console.log(from.path)
      console.log(to.path)
      this.$gtag.event('action', {
        event_category: 'navigate',
        event_action: 'from:' + from.path + ' to:' + to.path,
        event_label: 'from:' + from.path + ' to:' + to.path,
        value: 'from:' + from.path + ' to:' + to.path
      })
    },
    gobans (n, o) {
      if (o) {
        this.loadData()
      }
    }
  }
}

</script>

<style>

body {
  background-color: hsla(120, 30%, 30%, 1) !important;
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

a, button {
  cursor:pointer;
}

@media screen and (max-width: 420px) {
  .fat-only {
    display: none !important;
  }

  p {
    overflow-x: scroll !important;
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

</style>
