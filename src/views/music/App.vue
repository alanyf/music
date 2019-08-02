<template>
  <div id="app">
    <RouteLink/>
    <router-view/>
  </div>
</template>

<script>
import RouteLink from './components/RouteLink';
export default {
  name: 'App',
  data(){
     return {}
  },
  components: {
      RouteLink
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
  height: 100%;
}
</style>
