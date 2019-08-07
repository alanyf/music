<template>
  <div class="account-container" :style="{left: positionLtft}">
      <div class="account-content"><h1>账户中心</h1></div>
      <div class="mask" @click.stop="hidden"></div>
  </div>
</template>

<script>
export default {
    name: 'Account',
    data(){
        return {
            
        }
    },
    methods: {
        hidden(){
            this.$emit('hiddenSidebar');
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
        width: 100%;
		height: 100%;
		position: absolute;
        left: 0;
        .account-content{
            width: 80%;
            height: 100%;
		    background-color: aliceblue;
        }
        .mask{
            width: 20%;
            height: 100%;
            opacity: 0.3;
            background-color: black;
        }
    }
</style>
