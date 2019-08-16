<template>
	<div class="my-container">
		<section class="tools">
			<div class="tools-row">
				<Circular v-for="tool in toolsList" :title="tool.title" :icon="tool.icon" :key="tool.icon"/>
			</div>
		</section>
		<section class="my-lists">
			<div v-for="item in myList" :key="item.listName">
				<!-- <router-link to="/music/menu"> -->
					<div class="list-row" @click="gotoMusicList(item)">
						<div class="icon">
							<van-icon :name="item.icon"/>
						</div>
						<div class="list-name">{{item.title}}<div class="item-num">({{item.num}})</div></div>
					</div>
				<!-- </router-link> -->
			</div>
		</section>
		<secxtion class="music-list">
			<div class="list-item">
				<div class="header-bar">
					<div class="door-icon" @click="triggerMusicList(index)">
						<!-- <i :class="`el-icon-arrow-down ${isShowMusicList?'':'rotate'}`" ></i> -->
						<van-icon name="arrow-down" :class="`${isShowMusicList?'':'rotate'}`" />
					</div>
					<div class="title">{{musicList.title}}<div class="item-num">({{musicList.list.length}})</div></div>
					<div class="add-icon" @click.stop><van-icon name="plus"/></div>
					<div class="more-icon" @click.stop><van-icon name="ellipsis" class="rotate-90 "/></div>
				</div>
				<div class="list-content" v-if="isShowMusicList">
					
						<div v-for="item in musicList.list" :key="item.title" >
							<!-- <router-link to="/music/menu"> -->
								<div class="list-row">
									<div class="head-img"><img :src="item.picUrl"/></div>
									<div class="row-content">
										<div class="list-title">{{item.title}}</div>
										<div class="list-info">{{item.num}}首，已下载{{item.downloadNum}}首</div>
									</div>
									<div class="more-icon" @click.stop><van-icon name="ellipsis" class="rotate-90"/></div>
								</div>
							<!-- </router-link> -->
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
				{icon: 'music-o', title: '本地音乐', num: 19,  to: '/music/localList'},
				{icon: 'service-o', title: '最近播放', num: 102, to: '/music/localList'},
				{icon: '/static/images/icon/icon_download.svg', title: '下载管理', num: 6,   to: '/music/localList'},
				{icon: 'service-o', title: '我的电台', num: 0,   to: '/music/localList'},
				{icon: 'star-o', title: '我的收藏', num: 3,   to: '/music/localList'}
			],
			musicList: {
				title: '我的歌单', list: [
					{picUrl: '/static/images/head-img-1.jpeg', title: '民谣', num: 210, downloadNum: 5},
					{picUrl: '/static/images/head-img-2.jpeg', title: '抒情', num: 378, downloadNum: 24},
					{picUrl: '/static/images/head-img-3.jpeg', title: '欧美', num: 32, downloadNum: 35},
					{picUrl: '/static/images/head-img-4.jpeg', title: '流行', num: 45, downloadNum: 6},
					{picUrl: '/static/images/head-img-5.jpeg', title: '布鲁斯', num: 98, downloadNum: 4},
					{picUrl: '/static/images/head-img-6.jpeg', title: 'R&B', num: 24, downloadNum: 6},
					{picUrl: '/static/images/head-img-7.jpeg', title: '古典', num: 34, downloadNum: 23},
					{picUrl: '/static/images/head-img-8.jpeg', title: '钢琴曲', num: 58, downloadNum: 4},
				]
			},
			isShowMusicList: true
		}
	},
	methods: {
		triggerMusicList(){
			this.isShowMusicList = !this.isShowMusicList;
		},
		gotoMusicList(listObj){
			console.log(listObj);
			GlobalBus.$emit('getPlayListInfo', listObj);
		}
	},
	components: {
		Circular,
		GlobalBus
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
	}
	.rotate-90{
		transform:rotate(-90deg);
		&:active{
			transform:rotate(-90deg) scale(0.9);
		}
	}
</style>
