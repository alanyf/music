<template>
	<div id="app">
		
		<!-- <RouteLink/> -->
		<router-view/>
		<!-- <Menu/> -->
		<Play/>
		<BottomList/>
	</div>
</template>

<script>
import RouteLink from './components/RouteLink';
import Play from './pages/play/play';
import Menu from './pages/menu/menu';
import BottomList from './components/BottomList';
import {mapState} from 'vuex';

export default {
	name: 'App',
	data(){
		return {}
	},
	components: {
		RouteLink,
		Play,
		Menu,
		BottomList
	},
	created(){
		this.init();
	},
	mounted(){
		
	},
	methods: {
		init(){
			const userStr = localStorage.user;
			let recentMusic = null;
			let currentPlayList = null;
			if(userStr){
				const userObj = JSON.parse(userStr);
				// 初始化当前播放列表
				currentPlayList = userObj.currentPlayList;
				// 初始化当前播放音乐
				if(userObj.recentPlay){
					recentMusic = userObj.recentPlay[0];
				}
			}else{
				const user = {};
				recentMusic = {
					album: "时光.漫步",
					author: "许巍",
					id: 168091,
					mv: 0,
					name: "蓝莲花",
					picUrl: "http://p1.music.126.net/C6txAWMGlVmAcAD37RVutQ==/122045790684028.jpg",
					quality: "SQ",
					url: "http://m7.music.126.net/20190905102832/602e4b2b94e5d6edce5e658716579180/ymusic/ce70/d44c/021f/31d3215f707625a65663ab51858d6a86.mp3"
				};
				currentPlayList = [recentMusic];
				user.name = 'Alan';
				user.recentPlay = [recentMusic];
				user.currentPlayList = [recentMusic];
				localStorage.user = JSON.stringify(user);
			}
			this.$store.commit('changeMusic', recentMusic);
			this.$store.commit('changeCurrentPlayList', currentPlayList);
		}
	},
	computed: {
		...mapState(['currentPlayList']),
		...mapState(['music']),
	}
}

// 显示提示框
Vue.prototype.tipMsg = function(text){
	this.$message({
		message: text,
		duration: 1500,
		center: true,
		customClass: 'message-tip'
	});
}
Vue.prototype.errorMsg = function(text){
	this.$message.error({ 
		message: text,
		duration: 1500,
		center: true,
		customClass: 'message-tip'
	});
}
</script>

<style lang="less">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100%;
		background-color: #fff;
	}
	.message-tip{
		i{
			font-size: 0.35rem;
		}
		p{
			font-size: 0.35rem;
			line-height: 0.45rem;
		}
	}
	.van-toast__text{
		font-size: 0.4rem;
		line-height: 0.6rem;
	}
</style>
