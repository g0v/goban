<template lang="pug">
  .hello
    vue-headful(title="手機App@零時黑板", description="手機App@零時黑板")
    h1.ui.header 零時黑板-手機App
    .ui.button.group
      a.ui.orange.huge.button(href="https://play.google.com/store/apps/details?id=tw.goban.app", target="_blank")
        i.google.play.icon
        | App on Google Play
      a.ui.green.huge.button(href="https://apps.apple.com/us/app/%E9%9B%B6%E6%99%82%E9%BB%91%E6%9D%BF/id1500095725?l=zh&ls=1", target="_blank")
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
