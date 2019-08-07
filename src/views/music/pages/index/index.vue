<template>
  <div>
      <h1>index1111</h1>
       <BottomPlayer></BottomPlayer>
  </div>
</template>

<script>
import BottomPlayer from '../../components/player/BottomPlayer';
export default {
  name: 'Index',
  components:{
    BottomPlayer
  }
}
</script>

<style lang="less">
    .container{
        display: flex;
        width: 100%;
        height: 100%;
    }
</style>
