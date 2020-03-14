<template lang="pug">
  .hello
    vue-headful(title="介紹@零時黑板", description="零時黑板(Goban)也是g0v社群的開源專案之一。是一個類似hackfoldr的「黑客公事包」")
    h1.ui.header 如何使用
    .ui.container
      .ui.left.aligned.segment
        h2.ui.header 簡介
        p 你知道嗎？近來的太陽花、停建核四等公民運動，都採用 hackfoldr（唸作 hack-folder）來架設資訊入口網站。

        p 零時黑板(Goban)也是
          a(href="http://g0v.tw", target="_blank") g0v社群
          | 的開源專案之一。是一個類似hackfoldr的「黑客公事包」，其差別在於：
          .ui.ordered.list
            .item 您可以在各個公事包之間設立關聯
            .item 您不僅可以創建，也可以搜詢到別人創建的公事包
            .item 您可以和他人一起協作共用的公事包
        h2.ui.header 如何創建
        .ui.ordered.list
          .item 先進入首頁
          .item 打上你的黑板的名字，按創建
          .item 會進入一個試算表的頁面
          .item 在B2欄位打上黑板的名字
          .item 再往下的每個欄位中
          .item A的部分打上網址
          .item B的部分打上名字
          .item 這樣就可以創建一個連結
          router-link.item(to='/see/test/0/0')
            | 可以參考
            i.edit.icon
            | 沙盒

        h2.ui.header 馬上開始
        .ui.bulleted.list
          router-link.item(to='/see/goban_intro/0/0/')
            i.question.icon
            | 更多說明
          router-link.item(to='/see/test/0/0')
            i.edit.icon
            | 沙盒
          router-link.item(to='/')
            i.home.icon
            | 回首頁

        h2 免責聲明
        p 零時黑板(Goban)和hackfoldr一樣，不會審查您所提供的網址，請注意僅放入合乎法律規範的網站超連結
    iframe(width="560" height="315" src="https://www.youtube.com/embed/uZo8eCfoS_Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)

</template>

<script>
export default {
  data () {
    return {
      myKey: '',
      stars: {'goban_intro': 5}
    }
  },
  props: ['gobans'],
  localStorage: {
    stars: {'goban_intro': 5}
  },
  methods: {
    create: function (k) {
      this.$emit('create', k)
      this.$router.push('/see/' + k + '/0/new')
    },
    handleRate: function (g, r) {
      if (!this.stars[g]) { this.stars[g] = 0 }
      this.stars[g] += r
      if (this.stars[g] === 10) { this.stars[g] = 0 }
      this.$localStorage.set('stars', this.stars)
      this.$forceUpdate()
    },
    loadStars: function () {
      console.log(JSON.parse(this.$localStorage.get('stars')))
      this.stars = JSON.parse(this.$localStorage.get('stars'))
    }
  },
  mounted () {
    this.loadStars()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
