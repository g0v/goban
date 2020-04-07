<template lang="pug">
  .seeframe
    iframe#iframe.no-print(v-if = "getSrc(mydata)" name='iframe', :src='getSrc(mydata)', alt="Loading...")
    .ui.active.dimmer(v-else)
      .ui.text.loader Loading...
</template>

<script>

export default {
  name: 'Iframe',
  data () {
    return {
    }
  },
  props: ['mydata'],
  methods: {
    getSrc: function (mydata) {
      if (this.$route.params.index === 'new') {
        return 'https://ethercalc.org/' + this.$route.params.id + (this.$route.params.lev || '')
      } else {
        if (!mydata[0]) { return undefined }
        if (mydata[this.$route.params.index]) {
          return decodeURIComponent(mydata[this.$route.params.index].url)
        }
      }
      return undefined
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
