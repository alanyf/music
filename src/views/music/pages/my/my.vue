<template>
	<div class="my-container">
		<section class="tools">
			<div class="tools-row">
				<Circular v-for="tool in toolsList" :title="tool.title" :picUrl="tool.picUrl" :key="tool.picUrl"/>
			</div>
		</section>
		<section class="my-lists"></section>
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
        }
        .music-list{
          display: flex;
          flex-basis: 6rem;
          flex-grow: 1;
          flex-shrink: 1;
        }
    }
</style>
