<template>
	<div :class="`play-container ${isHidden?'z-index-hidden':''}`">
		<header class="header">
			<div class="arrow" @click="hidePlayer"><i class="el-icon-back"></i></div>
			<div class="music-title">{{ music.name }}</div>
			<div class="share" ><i class="el-icon-share" @click="share"></i></div>
		</header>
		<section class="main-content" ref="mainContent" @click="showWord">
			<div v-if="isShowWord" class="word-container">
				<div class="word-content" :style="controlPosition">
					<div v-for="(row, i) in music.wordArr" :key="row.startTime" :class="i===wordFocusIndex?'focus':''">
						{{row.text}}
					</div>
				</div>
			</div>
			<div v-show="!isShowWord" class="head-img" :style="{ transform: `rotate(${rotateDeg}deg)`}">
				<img :src="music.picUrl"/>
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
	　		<audio ref='audio' id="audio" preload="auto" class="audio" :src="music.url"></audio>
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
import GlobalBus from '../../components/GlobalBus';
export default {
	name: 'Index',
	data(){
		return {
			music: {
				name: '情非得已',
				url: '/static/media/song.mp3',
				picUrl: '/static/images/head-img1.png',
				singer: '庾澄庆',
				album: '电视剧《流星花园》主题曲',
				video: null,
				word: '\n难以忘记初次见你\n一双迷人的眼睛\n在我脑海里你的身影\n挥散不去\n握你的双手感觉你的温柔\n真的有点透不过气\n你的天真 我想珍惜\n看到你受委屈我会伤心 哦\n只怕我自己会爱上你\n不敢让自己靠的太近\n怕我没什么能够给你\n爱你也需要很大的勇气\n只怕我自己会爱上你\n也许有天会情不自禁\n想念只让自己苦了自己\n爱上你是我情非得已\n什么原因\n我竟然又会遇见你\n我真的真的不愿意\n就这样陷入爱的陷阱哦\n只怕我自己会爱上你\n不敢让自己靠的太近\n怕我没什么能够给你\n爱你也需要很大的勇气\n只怕我自己会爱上你\n也许有天会情不自禁\n想念只让自己苦了自己\n爱上你是我情非得已\n爱上你是我情非得已',
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
			isHidden: true,			// 控制是否让播放歌曲页面显示在最上面
		}
	},
	created() {
		GlobalBus.$on('showPlayer', (music)=>{
			console.log('music:', music);
			if(music.name !== this.music.name){
				this.music.name = music.name;
				this.music.picUrl = music.picUrl;
				this.audio.currentTime = 0;
			}

			this.$http.get('/music/song/url?id='+music.id).then((res)=>{
				const song = res.data[0];
				console.log(song);
				this.audio.src = song.url;
			}).catch(err=>{
				console.log(err);
			});

			this.getSongWord(music.id);

			this.showPlayer();
			console.log(music, this.music.name);
		});
		
	},
	mounted(){ 
		this.init();
		this.rotate();
		this.addToRecentPlay();
		
	},
	methods: {
		init(){
			const audio = this.$refs.audio;
			const that = this;
			this.audio = audio;
			audio.load();
		    audio.oncanplay = function () {  
	            that.totalTime = audio.duration || 100;
				that.timeTotal = that.secondToMinute(that.totalTime);
				audio.play();
	      	}
			this.timeNow = this.secondToMinute(audio.currentTime);
			this.music.wordArr = this.music.word.split('\n');
			this.contentHeight = this.$refs.mainContent.clientHeight;
		},
		getSongWord(id){
			const urlLocal = '/music/lyric?id='+id;
			this.$http.get(urlLocal).then((res)=>{
				console.log('歌词：', res);
				const _split = res.lrc.lyric.split('\n');
				const totalTime = _split.shift();
				_split.pop();
				this.music.wordArr = _split.map(e=>{
					const time = this.minuteToSecond(e.match(/\[(\S*)]/)[1]);
					const text = e.match(/](\S*)/)[1];
					const obj = {
						startTime: time,
						text: text
					}
					return obj;
				});
				console.log(this.music.wordArr);
			}).catch(err=>{
				console.log(err);
			});
		},
		start(){
			this.playState =  'playing';
			this.audio.play();
			this.rotate();
		},
		stop(){
			this.playState = 'stop';
			this.audio.pause();
			clearInterval(this.rotateInterval);
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
				that.wordFocusIndex = that.focusIndex();
				if(that.playProcess >= that.processLength){
					that.playProcess = that.processLength;
					that.stop();
				}
			}, 50);
		},
		processChange(value){
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
		// 秒转化为分钟
        minuteToSecond(minute){
			const _split = minute.split(':');
			const second = Number(_split[0])*60 + Number(_split[1]);
			return second;
		},
		focusIndex(){
			for(let i=0; i< this.music.wordArr.length-1;i++){
				let row = this.music.wordArr[i+1];
				if(this.audio.currentTime < row.startTime){
					return i;
				}
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
		},
		// 添加到最近播放
		addToRecentPlay(){
			//const obj = {"title": this.music.title, "url": this.music.url, "singer": this.music.singer, "album": this.music.album, "video": this.music.video};
			//const user = JSON.parse(localStorage.user);
			// const _list = user.recentPlay;
			// _list.unshift(obj);
			// if(_list.length > 100){
			// 	_list.pop();
			// }
			// user.recentPlay = _list;
			// localStorage.user = JSON.stringify(user);
		},
		showPlayer(music){
			this.isHidden = false;
			this.start();
		},
		hidePlayer(){
			this.isHidden = true;
			//this.stop();
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
/*
什么原因\n我竟然又会遇见你\n我真的真的不愿意\n就这样陷入爱的陷阱哦\n只怕我自己会爱上你\n不敢让自己靠的太近\n怕我没什么能够给你\n爱你也需要很大的勇气\n只怕我自己会爱上你\n也许有天会情不自禁\n想念只让自己苦了自己\n爱上你是我情非得已\n爱上你是我情非得已
*/
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
	width: 100%;
	height: 100%;
	font-size: 0.5rem;
	background-color: #fff;
	position: absolute;
	z-index: 2;
	top: 0;
	left: 0;
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
		overflow: scroll;
		.word-container{
			font-size: 0.3rem;
			line-height: 0.8rem;
			color: #aaa;
			width: 100%;
			height: 100%;
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

.z-index-hidden{
	z-index: -1;
}
</style>
