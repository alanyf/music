<template>
	<div class="my-container">
		<section class="tools">
			<div class="tools-row">
				<Circular v-for="tool in toolsList" :title="tool.title" :icon="tool.icon" :key="tool.icon"/>
			</div>
		</section>
		<section class="my-lists">
			<div v-for="item in myList" :key="item.listName">
				<div class="list-row" @click="gotoMusicList(item)">
					<div class="icon">
						<van-icon :name="item.icon"/>
					</div>
					<div class="list-name">
						{{item.title}}
						<div class="item-num">({{item.num}})</div>
						<van-icon v-if="listInListening===item.title" name="volume" class="isListening"/>
					</div>
				</div>
			</div>
		</section>
		<secxtion class="music-list">
			<div class="list-item" v-for="(musicListItem, i) in musicList" :key="musicListItem.title">
				<div class="header-bar">
					<div class="door-icon" @click="triggerMusicList(i)">
						<van-icon name="arrow-down" :class="`${isShowMusicList[i]?'':'rotate'}`" />
					</div>
					<div class="title">{{musicListItem.title}}<div class="item-num">({{musicListItem.list.length}})</div></div>
					<div class="add-icon" @click.stop><van-icon name="plus"/></div>
					<div class="more-icon" @click.stop><van-icon name="ellipsis" class="rotate-90 "/></div>
				</div>
				<div class="list-content" v-if="isShowMusicList[i]">
						<div v-for="item in musicListItem.list" :key="item.title" >
								<div class="list-row">
									<div class="head-img"><img :src="item.picUrl"/></div>
									<div class="row-content">
										<div class="list-title">{{item.title}}</div>
										<div class="list-info">{{item.num}}首，已下载{{item.downloadNum}}首</div>
									</div>
									<div class="more-icon" @click.stop>
										<van-icon v-if="listInListening===item.title" name="volume" class="isListening"/>
										<van-icon v-else name="ellipsis" class="rotate-90"/>
									</div>
								</div>
						</div>
				</div>
			</div>
		</secxtion>
	</div>
</template>

<script>
import Circular from '../../components/Circular';
import GlobalBus from '../../components/GlobalBus';
export default {
	name: 'My',
	data() {
		return {
			toolsList: [
				{icon: '/static/images/icon/icon_flash.svg', title: '最新电音'},
				{icon: 'contact', title: '私人FM'},
				{icon: 'star-o', title: '私藏推荐'},
				{icon: 'thumb-circle-o', title: '古典推荐'},
				{icon: 'logistics', title: '跑步FM'},
				{icon: 'service-o', title: '电台'},
			],
			myList: [
				{icon: 'music-o', title: '本地音乐', num: 19,  to: '/music/menu', type: 'local'},
				{icon: 'service-o', title: '最近播放', num: 102, to: '/music/menu', type: 'recent'},
				{icon: '/static/images/icon/icon_download.svg', title: '下载管理', num: 6,   to: '/music/menu', type: 'download'},
				{icon: 'service-o', title: '我的电台', num: 0,   to: '/music/menu', type: 'radio'},
				{icon: 'star-o', title: '我的收藏', num: 3,   to: '/music/menu', type: 'collection'}
			],
			musicList: [
				{
					title: '我的歌单', list: [
						{picUrl: '/static/images/head-img-1.jpeg', title: '民谣', num: 210, downloadNum: 5},
						{picUrl: '/static/images/head-img-2.jpeg', title: '抒情', num: 378, downloadNum: 24},
						{picUrl: '/static/images/head-img-3.jpeg', title: '欧美', num: 32, downloadNum: 35},
						{picUrl: '/static/images/head-img-4.jpeg', title: '流行', num: 45, downloadNum: 6},
						{picUrl: '/static/images/head-img-5.jpeg', title: '阿拉贝拉', num: 98, downloadNum: 4},
						{picUrl: '/static/images/head-img-6.jpeg', title: '佛拉门戈', num: 24, downloadNum: 6},
						{picUrl: '/static/images/head-img-7.jpeg', title: '中国风', num: 34, downloadNum: 23},
						{picUrl: '/static/images/head-img-8.jpeg', title: '吉他曲', num: 58, downloadNum: 4},
					]
				},
				{
					title: '收藏的歌单', list: [
						{picUrl: '/static/images/head-img-5.jpeg', title: '布鲁斯', num: 98, downloadNum: 4},
						{picUrl: '/static/images/head-img-6.jpeg', title: 'R&B', num: 24, downloadNum: 6},
						{picUrl: '/static/images/head-img-7.jpeg', title: '古典', num: 34, downloadNum: 23},
						{picUrl: '/static/images/head-img-8.jpeg', title: '钢琴曲', num: 58, downloadNum: 4},
					]
				},

			],
			isShowMusicList: [],
			listInListening: ''
		}
	},
	methods: {
		triggerMusicList(index){
			this.$set(this.isShowMusicList, index, !this.isShowMusicList[index]);
		},
		gotoMusicList(listObj){
			this.$router.push({
				path: listObj.to,
				query: {
					type: listObj.type,
					id: listObj.id||243816,
					title: listObj.title
				}
			});
			// this.$store.commit('changeMuiscList', this.playlist);
		}
	},
	components: {
		Circular,
		GlobalBus
	},
	created(){
		// GlobalBus.$on('listInListening', (type)=>{
		// 	console.log('在听歌单:', type);
		// 	this.listInListening = type;
		// });
	},
	mounted(){
		const locla_user = localStorage.user;
		if(locla_user){
			const user = JSON.parse(localStorage.user);
			this.listInListening = user.musicListNameIsListening;
		}else{
			return;
		}
	}
}
</script>

