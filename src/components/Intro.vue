<template>
  <div class="hello">
    <iframe src="https://hackmd.io/3pvyN_W9TjSsuBok4w2XYA?view"></iframe>
<!--    <vue-simple-markdown :source="someData"></vue-simple-markdown> -->
  </div>

</template>

<script>

export default {
  name: 'IntroIntro',
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
        console.log(response)
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

iframe {
  margin-top: -46px;
  margin-left: -48px;
  width: 100vw;
  height: 90vh;
}

</style>
