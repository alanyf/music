<template>
	<div class="play-container">
		<header class="header">
			<div class="arrow"><i class="el-icon-back"></i></div>
			<div class="music-title">{{ music.title }}</div>
			<div class="share" ><i class="el-icon-share" @click="share"></i></div>
		</header>
		<section class="main-content" ref="mainContent">
			<div v-if="isShowWord" class="word-container">
				<div class="word-content" :style="controlPosition">
					<div v-for="(row, i) in music.wordArr" :key="row" :class="i===wordFocusIndex?'focus':''">
						{{row}}
					</div>
				</div>
			</div>
			<div v-else class="head-img" :style="{ transform: `rotate(${rotateDeg}deg)`}">
				<img src="./img/head-img1.png"/>
			</div>
		</section>
		<section class="operation">
			<div class="collection"><i class="el-icon-star-off" @click="collection"></i></div>
			<div class="download"><i class="el-icon-download" @click="download"></i></div>
			<div class="show-word"><i class="el-icon-document" @click="showWord"></i></div>
			<div class="comment"><i class="el-icon-chat-dot-round"></i></div>
			<div class="more"><i class="el-icon-more-outline"></i></div>
		</section>
		<section class="play-progress-bar">
	　		<audio ref='audio' id="audio" preload="auto" class="audio" src="./media/song.mp3"></audio>
			<div class="time-now">{{timeNow}}</div>
			<div class="progress-bar">
				<el-slider v-model="playProcess" @change="processChange" :show-tooltip="false" :max="processLength"></el-slider>
			</div>
			<div class="time-total">{{timeTotal}}</div>
		</section>
		<section class="control">
			<div class="play-model"><i class="el-icon-refresh-right"></i></div>
			<div class="previou-music"><i class="el-icon-arrow-left"></i></div>
			<div class="play-control">
				<i v-if="playState==='playing'" class="el-icon-video-pause" @click="stop"></i>
				<i v-else class="el-icon-video-play" @click="start"></i>
			</div>
			<div class="next-music">
				<i class="el-icon-arrow-right"></i>	
			</div>
			<div class="recent-music-menu"><i class="el-icon-s-unfold"></i></div>
		</section>
	</div>
</template>

<script>
import Autio from '../../components/Audio';
export default {
	name: 'Index',
	data(){
		return {
			music: {
				title: '情非得已',
				url: 'http://qsqwxsdcscececefc',
				word: '难以忘记初次见你\n一双迷人的眼睛\n在我脑海里你的身影\n挥散不去\n握你的双手感觉你的温柔\n真的有点透不过气\n你的天真 我想珍惜\n看到你受委屈我会伤心 哦\n只怕我自己会爱上你\n不敢让自己靠的太近\n怕我没什么能够给你\n爱你也需要很大的勇气\n只怕我自己会爱上你\n也许有天会情不自禁\n想念只让自己苦了自己\n爱上你是我情非得已',
				wordArr: []
			},
			isShowWord: false, 		// 是否显示歌词
			processLength: 100,		// 进度条长度
			playState: 'playing', 	// 'playing' || 'stop',
			rotateDeg: 0, 			// 旋转角度
			rotateInterval: null,   // 系数，用来控制旋转与暂停
			playProcess: 0, 		// 播放进度
			audio: null, 			// audio元素
			timeNow: '00:00',       // 当前播放的时间，分钟：秒
			timeTotal: '00:00',		// 歌曲总时间，分钟：秒
			currentTime: 0, 		// 当前时间，秒
			totalTime: 1, 			// 歌曲总时间，分钟：秒
			wordFocusIndex: 0,		// 歌曲播放到歌词的行数
			contentHeight: 0,		// 中间歌词区域的高度
		}
	},
	mounted(){
		this.audio = this.$refs.audio;
		this.totalTime = this.audio.duration || 38;
		this.timeNow = this.secondToMinute(this.audio.currentTime);
		this.timeTotal = this.secondToMinute(this.totalTime);
		this.music.wordArr = this.music.word.split('\n');
		this.contentHeight = this.$refs.mainContent.clientHeight;
		this.audioPlay();
		this.rotate();
	},
	methods: {
		start(){
			this.playState =  'playing';
			this.audio.play();
			this.audioPlay();
			this.rotate();
			console.log(this.audio);
		},
		stop(){
			this.playState = 'stop';
			this.audio.pause();
			clearInterval(this.audioPlayInterval);
			clearInterval(this.rotateInterval);
		},
		audioPlay(){
			clearInterval(this.audioPlayInterval);
			this.audioPlayInterval = setInterval(()=>{
				this.audio.currentTime += 0.1;
				if(this.audio.currentTime >= this.totalTime){
					clearInterval(this.audioPlayInterval);
					this.audio.currentTime = this.totalTime;
				}
			}, 100);
		},
		rotate(){
			const that = this;
			clearInterval(this.rotateInterval);
			this.rotateInterval = setInterval(()=>{
				that.rotateDeg += 1;
				if(that.rotateDeg >= 360){
					that.rotateDeg = 0;
				}
				that.playProcess =  that.processLength * (that.audio.currentTime/that.totalTime) ;
				that.timeNow = that.secondToMinute(that.audio.currentTime);
				that.wordFocusIndex = parseInt( that.music.wordArr.length * this.audio.currentTime / this.totalTime);
				if(that.playProcess >= that.processLength){
					that.playProcess = that.processLength;
					that.stop();
				}
			}, 50);
		},
		processChange(value){
			//this.audioPlay();
			//this.rotate();
			//this.playState = 'playing';
			this.audio.currentTime = this.totalTime * value/this.processLength;
			this.timeNow = this.secondToMinute(this.audio.currentTime);
		},
		showWord(){
			this.isShowWord = !this.isShowWord;
		},
		// 秒转化为分钟
        secondToMinute(second){
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
		},
		notification(text){
			this.$notify({
				message: text,
				duration: 1000,
				offset: document.body.clientWidth/3,
				showClose: false,
				customClass: 'notification'
			});
		},
		share(){
			this.notification('分享成功');
		},
		collection(){
			this.notification('收藏成功');
		},
		download(){
			this.notification('下载成功');
		}
	},
	components: {
		Autio
	},
	computed: {
		// 计算歌词播放进度
		controlPosition(){
			const output =  { marginTop:  parseInt(this.contentHeight/2 - (this.wordFocusIndex * 0.8)*document.documentElement.clientWidth/10) + 'px'};
			return output;
		}
		
    }

}
</script>

