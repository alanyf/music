<template>
    <div class="video-player-container" >
        <video 
            :src="src"
            :poster="poster"
            class="video"
            ref="video"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-playsinline=""
            playsinline
            webkit-playsinline=""
            preload="auto"
            x-webkit-airplay="allow"
            @ended="playOver"
        ></video>
        <div class="video-mask" @click="clickHandel">
            <div :class="`mask-content ${(showMask||!playState)?'black-mask':''}`"></div>
            <div v-if="showMask" class="mask-content">
                <div class="time">{{currentTimeStr}}/{{totalTimeStr}}</div>
                <div class="video-control">
                    <van-slider class="slider" v-model="playProcess" @change="processChange" :max="100" active-color="red" bar-height="0.1rem"/>
                </div>
            </div>
            <van-icon v-if="showMask||!playState" :name="`${playState?'pause-circle-o':'play-circle-o'}`" class="play-icon" @click.stop="clickPlayIcon"/>
        </div>
    </div>
</template>

<script>
import { setTimeout, clearTimeout, setInterval } from 'timers';
const userAgent = navigator.userAgent;
let clickTimes = 0;
export default {
    name: 'VideoPlayer',
    props: {
        src: {type: String},
        playState: {type: Boolean, default: false},
        poster: {type: Boolean}

    },
    data(){
        return {
            video: null,
            isAndroid: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1, // android终端
            isIOS: userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),                        // ios终端
            showMask: false,
            playProcess: 0,
            currentTimeStr: '00:00',
            totalTimeStr: '00:00'
        }
    },
    mounted(){
        this.video = this.$refs.video;
        this.init();
    },
    methods: {
        init(){
            const time = setInterval(()=>{
                if(this.totalTimeStr === '00:00' && this.video.duration > 0){
                    this.totalTimeStr = secondToMinute(this.video.duration);
                }
                this.currentTimeStr = secondToMinute(this.video.currentTime);
                this.playProcess = 100*(this.video.currentTime/this.video.duration);
            }, 500);
            window.addEventListener('scroll', this.scrollHandle, true);
            
        },
        start(){
            this.video.play();
        },
        stop(){
            this.video.pause();
        },
        clickHandel(){
            clickTimes++;
            let timer = null;
            clearTimeout(timer);
            timer = setTimeout(()=>{
                // 单击
                if(clickTimes === 1){
                    this.showMask = !this.showMask;
                }
                // 双击
                if(clickTimes >= 2){
                    clickTimes = 0;
                    this.playState = !this.playState;
                }
                clickTimes = 0;
            }, 300);
        },
        clickPlayIcon(){
            this.playState = !this.playState;
        },
        processChange(value){
            this.video.currentTime = this.video.duration * value/100;
        },
        playOver(){
            this.playState = false;
        },
        scrollHandle () {
            const offset = this.$el.getBoundingClientRect(); // vue中，使用this.$el获取当前组件的根元素
            const offsetTop = offset.top;
            const offsetBottom = offset.bottom;
            const offsetHeight = offset.height;
            // 移出可视区域
            if (offsetTop > window.innerHeight || offsetBottom < 0) {
                this.playState = false;
            }
        }
    },
    watch: {
        playState(){
            if(this.playState){
                this.start();
            }else{
                this.stop();
            }
            setTimeout(()=>{
                this.showMask = false;
            }, 1000);
        }
    },
    computed: {
        currentTimeStr(){
            return secondToMinute(this.currentTime);
        }
    }
}
// 秒转化为分钟
function secondToMinute(second){
    second = parseInt(second);
    let _minute = parseInt(second/60);
    let _second = second%60;
    let secondBite = addZero(_minute), minuteBite = addZero(_second);
    return secondBite + ':' + minuteBite;

    function addZero(n){
        if(n === 0){
            n = '00';
        }else if(n < 10){
            n = '0' + n;
        }
        return n;
    }
}
// 秒转化为分钟
function minuteToSecond(minute){
    const _split = minute.split(':');
    const second = Number(_split[0])*60 + Number(_split[1]);
    return second;
}
</script>

<style lang="less">
    .video-player-container{
        .video{
            width: 100%;
            height: 100%;
        }
        .video-mask{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            .play-icon{
                font-size: 1.5rem;
                color: #eee;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .mask-content{
                position: absolute;
                width: 100%;
                height: 100%;
                .time{
                    position: absolute;
                    bottom: 0.2rem;
                    color: #ddd;
                    font-size: 0.35rem;
                    margin: 0 0.2rem;
                }
                .video-control{
                    width: 96%;
                    position: absolute;
                    bottom: 0.1rem;
                    padding: 0 2%;
                }
            }
        }
        .black-mask{
            background-color: rgba(0, 0, 0, 0.3);
        }
    }
</style>
