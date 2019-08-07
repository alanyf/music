<template>
	<div class="my-container">
		<section class="tools">
			<div class="tools-row">
				<Circular v-for="tool in toolsList" :title="tool.title" :picUrl="tool.picUrl" :key="tool.picUrl"/>
			</div>
		</section>
		<section class="my-lists">
			<div class="list-row" v-for="item in myList" :key="item.listName">
				<div class="icon"><img :src="item.picUrl"/></div>
				<div class="list-name">{{item.title}}<div class="item-num">({{item.num}})</div></div>
			</div>
		</section>
		<secxtion class="music-list"></secxtion>
	</div>
</template>

<script>
import Circular from '../../components/Circular';
export default {
	name: 'My',
	data() {
		return {
			toolsList: [
				{picUrl: '/static/images/logo.png', title: '最新电音'},
				{picUrl: '/static/images/logo.png', title: '私人FM'},
				{picUrl: '/static/images/logo.png', title: '私藏推荐'},
				{picUrl: '/static/images/logo.png', title: '古典推荐'},
				{picUrl: '/static/images/logo.png', title: '跑步FM'},
			],
			myList: [
				{picUrl: '/static/images/logo.png', title: '本地音乐', num: 19,  to: '/music/localList'},
				{picUrl: '/static/images/logo.png', title: '最近播放', num: 102, to: '/music/localList'},
				{picUrl: '/static/images/logo.png', title: '下载管理', num: 6,   to: '/music/localList'},
				{picUrl: '/static/images/logo.png', title: '我的电台', num: 0,   to: '/music/localList'},
				{picUrl: '/static/images/logo.png', title: '我的收藏', num: 3,   to: '/music/localList'}
			]
		}
	},
	components: {
		Circular
	}
}
</script>

<style lang="less">
    .my-container{
        display: flex;
        width: 100%;
		height: 100%;
		flex-direction: column;
        .tools{
          display: flex;
          flex-basis: 1.5rem;
          flex-grow: 1;
		  flex-shrink: 1;
		  .tools-row{
			  display: flex;

		  }
        }
        .my-lists{
			display: flex;
			flex-basis: 9rem;
			flex-grow: 1;
			flex-shrink: 1;
			flex-direction: column;
			.list-row{
				display: flex;
				height: 1.7rem;
				text-align: left;
				.icon{
					flex-basis: 2rem;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					img{
						width: 1.3rem;
						height: 1.3rem;
						border-radius: 50%;
					}
				}
				.list-name{
					display: flex;
					flex-basis: 8rem;
					line-height: 1.7rem;
					font-size: 0.44rem;
					border-bottom: 1px solid #ddd;
					
					.item-num{
						color: #aaa;
						font-size: 0.3rem;
						line-height: 1.7rem;
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
          flex-grow: 1;
          flex-shrink: 1;
        }
    }
</style>
