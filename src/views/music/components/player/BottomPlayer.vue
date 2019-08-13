<template>
    <div class="bottomplayer">
        <div class="icon">
            <img :class="cdCls" src="../../assets/images/logo.png" width="40" height="40" />
        </div>
        <div class="text">
            <h2 class="name" >盼暖春来</h2>
            <div class="desc">刺猬</div>
        </div>
        <div class="play-control">
            <i v-if="playState==='playing'" class="el-icon-video-pause" @click="stop"></i>
            <i v-else class="el-icon-video-play" @click="start"></i>
        </div>
        <div class="play-control">
            <div class="recent-music-menu">
                <i class="el-icon-s-unfold"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bottomplayer",
        data() {
            return {
                playState: 'playing' //'playing' || 'stop',
            }
        },
        computed: {
            cdCls() {
                return this.playState;
            },
        },
        methods: {
            start() {
                this.playState = 'playing';
            },
            stop() {
                this.playState = "stop";
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
        z-index: 100;
        width: 100%;
        height: 1.5rem;
        background: rgba(255, 255, 255, 0.85);
        border-top: 1px solid #ddd;
        .icon {
            flex-basis: 1.8rem;
            flex: 0 0 20%;
            img {
                border-radius: 1em/5em;

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
            .name {
                line-height: 0.3rem;
                font-size:  0.4rem;
            }
            .desc{
                 line-height: 0.3rem;
                font-size:  0.4rem;
            }
        }
        .play-control{
            flex:0 0 30px;
            width: 30px;
            padding: 0 10px;
            flex-basis: 1.8rem;
        }
    }

</style>
