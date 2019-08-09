<template>
    <div class="account-container" :style="{left: positionLtft}">
        <div class="account-content">
            <div class="account-main-content">
                <header class="account-header"></header>
                <div class="tools"></div>
                <div class="set-list"></div>
            </div>
            <footer class="footer"></footer>
        </div>
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
            display: flex;
            .account-main-content{
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                .account-header{
                    flex-basis: 6rem;
                }
                .tools{
                    flex-basis: 1.5rem;
                }
                .set-list{
                    display: flex;
                    flex-direction: column;
                }
            }
            .footer{
                flex-basis: 1rem;
            }
        }
        .mask{
            width: 20%;
            height: 100%;
            opacity: 0.5;
            background-color: black;
        }
    }
</style>
