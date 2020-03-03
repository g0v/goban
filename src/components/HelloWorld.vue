<template lang="pug">
  .hello
    h1.ui.header 零時黑板
    h3.sub.header 網址分享的好工具
    .ui.button.group.thin-only
      a.ui.orange.button(href="https://play.google.com/store/apps/details?id=tw.goban.app", target="_blank")
        i.google.play.icon
        | Google Play
      a.ui.green.button(href="https://play.google.com/store/apps/details?id=tw.goban.app", target="_blank")
        i.app.store.icon
        | App Store
      | &nbsp;
    router-link.ui.green.button(to = "intro") 瞭解更多
      i.right.arrow.icon
    .ui.form.container
      .field
        input(v-autofocus="", type='search', name='', v-model='myKey', placeholder='搜詢黑板', autofocus='true')
        a.ui.green.button(@click='create(myKey)', v-if='myKey && !gobans[myKey]') 創建{{myKey}}
    .ui.segment.left.aligned.container
      .ui.grid
        .doubling.two.column.row
          .column(v-for='g in gobans', :key='g.id')
            .inner(v-show="!myKey || has(g, myKey)")
              a(v-for = "j in [1,2,3,4,5]" @click='handleRate(g.id, j)')
                sui-icon(name='star', :class="stars[g.id] >= j ? 'yellow' : 'gray'")
              router-link(:to="'see/' + g.id + '/0/0'" )
                h2.ui.header(:style="{color: g.hex || '#42b983'}") {{ g.id }}
                  .sub.header - {{ g.t }}
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
  localStorage: {
    stars: {'goban_intro': 5}
  },
  methods: {
    create: function (k) {
      this.$emit('create', k)
      this.$router.push('/see/' + k + '/0/new')
    },
    has: function (g, k) {
      var r = new RegExp(k)
      return r.test(g.id)
    },
    handleRate: function (g, r) {
      if (!this.stars[g]) { this.stars[g] = 0 }
      if (this.stars[g] === r) {
        this.stars[g] = 0
      } else {
        this.stars[g] = r
      }
      this.$localStorage.set('stars', JSON.stringify(this.stars))
      this.$forceUpdate()
    },
    loadStars: function () {
      console.log(JSON.parse(this.$localStorage.get('stars')))
      this.stars = JSON.parse(this.$localStorage.get('stars'))
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
.yellow {
  color: yellow;
}
.gray {
  color: gray;
}
.ui.grid > .doubling.row > .column, .ui.doubling.grid > .row > .column {
  padding: 0 !important;
}
.column .inner {
  min-height: 1.6em;
  padding: 1em 0;
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

</style>
