<template>
    <div class="playlist-container">
        <header class="header">
            <div class="arrow" @click="$router.back()"><van-icon name="arrow-left"/></div>
            <div class="music-title">歌单</div>
        </header>
        <div class="playlist-info-container">
            <div class="playlist-info-content">
                <div class="head-img">
                    <img :src="listInf.picUrl" />
                    <div class="play-count">
                        <van-icon name="play-circle-o"/>
                        <div class="play-count-num">{{listInf.playCount>10000?Math.floor(listInf.playCount/10000)+'万':listInf.playCount }}</div>
                    </div>
                </div>
                <div class="playlist-desc">
                    <div class="name">{{listInf.name}}</div>
                    <div class="desc">{{listInf.desc}}</div>
                </div>
            </div>
            <div class="control-row">
                <div v-for="tool in toolsList"  :key="tool.icon" class="flex-item">
                    <Circular :title="tool.title" :icon="tool.icon"/>
                </div>
            </div>
        </div>
        <div class="list-content">
            <div v-for="(music, i) in playList" :key="music.id" class="item-container" @click="playMusic(music, i)">
                <RowItem :music="music" :isListening="isSameList&&currentMusicIndex===i"/>
            </div>
        </div>
        <BottomPlayer/>
    </div>
</template>

<script>
import RowItem from '../../components/RowItem';
import Circular from '../../components/Circular';
import BottomPlayer from '../../components/BottomPlayer';
import GlobalBus from '../../components/GlobalBus';
import {mapState} from 'vuex'
export default {
    name: 'PlayList',
    data(){
        return {
            playList: [],
            listInf: {},
            toolsList: [
                { icon: "comment-o", title: "评论", to: '/music/comment/' },
				{ icon: "share", title: "分享", to: '/music/playListSquare/'},
				{ icon: "like-o", title: "收藏", to: '/music/index/find/' },
				{ icon: "service-o", title: "播放", to: '/music/index/find/' }
            ]
        }
    },
    props: {
        
    },
    mounted(){
        this.getPlayList();
    },
    methods: {
        getPlayList(){
			const id = this.$route.query.id||243816;
			const url = '/music/playlist/detail?id=' + id;
			this.$ajax.get(url).then((res)=>{
                console.log(res);
                this.listInf = {
                    id: id,
                    name: res.playlist.name,
                    picUrl: res.playlist.coverImgUrl,
                    desc: res.playlist.description,
                    playCount: res.playlist.playCount
                };
                this.toolsList[0].title += '(' + res.playlist.commentCount + ')';
                this.toolsList[1].title += '(' + res.playlist.shareCount + ')';
                this.toolsList[2].title += '(' + res.playlist.subscribedCount + ')';
                this.toolsList[3].title += '(' + res.playlist.playCount + ')';
				this.playList = res.playlist.tracks.map(e=>{
                    // console.log(e);
					const obj = {
						id: e.id,
						name: e.name,
						url: e.url,
						picUrl: e.al.picUrl,
						album: e.al.name,
						mv: e.mv,
						quality: 'SQ',
						author: e.ar.map(singer=>singer.name).join(' ')
					};
					return obj;
				});
			}).catch(err=>{
				console.log(err);
			});
        },
        playMusic(music, index){
			// 改变正在播放的音乐
			if(this.music.id !== music.id){
				this.$store.commit('changeMusic', music);
				this.$store.commit('changePlayState', true);
				GlobalBus.$emit('playMusic', music);
				this.$store.commit('changeCurrentMusicIndex', index);
			}
			// 改变正在播放的音乐列表
			if(!this.isSameList){
				this.$store.commit('changeCurrentPlayList', this.playList);
				this.saveCurrentPlayList(this.currentPlayList);
			}
		},
		saveCurrentPlayList(playList){
			const locla_user = localStorage.user;
			if(locla_user){
				const user = JSON.parse(locla_user);
				user.currentPlayList = playList;
				localStorage.user = JSON.stringify(user);
			}
        }
    },
    components: {
        RowItem,
        Circular,
        BottomPlayer
    },
    computed: {
        ...mapState(['currentPlayList', 'currentMusicIndex', 'music']),
        // 正在播放的列表与现在即将播放的列表是否为同一个
		isSameList(){
			let sameListFlag = true;
			for(let i=0;i<this.playList.length;i++){
				if(!this.currentPlayList || this.playList.length !== this.currentPlayList.length ||(this.currentPlayList[i] && this.playList[i].id !== this.currentPlayList[i].id)){
					sameListFlag = false;
					break;
				}
			}
			return sameListFlag;
		},
    }
}
</script>

<style lang="less">
    .playlist-container{
        width: 100%;
        height: 100%;
        background-color: white;
        overflow: scroll;
        font-size: 0.45rem;
        padding-top: 1.2rem;
        .header{
			display: flex;
			height: 1.2rem;
			line-height: 1.2rem;
			text-align: center;
			align-items: center;
			justify-content: center;
			font-size: 0.6rem;
            border-bottom: 1px solid #ccc;
            position: fixed;
            top: 0;
            z-index: 3;
            width: 100%;
            background-color: white;
			.arrow{
				flex-basis: 1.2rem;
				line-height: 1.2rem;
				font-size: 0.6rem;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.music-title{
				flex-basis: 6rem;
				flex-grow: 1;
				text-align: left;
				vertical-align: middle;
				font-size: 0.5rem;
			}
        }
        .playlist-info-container{
            width: 100%;
            display: flex;
            flex-direction: column;
            .playlist-info-content{
                height: 4rem;
                padding: 0.3rem 0.5rem;
                display: flex;
                .head-img{
                    flex-basis: 4rem;
                    height: 4rem;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .play-count{
                        display: flex;
                        align-items: center;
                        color: #ddd;
                        font-size: 0.35rem;
                        height: 0.4rem;
                        line-height: 0.4rem;
                        z-index: 2;
                        position: absolute;
                        right: 0;
                        padding: 0.1rem;
                        font-weight: bolder;
                        i{
                            font-size: 0.25rem;
                        }
                    }
                    img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        border-radius: 5%;
                        z-index: 0;
                    }
                }
                .playlist-desc{
                    flex-basis: 5rem;
                    display: flex;
                    flex-direction: column;
                    padding-left: 0.3rem;
                    text-align: left;
                    .name{
                        font-size: 0.5rem;
                        font-weight: bolder;
                        padding-bottom: 0.15rem;
                    }
                    .desc{
                        font-size: 0.35rem;
                        overflow: hidden;
                    }
                }
            }
            .control-row{
                display: flex;
                border-bottom: 1px solid #ccc; 
                padding-bottom: 0.1rem;
                .flex-item{
                    flex-grow: 1;
                    justify-content: center;
                }
            }
        }
        .list-content{
            width: 100%;
            .item-container{
                width: 100%;
            }
        }
    }
</style>