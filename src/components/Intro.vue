<template>
  <div class="hello">
    <vue-markdown id ="readme"> {{ someData }} </vue-markdown>
  </div>

</template>

<script>

import VueMarkdown from 'vue-markdown'

export default {
  data () {
    return {
      someData: '零時黑板(Goban)也是g0v社群的開源專案之一。是一個類似hackfoldr的「黑客公事包」'
    }
  },
  components: {
    VueMarkdown
  },
  methods: {
    readMe () {
      this.$http.get('https://raw.githubusercontent.com/g0v/goban/master/README.md').then(response => {
        // get body data
        this.someData = response.body
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

</style>
