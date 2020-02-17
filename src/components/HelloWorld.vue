<template lang="pug">
  .hello
    h1.ui.header 零時黑板
    h3.sub.header 網址分享的好工具
    .ui.form.container
      .field
        input(v-autofocus="dynamicvalue", type='search', name='', v-model='myKey', placeholder='搜詢黑板', autofocus='true')
        a.ui.green.button(@click='create(myKey)', v-if='myKey') 創建{{myKey}}
    .ui.segment.left.aligned.container
      .ui.grid
        .four.wide.doubling.column(v-for='g in Object.keys(gobans)', :key='g', v-show='!myKey || g.match(new RegExp(myKey))')
          router-link(:to="'see/' + g + '/0/0'")
            img(src='/static/favicon.png')
            |             {{ g }}
          a(@click='handleRate(g, 5)')
            sui-icon(name='star', :class="stars[g] ? 'yellow' : 'gray'")
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
    handleRate: function (g, r) {
      if (!this.stars[g]) { this.stars[g] = 0 }
      this.stars[g] += r
      if (this.stars[g] === 10) { this.stars[g] = 0 }
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

</style>
