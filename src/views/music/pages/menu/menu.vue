<template>
<div :class="`menu-container ${isHidden?'z-index-hidden':''}`">
	<header class="header">
		<div class="arrow" @click="back"><i class="el-icon-back"></i></div>
		<div class="music-title">{{type}}</div>
		<div class="share" >
			<i class="el-icon-search margin-right"></i>
			<i class="el-icon-more rotate-90"></i>
		</div>
	</header>
	<article class="list-container">
		<div class="list-row" v-for="music in playlist" :key="music.url" @click="playMusic(music)">
			<div class="music-info">
				<div class="music-title">{{music.name}}</div>
				<div class="detail-info">
					<div class="music-quality"><div class="icon">{{music.quality}}</div></div>
					<div class="author-album">{{music.author}} - {{music.album}}</div>
				</div>
			</div>
			<div class="music-mv" @click.stop>
				<i v-if="music.mv" class="el-icon-monitor"></i>
			</div>
			<div class="more-operation" @click.stop><i class="el-icon-more rotate-90"></i></div>
		</div>
	</article>

</div>
</template>

<script>
import BottomPlayer from '../../components/BottomPlayer';
import GlobalBus from '../../components/GlobalBus';
export default {
	name: 'Menu',
	props: {
		title: {
			type: String,
			required: true
		}
	},
	data(){
		return {
			tabSelected: 0,
			type: '歌曲列表',
			playlist: [
				// {name: '情非得已', url: '/static/media/song.mp3', quality: 'HQ', author: '庾澄庆', album: '流星花园主题曲'}
			],
			isHidden: true
		}
	},
	methods: {
		playMusic(music){
			GlobalBus.$emit('playMusic', music);
		},
		
		back(){
			//this.$router.back();
			this.hide();
		},
		show(){
			this.isHidden = false;
		},
		hide(){
			this.isHidden = true;
		},
		getPlayList(){
			const host = 'http://localhost:3000';
			const urlLocal = host+'/playlist/detail?id=243816';
			this.$axios.get(urlLocal).then((res)=>{
				//console.log(res);
				this.playlist = res.playlist.tracks.map(e=>{
					const obj = {
						id: e.id,
						name: e.name,
						url: e.url,
						picUrl: e.al.picUrl,
						album: e.al.name,
						mv: e.mv,
						quality: 'SQ',
						author: e.ar.map(singer=>singer.name).join(' ')
					};
					return obj;
				});
			}).catch(err=>{
				console.log(err);
			});
		}
	},
	mounted(){
		//const url = 'http://localhost:3000/music/playlist/detail?id=24381616';

		GlobalBus.$on('getPlayListInfo', (listObj)=>{
			if(listObj.title === '最近播放'){
				const userStr = localStorage.user;
				let user = null;
				if(!userStr){
					user = {name: 'Alan', recentPlay: []}
				}else{
					user = JSON.parse(userStr);
				}
				this.playlist = user.recentPlay;
			}else{
				this.getPlayList();
			}
			this.type = listObj.title;
			console.log('listObj', listObj, this.type, this.playlist);
			this.show();
		});
	},
	created() {
		
	},
	components: {
		BottomPlayer
	}
}
</script>

<style lang="less">
	.menu-container{
		display: flex;
		width: 100%;
		height: 100%;
		font-size: 0.5rem;
		flex-direction: column;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
		.header{
			display: flex;
			flex-basis: 1.8rem;
			line-height: 1.8rem;
			text-align: center;
			align-items: center;
			justify-content: center;
			font-size: 0.6rem;
			border-bottom: 1px solid rgb(240, 238, 238);
			.arrow{
				flex-basis: 1.5rem;
				line-height: 1.5rem;
			}
			.music-title{
				flex-basis: 6rem;
				text-align: left;
				vertical-align: middle;
				font-size: 0.5rem;
			}
			.share{
				flex-basis: 2.5rem;
				.margin-right{
					margin-right: 0.5rem;
				}
			}
		}
		.list-container{
			//width: 100%;
			height: 100%;
			flex-flow: 1;
			overflow: scroll;
			padding: 0 0.5rem;
			//padding: 0 0.25rem;
			.list-row{
				display: flex;
				height: 1.5rem;
				padding: 0.2rem 0;
				text-align: left;
				border-bottom: 1px solid rgb(240, 238, 238);
				.music-info{
					flex-basis: 8.5rem;
					.music-title{
						font-size: 0.45rem;
						height: 0.6rem;
						line-height: 0.6rem;
						overflow: hidden;
					}
					.detail-info{
						font-size: 0.3rem;
						height: 0.5rem;
						line-height: 0.5rem;
						display: flex;
						color: #999;
						.music-quality{
							flex-basis: 0.6rem;
							text-align: center;
							display: flex;
							align-items: center;
							.icon{
								font-size: 0.22rem;
								font-weight: bolder;
								height: 0.28rem;
								line-height: 0.3rem;
								border: 1px solid red;
								color: red;
								padding: 0 0.04rem;
							}
						}
						.author-album{
							flex-basis: 6rem;
							flex-grow: 1;
							overflow: hidden;
						}
					}
				}
				.music-mv{
					flex-basis: 1rem;
					color: #888;
				}
				.more-operation{
					flex-basis: 0.5rem;
					color: #888;
				}	
			}
		}
		.mini-player{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 1.5rem;
			background-color: #eee;
		}
		
	}
	.z-index-hidden{
		z-index: -1;
	}

</style>
