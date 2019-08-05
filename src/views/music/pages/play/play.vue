<template>
	<div class="play-container">
		<header class="header">
			<div class="arrow"><i class="el-icon-back"></i></div>
			<div class="music-title">{{ music.title }}</div>
			<div class="share" ><i class="el-icon-share" @click="share"></i></div>
		</header>
		<section class="content">
			<div class="head-img" :style="{ transform: `rotate(${rotateDeg}deg)`}">
				<img src="./img/head-img1.png"/>
			</div>
		</section>
		<section class="operation">
			<div class="collection"><i class="el-icon-star-off" @click="collection"></i></div>
			<div class="download"><i class="el-icon-download" @click="download"></i></div>
			<div class="show-word"><i class="el-icon-document"></i></div>
			<div class="comment"><i class="el-icon-chat-dot-round"></i></div>
			<div class="more"><i class="el-icon-more-outline"></i></div>
		</section>
		<section class="play-progress-bar">
	　		<audio ref='audio' id="audio" preload="auto" class="audio" src="./media/song.mp3"></audio>
			<div class="time-now">{{timeNow}}</div>
			<div class="progress-bar">
				<el-slider v-model="playProcess" @change="processChange" :show-tooltip="false" :format-tooltip="formatTooltip" :max="processLength"></el-slider>
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
				word: 'vdgtdvcscd\nsudcbsducsc\ncbsdybcyhsbyhsbdc\ndcbsdbcysd\nsdbd'
			},
			processLength: 100,
			playState: 'playing', // 'playing' || 'stop',
			rotateDeg: 0, //旋转角度
			rotateInterval: null,  //系数，用来控制旋转与暂停
			playProcess: 0, //播放进度
			audio: null,
			timeNow: '00:00',
			timeTotal: '00:00',
			currentTime: 0,
			totalTime: 1,
		}
	},
	mounted(){
		this.audio = this.$refs.audio;
		this.totalTime = this.audio.duration || 38;
		this.timeNow = this.secondToMinute(this.audio.currentTime);
		this.timeTotal = this.secondToMinute(this.totalTime);
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
				if(that.playProcess >= that.processLength){
					that.playProcess = that.processLength;
					that.stop();
				}
				//console.log(that.audio.currentTime, this.audio.paused);
			}, 50);
		},
		processChange(value){
			this.audioPlay();
			this.rotate();
			this.audio.currentTime = this.totalTime * value/this.processLength;
			this.playState = 'playing';
			console.log(value, this.playProcess);
		},
		formatTooltip(value){
			return value;
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
	.content{
		flex-basis: 14rem;
		flex-grow: 1;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
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
