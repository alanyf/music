<template>
	<div id="app">
		<!-- <RouteLink/> -->
		<router-view/>
		<Menu/>
		<Play/>
	</div>
</template>

<script>
import RouteLink from './components/RouteLink';
import Play from './pages/play/play';
import Menu from './pages/menu/menu';

export default {
	name: 'App',
	data(){
		return {}
	},
	components: {
		RouteLink,
		Play,
		Menu
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
