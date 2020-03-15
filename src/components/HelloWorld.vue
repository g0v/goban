<template lang="pug">
  .hello
    h1.ui.header 網址集錦共同筆記
    h3.sub.header 搜尋或創建黑板，與他人分享
    .ui.button.group.thin-only(v-show="!iOS()")
      a.ui.orange.button(href="https://play.google.com/store/apps/details?id=tw.goban.app", target="_blank")
        i.google.play.icon
        | App on Google Play
      //a.ui.green.button(href="https://play.google.com/store/apps/details?id=tw.goban.app", target="_blank")
        i.app.store.icon
        | App on App Store
      | &nbsp;
    .ui.form.container
      .field
        input(v-autofocus="", type='search', name='', v-model='myKey', placeholder='搜尋或創建新黑板', autofocus='true', list="gs" @keydown.enter = "($router.push('/see/' + myKey + '/0/0'))")
        datalist#gs
          option(v-for = "g in gobans", v-bind:key = "g.id" :value="g.id") {{ g.id }}
        a.ui.green.button(@click='create(myKey)', v-if='myKey && !gobans[myKey]') 創建{{myKey}}
    .ui.segment.left.aligned.container(v-if="myKey")
      .ui.active.dimmer(v-if = "!gobans")
        .ui.text.loader Loading...
      .ui.grid
        .doubling.two.column.row
          .column#goban(v-for='g in gobans', :key='g.id')
            .inner(v-show="has(g, myKey)")
              a(v-for = "j in [1,2,3,4,5]" @click='handleRate(g.id, j)')
                sui-icon(name='star', :class="stars[g.id] >= j ? 'yellow' : 'gray'")
              router-link(:to="'update/' + g.id" , data-content="設定", title="設定")
                i.cogs.icon
              router-link(:to="'see/' + g.id + '/0/0'" )
                h2.ui.header(:style="{color: g.hex || '#42b983'}") {{ g.id }} - {{ g.t }}
              p 相關黑板:
                br
                router-link.r(v-for = "r in g.related", :key="r", :to="'see/' + r + '/0/0'" ) {{ r }}
    router-link.ui.green.large.button(to = "intro") 瞭解更多
      i.right.arrow.icon
    h3.ui.header 我的珍藏
    span(v-for = "g in gobans", :key='g.id')
      .inner(v-if = "stars[g.id] > 0")
        router-link(:to="'see/' + g.id + '/0/0'", :style="{color: g.hex || '#42b983'}") {{ g.id }} - {{ g.t }}
          i.right.arrow.icon
</template>

<script>
export default {
  data () {
    return {
      myKey: '',
      stars: {'goban_intro': 5}
    }
  },
  props: ['gobans'],
  localStorage: ['stars'],
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
    create: function (k) {
      this.$emit('create', k)
      this.$router.push('/see/' + k + '/0/new')
    },
    has: function (g, k) {
      var r = new RegExp(k)
      return r.test(g.id + g.t)
    },
    handleRate: function (g, r) {
      if (!this.stars[g]) { this.stars[g] = 0 }
      if (this.stars[g] === r) {
        this.stars[g] = 0
      } else {
        this.stars[g] = r
      }
      localStorage.setItem('stars', JSON.stringify(this.stars))
      this.$forceUpdate()
    },
    loadStars: function () {
      // localStorage.setItem('stars', JSON.stringify(this.stars))
      try {
        this.stars = JSON.parse(localStorage.getItem('stars'))
      } catch (e) {}
    }
  },
  mounted () {
    // this.loadStars()
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
a {
  color: #42b983;
}

.column .inner {
  min-height: 1.6em;
  padding: 1em 0;
}

#goban {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.r {
  margin: 0 1em;
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