<style lang="less">
.notification{
	.el-notification__title{
		font-size: 0.7rem!important;
	}
	.el-notification__content p{
		font-size: 0.34rem;
        line-height: 0.4rem;
	}
}
.play-container{
	display: flex;
	flex-direction: column;
	height: 100%;
	font-size: 0.5rem;
	i{
		&:active{
			color: black;
			transform: scale(0.9);
		}
	}
	.header{
		display: flex;
		flex-basis: 1rem;
		flex-grow: 1;
		flex-shrink: 1;
		line-height: 2rem;
		text-align: center;
		align-items: center;
		justify-content: center;
		.arrow{
			flex-basis: 1.5rem;
			line-height: 2rem;
		}
		.music-title{
			flex-basis: 7rem;
			text-align: left;
			vertical-align: middle;
		}
		.share{
			flex-basis: 1.5rem;
		}
	}
	.main-content{
		flex-basis: 14rem;
		flex-grow: 1;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		.word-container{
			font-size: 0.3rem;
			line-height: 0.8rem;
			color: #aaa;
			width: 100%;
			height: 100%;
			overflow: hidden;
			.word-content{
				margin-top: 50%;
				.focus{
					font-size: 0.4rem;
					color: #2c3e50;
				}
			}
		}
		.head-img{
			width: 6rem;
			height: 6rem;
			flex-shrink: 1;
			border-radius: 50%;
			overflow: hidden;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.head-img{
			
		}
	}
	.operation{
		flex-basis: 0.8rem;
		flex-grow: 1;
		flex-shrink: 1;
		display: flex;
		align-items: center;
		font-size: 0.7rem;
		padding: 0.4rem 0;
		align-items: center;
		justify-content: center;
		.collection{
			flex-basis: 2rem;
		}
		.download{
			flex-basis: 2rem;
		}
		.show-word{
			flex-basis: 2rem;
		}
		.comment{
			flex-basis: 2rem;
		}
		.more{
			flex-basis: 2rem;
		}
	}
	.play-progress-bar{
		flex-basis: 0.5rem;
		flex-grow: 1;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		
		.time-now, .time-total{
			font-size: 0.25rem;
		}
		.progress-bar{
			width: 75%;
			background-color: #fff;
			margin: 0 0.1rem;
			.el-slider{
				background-color: #fff;
			}
		}
		.el-slider__button{
			opacity: 0!important;
		}

	}
	.control{
		flex-basis: 2rem;
		flex-grow: 1;
		flex-shrink: 1;
		display: flex;
		font-size: 0.7rem;
		align-items: center;
		justify-content: center;
		.play-model{
			flex-basis: 1.8rem;
		}
		.previou-music{
			flex-basis: 1.8rem;
		}
		.play-control{
			flex-basis: 2.8rem;
			font-size: 1.2rem;
		}
		.next-music{
			flex-basis: 1.8rem;
		}
		.recent-music-menu{
			flex-basis: 1.8rem;
		}
	}
}
</style>
