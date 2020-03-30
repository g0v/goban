<template lang="pug">
  .hello()
    vue-headful(v-if = "gobans" :title="$route.params.id + ' > ' + '@知識棋盤'", description="gobans && gobans[$route.params.id].t")
    .ui.fixed.top.menu#navbar.no-print
      router-link.item(to='/', data-content="首頁", title="首頁")
        sui-icon(size='small', name='home')
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
        sui-dropdown.item(icon="cloud download", data-content="備份", title="備份")
          sui-dropdown-menu
            sui-dropdown-item(@click="backupJSON($route.params.id, $route.params.lev)")
              | JSON
            sui-dropdown-item(@click="backupCSV($route.params.id, $route.params.lev)")
              | CSV
        a.item(v-if='mydata && mydata[$route.params.index]', :href='mydata[$route.params.index].url', target='_blank', data-content="開新分頁", title="開新分頁")
          sui-icon(size='small', name='right arrow')
        a.item(v-if="$route.params.index == 'new'", :href="editURL()", target='_blank', data-content="編輯", title="編輯")
          | 編輯
          sui-icon(size='small', name='right arrow')
    .ui.grid.no-print
      .ui.row
        span(style = "margin-left: 1em;")
          strong 打星等
            img#qr(:src = "getQR()", alt = "$route.params.id + ' @ 知識棋盤'")
          br
          | (目前
          | {{starsFire[$route.params.id]}}顆星)
        br.thin-only
        a(v-for = "j in [1,2,3,4,5]" @click='handleRate($route.params.id, j)' v-if = "stars")
          sui-icon(name='star', :class="stars[$route.params.id] >= j ? 'yellow' : 'gray'")
      .left.aligned.column(:class = " windowwidth > 500 ? 'four wide column' : 'fourteen wide column' ")
        .ui.link.relaxed.list(v-if="gobans")
          a.item#e(:href="editURL()", :target="getTarget()")
            h3.ui.header#e-text(v-show = "$route.params.id")
              | {{myName || $route.params.id + ($route.params.lev || '')}}
              i#e-icon.inline.edit.icon
          hr
          .item(v-for='(d, index, order) in mydata', :key='index')
            div(v-if="d.type == 'link'", v-show='!d.parentIndex || mydata[d.parentIndex].open || d.parentIndex < 0' :class = "order = $route.params.index ? 'active' : ''")
              span(v-if='d.parentIndex')
              a.link(:href='decodeURIComponent(d.url)', target='_blank', v-if="tar(d) == '_blank'" @click="pushRoute(gobans[$route.params.id].use_lev, index)")
                | {{ decodeURIComponent(d.name) }}
                span.note(v-if="d.note2") {{ d.note2 }}
                img.favicon.floating.right(:src="'https://www.google.com/s2/favicons?domain=' + d.url")
                sui-icon.floating.right(name='right arrow')
              a.link(v-else='', :href='decodeURIComponent(d.url)', :target='getTarget()' @click="pushRoute(gobans[$route.params.id].use_lev, index)")
                | {{ decodeURIComponent(d.name) }}
                span.note(v-if="d.note2") {{ d.note2 }}
                img.favicon.floating.right(:src="'https://www.google.com/s2/favicons?domain=' + d.url")
                sui-icon.floating.right(v-if = "windowwidth < 500" , name='right arrow')
            div(v-if="d.type == 'folder'")
              a(@click='d.open = !d.open')
                | {{decodeURIComponent(d.name)}}
                span.note(v-if="d.note2") {{ d.note2 }}
                img.ui.mini.image(src='/static/images/isClosed.png', v-show='!d.open')
                img.ui.mini.image(src='/static/images/isOpen.png', v-show='d.open')
      div.no-print(v-if ="starsFire" v-show = "windowwidth > 500", :class = " windowwidth > 500 ? 'twelve wide column' : 'zero wide column' ")
        iframe#iframe.no-print(v-if = "getSrc()" name='iframe', :src='getSrc()', alt="Loading...")
        .ui.active.dimmer(v-else)
          .ui.text.loader Loading...
    .print-only
      h1.ui.header {{ $route.params.id }} @ 知識棋盤
      img#qr(:src = "getQR()", alt = "$route.params.id + ' @ 知識棋盤'")
      h1.ui.header {{ getURL() }}
