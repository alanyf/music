<template>
    <span  :style="{position: 'fixed', left: 0, bottom: 0, fontSize: '0.5rem' }">
        <span v-for="(route, i) in routes" :key="route.path">
            <router-link :to="route.path" >{{route.name}}</router-link>
            <span v-if="i!==routes.length-1"> | </span> 
        </span>
    </span>
</template>

<script>
import routes from '../route';
export default {
  name: 'RouteLink',
  data(){
     return {
       routes
     }
  }
}
</script>

<style lang="less">

</style>
