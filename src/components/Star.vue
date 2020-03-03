<template lang="pug">
  .hello
    h1.ui.header 我的珍藏
    h3.sub.header 我珍藏的黑板
    .ui.form.container
      .field
        input(v-autofocus="", type='search', name='', v-model='myKey', placeholder='搜詢黑板', autofocus='true')
    .ui.segment.left.aligned.container
      .ui.grid
        .doubling.two.column.row
          .column(v-for='g in gobans', :key='g.id')
            .inner(v-if = "stars[g.id] > 0" v-show="!myKey || has(g, myKey)")
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

</style>
