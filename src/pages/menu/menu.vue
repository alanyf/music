<template>
    <div class="menu-container">
        <header class="header">
            <div
                class="arrow"
                @click="back"><van-icon name="arrow-left"/></div>
            <div class="music-title">{{ title }}</div>
            <div class="share" >
                <van-icon name="search"/>
                <van-icon
                    name="ellipsis"
                    class="rotate-90 margin-right"/>
            </div>
        </header>
        <article class="list-container">
            <van-list
                :finished="true"
                finished-text="我也是有底线的">
                <van-cell
                    v-for="(music, i) in playlist"
                    :key="music.url"
                    class="list-row"
                    @click="playMusic(music, i)">
                    <van-icon
                        v-if="currentMusicIndex===i"
                        name="volume"
                        class="isListening"/>
                    <div class="music-info">
                        <div class="music-title">{{ music.name }}</div>
                        <div class="detail-info">
                            <div class="music-quality"><div class="icon">{{ music.quality }}</div></div>
                            <div class="author-album">{{ music.author }} - {{ music.album }}</div>
                        </div>
                    </div>
                    <div
                        class="music-mv"
                        @click.stop>
                        <van-icon
                            v-if="music.mv"
                            name="video-o"/>
                    </div>
                    <div
                        class="more-operation"
                        @click.stop><van-icon
                            name="ellipsis"
                            class="rotate-90"/></div>
                </van-cell>
            </van-list>
        </article>
        <BottomPlayer/>
    </div>
</template>

<script>
    import BottomPlayer from '../../components/BottomPlayer';
    import GlobalBus from '../../components/GlobalBus';
    import Vue from 'vue';
    import {mapState} from 'vuex';
    import {List, NoticeBar} from 'vant';
    Vue.use(List).use(NoticeBar);
    export default {
        name: 'Menu',
        components: {
            BottomPlayer
        },
        data() {
            return {
                playlist: [
                    // {name: '情非得已', url: '/static/media/song.mp3', quality: 'HQ', author: '庾澄庆', album: '流星花园主题曲'}
                ],
                musicIsListeningIndex: -1
            };
        },
        mounted() {
            this.id = this.$route.query.id;
            this.type = this.$route.query.type;
            this.title = this.$route.query.title;
            if (this.type === 'recent') {
                const userStr = localStorage.user;
                let user = null;
                if (!userStr) {
                    user = {name: 'Alan', recentPlay: []};
                }
                else {
                    user = JSON.parse(userStr);
                }
                this.playlist = user.recentPlay;
            }
            else {
                this.getPlayList();
            }
            this.getRecentMusic();
        },
        created() {

        },
        methods: {
            playMusic(music, index) {
                // 改变正在播放的音乐
                if (this.music.id !== music.id) {
                    this.$store.commit('changeMusic', music);
                    this.$store.commit('changePlayState', true);
                    GlobalBus.$emit('playMusic', music);
                    this.$store.commit('changeCurrentMusicIndex', index);
                }
                // 改变正在播放的音乐列表
                if (this.isSameList !== true) {
                    this.$store.commit('changeCurrentPlayList', this.playlist);
                    this.saveCurrentPlayList(this.currentPlayList);
                }
                // 现在在听的音乐在播放列表中的索引
                this.musicIsListeningIndex = index;
            },

            back() {
                this.$router.back();
            },

            getPlayList() {
                console.log(this.$route.query.id, this.$route.query);
                const host = 'http://localhost:3000';
                const urlLocal = host + '/playlist/detail?id=243816';
                const id = this.$route.query.id || 243816;
                const url = '/music/playlist/detail?id=' + id;
                this.$ajax.get(url).then((res) => {
                    console.log(res);
                    this.playlist = res.playlist.tracks.map(e => {
                        const obj = {
                            id: e.id,
                            name: e.name,
                            url: e.url,
                            picUrl: e.al.picUrl,
                            album: e.al.name,
                            mv: e.mv,
                            quality: 'SQ',
                            author: e.ar.map(singer => singer.name).join(' ')
                        };
                        return obj;
                    });
                    this.getRecentMusic();
                }).catch(err => {
                    console.log(err);
                });
            },
            getRecentMusic() {
                if (this.isSameList) {
                    for (let i = 0; i < this.playlist.length; i++) {
                        if (this.playlist[i].id === this.music.id) {
                            // this.musicIsListeningIndex = i;
                            this.$store.commit('changeCurrentMusicIndex', i);
                            break;
                        }
                    }
                }
            },
            saveCurrentPlayList(playList) {
                const locla_user = localStorage.user;
                if (locla_user) {
                    const user = JSON.parse(locla_user);
                    user.currentPlayList = playList;
                    localStorage.user = JSON.stringify(user);
                }
            }
        },
        computed: {
            ...mapState(['currentPlayList']),
            ...mapState(['music']),
            ...mapState(['currentMusicIndex']),
            // 正在播放的列表与现在即将播放的列表是否为同一个
            isSameList() {
                let sameListFlag = true;
                for (let i = 0; i < this.playlist.length; i++) {
                    if (!this.currentPlayList || this.playlist.length !== this.currentPlayList.length || (this.currentPlayList[i] && this.playlist[i].id !== this.currentPlayList[i].id)) {
                        sameListFlag = false;
                        break;
                    }
                }
                return sameListFlag;
            }
        }
    };
