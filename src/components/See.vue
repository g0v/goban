<template>
  <div class="hello">
    <div class="ui fixed top menu">
      <router-link class = "item" to = "/">
        <sui-icon size="small" name="home" /> home
      </router-link>
      <router-link class = "item" v-for = "j in [0,1,2,3]" :key = "j" :to = "'/see/' + $route.params.id + '/' + j + '/0'">
        {{ j }}
      </router-link>
      <div class="right menu">
        <a v-if = "data[$route.params.index]" class = "item" :href="data[$route.params.index].url" target="_blank">
          <sui-icon size="small" name="right arrow" /> 開新頁籤
        </a>
        <a v-if = "$route.params.index == 'new'" class = "item" :href="'https://ethercalc.org/' + $route.params.id + $route.params.lev" target="_blank">
          <sui-icon size="small" name="right arrow" /> 開新頁籤
        </a>
      </div>
    </div>
    <div class="ui grid">
      <div class="four wide right aligned column">
        <div class="ui list">
          <div class = "item">
            <router-link :to = "'/see/' + $route.params.id + '/' + $route.params.lev + '/new'">
              <img :src="'https://www.google.com/s2/favicons?domain=https://ethercalc.org/'">
              {{name || $route.params.id + $route.params.lev}}
            </router-link>
          </div>
          <hr/>
          <div class = "item" v-for = "(d, index) in data" :key = "d.name">
            <div v-if = "d.type == 'link'" v-show = "!d.parentIndex || data[d.parentIndex].open">
              <span v-if = "d.parentIndex">&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <a :href="d.url" target="_blank" v-if = "tar(d) == '_blank'"><img :src="'https://www.google.com/s2/favicons?domain=' + d.url">{{ d.name }}<sui-icon name = "right arrow"/>
              </a>
              <router-link v-else :to = "'/see/' + $route.params.id + '/' + $route.params.lev + '/' + index">
              <img :src="'https://www.google.com/s2/favicons?domain=' + d.url">{{ d.name }}</router-link>
            </div>
            <div v-if = "d.type == 'folder'">
              <a @click = "d.open = !d.open">
                {{d.name}}
                <img class = "ui mini image" src="/static/images/isClosed.png" v-show = "!d.open">
                <img class = "ui mini image" src="/static/images/isOpen.png" v-show = "d.open">
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="twelve wide column" @mouseout = "reload()">
        <iframe id = "iframe" name="iframe" :src="getSrc()">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'See',
  data () {
    return {
      data: [],
      name: ''
    }
  },
  props: ['gobans'],
  watch: {
    $route (to, from) {
      this.reload()
    }
  },
  methods: {
    getSrc: function () {
      if (this.$route.params.index === 'new') {
        return 'https://ethercalc.org/' + this.$route.params.id + this.$route.params.lev
      } else {
        if (this.data[this.$route.params.index]) {
          return this.data[this.$route.params.index].url
        }
      }
      return undefined
    },
    tar: function (x) {
      if ((x.note + '').match(/blank/)) {
        return '_blank'
      } else {
        return 'iframe'
      }
    },
    reload: function () {
      console.log('reload...')
      // GET /someUrl
      this.$http.get('https://ethercalc.org/' + this.$route.params.id + this.$route.params.lev + '.csv.json').then(response => {
        // get body data
        this.data = this.parse(response.body)
        this.$forceUpdate()
      }, response => {
        console.log(response)
      })
    },
    parse: function (d) {
      this.name = d[1][1]
      var ans = d.slice(2)
      var idx
      ans = ans.map(function (l) {
        var obj = {}
        obj.name = l[1]
        obj.url = l[0].replace('%20', '').replace(' ', '')
        obj.note = l[2]
        return obj
      }).filter(function (o) {
        return o.name
      }).map(function (obj, index) {
        if (!obj.url) {
          obj.type = 'folder'
          obj.open = true
          if ((obj.note + '').match(/close/)) {
            obj.open = false
          }
          idx = index
        } else {
          obj.type = 'link'
          obj.parentIndex = idx
        }
        return obj
      })
      console.log(ans)
      return ans
    }
  },
  mounted () {
    this.reload()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  iframe {
    width: 100%;
    height: calc(100vh - 100px)
  }
  .ui.mini.image {
    display: inline;
    width: 1.5em;
    height: 1.5em;
  }
</style>
