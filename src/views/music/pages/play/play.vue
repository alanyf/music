<template>
	<div class="play-container">
		<header class="header">
			<div class="arrow"><i class="el-icon-back"></i></div>
			<div class="music-title">{{ music.title }}</div>
			<div class="share"><i class="el-icon-share"></i></div>
		</header>
		<section class="content">
			<p>段落</p>
			<el-button type="primary" icon="el-icon-search">搜索</el-button>
			</section>
		<section class="operation"></section>
		<section class="play-progress-bar">
			
		</section>
		<section class="control"></section>
	</div>
</template>

<script>
export default {
	  name: 'Index',
	  data(){
		  return {
			  music: {
				  title: '情非得已',
				  url: 'http://qsqwxsdcscececefc',
				  word: 'vdgtdvcscd\nsudcbsducsc\ncbsdybcyhsbyhsbdc\ndcbsdbcysd\nsdbd'
			  }
		  }
	  }
}
</script>

<style lang="less">
.play-container{
	display: flex;
	flex-direction: column;
	height: 100%;
	font-size: 0.5rem;
	.header{
		display: flex;
		flex-basis: 1rem;
		line-height: 2rem;
		text-align: center;
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
	.content{
		flex-basis: 16rem;
		
	}
	.operation{
		flex-basis: 0.8rem;
		//flex-grow: 0.5;
	}
	.play-progress-bar{
		flex-basis: 1rem;
		//flex-grow: 0.5;
	}
	.control{
		flex-basis: 1.6rem;
		//flex-grow: 1;
	}
}
</style>
