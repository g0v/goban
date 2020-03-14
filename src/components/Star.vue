<template lang="pug">
  .hello
    vue-headful(title="珍藏@零時黑板", description="個人珍藏的零時黑板")
    h1.ui.header 我的珍藏
    .ui.form.container
      .field
        input(v-autofocus="", type='search', name='', v-model='myKey', placeholder='搜詢黑板', autofocus='true', @keydown.enter = "($router.push('/see/' + myKey + '/0/0'))")
    .ui.segment.left.aligned.container
      .ui.active.dimmer(v-if = "!gobans")
        .ui.text.loader Loading...
      .ui.grid
        .doubling.one.column.row
          #goban.column(v-for='g in gobans', :key='g.id')
            .inner(v-if = "stars[g.id] > 0" v-show="!myKey || has(g, myKey)")
              a(v-for = "j in [1,2,3,4,5]")
                sui-icon(name='star', :style="stars[g.id] >= j ? 'yellow' : 'gray'")
              router-link(:to="'update/' + g.id" , data-content="設定", title="設定")
                i.cogs.icon
              router-link(:to="'see/' + g.id + '/0/0'" )
                h2.ui.header(:style="{color: g.hex || '#42b983'}") {{ g.id }} - {{ g.t }}
              p 相關黑板:
                br
                router-link.r(v-for = "r in g.related", :key="r", :to="'see/' + r + '/0/0'" ) {{ r }}
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
    has: function (g, k) {
      var r = new RegExp(k)
      return r.test(g.id)
    },
    create: function (k) {
      this.$emit('create', k)
      this.$router.push('/see/' + k + '/0/new')
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
      console.log(JSON.parse(localStorage.getItem('stars')))
      this.stars = JSON.parse(localStorage.getItem('stars'))
    }
  },
  mounted () {
    this.loadStars()
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

</style>
