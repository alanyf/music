<template>
  <div class="account-container" :style="{left: positionLtft}" @click.stop>
      <h1>账户中心</h1>
  </div>
</template>

<script>
export default {
    name: 'Account',
    data(){
        return {
            left: 0
        }
    },
    props: {
        isShow: {
            type: String
        }
    },
    mounted(){
        
    },
    computed: {
        positionLtft(){
            return this.isShow ? 0 :'-10rem';
        }
    }
}
</script>

<style lang="less">
    .account-container{
        display: flex;
        width: 80%;
		height: 100%;
		background-color: aliceblue;
		position: absolute;
		left: 0;
    }
</style>
