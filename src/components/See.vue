<template lang="pug">
  .hello
    .ui.fixed.top.menu
      router-link.item(to='/')
        sui-icon(size='small', name='home')
          | home
      router-link.item(v-for='j in [0,1,2,3]', :key='j', :to="'/see/' + $route.params.id + '/' + j + '/0'")
        | {{ j }}
      .right.menu
        a.item(v-if='data[$route.params.index]', :href='data[$route.params.index].url', target='_blank')
          sui-icon(size='small', name='right arrow')
            | 開新頁籤
        a.item(v-if="$route.params.index == 'new'", :href="'https://ethercalc.org/' + $route.params.id + $route.params.lev", target='_blank')
          sui-icon(size='small', name='right arrow')
            | 開新頁籤
    .ui.grid
      .four.wide.left.aligned.column
        .ui.list
          router-link.item(:to="'/see/' + $route.params.id + '/' + $route.params.lev + '/new'")
              img(:src="'https://www.google.com/s2/favicons?domain=https://ethercalc.org/'")
              | {{name || $route.params.id + $route.params.lev}}
          hr
          .item(v-for='(d, index) in data', :key='d.name')
            div(v-if="d.type == 'link'", v-show='!d.parentIndex || data[d.parentIndex].open')
              span(v-if='d.parentIndex')
              a(:href='d.url', target='_blank', v-if="tar(d) == '_blank'")
                | {{ d.name }}
                img.floating.right(:src="'https://www.google.com/s2/favicons?domain=' + d.url")
                sui-icon(name='right arrow')
              router-link(v-else='', :to="'/see/' + $route.params.id + '/' + $route.params.lev + '/' + index")
                | {{ d.name }}
                img.floating.right(:src="'https://www.google.com/s2/favicons?domain=' + d.url")
            div(v-if="d.type == 'folder'")
              a(@click='d.open = !d.open')
                | {{d.name}}
                img.ui.mini.image(src='/static/images/isClosed.png', v-show='!d.open')
                img.ui.mini.image(src='/static/images/isOpen.png', v-show='d.open')
      .twelve.wide.column(@mouseout='reload()')
        iframe#iframe(name='iframe', :src='getSrc()')
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
        this.data = []
        this.$router.push('/see/' + this.$route.params.id + '/' + this.$route.params.lev + '/new')
      })
    },
    parse: function (d) {
      if (d[1]) { this.name = d[1][1] }
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
  .list .item {
    padding-left: 1em;
  }
  .floating.right {
    float: right;
  }
</style>
