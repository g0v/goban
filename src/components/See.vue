<template lang="pug">
  .hello
    vue-headful(v-if = "gobans" :title="$route.params.id + ' > ' + $route.params.lev + '@知識棋盤'", description="gobans && gobans[$route.params.id].t")
    .ui.fixed.top.menu#navbar
      router-link.item(to='/', data-content="首頁", title="首頁")
        sui-icon(size='small', name='home')
      router-link.item(to='/star', data-content="珍藏", title="珍藏")
        sui-icon(size='small', name='star', :style="{color: stars[$route.params.id] ? '#F4D03F' : 'gray'}")
      router-link.item(:to = "'/update/' + $route.params.id", data-content="設定", title="設定")
        i.cogs.icon
      sui-dropdown.item(text = "相關", v-if='gobans && gobans[$route.params.id] && gobans[$route.params.id].id')
        sui-dropdown-menu
          sui-dropdown-item(v-for='r in gobans[$route.params.id].related', :key='r', @click="$router.push('/see/' + r + '/0/0')")
            | {{ r }}
      sui-dropdown.item(text = "等級", v-if='gobans && gobans[$route.params.id] && gobans[$route.params.id].use_lev')
        sui-dropdown-menu
          sui-dropdown-item(v-for='j in [0,1,2,3]', :key='j', @click="$router.push('/see/' + $route.params.id + '/' + j + '/0')")
            | 等級{{ j }}
      .right.menu
        a.item.fat-only(@click="backup($route.params.id, $route.params.lev)", data-content="備份", title="備份")
          i.cloud.download.icon
        a.item(v-if='mydata && mydata[$route.params.index]', :href='mydata[$route.params.index].url', target='_blank', data-content="開新分頁", title="開新分頁")
          sui-icon(size='small', name='right arrow')
        a.item(v-if="$route.params.index == 'new'", :href="editURL()", target='_blank', data-content="編輯", title="編輯")
          | 編輯
          sui-icon(size='small', name='right arrow')
    .ui.grid
      .four.wide.left.aligned.column
        .ui.list(v-if="gobans")
          router-link.item#e(:to="'/see/' + $route.params.id + '/' + $route.params.lev + '/new'", data-content="編輯", title="編輯")
            h3.ui.header#e-text()
              | {{myName || $route.params.id + $route.params.lev}}
              i#e-icon.inline.edit.large.icon
          hr
          .item(v-for='(d, index) in mydata', :key='index')
            div(v-if="d.type == 'link'", v-show='!d.parentIndex || mydata[d.parentIndex].open || d.parentIndex < 0')
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
        | 為「{{myName || $route.params.id}}」打星等:
        a(v-for = "j in [1,2,3,4,5]" @click='handleRate($route.params.id, j)')
          sui-icon(name='star', :class="stars[$route.params.id] >= j ? 'yellow' : 'gray'")
        iframe#iframe(v-if = "getSrc()" name='iframe', :src='getSrc()', alt="Loading...")
        .ui.active.dimmer(v-else)
          .ui.text.loader Loading...
</template>

<script>

import mixin from '../mixins/stars.js'

export default {
  name: 'See',
  data () {
    return {
      name: 'See',
      stars: {'goban_intro': 5}
    }
  },
  props: ['gobans', 'mydata', 'myName'],
  mixins: [mixin],
  watch: {
    $route (to, from) {
      this.reload()
    }
  },
  methods: {
    editURL: function () {
      var ans
      if (this.gobans && this.gobans[this.$route.params.id] && this.gobans[this.$route.params.id].use_lev) {
        ans = 'https://ethercalc.org/' + this.$route.params.id + this.$route.params.lev
      } else {
        ans = 'https://ethercalc.org/' + this.$route.params.id
      }
      return ans
    },
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
      if (lev === '_') {
        lev = ''
      }
      this.downloadObjectAsJson(this.mydata, this.myName + lev)
    },
    useLev: function (g) {
      if (!g) { return true }
      return g.use_lev
    },
    getSrc: function () {
      if (this.$route.params.index === 'new') {
        return 'https://ethercalc.org/' + this.$route.params.id + (this.$route.params.lev === '_' ? '' : this.$route.params.lev)
      } else {
        if (this.mydata[this.$route.params.index]) {
          return decodeURIComponent(this.mydata[this.$route.params.index].url)
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
    setData: function (id, lev, d) {
      this.$emit('setData', id, lev, d)
    },
    loadData: function (id) {
      this.$emit('loadData')
    },
    reload: function () {
      this.$emit('reload')
    },
    handleRate: function (id, r) {
      var or = this.stars[id]
      if (!this.stars[id]) { this.stars[id] = 0 }
      if (this.stars[id] === r) {
        this.stars[id] = 0
      } else {
        this.stars[id] = r
      }
      localStorage.setItem('stars', JSON.stringify(this.stars))
      this.setStars(id, (this.gobans && this.gobans[id]) || 'goban_intro', this.stars[id], or)
      this.$forceUpdate()
    },
    loadStars: function () {
      try {
        this.stars = JSON.parse(localStorage.getItem('stars'))
      } catch (e) {}
    }
  },
  mounted: function () {
    this.reload()
    if (this.checkJSON(localStorage.getItem('stars'))) {
      this.loadStars()
    } else {
      localStorage.setItem('stars', JSON.stringify(this.stars))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #e {
    margin: 0 1em;
  }
  #e-icon {
    margin-left: .2em;
    color: inherit;
  }
  .ui.fixed.top.menu {
    height: 48px;
    font-size: 18px;
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

  #iframe {
    background-color: white !important;
  }
</style>
