<template>
  <div>
    <Contenedor msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Contenedor from './components/Contenedor.vue'

export default {
  name: 'app',
  components: {
    Contenedor
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
  margin-top: 6px;
}
</style>