<template lang="pug">
  .hello
    h1.ui.header {{ $t('hello') }}
    h3.sub.header {{ $t('hello2') }}
    .ui.form.container
      .field
        input(v-autofocus="", type='search', name='', v-model='myKey', placeholder='創建新黑板', autofocus='true', @keydown.enter = "($router.push('/see/' + myKey + '/0/new'))")
    .ui.container
      a.ui.green.huge.button(@click='create(myKey)', v-if='myKey && !gobans[myKey]') {{$t('create')}}{{myKey}}
      .ui.negative.message(v-else v-show="myKey") 對不起， {{myKey}}已存在
</template>

<script>

import mixin from '../mixins/stars.js'

export default {
  data () {
    return {
      navigator: navigator,
      myKey: '',
      stars: {'goban_intro': 5}
    }
  },
  props: ['gobans'],
  mixins: [mixin],
  localStorage: ['stars'],
  methods: {
    iOS: function () {
      var ans = false
      var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ]
      // console.log(navigator.platform)
      if (navigator.platform) {
        while (iDevices.length) {
          if (navigator.platform === iDevices.pop()) { ans = true }
        }
      }
      // console.log(ans)
      return ans
    },
    create: function (k) {
      this.$emit('create', k)
      this.$router.push('/see/' + k + '/0/new')
    },
    has: function (g, k) {
      var r = new RegExp(k)
      return r.test(g.id + g.t)
    },
    handleRate: function (id, r) {
      if (!this.stars[id]) { this.stars[id] = 0 }
      if (this.stars[id] === r) {
        this.stars[id] = 0
      } else {
        this.stars[id] = r
      }
      localStorage.setItem('stars', JSON.stringify(this.stars))
      this.$forceUpdate()
    },
    loadStars: function () {
      try {
        this.stars = JSON.parse(localStorage.getItem('stars'))
      } catch (e) {}
    }
  },
  mounted () {
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.column .inner {
  min-height: 1.6em;
  padding: 1em 0;
}

#goban {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

@media only screen and (min-width: 600px) {
  .thin-only {
    display: none
  }
}

.ui.form.container {
  margin: 1em 0;
}

#fast {
  margin-top: .5em;
}

</style>
