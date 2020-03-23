<template>
  <div class="hello">
    <h1>何謂知識棋盤</h1>
    <h3>傳說，昔帝堯之子丹朱頑兇好訟，不受教誨，帝堯乃法天地陰陽之像，造棋以教丹朱</h3>
    <vue-simple-markdown :source="someData"></vue-simple-markdown>
  </div>

</template>

<script>

export default {
  data () {
    return {
      someData: undefined
    }
  },
  methods: {
    readMe () {
      var vm = this
      this.$http.get('https://raw.githubusercontent.com/g0v/goban/master/README.md').then(response => {
        // get body data
        // console.log(response.body)
        vm.someData = response.body
      }, response => {
        // error callback
      })
    }
  },
  mounted () {
    this.readMe()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hello {
  font-size: 16px;
  text-align: left;
  padding: 1em 3em;
}

</style>
