<template lang="pug">
  .hello
    vue-headful(title="手機App@零時黑板", description="手機App@零時黑板")
    h1.ui.header 零時黑板-手機App
    .ui.button.group
      a.ui.orange.huge.button(v-show="!iOS()" href="https://play.google.com/store/apps/details?id=tw.goban.app", target="_blank")
        i.google.play.icon
        | App on Google Play
      //a.ui.green.button(href="https://play.google.com/store/apps/details?id=tw.goban.app", target="_blank")
        i.app.store.icon
        | App on App Store

</template>

<script>
export default {
  data () {
    return {
    }
  },
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
      console.log(navigator.platform)
      if (navigator.platform) {
        while (iDevices.length) {
          if (navigator.platform === iDevices.pop()) { ans = true }
        }
      }
      console.log(ans)
      return ans
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
