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
            <van-icon name="bars"  @click.stop="$store.commit('changeIsShowBottomSidebar', true);"/>
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
            let recentMusic = null;
            const locla_user = localStorage.user;
			if(locla_user){
				const user = JSON.parse(localStorage.user);
				recentMusic = user.recentPlay[0];
            }else{
                recentMusic = {
                    id: 27808044,
                    name: '丑八怪',
                    url: 'http://m7.music.126.net/20190903201737/682be7f263a1ee6a23dfdc14fa8859d3/ymusic/9789/6f81/73b8/1e02e771252c10dc09bdd8f8db8888d2.flac',
                    picUrl: 'http://p2.music.126.net/WPHmBisDxnoF4DrBLKwl3Q==/109951163169021112.jpg',
                    album: '意外',
                    mv: 193084,
                    quality: 'SQ',
                    author: '薛之谦'
                };
            }
            this.$store.commit('changeMusic', recentMusic);
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
