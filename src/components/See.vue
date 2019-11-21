<template>
  <div class="hello">
    <div class="ui fixed top menu">
      <router-link class = "item" to = "/">
        <sui-icon size="small" name="home" /> home
      </router-link>
    </div>
    <div id = "side">
      <sui-list>
        <sui-list-item>
          <a :href="'https://ethercalc.org/' + $route.params.id + '0'" target="iframe">{{$route.params.id}}</a>
        </sui-list-item>
        <hr/>
        <sui-list-item v-for = "d in data" :key = "d" v-if = "d[0]">
          <a :href="d[0]" :target="tar(d[2])">{{ d[1] }}</a>
        </sui-list-item>
      </sui-list>
    </div>
    <div id = "main">
      <iframe id = "iframe" name="iframe" :src="'https://ethercalc.org/' + $route.params.id + '0'">
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'See',
  data () {
    return {
      data: []
    }
  },
  props: ['gobans'],
  methods: {
    tar: function (x) {
      if (x === '{"target":"blank"}') {
        return '_blank'
      } else {
        return 'iframe'
      }
    }
  },
  mounted () {
    // GET /someUrl
    this.$http.get('https://ethercalc.org/' + this.$route.params.id + '0.csv.json').then(response => {
      // get body data
      this.data = response.body
    }, response => {
      console.log(response)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #side {
    width: 200px;
    float: left;
  }
  #main {
    width: calc(100% - 200px);
    float: right;
  }
  iframe {
    width: 100%;
    height: calc(100vh - 100px)
  }
</style>