<style lang="less">
    .my-container{
        display: flex;
        width: 100%;
		height: 100%;
		flex-direction: column;
		font-size: 0.5rem;
		background-color: #fff;
        .tools{
          display: flex;
          flex-basis: 1.5rem;
		  flex-shrink: 1;
		  
		  .tools-row{
			  	display: flex;
				overflow: scroll;
				margin: 0.2rem 0;
		  }
        }
        .my-lists{
			display: flex;
			flex-basis: 7rem;
			flex-direction: column;
			.list-row{
				display: flex;
				height: 1.5rem;
				text-align: left;
				.icon{
					flex-basis: 2rem;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					line-height: 1.4rem;
					text-align: center;
					font-size: 0.5rem;
					i{
						font-size: 0.7rem;
						transition: none;
					}
				}
				.list-name{
					display: flex;
					flex-basis: 8rem;
					line-height: 1.5rem;
					font-size: 0.44rem;
					border-bottom: 1px solid #ddd;
					align-items: center;
					.item-num{
						color: #aaa;
						font-size: 0.3rem;
						line-height: 1.4rem;
						margin-left: 0.1rem;
					}
				}
				&:last-child{
					.list-name{
						border-bottom: none;
					}
				}
			}
        }
        .music-list{
			display: flex;
			flex-basis: 6rem;
			flex-direction: column;
			padding-bottom: 2rem;
			.header-bar{
				display: flex;
				flex-basis: 1rem;
				.door-icon{
					flex-basis: 1rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: lighter;
					i{
						transition-property: transform; /*过渡属性名*/
						transition-duration:0.1s; /*过渡花费时间 默认0*/
						transition-timing-function:linear; 
						transform: none;
					}
					.rotate{
						transform: rotate(-90deg);
					}
					// i:hover{
					// 	transform:rotate(-90deg);
					// }
				}
				.title{
					display: flex;
					flex-basis: 7rem;
					text-align: left;
					line-height: 0.8rem;
					.item-num{
						margin-left: 0.1rem;
						font-size: 0.35rem;
						color: #999;
						line-height: 0.8rem;
					}
				}
				.add-icon{
					flex-basis: 1rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: lighter;
				}
				.more-icon{
					flex-basis: 1rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: lighter;
				}
			}
			.list-content{
				display: flex;
				flex-direction: column;
				.list-row{
					display: flex;
					flex-basis: 1.4rem;
					.head-img{
						flex-basis: 2rem;
						height: 1.4rem;
						display: flex;
						align-items: center;
						justify-content: center;
						img{
							width: 1rem;
							height: 1rem;
							border-radius: 5%;
						}
					}
					.row-content{
						display: flex;
						flex-basis: 7rem;
						height: 1.4rem;
						font-size: 0.4rem;
						flex-direction: column;
						text-align: left;
						vertical-align: top;
						.list-title{
							flex-basis: 60%;
							display: flex;
							align-items: flex-end;
						}
						.list-info{
							flex-basis: 40%;
							font-size: 0.3rem;
							color: #999;
						}
					}
					.more-icon{
						flex-basis: 1rem;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #999;
						font-weight: lighter;
						
					}
				}
			}
			.hidden{
				height: 0;
			}
		}
		.isListening{
			color: red;
			margin-left: auto;
			margin-right: 0.2rem;
		}
	}
	.rotate-90{
		transform:rotate(-90deg);
		&:active{
			transform:rotate(-90deg) scale(0.9);
		}
	}
</style>
