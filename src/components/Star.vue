<template lang="pug">
  .hello
    vue-headful(title="珍藏@零時黑板", description="個人珍藏的零時黑板")
    h1.ui.header 我的珍藏
    .ui.form.container#myForm
      .field
        input(v-autofocus="", type='search', name='', v-model='myKey', placeholder='搜尋棋盤', autofocus='true', @keydown.enter = "$router.push(getFastRoute(g))")
    .ui.segment.left.aligned.container
      .ui.active.dimmer(v-if = "!gobans")
        .ui.text.loader Loading...
      .ui.grid
        .doubling.one.column.row
          #goban.column(v-for='g in gobans', :key='g.id')
            .inner(v-if = "stars[g.id] > 0" v-show="!myKey || has(g, myKey)")
              a(v-for = "j in [1,2,3,4,5]" @click = "handleRate(g.id, j)")
                sui-icon(name='star', :class="stars[g.id] >= j ? 'yellow' : 'gray'")
              router-link(:to="'update/' + g.id" , data-content="設定", title="設定")
                i.cogs.icon
              router-link(:to="getFastRoute(g)" )
                h2.ui.header(:style="{color: g.hex || '#42b983'}") {{ g.id }} - {{ g.t }}
              p 相關棋盤:
                br
                router-link.r(v-for = "r in g.related", :key="r", :to="'see/' + r + '/0/0'" ) {{ r }}
</template>

<script>

import mixin from '../mixins/mixin.js'
import star from '../mixins/stars.js'

export default {
  name: 'StarStar',
  data () {
    return {
      myKey: '',
      stars: {'goban_intro': 5}
    }
  },
  props: ['gobans'],
  mixins: [mixin, star],
  localStorage: ['stars'],
  methods: {
    has: function (g, k) {
      var r = new RegExp(k)
      return r.test(g.id)
    },
    create: function (k) {
      this.$emit('create', k)
      this.$router.push('/see/' + k + '/0/new')
    },
    handleRate: function (id, r) {
      var or = this.stars[id]
      if (!this.stars[id]) { this.stars[id] = 0 }
      if (this.stars[id] === r) {
        this.stars[id] = 0
      } else {
        this.stars[id] = r
      }
      localStorage.setItem('stars', JSON.stringify(this.stars))
      this.setStars(id, this.gobans[id], this.stars[id], or, this.starsFire[this.gobans[id]])
      this.$forceUpdate()
    },
    loadStars: function () {
      try {
        this.stars = JSON.parse(localStorage.getItem('stars'))
      } catch (e) {
        console.log(e)
      }
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

#myForm {
  margin-top: 2em;
  margin-bottom: 4em;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.column .inner {
  min-height: 1.6em;
  padding: 1em 0;
}

#goban {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

</style>
