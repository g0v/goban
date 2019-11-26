<template>
  <div class="hello">
    <h1 class="ui header">我的珍藏</h1>
    <h3 class="sub header">我珍藏的黑板</h3>
    <div class="ui form container">
      <div class="field">
        <input type="search" name="" v-model="myKey" placeholder="搜詢黑板" autofocus="true" />
        <a class="ui green button" @click="create(myKey)" v-if ="myKey">創建{{myKey}}</a>
      </div>
    </div>
    <div class="ui segment left aligned container">
      <div class="ui grid">
        <div class="four wide doubling column" v-for = "g in Object.keys(gobans)" :key = "g" v-if = "stars[g] > 0" v-show = "!myKey || g.match(new RegExp(myKey))">
          <router-link :to = "'see/' + g + '/0/0'">
            <img src="/static/favicon.png">
            {{ g }}
          </router-link>
          <a @click = "handleRate(g, 5)">
            <sui-icon name ="star" :class = "stars[g] ? 'yellow' : 'gray'"/>
          </a>
        </div>
      </div>
    </div>
  </div>
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

</style>
