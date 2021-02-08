<template lang="pug">
  .hello
    h1.ui.header 零時黑板-瀏覽器插件
    .ui.button.group
      a.ui.orange.huge.button(href="https://addons.mozilla.org/zh-TW/firefox/addon/%E9%9B%B6%E6%99%82%E9%BB%91%E6%9D%BF/", target="_blank", rel="noopner noreferrer")
        i.firefox.icon
        | Firefox Add-on
      a.ui.green.huge.button(href="https://chrome.google.com/webstore/detail/goban/homdancdjkjilkkfafaojpllnfheekno?hl=zh-TW", target="_blank", rel="noopner noreferrer")
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
