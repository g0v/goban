<template>
  <div class="hello">
    <div class="ui divided horizontal list">
      <div class="item" v-for = "g in Object.keys(gobans)" :key = "g">
        <router-link :to = "'see/' + g">
          {{ g }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['gobans']
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
