<template lang="pug">
  .hello
    h1.ui.header 搜尋棋盤
    h3.sub.header 創建棋盤，讓星棋羅列
    .ui.warning.message.container
      | 創建後請至少輸入一筆資料，謝謝
      br
      | 如不知如何輸入，請參考
      router-link(to="/intro").black 介紹頁
      .ui.form
        .field
          .ui.checkbox
            input(type="checkbox" v-model="iagree" tabindex="0")
            label 我同意
    .ui.button.group(v-show="iagree")
      a.ui.orange.huge.button(v-if="!user", @click="loginGoogle()")
        i.google.icon
        | 以Google登入
      img.ui.small.image(v-else :src="user.photoURL")
    .ui.form.container(v-show="iagree && user")
      .field
        input(type='search', name='', v-model='myKey', placeholder='輸入新棋盤的id', @keydown.enter = "($router.push('/see/' + myKey + '/0/new'))")
    .ui.container
      a.ui.green.huge.button(@click='create(myKey)', v-if='myKey && !gobans[myKey]') {{$t('create')}}{{myKey}}
      .ui.negative.message(v-else v-show="myKey") 對不起， {{myKey}}已存在
        router-link(:to="'/see/' + myKey + '/0/0'") 前往 {{ myKey }}
</template>

<script>

import mixin from '../mixins/stars.js'

export default {
  data () {
    return {
      iagree: false,
      myKey: '',
      stars: {'goban_intro': 5}
    }
  },
  props: ['gobans', 'uid', 'user', 'myUser'],
  mixins: [mixin],
  localStorage: ['stars'],
  methods: {
    loginGoogle: function () {
      this.$emit('loginGoogle')
    },
    create: function (k) {
      this.$emit('create', k)
    },
    has: function (g, k) {
      var r = new RegExp(k)
      return r.test(g.id + g.t)
    },
    handleRate: function (id, r) {
      if (!this.stars[id]) { this.stars[id] = 0 }
      if (this.stars[id] === r) {
        this.stars[id] = 0
      } else {
        this.stars[id] = r
      }
      localStorage.setItem('stars', JSON.stringify(this.stars))
      this.$forceUpdate()
    },
    loadStars: function () {
      try {
        this.stars = JSON.parse(localStorage.getItem('stars'))
      } catch (e) {}
    }
  },
  mounted () {
    if (this.checkJSON(localStorage.getItem('stars'))) {
      this.loadStars()
    } else {
      localStorage.setItem('stars', JSON.stringify(this.stars))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a.black {
  color: #000 !important;
}

.column .inner {
  min-height: 1.6em;
  padding: 1em 0;
}

#goban {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

@media only screen and (min-width: 600px) {
  .thin-only {
    display: none
  }
}

.ui.form.container {
  margin: 1em 0;
}

#fast {
  margin-top: .5em;
}

</style>
