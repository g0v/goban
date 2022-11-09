<template lang="pug">
  .chats
    vue-headful(title="留言板@零時黑板", description="留言板@零時黑板")
    sui-header(size="large") {{ msg }}
    .ui.left.aligned.segment.container
      .ui.comments
        h3.ui.dividing.header 歡迎留言
        .comment(v-for="c in chats" :key="c.time")
          .content
            a.author(:href="'mailto:' + c.email", target="_blank")
              .ui.avatar
                img(v-if = "c.photoURL && c.photoURL !== 'null' ", :src="c.photoURL")
                i.large.user.icon(v-else)
              | {{ c.n }} 說：
            vue-simple-markdown.text(:source="c.t")
            .metadata
              span.date -{{ parseTime(c.time) }}
      .ui.form
        .two.fields(v-if = "user")
          .required.field
            label 您的大名:
            input(type='text' v-model="myName")
          .required.field
            label 請留言:
            input(type='text' v-model="myText" placeholder="您想說什麼？")
        button.ui.huge.green.button(v-if ="user" @click="submit(myName, user.email, myText, user.photoURL)") 送出留言
        button.ui.huge.orange.button(v-else, @click="loginGoogle()")
          i.google.icon
          | 以Google登入以留言

</template>
<script>

export default {
  name: 'ChatChat',
  props: ['likes', 'chats', 'user'],
  data () {
    return {
      msg: '留言版',
      'myName': '訪客',
      'myText': ''
    }
  },
  methods: {
    loginGoogle: function () {
      this.$emit('loginGoogle')
    },
    submit: function (n, email, t, photoURL) {
      this.myName = '訪客'
      this.myEmail = ''
      this.myText = ''
      this.$emit('submit', n, email || 'null', t, photoURL || 'null')
    },
    parseTime: function (t) {
      return (new Date(t)).toLocaleDateString()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.text {
  color: white !important ;
}

a {
  color: #c9c9ff !important;
}

.date {
  color: #ccc;
}

</style>
