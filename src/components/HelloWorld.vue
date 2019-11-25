<template>
  <div class="hello">
    <div class="ui form">
      <div class="field">
        <input type="search" name="" v-model="myKey" placeholder="搜詢黑板" />
        <a class="ui green button" @click="create(myKey)" v-if ="myKey">創建{{myKey}}</a>
      </div>
    </div>
    <div class="ui segment container">
      <div class="ui divided horizontal list">
        <div class="item" v-for = "g in Object.keys(gobans)" :key = "g" v-show = "!myKey || g.match(new RegExp(myKey))">
          <router-link :to = "'see/' + g + '/0'">
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
