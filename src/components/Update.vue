<template lang="pug">
  .ui.container
    vue-headful(:title="'更新' + $route.params.id", :description="'更新' + $route.params.id")
    .ui.grid
      .ui.row
        h2.ui.header(:style="{color: hex || 'black'}") 更新{{ $route.params.id }}
      .ui.row
        .ui.form
          .field
            .ui.labeled.input
              .ui.label 色碼:
              input.my-picker(v-model='hex', type='search', name='', list="cs")
              datalist#cs
                option(v-for = "c in colors", v-bind:key = "c", :value = "c") {{ c }}
              .ui.label(:style="{'background-color': hex}") &nbsp;&nbsp;
            .ui.labeled.input
              .ui.label 簡介:
              input(type='text' name='' v-model='gobans[$route.params.id].t' placeholder='輸入棋盤的簡介' autofocus='true')
          //.field
            .ui.checkbox
              input(type="checkbox" name="use_lev" v-model = "use_lev")
              <label>使用等級(取消的話將會連到不同的資料網址)</label>
      .ui.two.column.row
        .column 相關棋盤： {{myRelated }}
        .column(v-for='g in gobans' v-bind:key='g.id')
          a(@click='adRel(g.id)' :class="myRelated.indexOf(g.id) > -1 ? 'yellow' : 'gray'")
            | {{ g.id }} -- {{ g.t }}
      .ui.row
        .ui.button.group
          a.ui.blue.huge.button( @click="updateGoban(uid)", v-if='$route.params.id && uid') {{ '更新' + $route.params.id }}
          router-link.ui.green.huge.button(:to="'/see/'+ $route.params.id + '/0/0'") {{ '前往' + $route.params.id }}
</template>

<script>
import mixin from '../mixins/mixin.js'

export default {
  name: 'PageIndex',
  props: ['gobans', 'uid'],
  mixins: [mixin],
  data () {
    return {
      myRelated: [],
      myTags: [],
      hex: 'green',
      colors: ['white', 'yellow', 'red', 'green', 'blue', 'black', 'orange', 'brown', 'purple'],
      stars: { goban_intro: 5 }
    }
  },
  methods: {
    adRel: function (id) {
      if (this.myRelated.indexOf(id) > -1) {
        this.myRelated = this.myRelated.filter(function (o) {
          return o !== id
        })
      } else { this.myRelated.push(id) }
    },
    updateGoban: function (uid) {
      if (!uid) {
        window.alert('請先登入')
        return
      }
      this.create(
        this.$route.params.id,
        { t: this.gobans[this.$route.params.id].t,
          related: this.myRelated,
          tags: this.myTags,
          hex: this.hex,
          use_lev: this.use_lev,
          data: [0, 1, 2, 3]
        })
      window.alert('更新成功')
    },
    reload: function () {
      this.$emit('reload')
    },
    getMyRelated: function () {
      var id = this.$route.params.id
      return this.gobans[id].related.slice()
    },
    getHex: function () {
      var id = this.$route.params.id
      return this.gobans[id].hex
    },
    getUseLev: function () {
      var id = this.$route.params.id
      return this.gobans[id].use_lev
    }
  },
  mounted () {
    this.myRelated = this.getMyRelated()
    this.hex = this.getHex()
    this.use_lev = this.getUseLev()
  }
}
</script>

<style type="text/css" scoped="">
.yellow {
  color: #dd0;
}
.gray {
  color: #ccc;
}
.ui.header {
  margin-left: 1em;
}

</style>
