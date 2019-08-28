<template>
    <div class="bottomplayer" @click="gotoPlayer">
        <div class="icon">
            <img :src="music.picUrl" width="40" height="40" />
        </div>
        <div class="text">
            <h2 class="name" >{{music.name}}</h2>
            <div class="desc">{{music.author+' - '+music.album}}</div>
        </div>
        <div class="play-control">
        <van-icon  v-if="playState" name="pause-circle-o" @click.stop="stop"/>
            <van-icon v-else name="play-circle-o" @click.stop="start"/>
        </div>
        <div class="play-control">
            <van-icon name="bars" @click.stop/>
        </div>
    </div>
</template>

<script>
    import GlobalBus from './GlobalBus';
    import {mapState} from 'vuex'
    export default {
        name: "bottomplayer",
        data() {
            return {
                
            }
        },
        computed: {
            ...mapState(['playState']),
            ...mapState(['music']),
        },
        methods: {
            start() {
                this.$store.commit('changePlayState', true);
            },
            stop() {
                this.$store.commit('changePlayState', false);
            },
            getRecentMusic(){
                const locla_user = localStorage.user;
                if(locla_user){
                    const user = JSON.parse(localStorage.user);
                    this.music = user.recentPlay[0];
                }
            },
            gotoPlayer(){
                // this.$router.push({ path: '/music/play' });
                GlobalBus.$emit('showMainPlayer');
            }
        },
        watch: {
            // music(){
            //     this.start();
            // }
        },
        created() {
            
        },
        mounted(){
            const locla_user = localStorage.user;
			if(locla_user){
				const user = JSON.parse(localStorage.user);
				const recentMusic = user.recentPlay[0];
                this.$store.commit('changeMusic', recentMusic);
            }else{
                return;
            }
        }
    }

</script>

<style lang="less">
    .bottomplayer {
        display: flex;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 3;
        width: 100%;
        height: 1.5rem;
        background-color: white;
        border-top: 1px solid #ddd;
        .icon {
            flex-basis: 1.8rem;
            flex: 0 0 20%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                border-radius: 50%;
                height: 1.3rem;
                width: 1.3rem;
                &.playing {
                    animation: rotate 10s linear infinite;
                }
                &.stop {
                    animation-play-state: paused;
                }
            }
        }

        .text {
            display: flex;
            flex-basis: 1.8rem;
            flex-direction: column;
            justify-content: center;
            flex:1;
            text-align: left;
            overflow: hidden;
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
            .name {
                height: 0.5rem;
                line-height: 0.5rem;
                font-size:  0.4rem;
            }
            .desc{
                height: 0.35rem;
                line-height: 0.35rem;
                font-size:  0.3rem;
                color: #666;
            }
        }
        .play-control{
            flex:0 0 30px;
            width: 30px;
            padding: 0 10px;
            flex-basis: 1.8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
                font-size: 0.9rem;
                color: #555;
                font-weight: lighter;
            }
        }
    }

</style>
