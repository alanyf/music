<template>
<div class="index-container">
	<header class="header">
		<div class="letf-sidebar-button">
		<i class="el-icon-menu" @click.stop="showSidebar"></i>
		</div>
		<div class="link-tabs">
			<div v-for="tab in tabsArr" :key="tab.to" :class="`link-tab ${$route.path===tab.to&&'focus'}`">
				<router-link :to="tab.to">{{tab.text}}</router-link>
			</div>
		</div>
		<div class="search-button">
			<router-link to="/music/search"><i class="el-icon-search"></i></router-link>
		</div>
	</header>
	<article class="main-content">
		<router-view></router-view>
	</article>
	<footer class="footer"></footer>
	<Account :isShow="isShowSidebar" @hiddenSidebar="hiddenSidebar"/>
</div>
</template>

<script>
import Account from '../account/account';
export default {
	name: 'Index',
	data(){
		return {
			tabsArr: [
				{ text: '我的', to: '/music/index/my' },
				{ text: '发现', to: '/music/index/find' },
				{ text: '朋友', to: '/music/index/friend' },
				{ text: '视频', to: '/music/index/video' },
			],
			isShowSidebar: false
		}
	},
	mounted(){
		const path = this.$route.path;
		
		console.log();
	},
	methods: {
		showSidebar(){
			this.isShowSidebar = true;
		},
		hiddenSidebar(){
			this.isShowSidebar = false;
		}
	},
	components: {
		Account
	}
}
</script>

<style lang="less">

	.index-container{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		font-size: 0.5rem;
		.header{
			display: flex;
			flex-basis: 1rem;
			flex-grow: 1;
			flex-shrink: 1;
			padding: 0.2rem 0;
			.letf-sidebar-button{
				flex-basis: 1.5rem;
			}
			.link-tabs{
				flex-basis: 6.5rem;
				display: flex;
				margin: 0 0.5rem;
				.link-tab{
					flex-grow: 1;
					font-size: 0.45rem;
					text-align: center;
					color: #2c3e50;
					&:active{
						text-decoration: none;
					}
				}
				.focus{
					font-size: 0.5rem;
					color: #000;
					font-weight: bolder;
				}
			}
			.search-button{
				flex-basis: 2rem;
			}
		}
		.main-content{
			display: flex;
			flex-basis: 16rem;
			flex-grow: 1;
			flex-shrink: 1;
		}
		.footer{
			position: fixed;
			bottom: 0;
		}
	}
</style>
