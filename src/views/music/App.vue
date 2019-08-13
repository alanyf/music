<template>
  <div id="app">
    <RouteLink/>
    <router-view/>
    <Menu/>
    <Play/>
  </div>
</template>

<script>
import RouteLink from './components/RouteLink';
import Play from './pages/play/play';
import Menu from './pages/menu/menu';
export default {
  name: 'App',
  data(){
     return {}
  },
  components: {
      RouteLink,
      Play,
      Menu
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
  background-color: #fff;
}
</style>
