<template>
	<div class="circular-container">
		<div class="circular-pic" ><img :src="picUrl" class="img"/></div>
		<div class="circular-title">{{title}}</div>
	</div>
</template>

<script>

export default {
	name: 'Circular',
	props: {
		picUrl: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	}
}
</script>

<style lang="less">
	.circular-container{
		display: flex;
		flex-direction: column;
		height: 2rem;
		margin: 0 0.3rem;
		.circular-pic{
			width: 1.4rem;
			height: 1.4rem;
			border-radius: 50%;
			overflow: hidden;
			.img{
				width: 100%;
				height: 100%;
			}
		}
		.circular-title{
			font-size: 0.35rem;
			line-height: 0.7rem;
		}
	}
</style>
