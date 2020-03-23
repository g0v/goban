<template lang="pug">
  .hello
    h1.ui.header 知識棋盤-瀏覽器插件
    .ui.button.group
      a.ui.orange.huge.button(href="https://addons.mozilla.org/zh-TW/firefox/addon/%E9%9B%B6%E6%99%82%E9%BB%91%E6%9D%BF/", target="_blank")
        i.firefox.icon
        | Firefox Add-on
      //a.ui.green.button(href="https://play.google.com/store/apps/details?id=tw.goban.app", target="_blank")
        i.app.store.icon
        | Chrome Extention

</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
