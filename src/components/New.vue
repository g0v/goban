<template lang="pug">
  .hello
    h1.ui.header 讓知識星棋羅列
    h3.sub.header 網址集錦共同筆記
    .ui.buttons(v-if="!user")
      a.ui.orange.button(@click="loginGoogle()")
        i.google.icon
        | 以Google登入
      .or
      a.ui.blue.button(@click="tryIt()")
        i.lab.icon
        | 試用
    .ui.vertical.buttons(v-if="user")
      router-link.ui.inverted.huge.button(to = "/list")
        i.search.icon
        | 搜尋
      router-link.ui.inverted.huge.button(to = "/create")
        i.user.add.icon
        | 創建
      router-link.ui.inverted.huge.button(to = "/star")
        i.user.star.icon
        | 珍藏
      router-link.ui.inverted.huge.button(to = "/intro")
        i.question.icon
        | 介紹
    .ui.divider
    .ui.grid
      .ui.one.column.row
        .column
          h3.ui.header 快速前往
          span(v-for = "(g, idx, order) in gobans", :key='order')
            .inner(v-if = "stars[g.id] > 0")
              router-link(:to="getFastRoute(g)", :style="{color: g.hex || '#42b983'}") {{ g.id }} - {{ g.t }}
                i.right.arrow.icon
          h3.ui.header 人氣棋盤
          span(v-for = "(g, idx) in gobans", :key='idx')
            .inner(v-if = "starsFire && starsFire[g.id] > 5")
              router-link(:to="getFastRoute(g)", :style="{color: g.hex || '#42b983'}") {{ g.id }} - {{ g.t }}({{starsFire[g.id]}}顆星)
                i.right.arrow.icon
</template>

<script>

import mixin from '../mixins/mixin.js'
import ss from '../mixins/stars.js'

export default {
  data () {
    return {
      navigator: navigator,
      myKey: '',
      stars: {'goban_intro': 5}
    }
  },
  props: ['gobans', 'user', 'starsFire'],
  mixins: [mixin, ss],
  methods: {
    tryIt: function () {
      this.$emit('tryIt')
    },
    loginGoogle: function () {
      this.$emit('loginGoogle')
    },
    create: function (k) {
      this.$emit('create', k)
      this.$router.push('/see/' + k + '/0/new')
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

.ui.vertical.buttons .button:hover {
  color: black !important;
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
