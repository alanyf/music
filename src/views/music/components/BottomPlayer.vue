<template>
    <div class="bottomplayer" @click="showPlayer">
        <div class="icon">
            <img :class="cdCls" :src="music.picUrl" width="40" height="40" />
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
    export default {
        name: "bottomplayer",
        data() {
            return {
                playState: false, //'playing' || 'stop',
                music: {
                    name: '',
                    author: '',
                    album: '',
                    picUrl: '/static/images/head-img-1.jpeg'
                }
            }
        },
        computed: {
            cdCls() {
                return this.playState;
            },
        },
        methods: {
            start() {
                this.playState = true;
                GlobalBus.$emit('changeMainPlayState', this.playState, this.music);
            },
            stop() {
                this.playState = false;
                GlobalBus.$emit('changeMainPlayState', this.playState, this.music);
            },
            getRecentMusic(){
                const locla_user = localStorage.user;
                if(locla_user){
                    const user = JSON.parse(localStorage.user);
                    this.music = user.recentPlay[0];
                }
            },
            showPlayer(){
                GlobalBus.$emit('showMainPlayer', this.music);
            },
        },
        created() {
            const that = this;
            GlobalBus.$on('changeMusic', (music)=>{
                that.music = music;
            });
            GlobalBus.$on('changeMiniPlayState', (state)=>{
                that.playState = state;
            });
        },
        mounted(){
            const locla_user = localStorage.user;
			if(locla_user){
				const user = JSON.parse(localStorage.user);
				const recentMusic = user.recentPlay[0];
				this.music = recentMusic;
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
        background: rgba(255, 255, 255, 0.85);
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
