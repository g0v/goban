<template lang="pug">
  .hello
    h1.ui.header 讓知識星棋羅列
    h3.sub.header 搜尋棋盤，共同筆記
    .ui.form.container#myForm
      .field
        input(v-autofocus="", type='search', name='', v-model='myKey', placeholder='搜尋棋盤', autofocus='true', list="gs" @keydown.enter = "($router.push('/see/' + myKey + '/0/0'))")
        datalist#gs
          option(v-for = "g in gobans", v-bind:key = "g.id" :value="g.id") {{ g.id }}
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
              router-link(:to="getFastRoute(g)" )
                h2.ui.header(:style="{color: g.hex || '#42b983'}") {{ g.id }} - {{ g.t }}({{starsFire[g.id] || 0}}顆星)
              p 相關黑板:
                br
                router-link.r(v-for = "r in g.related", :key="r", :to="getFastRoute(g)" ) {{ r }}
      i.right.arrow.icon
    .ui.divider
    .ui.grid
      .ui.two.column.row
        .column
          h3.ui.header 快速前往
          span(v-for = "g in gobans", :key='g.id')
            .inner(v-if = "stars[g.id] > 0")
              router-link(:to="getFastRoute(g)", :style="{color: g.hex || '#42b983'}") {{ g.id }} - {{ g.t }}
                i.right.arrow.icon
        .colmun
          h3.ui.header 人氣黑板
          span(v-for = "g in gobans", :key='g.id')
            .inner(v-if = "starsFire[g.id] > 5")
              router-link(:to="getFastRoute(g)", :style="{color: g.hex || '#42b983'}") {{ g.id }} - {{ g.t }}({{starsFire[g.id]}}顆星)
                i.right.arrow.icon
</template>

<script>

import mixin from '../mixins/mixin.js'
import ss from '../mixins/stars.js'

export default {
  name: 'ListList',
  data () {
    return {
      navigator: navigator,
      myKey: '',
      stars: {'goban_intro': 5}
    }
  },
  props: ['gobans', 'starsFire'],
  mixins: [mixin, ss],
  methods: {
    create: function (k) {
      this.$emit('create', k)
      this.$router.push('/see/' + k + '/0/new')
    },
    has: function (g, k) {
      var r = new RegExp(k)
      return r.test(g.id + g.t)
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
