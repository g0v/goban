<template lang="pug">
  .ui.container
    .ui.grid
      .ui.row
        h2.ui.header(:style="{color: hex || 'c9c9c9'}") 更新{{ $route.params.id }}
      .ui.row
        .ui.form
          .field
            .ui.labeled.input
              .ui.label 色碼:
              input.my-picker(v-model='hex' no-header='' no-footer='')
            .ui.labeled.input
              .ui.label 簡介:
              input(type='text' name='' v-model='gobans[$route.params.id].t' placeholder='輸入黑板的簡介' autofocus='true')
      .ui.two.column.row
        .column 相關黑板： {{myRelated }}
        .column(v-for='g in gobans' v-bind:key='g.id')
          a(@click='adRel(g.id)' :class="myRelated.indexOf(g.id) > -1 ? 'yellow' : 'gray'")
            | {{ g.id }}
      .ui.row
        a.ui.blue.huge.button(@click="crt()", v-if='$route.params.id') {{ '更新' + $route.params.id }}
</template>

<script>

export default {
  name: 'PageIndex',
  props: ['gobans'],
  data () {
    return {
      myRelated: [],
      myTags: [],
      hex: '#c9c9c9',
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
    create: function (k, obj) {
      this.$emit('create', k, obj)
    },
    crt: function () {
      this.create(
        this.$route.params.id,
        { t: this.gobans[this.$route.params.id].t,
          related: this.myRelated,
          tags: this.myTags,
          hex: this.hex
        })
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
    }
  },
  mounted () {
    this.myRelated = this.getMyRelated()
    this.hex = this.getHex()
  }
}
</script>

<style type="text/css" scoped="">
.yellow {
  color: #dd0;
}
.gray {
  color: gray;
}
</style>
