<template>
  <div id="app">
    <vue-ruler :block="block" v-model="value" />
  </div>
</template>

<script>
import VueRuler from '@/components/Ruler'
export default {
  name: 'app',
  components: {
    VueRuler
  },
  data() {
    return {
      value: 30,
      block: [10, 100]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
