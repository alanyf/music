<template>
	<div :class="`play-container ${isHidden?'z-index-hidden':''}`">
		<header class="header">
			<div class="arrow" @click="hidePlayer"><van-icon name="arrow-left"/></div>
			<div class="music-title">
				{{music.name}}
				<!-- <van-notice-bar color="#2c3e50" background="#fff" :text="music.name" v-if="getStringLength" name="1">
				</van-notice-bar>
				<van-notice-bar color="#2c3e50" background="#fff"  v-else :scrollable="false" name="2">
					{{music.name}}
				</van-notice-bar> -->
			</div>
			<div class="share" >
				<van-icon name="/static/images/icon/icon_upload.svg" @click="share"/>
			</div>
		</header>
		<section class="main-content" ref="mainContent" @click="showWord">
			<div v-if="isShowWord" class="word-container">
				<div class="word-content" :style="controlPosition">
					<div v-for="(row, i) in wordArr" :key="row.startTime" :class="i===wordFocusIndex?'focus':''">
						{{row.text}}
					</div>
				</div>
			</div>
			<div v-show="!isShowWord" class="head-img" :style="{ transform: `rotate(${rotateDeg}deg)`}">
				<img :src="music.picUrl"/>
			</div>
		</section>
		<section class="operation">
			<div class="collection"><van-icon name="like-o" @click="collection"/></div>
			<div class="download"><van-icon name="diamond-o" @click="download"/></div>
			<div class="show-word"><van-icon name="comment-o" @click="showWord"/></div>
			<div class="comment">
				<router-link :to="`/music/comment/${music.id}`"><van-icon name="chat-o"/></router-link>
			</div>
			<div class="more"><van-icon name="ellipsis"/></div>
		</section>
		<section class="play-progress-bar">
	　		<audio ref='audio' id="audio" preload="auto" class="audio" :src="music.url"></audio>
			<div class="time-now">{{timeNow}}</div>
			<div class="progress-bar">
				<van-slider v-model="playProcess" @change="processChange" :max="processLength" active-color="#666" bar-height="0.1rem"/>
			</div>
			<div class="time-total">{{timeTotal}}</div>
		</section>
		<section class="control">
			<div class="play-model">
				<van-icon name="descending" v-if="changeMusicModel==='order'" @click="changePlayModel"/>
				<van-icon name="exchange" v-if="changeMusicModel==='random'" @click="changePlayModel"/>
				<van-icon name="replay" v-if="changeMusicModel==='loop'" @click="changePlayModel"/>
			</div>
			<div class="previou-music"><van-icon name="arrow-left" @click="previous"/></div>
			<div class="play-control">
				<van-icon name="pause-circle-o" v-if="playState" @click="clickStop"/>
				<van-icon name="play-circle-o" v-else @click="clickPlay"/>
			</div>
			<div class="next-music"><van-icon name="arrow" @click="next"/></div>
			<div class="recent-music-menu"><van-icon name="bars"/></div>
		</section>
	</div>
</template>

<script>
import Autio from '../../components/Audio';
import GlobalBus from '../../components/GlobalBus';
import { Toast, Icon, NoticeBar, Slider } from 'vant';
import Vue from 'vue';
import { defaultCoreCipherList } from 'constants';

