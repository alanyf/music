<template>
<div class="menu-container">
	<div class="music-list">
		<!-- <header class="top-nav">
			<div class="top-header"></div>
			<div class="nav-tab"></div>
		</header> -->
		<header class="header">
			<div class="arrow"><i class="el-icon-back"></i></div>
			<div class="music-title">{{type}}</div>
			<div class="share" >
				<i class="el-icon-search margin-right"></i>
				<i class="el-icon-more rotate-90"></i>
			</div>
		</header>
		<article class="list-container">
			<div class="row" v-for="music in musicList" :key="music.url">
				{{music.name}}
			</div>
		</article>
		<footer class="mini-player"></footer>
	</div>

</div>
</template>

<script>
export default {
	name: 'Menu',
	props: {
		title: {
			type: String,
			required: true
		},
		musicLists: {
			type: Object,
			required: true
		}
	},
	data(){
		return {
			tabSelected: 0,
			type: '最近播放',
			musicList: []
		}
	},
	beforeMount(){
		
	},
	mounted(){
		//const url = 'http://localhost:3000/music/playlist/detail?id=24381616';
		const urlLocal = '/music/playlist/detail';
		this.$ajax.get(urlLocal).then((res)=>{
			console.log(res);
			this.musicList = res.data.playlist.tracks;
		}).catch(err=>{
			console.log(err);
		});
		
	}
}
</script>

<style lang="less">
	.menu-container{
		display: flex;
		width: 100%;
		height: 100%;
		font-size: 0.5rem;
		.music-list{
			display: flex;
			flex-direction: column;
			width: 100%;
			.header{
				display: flex;
				flex-basis: 1rem;
				flex-grow: 1;
				flex-shrink: 1;
				line-height: 2rem;
				text-align: center;
				align-items: center;
				justify-content: center;
				font-size: 0.6rem;
				.arrow{
					flex-basis: 1.5rem;
					line-height: 2rem;
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
				width: 100%;
				height: 100%;
				overflow: scroll;
				padding: 0 0.3rem;
			}
			.mini-player{
				position: fixed;
				bottom: 0;
				width: 100%;
				height: 1.5rem;
				background-color: #eee;
			}
		}
	}
</style>