</template>

<script>

import mixin from '../mixins/mixin.js'
import ss from '../mixins/stars.js'

export default {
  name: 'See',
  data () {
    return {
      windowwidth: window.innerWidth,
      name: 'See',
      stars: {'goban_intro': 5}
    }
  },
  props: ['gobans', 'mydata', 'myName', 'starsFire'],
  mixins: [ss, mixin],
  methods: {
    getTarget (windowwidth) {
      if (this.windowwidth < 500) {
        return '_blank'
      } else {
        return 'iframe'
      }
    },
    pushRoute (useLev, idx) {
      console.log('pushRoute')
      console.log(idx)
      this.$router.push(this.getNewRoute(useLev, idx))
    },
    onResize () {
      this.windowwidth = window.innerWidth
      this.$emit('onResize', window.innerWidth)
    },
    getURL: function () {
      return encodeURIComponent('http://goban.tw/#/s/' + this.$route.params.id + '/0')
    },
    getQR: function () {
      var url = this.getURL()
      var ans = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&choe=UTF-8&chl=' + url
      console.log(ans)
      return ans
    },
    getNewRoute: function (useLev, idx) {
      var ans
      if (useLev) {
        ans = '/see/' + this.$route.params.id + '/' + this.$route.params.lev + '/' + idx
      } else {
        ans = '/s/' + this.$route.params.id + '/' + idx
      }
      return ans
    },
    getRoute: function (useLev) {
      var ans
      if (useLev) {
        ans = '/see/' + this.$route.params.id + '/' + this.$route.params.lev + '/new'
      } else {
        ans = '/s/' + this.$route.params.id + '/new'
      }
      return ans
    },
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
    backupJSON: function (id, lev) {
      if (lev === '_' || !lev) {
        lev = ''
      }
      this.downloadObjectAsJson(this.mydata, this.myName + lev)
    },
    backupCSV: function (id, lev) {
      if (lev === '_' || !lev) {
        lev = ''
      }
      window.open('https://ethercalc.org/' + id + lev + '.csv', '_blank')
    },
    useLev: function (g) {
      if (!g) { return true }
      return g.use_lev
    },
    getSrc: function () {
      if (this.$route.params.index === 'new') {
        return 'https://ethercalc.org/' + this.$route.params.id + (this.$route.params.lev || '')
      } else {
        if (!this.mydata[0]) { return undefined }
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
    handleRate: function (id, r) {
      var or = this.stars[id]
      if (!this.stars[id]) { this.stars[id] = 0 }
      if (this.stars[id] === r) {
        this.stars[id] = 0
      } else {
        this.stars[id] = r
      }
      localStorage.setItem('stars', JSON.stringify(this.stars))
      this.setStars(id, (this.gobans && this.gobans[id]) || 'goban_intro', this.stars[id], or, this.starsFire[id])
      this.$forceUpdate()
    },
    loadStars: function () {
      try {
        this.stars = JSON.parse(localStorage.getItem('stars'))
      } catch (e) {}
    },
    reload: function () {
      this.$emit('reload', true, this.$route, null)
    }
  },
  mounted: function () {
    if (this.checkJSON(localStorage.getItem('stars'))) {
      this.loadStars()
    } else {
      localStorage.setItem('stars', JSON.stringify(this.stars))
    }
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
    this.reload()
  },
  watch: {
    windowwidth (newWidth, oldWidth) {
      this.txt = `it changed to ${newWidth} from ${oldWidth}`
    },
    gobans (n, o) {
      this.reload()
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #e {
    margin: 0;
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
  .favicon {
    filter: grayscale(100%) brightness(150%);
    background-color: white;
    border-radius: 50%;
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

  span.note {
    background-color: gray;
    border-radius: 5px;
    display: inline-block;
    padding: .2em .5em;
    margin-left: .5em;
  }
</style>
