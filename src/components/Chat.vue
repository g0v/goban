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
              i.large.user.icon
              | {{ c.n }} 說：
            vue-simple-markdown.text(:source="c.t")
            .metadata
              span.date -{{ parseTime(c.time) }}
      .ui.form
        .two.fields
          .required.field
            label 您的大名:
            input(type='text' v-model="myName")
          .required.field
            label Email:
            input(type='email' v-model="myEmail")
          .required.field
            label 請留言:
            input(type='text' v-model="myText" placeholder="您想說什麼？")
        .ui.submit.button(@click="submit(myName, myEmail, myText)") 留言
      br
      br

</template>
<script>

export default {
  name: 'Chat',
  props: ['likes', 'chats'],
  data () {
    return {
      msg: '留言版',
      'myName': '訪客',
      'myEmail': '',
      'myText': ''
    }
  },
  methods: {
    submit: function (n, email, t) {
      function validateEmail (email) {
        // eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
      }
      if (!validateEmail(email)) {
        window.alert('請輸入E-mail')
        return
      }
      this.myName = '訪客'
      this.myEmail = ''
      this.myText = ''
      this.$emit('submit', n, email, t)
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
