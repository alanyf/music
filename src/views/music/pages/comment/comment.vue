<template>
	<div class="comment-container">
		<header class="header">
			<div class="arrow" @click="back"><i class="el-icon-back"></i></div>
			<div class="music-title">评论</div>
			<div class="share" >
				<van-icon name="/static/images/icon/icon_upload.svg" @click="share"/>
			</div>
		</header>
		<div class="main-content">
			<div class="music-row">
				<div class="list-row"  @click="back">
					<div class="head-img"><img :src="music.picUrl"/></div>
					<div class="row-content">
						<div class="list-title">{{music.name}}</div>
						<div class="list-info">{{music.author}}</div>
					</div>
					<div class="more-icon" @click.stop>
						<van-icon name="arrow"/>
					</div>
				</div>
			</div>
			<div class="conmment-content">
				<div class="comment-item" v-for="(comment, i) in hotComments" :key="comment.id">
					<div class="list-row">
						<div class="head-img"><img :src="comment.user.picUrl"/></div>
						<div class="row-content">
							<div class="list-title">{{comment.user.nickname}}</div>
							<div class="list-info">{{formatTime(comment.time)}}</div>
						</div>
						<div class="more-icon" @click.stop="clickGood">
							<div class="liked-count">{{comment.likedCount}}</div>
							<van-icon name="good-job-o"/>
						</div>
					</div>
					<div class="comment-text">
						{{comment.content}}
						<div class="reply-item" v-for="reply in isShowAllReply[i]?comment.reply:comment.reply.slice(0,2)" :key="reply.id">
							<div class="reply-text">
								<span class="reply-nickname">{{reply.user.nickname}}：</span>
								{{reply.content}}
							</div>
						</div>
						<div class="comment-reply" @click="showAllReply(i)">
							共{{comment.reply.length}}条回复
						</div>
					</div>
				</div>
			</div>	
		</div>
		
	</div>
</template>

<script>
import { Toast, Icon } from 'vant';
import { debuglog } from 'util';
export default {
	name: 'Comment',
	data(){
		return {
			music: {},		// 音乐
			musicId: '',	// 音乐id
			comments: [],	// 评论
			hotComments: [],// 热评
			isShowAllReply: []
		}
	},
	mounted(){
		this.musicId = this.$route.params.id;
		const that = this;
		
		this.$http.get('/music/comment/music?id='+this.musicId).then((res)=>{
			console.log(res);
			that.comments = res.comments.map(e => {
				return {
					id: e.commentId,
					content: e.content,
					user: {id: e.user.userId, picUrl: e.user.avatarUrl, nickname: e.user.nickname},
					reply: e.beReplied.map(o=>{return {id: o.id, content: o.content, user:{ id: o.userId, nickname: o.user.nickname, picUrl: o.user.avatarUrl}}}),
					likedCount: e.likedCount,
					time: e.time
				}
			});
			that.hotComments = res.hotComments.map(e => {
				e.beReplied = [].concat(e.beReplied, e.beReplied, e.beReplied, e.beReplied);
				return {
					id: e.commentId,
					content: e.content,
					user: {id: e.user.userId, picUrl: e.user.avatarUrl, nickname: e.user.nickname},
					reply: e.beReplied.map(o=>{return {id: o.id, content: o.content, user:{ id: o.userId, nickname: o.user.nickname, picUrl: o.user.avatarUrl}}}),
					likedCount: e.likedCount,
					time: e.time
				}
			});
		}).catch((err)=>{
			console.log(err);
		});
		this.$http.get('/music/song/detail?ids='+this.musicId).then((res)=>{
				console.log(res);
				const song = res.songs[0];
				const music = {
					id: song.id,
					name: song.name,
					picUrl: song.al.picUrl,
					album: song.al.name,
					author: song.ar.map(singer=>singer.name).join('、')
				}
				console.log(music);
				that.music = music;
			}).catch(err=>{
				console.log(err);
			});
	},
	methods: {
		// 返回
		back(){
			this.$router.back();
		},
		// 分享
		share(){
			Toast('分享成功');
		},
		// 点赞
		clickGood(){
			Toast('点赞成功');
		},
		showAllReply(index){
			// this.isShowAllReply[index] = !this.isShowAllReply[index];
			this.$set(this.isShowAllReply, index , !this.isShowAllReply[index]);
		},
		// 格式化
		formatTime(date, formatStr){
			function format(date, t){
				var date = new Date(date);
				var o = {
					"M+" : date.getMonth()+1,                 //月份   
					"d+" : date.getDate(),                    //日   
					"h+" : date.getHours(),                   //小时   
					"m+" : date.getMinutes(),                 //分   
					"s+" : date.getSeconds(),                 //秒   
					"q+" : Math.floor((date.getMonth()+3)/3), //季度   
					"S"  : date.getMilliseconds()             //毫秒   
				};   
				if(/(y+)/.test(t)){
					t=t.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length)); 
				};    
				for(var k in o){
					if(new RegExp("("+ k +")").test(t)){
						t=t.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+ o[k]).substr((""+o[k]).length))); 
					}; 
				}
				return t; 
			};
			if(typeof date === 'undefind'){
				throw new Error('the param of function formatTime() can\'t be undefined');
			}
			if(typeof date === 'number'){
				if(typeof formatStr === 'string'){
					return format(date, formatStr);
				}else{
					return format(date, 'yyyy-MM-dd hh:mm:ss');
				}
			}
			if(typeof date === 'string'){
				date = (new Date(date)).getTime();
				if(typeof formatStr === 'string'){
					return format(date, formatStr);
				}else{
					return format(date, 'yyyy-MM-dd hh:mm:ss');
				}
			}
			if(Object.prototype.toString.call(date) === '[object Date]'){
				date = date.getTime();
				if(typeof formatStr === 'string'){
					return format(date, formatStr);
				}else{
					return format(date, 'yyyy-MM-dd hh:mm:ss');
				}
			}
		}
	},
	computed:{
		
	}
}
</script>

