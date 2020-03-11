<template lang="pug">
  .hello
    .ui.fixed.top.menu#navbar
      router-link.item(to='/', data-content="首頁", title="首頁")
        sui-icon(size='small', name='home')
      router-link.item(:to = "'/update/' + $route.params.id", data-content="設定", title="設定")
        i.cogs.icon
      sui-dropdown.item(text = "相關")
        sui-dropdown-menu(v-if='gobans[$route.params.id] && gobans[$route.params.id].id')
          sui-dropdown-item(v-for='r in gobans[$route.params.id].related', :key='r', @click="$router.push('/see/' + r + '/0/0')")
            | {{ r }}
      sui-dropdown.item(text = "等級")
        sui-dropdown-menu
          sui-dropdown-item(v-for='j in [0,1,2,3]', :key='j', @click="$router.push('/see/' + $route.params.id + '/' + j + '/0')")
            | 等級{{ j }}
      .right.menu
        a.item.fat-only(@click="backup($route.params.id, $route.params.lev)", data-content="備份", title="備份")
          i.cloud.download.icon
        a.item(v-if='data[$route.params.index]', :href='data[$route.params.index].url', target='_blank', data-content="開新分頁", title="開新分頁")
          | 新頁
          sui-icon(size='small', name='right arrow')
        a.item(v-if="$route.params.index == 'new'", :href="'https://ethercalc.org/' + $route.params.id + $route.params.lev", target='_blank', data-content="編輯", title="編輯")
          | 編輯
          sui-icon(size='small', name='right arrow')
    .ui.grid
      .four.wide.left.aligned.column
        .ui.list
          router-link.item(:to="'/see/' + $route.params.id + '/' + $route.params.lev + '/new'", data-content="編輯", title="編輯")
            img.fat-only(:src="'https://www.google.com/s2/favicons?domain=https://ethercalc.org/'")
            span(:style="{color: gobans[$route.params.id].hex || 'blue'}") {{name || $route.params.id + $route.params.lev}}
            i.inline.edit.large.icon(:style="{color: gobans[$route.params.id].hex || 'blue'}")
          hr
          .item(v-for='(d, index) in data', :key='d.name + index')
            div(v-if="d.type == 'link'", v-show='!d.parentIndex || data[d.parentIndex].open')
              span(v-if='d.parentIndex')
              a.link(:href='decodeURIComponent(d.url)', target='_blank', v-if="tar(d) == '_blank'")
                | {{ decodeURIComponent(d.name) }}
                img.floating.right(:src="'https://www.google.com/s2/favicons?domain=' + d.url")
                sui-icon(name='right arrow')
              router-link.link(v-else='', :to="'/see/' + $route.params.id + '/' + $route.params.lev + '/' + index")
                | {{ decodeURIComponent(d.name) }}
                img.floating.right(:src="'https://www.google.com/s2/favicons?domain=' + decodeURIComponent(d.url)")
            div(v-if="d.type == 'folder'")
              a(@click='d.open = !d.open')
                | {{decodeURIComponent(d.name)}}
                img.ui.mini.image(src='/static/images/isClosed.png', v-show='!d.open')
                img.ui.mini.image(src='/static/images/isOpen.png', v-show='d.open')
      .twelve.wide.column(@mouseout='reload()')
        iframe#iframe(v-if = "getSrc()" name='iframe', :src='getSrc()', alt="Loading...")
        .ui.active.dimmer(v-else)
          .ui.text.loader Loading...
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
    downloadObjectAsJson: function (exportObj, exportName) {
      var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj))
      var downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', dataStr)
      downloadAnchorNode.setAttribute('download', exportName + '.json')
      document.body.appendChild(downloadAnchorNode) // required for firefox
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    },
    backup: function (id, lev) {
      this.downloadObjectAsJson(this.data, this.name + lev)
    },
    getSrc: function () {
      if (this.$route.params.index === 'new') {
        return 'https://ethercalc.org/' + this.$route.params.id + this.$route.params.lev
      } else {
        if (this.data[this.$route.params.index]) {
          return decodeURIComponent(this.data[this.$route.params.index].url)
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
  .ui.fixed.top.menu {
    height: 48px;
  }
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
  .ui.dropdown {
    position: relative;
  }

  .inline {
    display: inline !important;
    color: blue !important;
  }

  .ui.active.dimmer {
    height: 100vh;
  }

  a.link {
    margin-left: 1em;
  }

  i.inline.edit.icon {
    margin-left: 0.5em;
  }

  @media screen and (max-width: 420px) {
    a.link {
      margin-left: 0;
    }

    i.inline.edit.icon {
      margin-left: 0;
    }
  }
</style>