</script>

<style lang="less">
	.menu-container{
		display: flex;
		width: 100%;
		height: 100%;
		font-size: 0.5rem;
		flex-direction: column;
		background-color: #fff;
		// position: fixed;
		// top: 0;
		// left: 0;
		// z-index: 2;
		.header{
			display: flex;
			flex-basis: 1.5rem;
			line-height: 1.5rem;
			text-align: center;
			align-items: center;
			justify-content: center;
			font-size: 0.6rem;
			border-bottom: 1px solid rgb(240, 238, 238);
			.arrow{
				flex-basis: 1.5rem;
				line-height: 1.5rem;
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
				overflow: hidden;
				text-overflow:ellipsis; //溢出用省略号显示
				white-space:nowrap; //溢出不换行
			}
			.share{
				display: flex;
				align-items: center;
				justify-content: center;
				flex-basis: 2rem;
				i{
					flex-grow: 1;

				}
			}
		}
		.list-container{
			//width: 100%;
			height: 100%;
			flex-flow: 1;
			overflow: scroll;
			padding: 0 0.5rem 2rem 0.5rem;
			.list-row{
				display: flex;
				height: 1.5rem;
				padding: 0.1rem 0;
				text-align: left;
				border-bottom: 1px solid rgb(240, 238, 238);
				display: flex;
				align-items: center;
				.music-info{
					flex-basis: 8.5rem;
					flex-grow: 1;
					.music-title{
						font-size: 0.45rem;
						width: 6.5rem;
						height: 0.6rem;
						line-height: 0.6rem;
						overflow: hidden;
						text-overflow:ellipsis; //溢出用省略号显示
						white-space:nowrap; //溢出不换行
					}
					.detail-info{
						font-size: 0.3rem;
						height: 0.5rem;
						line-height: 0.5rem;
						display: flex;
						color: #999;
						.music-quality{
							flex-basis: 0.6rem;
							text-align: center;
							display: flex;
							align-items: center;
							.icon{
								font-size: 0.22rem;
								font-weight: bolder;
								height: 0.28rem;
								line-height: 0.3rem;
								border: 1px solid red;
								color: red;
								padding: 0 0.04rem;
							}
						}
						.author-album{
							flex-basis: 5rem;
							width: 5.5rem;
							flex-grow: 1;
							overflow: hidden;
							text-overflow:ellipsis; //溢出用省略号显示
							white-space:nowrap; //溢出不换行
						}
					}
				}
				.music-mv{
					flex-basis: 1rem;
					color: #888;
				}
				.more-operation{
					flex-basis: 0.5rem;
					color: #888;
				}
				.isListening{
					color: red;
					margin-right: 0.2rem;
				}
			}
			.van-list__finished-text{
				font-size: 0.35rem;
				height: 0.6rem;
				line-height: 0.6rem;
			}
		}
		.mini-player{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 1.5rem;
			background-color: #eee;
		}

	}
	.z-index-hidden{
		z-index: -1;
	}

</style>