<style lang="less">
	.comment-container{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		font-size: 0.5rem;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 11;
		background-color: white;
		.header{
			display: flex;
			flex-basis: 1.5rem;
			line-height: 1.5rem;
			width: 100%;
			text-align: center;
			align-items: center;
			justify-content: center;
			position: fixed;
			top: 0;
			background-color: white;
			.arrow{
				flex-basis: 1.5rem;
				line-height: 1.5rem;
				font-size: 0.6rem;
			}
			.music-title{
				height: 1.5rem;
				line-height: 1.5rem;
				flex-basis: 7rem;
				text-align: left;
				vertical-align: middle;
				overflow: hidden;
			}
			.share{
				flex-basis: 1.5rem;
				font-size: 0.7rem;
			}
		}
		.main-content{
			width: 100%;
			height: 100%;
			margin-top: 1.5rem;
			overflow: scroll;
			.music-row{
				.list-row{
					display: flex;
					flex-basis: 2rem;
					.head-img{
						flex-basis: 2.5rem;
						height: 2rem;
						display: flex;
						align-items: center;
						justify-content: center;
						img{
							width: 1.5rem;
							height: 1.5rem;
							border-radius: 5%;
						}
					}
					.row-content{
						display: flex;
						flex-basis: 5rem;
						height: 2rem;
						font-size: 0.6rem;
						flex-direction: column;
						text-align: left;
						vertical-align: top;
						overflow: hidden;
						text-overflow:ellipsis; //溢出用省略号显示
						white-space:nowrap; //溢出不换行
						.list-title{
							flex-basis: 60%;
							display: flex;
							align-items: flex-end;
						}
						.list-info{
							flex-basis: 40%;
							font-size: 0.4rem;
							color: #999;
						}
					}
					.more-icon{
						flex-basis: 1rem;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-left: auto;
						margin-right: 0.2rem;
					}
				}	
			}
			.conmment-content{
				.comment-item{
					.list-row{
						display: flex;
						flex-basis: 1.4rem;
						.head-img{
							flex-basis: 1.4rem;
							height: 1.4rem;
							display: flex;
							align-items: center;
							justify-content: center;
							img{
								width: 1rem;
								height: 1rem;
								border-radius: 50%;
							}
						}
						.row-content{
							display: flex;
							flex-basis: 5.5rem;
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
							margin-left: auto;
							margin-right: 0.5rem;
							.liked-count{
								font-size: 0.35rem;
								line-height: 1.4rem;
							}
						}
					}
					.comment-text{
						text-align: left;
						margin: 0 0.5rem 0.1rem 1.4rem;
						font-size: 0.4rem;
						border-bottom: 1px solid #ddd;
						.reply-item{
							.reply-text{
								text-align: left;
								margin: 0 0.5rem 0 0;
								font-size: 0.4rem;
								font-size: 0.35rem;
								background-color: rgb(242, 242, 242);
								padding: 0.1rem;
								.reply-nickname{
									color:rgb(64, 165, 224);
								}
							}
						}
						.comment-reply{
							font-size: 0.35rem;
							color:rgb(64, 165, 224);
							padding: 0.1rem 0;
						}
					}
				}
			}
		}
		
	}
</style>