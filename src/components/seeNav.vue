<template lang="pug">
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
          sui-dropdown-item(@click="backupJSON($route.params.id, $route.params.lev, mydata, myName)")
            | JSON
          sui-dropdown-item(@click="backupCSV($route.params.id, $route.params.lev)")
            | CSV
      a.item(v-if='mydata && mydata[$route.params.index]', :href='mydata[$route.params.index].url', target='_blank', data-content="開新分頁", title="開新分頁")
        sui-icon(size='small', name='right arrow')
      a.item(v-if="$route.params.index == 'new'", :href="editURL()", target='_blank', data-content="編輯", title="編輯")
        | 編輯
        sui-icon(size='small', name='right arrow')
</template>

<script>

import backup from '../mixins/backup.js'

export default {
  name: 'SeeNav',
  mixins: [backup],
  data () {
    return {
    }
  },
  props: ['gobans', 'mydata', 'myName'],
  methods: {
    editURL: function () {
      var ans
      if (this.gobans && this.gobans[this.$route.params.id] && this.gobans[this.$route.params.id].use_lev) {
        ans = 'https://ethercalc.org/' + this.$route.params.id + this.$route.params.lev
      } else {
        ans = 'https://ethercalc.org/' + this.$route.params.id
      }
      return ans
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  iframe {
    width: 100%;
    height: calc(100vh - 100px)
  }
  #iframe {
    background-color: white !important;
  }
</style>
