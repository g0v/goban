<template>
  <div class="hello">
    <h1 class="ui header">零時黑板</h1>
    <div class="ui form container">
      <div class="field">
        <input type="search" name="" v-model="myKey" placeholder="搜詢黑板" autofocus="true" />
        <a class="ui green button" @click="create(myKey)" v-if ="myKey">創建{{myKey}}</a>
      </div>
    </div>
    <div class="ui segment container">
      <div class="ui divided horizontal list">
        <div class="item" v-for = "g in Object.keys(gobans)" :key = "g" v-show = "!myKey || g.match(new RegExp(myKey))">
          <router-link :to = "'see/' + g + '/0/0'">
            <img src="/static/favicon.png">
            {{ g }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      myKey: ''
    }
  },
  props: ['gobans'],
  methods: {
    create: function (k) {
      this.$emit('create', k)
      this.$router.push('/see/' + k + '/0/new')
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
</style>