Vue.use(Toast).use(Icon).use(NoticeBar).use(Slider);
//import { setTimeout } from 'timers';
export default {
	name: 'Index',
	data(){
		return {
			music: {
			// 	id: 0,
			// 	name: '情非得已',
			// 	url: '/static/media/song.mp3',
			// 	picUrl: '/static/images/head-img1.png',
			// 	author: '庾澄庆',
			// 	album: '电视剧《流星花园》主题曲',
			// 	video: null,
			// 	quality: 'HQ',
			// 	word: '\n难以忘记初次见你\n一双迷人的眼睛\n在我脑海里你的身影\n挥散不去\n握你的双手感觉你的温柔\n真的有点透不过气\n你的天真 我想珍惜\n看到你受委屈我会伤心 哦\n只怕我自己会爱上你\n不敢让自己靠的太近\n怕我没什么能够给你\n爱你也需要很大的勇气\n只怕我自己会爱上你\n也许有天会情不自禁\n想念只让自己苦了自己\n爱上你是我情非得已\n什么原因\n我竟然又会遇见你\n我真的真的不愿意\n就这样陷入爱的陷阱哦\n只怕我自己会爱上你\n不敢让自己靠的太近\n怕我没什么能够给你\n爱你也需要很大的勇气\n只怕我自己会爱上你\n也许有天会情不自禁\n想念只让自己苦了自己\n爱上你是我情非得已\n爱上你是我情非得已',
			// 	wordArr: []
			// 
			},
			currentPalyList: [],		// 播放列表
			musicIndex: 0,				// 播放音乐在播放列表中的索引
			musicListName: '',			// 播放列表的名称
			wordArr: [],				// 歌词数组
			isShowWord: false, 			// 是否显示歌词
			processLength: 100,			// 进度条长度
			playState: false, 			// 播放状态：true:'playing' || false:'stop',
			rotateDeg: 0, 				// 旋转角度
			rotateInterval: null,   	// 系数，用来控制旋转与暂停
			playProcess: 0, 			// 播放进度
			audio: null, 				// audio元素
			timeNow: '00:00',       	// 当前播放的时间，分钟：秒
			timeTotal: '00:00',			// 歌曲总时间，分钟：秒
			currentTime: 0, 			// 当前时间，秒
			totalTime: 1, 				// 歌曲总时间，分钟：秒
			wordFocusIndex: 0,			// 歌曲播放到歌词的行数
			contentHeight: 0,			// 中间歌词区域的高度
			isHidden: true,				// 控制是否让播放歌曲页面显示在最上面
			changeMusicModel: 'order', 	// 切歌模式'order'||'random'||'loop'
		}
	},
	created() {
		const that = this;
		GlobalBus.$on('playMusic', (index, list, musicListName)=>{
			const music = list[index];
			that.musicIndex = index;
			// 当前播放更换列表
			if(musicListName !== that.musicListName){
				that.currentPalyList = list;
				that.musicListName = musicListName;
			}
			// 更换当前播放音乐
			if(music.id !== that.music.id){
				that.playMusic(music);
			}
		});
		GlobalBus.$on('showMainPlayer', (music)=>{
			if(music.id !== that.music.id){
				that.music = music;
			}
			that.showPlayer();
		});
		GlobalBus.$on('changeMainPlayState', (state, music)=>{
			if(music.id !== that.music.id){
				that.music = music;
			}
			if(state){
				that.start();
			}else{
				that.stop();
			}
		});
	},
	mounted(){ 
		this.init();
	},
	methods: {
		init(){
			const audio = this.$refs.audio;
			const that = this;
			this.audio = audio;
			audio.load();
		    audio.oncanplay = function () {  
	            that.totalTime = audio.duration || 0;
				that.timeTotal = that.secondToMinute(that.totalTime);
				// audio.play();
	      	}
			this.timeNow = this.secondToMinute(audio.currentTime);
			this.contentHeight = this.$refs.mainContent.clientHeight;
			this.readRecentPlayList();
		},
		// 获取歌词
		getSongWord(id){
			const urlLocal = '/music/lyric?id=' + id;
			this.$ajax.get(urlLocal).then((res)=>{
				const wordSplit = res.lrc.lyric.split('\n');
				wordSplit.pop();
				this.wordArr = wordSplit.map(e=>{
					const time = this.minuteToSecond(e.match(/\[(\S*)]/)[1]);
					const text = e.match(/](\S*)/)[1];
					const obj = {
						startTime: time,
						text: text
					}
					return obj;
				});
			}).catch(err=>{
				console.log(err);
			});
		},
		// 开始
		start(){
			this.playState =  true;
			// 设置500ms延时，以防有时音乐未加载导致的播放失败
			setTimeout(()=>{
				this.audio.play();
			}, 500);
			this.rotate();
			this.addToRecentPlay();
			this.sendMusicIsListening();
		},
		// 重新开始播放
		reStart(){
			this.playState =  true;
			this.audio.currentTime = 0;
			// 设置500ms延时，以防有时音乐未加载导致的播放失败
			setTimeout(()=>{
				this.audio.play();
			}, 500);
			this.rotate();
			this.addToRecentPlay();
			this.sendMusicIsListening();
		},
		// 停止
		stop(){
			this.playState = false;
			this.audio.pause();
			clearInterval(this.rotateInterval);
		},
		// 上一曲
		previous(){
			let music = null;
			if(this.changeMusicModel === 'random'){
				const n = this.randomNum(0, this.currentPalyList.length-1);
				music = this.currentPalyList[n];
			}else{
				this.musicIndex = this.musicIndex <= 0 ? this.currentPalyList.length - 1 : this.musicIndex - 1;
				music = this.currentPalyList[this.musicIndex];
			}
			this.playMusic(music);
		},
		// 下一曲
		next(){
			let music = null;
			if(this.changeMusicModel === 'random'){
				const n = this.randomNum(0, this.currentPalyList.length-1);
				music = this.currentPalyList[n];
			}else{
				this.musicIndex = this.musicIndex >= this.currentPalyList.length - 1 ? 0 : this.musicIndex + 1;
				music = this.currentPalyList[this.musicIndex];
			}
			this.playMusic(music);
		},
		// 告诉别人正在听的音乐
		sendMusicIsListening(){
			GlobalBus.$emit('musicIsListening', this.music.id, this.musicIndex);
		},
		// 点击播放按钮
		clickPlay(){
			this.start();
			this.changeMiniPlayState(true);
		},
		// 点击停止按钮
		clickStop(){
			this.stop();
			this.changeMiniPlayState(false);
		},
		// 获取并播放音乐
		playMusic(music){
			const that = this;
			that.$ajax.get('/music/song/url?id='+music.id).then((res)=>{
				const song = res.data[0];
				if(song.url){
					that.music = music;
					that.music.url = song.url;
					that.addToRecentPlay();
					that.changeMusic();
					that.clickPlay();
					that.getSongWord(that.music.id);
				}else{
					that.errorMsg('抱歉，《'+ music.name +'》还没有版权～');
					that.stop();
				}
			}).catch(err=>{
				console.log(err);
			});
		},
		// 图片旋转
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
				if(that.playProcess >= that.processLength-0.1){
					that.autoChangeMusic();
				}
			}, 50);
		},
		// 更新进度条
		processChange(value){
			this.audio.currentTime = this.totalTime * value/this.processLength;
			this.timeNow = this.secondToMinute(this.audio.currentTime);
		},
		// 是否显示歌词
		showWord(){
			this.isShowWord = !this.isShowWord;
			if(this.isShowWord && this.wordArr.length === 0){
				this.getSongWord(this.music.id);
			}
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
		// 计算文字
		focusIndex(){
			for(let i=0; i< this.wordArr.length-1;i++){
				let row = this.wordArr[i+1];
				if(this.audio.currentTime < row.startTime){
					return i;
				}
			}
		},
		// 分享
		share(){
			Toast('分享成功');
		},
		// 收藏
		collection(){
			Toast('收藏成功');
		},
		// 下载
		download(){
			Toast('下载成功');
		},
		// 更换切歌模式
		changePlayModel(){
			switch(this.changeMusicModel){
				case 'order':
					this.changeMusicModel = 'random';
					Toast('随机播放');
					break;
				case 'random':
					this.changeMusicModel = 'loop';
					Toast('单曲循环');
					break;
				case 'loop':
					this.changeMusicModel = 'order';
					Toast('列表循环');
					break;
				default: 
					this.changeMusicModel = 'order';
					break;
			}
		},
		// 按照模式自动切歌
		autoChangeMusic(){
			if(this.changeMusicModel === 'order'){
				this.next();
			}else if(this.changeMusicModel === 'random'){
				const n = this.randomNum(0, this.currentPalyList.length-1);
				this.playMusic(this.currentPalyList[n]);
			}else{
				this.processChange(0);
			}
		},
		// 添加到最近播放
		addToRecentPlay(){
			//const obj = {"title": this.music.title, "url": this.music.url, "singer": this.music.singer, "album": this.music.album, "video": this.music.video};
			if(!this.music.id){
				return;
			}
			const locla_user = localStorage.user;
			let user = null;
			if(locla_user){
				user = JSON.parse(localStorage.user);
				
				const _list = user.recentPlay;
				if(_list[0].name !== this.music.name){
					_list.unshift(this.music);
					if(_list.length > 20){
						_list.pop();
					}
					user.name = 'Alan';
					user.recentPlay = _list;
					user.musicListNameIsListening = this.musicListName;
					user.musicListIsListening = this.currentPalyList;
				}else{
					return;
				}
			}else{
				user = {
					name: 'Alan',
					recentPlay: [this.music],
					musicListNameIsListening: this.musicListName,
					musicListIsListening: this.currentPalyList
				}
			}
			localStorage.user = JSON.stringify(user);
			// console.log('user', user);
		},
		// 打开读取上次播放列表
		readRecentPlayList(){
			const locla_user = localStorage.user;
			if(locla_user && this.currentPalyList.length === 0){
				const user = JSON.parse(localStorage.user);
				this.currentPalyList = user.musicListIsListening;
			}
		},
		showPlayer(){
			this.isHidden = false;
		},
		hidePlayer(){
			this.isHidden = true;
		},
		// 正在播放的歌曲改变了
		changeMusic(){
			GlobalBus.$emit('changeMusic', this.music);
		},
		changeMiniPlayState(state){
			GlobalBus.$emit('changeMiniPlayState', state);
		},
		//生成从minNum到maxNum的随机数
		randomNum(minNum, maxNum){
			return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
		}
		
	},
	components: {
		
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

.play-container{
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	font-size: 0.5rem;
	background-color: #fff;
	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;
	.header{
		display: flex;
		flex-basis: 1.8rem;
		line-height: 1.8rem;
		text-align: center;
		align-items: center;
		justify-content: center;
		.arrow{
			flex-basis: 1.5rem;
			line-height: 1.5rem;
			font-size: 0.6rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.music-title{
			height: 1.5rem;
			line-height: 1.5rem;
			flex-basis: 7rem;
			text-align: left;
			vertical-align: middle;
			overflow: hidden;
			text-overflow:ellipsis; //溢出用省略号显示
			white-space:nowrap; //溢出不换行
			.van-notice-bar{
				font-size: 0.5rem;
				height: 1.5rem;
				.van-notice-bar__wrap{
					height: 0.6rem;
					line-height: 0.6rem;
					.van-notice-bar__content{
						
					}
				}
			}
		}
		.share{
			flex-basis: 1.5rem;
			font-size: 0.7rem;
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
			.van-slider__button-wrapper{
				opacity: 0!important;
			}
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

// .z-index-hidden{
// 	z-index: -1;
// }
</style>
