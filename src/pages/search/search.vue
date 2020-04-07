<template>
    <div class="search-container">
        <section class="search-box-container">
            <van-icon
                name="arrow-left"
                @click="back" />
            <div class="search-box">
                <input
                    :placeholder="placeholder"
                    v-model="query"
                    type="text"
                    class="box" >
                <i
                    v-show="query"
                    class="delete el-icon-close"
                    @click="clear"/>
            </div>
            <van-icon name="manager-o" />
        </section>
        <section
            v-show="tags.length&!isSearchCompelete"
            class="search-history">
            <div class="title">
                <div class="hearder-title">历史记录</div>
                <div class="hearder-button">
                    <van-icon
                        name="delete"
                        @click="clearHistory" />
                </div>
            </div>
            <div class="tags">
                <div class="tags-row">
                    <van-tag
                        v-for="tag in tags"
                        :key="tag.searchword"
                        :class="tagrow"
                        round
                        size="large"
                        text-color="#202223"
                        color="#e6e8ea"
                        @click="touchtags(tag)"
                    >{{ tag.searchword }}</van-tag>
                </div>
            </div>
        </section>
        <section
            v-show="!isSearchCompelete"
            class="hot-list">
            <div class="title">热搜</div>
            <div class="list">
                <div
                    v-for="(item, index) in hotlist"
                    :key="index"
                    class="list-row">
                    <div class="row-index">
                        <span
                            v-if="index<3"
                            style="color:red">{{ index+1 }}</span>
                        <span v-else>{{ index+1 }}</span>
                    </div>
                    <div
                        class="row-content"
                        @click="touchlist(item)">
                        <div class="content-column1">
                            <div class="searchword">{{ item.searchWord }}</div>
                            <div class="score">{{ item.score }}</div>
                            <div class="icon">
                                <img :src="item.iconUrl" >
                            </div>
                        </div>
                        <div class="content-column2">{{ item.content }}</div>
                    </div>
                </div>
            </div>
        </section>
        <section
            v-show="isSearchCompelete"
            class="reach-result">
            <div class="result-tabs">
                <van-tabs
                    :v-model="activeName"
                    swipeable
                    animated
                    @change="tabOnclick">
                    <van-tab
                        v-for="type in searchResult"
                        :key="type"
                        :title="type.type"
                        :name="type.type">
                        <div class="list-container">
                            <van-list
                                :finished="true"
                                finished-text="木了">
                                <van-cell
                                    v-for="(music, i) in type.data"
                                    :key="music.id"
                                    class="list-row"
                                    @click="playMusic(music, i)"
                                >
                                    <div class="music-info">
                                        <div class="music-title">{{ music.name }}</div>
                                        <div class="detail-info">
                                            <div class="music-quality">
                                                <div class="icon">SQ</div>
                                            </div>
                                            <div class="author-album">{{ music.author }} - {{ music.album }}</div>
                                        </div>
                                    </div>
                                    <div class="music-mv"/>
                                    <div
                                        class="more-operation"
                                        @click.stop>
                                        <van-icon
                                            name="ellipsis"
                                            class="rotate-90" />
                                    </div>
                                </van-cell>
                            </van-list>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </section>
        <BottomPlayer/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Tag, Dialog, Tab, Tabs} from 'vant';
    import GlobalBus from '../../components/GlobalBus';
    import BottomPlayer from '../../components/BottomPlayer';
    import {mapState} from 'vuex';
    Vue.use(Tag)
        .use(Dialog)
        .use(Tab)
        .use(Tabs);
    export default {
        name: 'Search',
        props: {
            placeholder: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                query: '',
                tags: [],
                hotlist: [],
                timer: null,
                songlist: [],
                isSearchCompelete: false,
                activeName: '综合',
                searchResult: [
                    {type: '综合', data: []},
                    {type: '单曲', data: []},
                    {type: '视频', data: []},
                    {type: '歌手', data: []},
                    {type: '用户', data: []}
                ]
            };
        },
        watch: {
            query() {
                const that = this;
                clearTimeout(that.timer);
                that.timer = setTimeout(() => {
                    if (that.query) {
                        that.isSearchCompelete = true;
                        const host = 'http://localhost:3000';
                        const urlLocal = '/music/search?keywords=' + that.query + '&type=1018';
                        that.tags.unshift({searchword: that.query});
                        that.$ajax.get(urlLocal).then(res => {
                            console.log(res);
                            that.tabOnclick(that.activeName);
                        });
                        const local_user = localStorage.user;
                        if (local_user) {
                            const user = JSON.parse(localStorage.user);
                            user.recentSearch = that.tags;
                            localStorage.user = JSON.stringify(user);
                        }
                    }
                }, 1000);
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                const host = 'http://localhost:3000';
                const urlLocal = '/music/search/hot/detail';
                const urlSearch = '/music/search/default';
                const that = this;
                const local_user = localStorage.user;
                let user = null;
                if (local_user) {
                    user = JSON.parse(localStorage.user);
                    if (!user.recentSearch) user.recentSearch = this.tags;
                    this.tags = user.recentSearch;
                }
                else {
                    user = {
                        name: 'Alan',
                        recentSearch: this.tags
                    };
                }
                localStorage.user = JSON.stringify(user);
                that.$ajax.get(urlLocal).then(res => {
                    this.hotlist = res.data;
                });
                that.$ajax.get(urlSearch).then(res => {
                    this.placeholder = res.data.realkeyword;
                });
            },
            clear() {
                this.query = '';
            },
            back() {
                if (this.isSearchCompelete) {
                    this.isSearchCompelete = !this.isSearchCompelete;
                    this.query = '';
                }
                else this.$router.back(); // 返回上一层
            },
            touchtags(tag) {
                this.query = tag.searchword;
            },
            touchlist(item) {
                this.query = item.searchWord;
            },
            clearHistory() {
                Dialog.confirm({message: '确定清空全部历史记录'})
                    .then(() => {
                        const local_user = localStorage.user;
                        let user = null;
                        if (local_user) {
                            user = JSON.parse(localStorage.user);
                            (user.recentSearch = []), (this.tags = user.recentSearch);
                            localStorage.user = JSON.stringify(user);
                        }
                    })
                    .catch(() => {});
            },
            playMusic(music, index) {
                // 改变正在播放的音乐
                if (this.music.id !== music.id) {
                    this.$store.commit('changeMusic', music);
                    this.$store.commit('changePlayState', true);
                    GlobalBus.$emit('playMusic', music);
                    this.$store.commit('changeCurrentMusicIndex', index);
                }
                // 改变正在播放的音乐列表
                if (!this.isSameList) {
                    this.$store.commit('changeCurrentPlayList', this.playlist);
                    this.saveCurrentPlayList(this.currentPlayList);
                }
                // 现在在听的音乐在播放列表中的索引
                this.musicIsListeningIndex = index;
            },
            tabOnclick(title) {
                this.$toast(title);
                let type;
                switch (title) {
                case '综合':
                    type = 1018;
                    break;
                case '单曲':
                    type = 1;
                    break;
                case '视频':
                    type = 1014;
                    break;
                case '歌手':
                    type = 100;
                    break;
                case '专辑':
                    type = 10;
                    break;
                case '歌单':
                    type = 1000;
                    break;
                case '主播电台':
                    type = 1009;
                    break;
                case '用户':
                    type = 1002;
                    break;
                default:
                    type = 1; // 默认单曲
                    break;
                }
                const that = this;
                const host = 'http://localhost:3000';
                const urlLocal = '/music/search?keywords=' + that.query + '&type=' + type;
                that.tags.unshift({searchword: that.query});
                that.$ajax.get(urlLocal).then(res => {
                    // if (type == 1) {
                    that.songlist = res.result.song.songs.map(e => {
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
                    // that.songlist = res.result.song.songs;
                    that.searchResult.forEach(e => e.data = that.songlist);
                    // }
                });
                const local_user = localStorage.user;
                if (local_user) {
                    const user = JSON.parse(localStorage.user);
                    user.recentSearch = that.tags;
                    localStorage.user = JSON.stringify(user);
                }
            }
        },
        computed: {
            ...mapState(['music'])
        },
        components: {
            BottomPlayer
        }
    };
</script>

<style lang="less">
.search-container {
  width: 100%;
  height: 100%;
  margin: 0.2rem, 0.5rem;
  background-color: white;
  overflow: scroll;
  .search-box-container {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    background-color: white;
    flex-wrap: nowrap;
    flex-basis: 1rem;
    height: 1rem;
    font-size: 0.6rem;
    z-index: 4;
    i {
      flex: 0 0 15%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .search-box {
      flex: 0 0 70%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 1rem;
      border-bottom: 1px solid rgb(95, 94, 94);
      .box {
        flex: 1;
        line-height: 25px;
        background: rgba(255, 255, 255, 0.6);
        color: black;
        font-size: 0.47rem;
        border: none;
        outline: medium;

        &::placeholder {
          color: rgba(212, 211, 211, 0.6);
        }
      }
    }
  }
  .search-history {
    margin: 1.5rem 0.5rem 0 0.5rem;
    display: flex;
    flex-basis: 6rem;
    flex-direction: column;
    .title {
      display: flex;
      flex-basis: 0.5rem;
      justify-content: space-between;
      align-items: center;
      .hearder-title {
        font-size: 0.5rem;
        font-weight: 600;
        margin: 0.3rem 0;
      }
      .hearder-button {
        flex-basis: 0.2rem;
        font-size: 0.5rem;
        font-weight: 600;
        line-height: 0.4rem;
        color: grey;
      }
    }
    .tags {
      height: 1rem;
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
      .tags-row{
        height: 100%;
        line-height: 1rem;
        white-space: nowrap;
        span {
          margin: 0 0.1rem;
          padding: 0.1rem 0.3rem;
          // height: 0.38rem;
          font-weight: 500;
          font-size: 0.3rem;

        }
      }
    }
  }
  .hot-list {
    display: flex;
    flex-direction: column;
    margin: 1rem 0.5rem;
    margin-bottom: 1.5rem;
    .title {
      display: flex;
      font-size: 0.5rem;
      font-weight: 600;
      height: 0.5rem;
      margin: 0.3rem 0;
    }
    .list {

      .list-row {
        height: 1.5rem;
        display: flex;
        padding: 0.1rem 0;
        //justify-content: center;
        .row-index {
          //flex: 0 0 10%;
          font-size: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          padding-right: 0.2rem;
        }
        .row-content {
          display: flex;
          flex-direction: column;
          text-align: left;
          .content-column1 {
            flex-basis: 1rem;
            display: flex;
            .searchword {
              font-size: 0.46rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .score {
              font-size: 0.35rem;
              color: #999;
              display: flex;
              align-items: center;
              padding: 0 0.2rem;
            }
            .icon {
              line-height: 0.5rem;
              img {
                margin: 0;
                height: 0.4rem;
              }
            }
          }
          .content-column2 {
            font-size: 0.28rem;
            line-height: 0.4rem;
            color: #999;
          }
        }
      }
    }
  }
  .reach-result {
    margin-top: 1.2rem;
    .result-tabs {
      padding-top: 0.2rem;
      .van-ellipsis {
        font-size: 0.4rem;
      }
      .list-container {
        //width: 100%;
        height: 100%;
        flex-flow: 1;
        overflow: scroll;
        padding: 0 0.5rem 2rem 0.5rem;
        .list-row {
          display: flex;
          height: 1.5rem;
          padding: 0.1rem 0;
          text-align: left;
          border-bottom: 1px solid rgb(240, 238, 238);
          display: flex;
          align-items: center;
          .music-info {
            flex-basis: 8.5rem;
            flex-grow: 1;
            .music-title {
              font-size: 0.45rem;
              width: 6.5rem;
              height: 0.6rem;
              line-height: 0.6rem;
              overflow: hidden;
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
            }
            .detail-info {
              font-size: 0.3rem;
              height: 0.5rem;
              line-height: 0.5rem;
              display: flex;
              color: #999;
              .music-quality {
                flex-basis: 0.6rem;
                text-align: center;
                display: flex;
                align-items: center;
                .icon {
                  font-size: 0.22rem;
                  font-weight: bolder;
                  height: 0.28rem;
                  line-height: 0.3rem;
                  border: 1px solid red;
                  color: red;
                  padding: 0 0.04rem;
                }
              }
              .author-album {
                flex-basis: 5rem;
                width: 5.5rem;
                flex-grow: 1;
                overflow: hidden;
                text-overflow: ellipsis; //溢出用省略号显示
                white-space: nowrap; //溢出不换行
              }
            }
          }
          .music-mv {
            flex-basis: 1rem;
            color: #888;
          }
          .more-operation {
            i{
              font-size: 0.5rem!important;
            }
          }
          .isListening {
            color: red;
            margin-right: 0.2rem;
          }
        }
        .van-list__finished-text {
          font-size: 0.35rem;
          height: 0.6rem;
          line-height: 0.6rem;
        }
      }
    }
  }
}
</style>
