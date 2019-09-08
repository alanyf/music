<template>
    <div class="playlist-square-container">
        <header class="header">
            <div class="arrow" @click="$router.back()"><van-icon name="arrow-left"/></div>
            <div class="music-title">歌单广场</div>
        </header>
        <div class="list-content">
            <div class="list-row" v-for="item in playList" :key="item.id" @click="gotoMusicList(item)">
                <div class="row-image">
                    <div class="head-img">
                        <img :src="item.picUrl" />
                        <div class="play-count">
                            <van-icon name="play-circle-o"/>
                            <div class="play-count-num">{{Math.floor(item.playCount / 10000) }}万</div>
                        </div>
                    </div>
                    <div class="row-title">{{item.name}}</div>
                </div>
            </div>
        </div>
        <BottomPlayer/>
    </div>
</template>

<script>
import BottomPlayer from '../../components/BottomPlayer';
export default {
    name: 'PlayList',
    data(){
        return {
            playList: []
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        init(){
            this.$ajax.get('/music/top/playlist/highquality?limit=30').then((res)=>{
			this.playList = res.playlists.map(e => {
				return {
					id: e.id,
					name: e.name,
					playCount: e.playCount,
					picUrl: e.coverImgUrl,
					tag: e.tag
				};
			});
		});
        },
        gotoMusicList(item){
            console.log(item);
            this.$router.push({
				path: '/music/playList',
				query: {
					id: item.id
				}
			});
        }
    },
    components: {
        BottomPlayer
    }
}
</script>

<style lang="less">
    .playlist-square-container{
        width: 100%;
        height: 100%;
        font-size: 0.45rem;
        overflow: scroll;
        background-color: white;
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
        .list-content {
            display: flex;
            flex-flow: row wrap;
            align-content: flex-start;
            margin-top: 1.5rem;
            .list-row {
                flex: 0 0 33.33%;
                display: flex;
                justify-content: center;
                margin-bottom: 0.2rem;
                // min-height: 4rem;
                .row-image {

                    .head-img{
                        width: 2.5rem;
                        height: 2.5rem!important;
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
                    .row-title {
                        flex-wrap: wrap;
                        font-size: 0.3rem;
                        width: 2.5rem;
                        color: #999;
                        overflow-wrap: break-word;
                        text-align: left;
                    }
                }
            }
        }
    }
</style>