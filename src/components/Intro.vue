<template lang="pug">
  .hello
    h1.ui.header 如何使用
    iframe(width="560" height="315" src="https://www.youtube.com/embed/mWbvcHlGCOg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)
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
      this.$localStorage.set('stars', this.stars)
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
.column {
  min-height: 1.6em;
}

</style>
