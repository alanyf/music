<template>
    <div class="audioplayer-container">
        <audio ref='audio' preload="auto" class="audio" :src="music.url"></audio>
        <slot name="control"></slot>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'RouteLink',
    data(){
        return {
           
        }
    },
    mounted(){
        const that = this;
        this.$refs.audio.playAsync = function(){
            setTimeout(()=>{
                that.$refs.audio.play();
            }, 500);
        }
        this.$store.commit('setAudio', this.$refs.audio);
    },
    methods: {

    },
    computed: {
        ...mapState(['music']),
        ...mapState(['playState']),
        ...mapState(['audio']),
    },
    watch: {
        playState() {
            this.playState ? this.audio.playAsync() : '';
        }
    }
}
</script>

<style lang="less">

</style>