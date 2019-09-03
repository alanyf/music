<template>
    <div class="video-container">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <section class="video-item" v-for="video in videoList" :key="video.id">
                <van-skeleton v-if="loadingData" class="skeleton" title avatar :row="1" />
                <div v-else>
                    <div class="info-row">
                        <div class="head-img"><img :src="video.user.picUrl"/></div>
                        <div class="user-nickname">{{video.user.nickname}}</div>
                        <div class="icon like-icon">
                            <van-icon name="good-job-o"/> 
                        </div>
                        <div class="icon comment-icon">
                            <van-icon name="chat-o"/> 
                        </div>
                        <div class="icon more-icon"><van-icon name="ellipsis" class="rotate-90"/> </div>
                    </div>
                    <div class="video-content">
                        <VideoPlayer class="video" :src="video.url" :poster="video.poster"/>
                    </div>
                    <div class="description">{{video.desc}}</div>
                </div>
            </section>
        </van-pull-refresh>
        
    </div>
</template>

<script>
import VideoPlayer from '../../components/VideoPlayer';
import { Icon, Skeleton, PullRefresh } from 'vant';
import { debuglog } from 'util';
Vue.use(Icon).use(Skeleton).use(PullRefresh);
const pageDataNum = 4;
export default {
    name: 'Video',
    data(){
        return {
            videoList: [
                {id: 12345, url: '/static/media/video-1.mp4', desc: '很棒', like: 234, comment: 37, user: { id: '1234', nickname: 'Alan', picUrl: '/static/images/head-img-1.jpeg'} },
                {id: 12345, url: '/static/media/video-1.mp4', desc: '很棒', like: 234, comment: 37, user: { id: '1234', nickname: 'Alan', picUrl: '/static/images/head-img-2.jpeg'} },
                {id: 12345, url: '/static/media/video-1.mp4', desc: '很棒', like: 234, comment: 37, user: { id: '1234', nickname: 'Alan', picUrl: '/static/images/head-img-3.jpeg'} },
                {id: 12345, url: '/static/media/video-1.mp4', desc: '很棒', like: 234, comment: 37, user: { id: '1234', nickname: 'Alan', picUrl: '/static/images/head-img-4.jpeg'} },
            ],
            loadingData: true,
            isLoading: false
        }
    },
    async mounted(){
        const list = await this.getData();
        this.videoList = list;
        this.loadingData = false;
    },
    methods: {
        async onRefresh() {
            // setTimeout(() => {
            //     this.$toast('刷新成功');
            //     this.isLoading = false;
            // }, 500);
            const list = await this.getData();
            this.videoList = list;
            this.isLoading = false;
        },
        async getData(){

                const detail = await this.$ajax.get('/music/artist/desc?id=6452');
                console.log(detail);
            return new Promise((resoleve, reject)=>{
                this.$ajax.get('/music/mv/exclusive/rcmd?offset='+ (this.videoList.length/pageDataNum) +'&limit='+(this.videoList.length+pageDataNum) ).then(async res=>{
                    console.log(res);
                    let count = 0;
                    const list = [];
                    res.data.reverse().map(async e => {
                        // const user = {
                        //     id: e.creator[0].userId,
                        //     nickname: e.creator[0].userName,
                        // }
                        //const obj = await this.$ajax.get('/music/video/detail?id='+e.id);
                        const detail = await this.$ajax.get('/music/mv/detail?mvid='+e.id);
                        // console.log(detail);
                        const artists = await this.$ajax.get('/music/artist/desc?id='+detail.data.artistId);
                        console.log(artists);
                        const picUrl = (artists.topicData&&artists.topicData[0])?artists.topicData[0].coverUrl:'/static/images/head-img-2.jpeg';
                        const urlObj = await this.$ajax.get('/music/mv/url?id='+e.id);
                        // console.log(urlObj);
                        const out = {
                            id: e.id,
                            url: urlObj.data.url,
                            desc: e.briefDesc,
                            poster: e.cover,
                            user: { id: detail.data.artistId, nickname: detail.data.artistName, picUrl: picUrl}
                        }
                        list[count++] = out;
                        if(count >= res.data.length){
                            resoleve(list);
                        }
                    });
                }).catch((err)=>{
                    reject(err);
                });
            });
        }
    },
    components: {
        VideoPlayer
    }
}
</script>

<style lang="less">
    .video-container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0.2rem 0.5rem;
        margin-bottom: 1rem;
        background-color: white;
        .van-pull-refresh__head{
            span, div{
                font-size: 0.4rem!important;
            }
            height: 1rem;
            .van-loading{
                .van-loading__spinner{
                    width: 0.6rem!important;
                    height: 0.6rem!important;
                }
            }
        }
        .video-item{
            display: flex;
            flex-direction: column;
            .skeleton{
                font-size: 0.4rem;
                height: 7rem;   
                .van-skeleton__avatar{
                     height: 1.1rem!important;
                     width: 1.1rem!important;
                }
                .van-skeleton__title{
                    height: 1rem;
                }
                .van-skeleton__row{
                    width: 100%!important;
                    height: 5rem;
                    margin: 0.3rem 0;
                }
            }
            .info-row{
                display: flex;
                flex-direction: row;
				height: 1.5rem;
                text-align: left;
				.head-img{
					flex-basis: 1.2rem;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					line-height: 1.5rem;
					text-align: center;
                    font-size: 0.5rem;
                    img{
                        width: 100%;
                        border-radius: 50%;
                    }
				}
				.user-nickname{
					display: flex;
                    align-items: center;
                    flex-grow: 1;
                    font-size: 0.44rem;
                    text-align: left;
                    padding-left: 0.2rem;
                    overflow: hidden;
                    text-overflow:ellipsis; //溢出用省略号显示
                    white-space:nowrap; //溢出不换行
                }
                .icon{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-basis: 1.1rem;
                }
                .like-icon{
                    
                }
                .comment-icon{
                    
                }
                .more-icon{
                    justify-content: flex-end;
                }
            }
            .video-content{
                display: flex;
                flex-direction: column;
                position: relative;
                .video{
                    display: flex;
                    height: 9*9/16rem;
                    border-radius: 3%;
                    font-size: 0.4rem;
                }
            }
            .description{
                display: flex;
                align-items: center;
                text-align: left;
                font-size: 0.38rem;
                padding: 0.2rem 0;
                border-bottom: 1px solid #ccc;
            }
            
        }
    }
</style>