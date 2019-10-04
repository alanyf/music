<template>
  <div class="search-container">
    <section class="search-box-container">
      <van-icon name="arrow-left" @click="back" />
      <div class="search-box">
        <input :placeholder="placeholder" v-model="query" type="text" class="box" />
        <i v-show="query" class="delete el-icon-close" @click="clear"></i>
      </div>
      <van-icon name="manager-o" />
    </section>
    <section class="search-history" v-show="tags.length&!isSearchCompelete">
      <div class="title">
        <div class="hearder-title">历史记录</div>
        <div class="hearder-button">
          <van-icon name="delete" @click="clearHistory" />
        </div>
      </div>
      <div class="tags">
        <van-tag
          v-for="tag in tags"
          :key="tag.searchword"
          round
          size="large"
          text-color="#202223"
          color="#e6e8ea"
          :class="tagrow"
          @click="touchtags(tag)"
        >{{tag.searchword}}</van-tag>
      </div>
    </section>
    <section class="hot-list" v-show="!isSearchCompelete">
      <div class="title">热搜</div>
      <div class="list">
        <div class="list-row" v-for="(item, index) in hotlist" :key="index">
          <div class="row-index">
            <span v-if="index<3" style="color:red">{{index+1}}</span>
            <span v-else>{{index+1}}</span>
          </div>
          <div class="row-content" @click="touchlist(item)">
            <div class="content-column1">
              <div class="searchword">{{item.searchWord}}</div>
              <div class="score">{{item.score}}</div>
              <div class="icon">
                <img :src="item.iconUrl" />
              </div>
            </div>
            <div class="content-column2">{{item.content}}</div>
          </div>
        </div>
      </div>
    </section>
    <section class="reach-result" v-show="isSearchCompelete">
      <div class="result-tabs">
        <van-tabs swipeable animated @change="tabOnclick">
          <van-tab v-for="(type, i) in searchResult" :key="type" :active="i===1" :title="type.type">
            <div class="list-container">
              <van-list finished-text="木了" :finished="true">
                <van-cell
                  v-for="(music, i) in type.data"
                  :key="music.id"
                  class="list-row"
                  @click="playMusic(music, i)"
                >
                  <div class="music-info">
                    <div class="music-title">{{music.name}}</div>
                    <div class="detail-info">
                      <div class="music-quality">
                        <div class="icon">SQ</div>
                      </div>
                      <div class="author-album">{{music.ar[0].name}} - {{music.al.name}}</div>
                    </div>
                  </div>
                  <div class="music-mv">
                  </div>
                  <div class="more-operation" @click.stop>
                    <van-icon name="ellipsis" class="rotate-90" />
                  </div>
                </van-cell>
              </van-list>
            </div>
          </van-tab>
          <van-tab :title="'综合'"></van-tab>
          <van-tab :title="'单曲'">
            <div class="list-container">
              <van-list finished-text="木了" :finished="true">
                <van-cell
                  v-for="(music, i) in songlist"
                  :key="music.id"
                  class="list-row"
                  @click="playMusic(music, i)"
                >
                  <div class="music-info">
                    <div class="music-title">{{music.name}}</div>
                    <div class="detail-info">
                      <div class="music-quality">
                        <div class="icon">SQ</div>
                      </div>
                      <div class="author-album">{{music.ar[0].name}} - {{music.al.name}}</div>
                    </div>
                  </div>
                  <div class="music-mv">
                  </div>
                  <div class="more-operation" @click.stop>
                    <van-icon name="ellipsis" class="rotate-90" />
                  </div>
                </van-cell>
              </van-list>
            </div>
          </van-tab>
          <van-tab :title="'视频'">{{title}}</van-tab>
          <van-tab :title="'歌手'">{{title}}</van-tab>
          <van-tab :title="'专辑'">{{title}}</van-tab>
          <van-tab :title="'歌单'">{{title}}</van-tab>
          <van-tab :title="'主播电台'">{{title}}</van-tab>
          <van-tab :title="'用户'">{{title}}</van-tab>
        </van-tabs>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import { Tag, Dialog, Tab, Tabs } from "vant";
import GlobalBus from "../../components/GlobalBus";
import { mapState } from "vuex";
Vue.use(Tag)
  .use(Dialog)
  .use(Tab)
  .use(Tabs);
export default {
  name: "Search",
  props: {
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      query: "",
      tags: [],
      hotlist: [],
      timer: null,
      songlist: [],
      isSearchCompelete: false,
      searchResult: [
        { type: '综合', data: []},
        { type: '单曲', data: []},
        { type: '视频', data: []},
        { type: '歌手', data: []},
        { type: '用户', data: []},
      ]
    };
  },
  methods: {
    init() {
      const host = "http://localhost:3000";
      const urlLocal = "/music/search/hot/detail";
      const urlSearch = "/music/search/default";
      const that = this;
      const local_user = localStorage.user;
      let user = null;
      if (local_user) {
        user = JSON.parse(localStorage.user);
        if (!user.recentSearch) user.recentSearch = this.tags;
        this.tags = user.recentSearch;
      } else {
        user = {
          name: "Alan",
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
      this.query = "";
    },
    back() {
      if (this.isSearchCompelete) {
        this.isSearchCompelete = !this.isSearchCompelete;
        this.query = "";
      } else this.$router.back(); //返回上一层
    },
    touchtags(tag) {
      this.query = tag.searchword;
    },
    touchlist(item) {
      this.query = item.searchWord;
    },
    clearHistory() {
      Dialog.confirm({ message: "确定清空全部历史记录" })
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
    tabOnclick(name, title) {
      this.$toast(title);
      let type;
      switch (title) {
        case "综合":
          type = 1018;
          break;
        case "单曲":
          type = 1;
          break;
        case "视频":
          type = 1014;
          break;
        case "歌手":
          type = 100;
          break;
        case "专辑":
          type = 10;
          break;
        case "歌单":
          type = 1000;
          break;
        case "主播电台":
          type = 1009;
          break;
        case "用户":
          type = 1002;
          break;
        default:
          type = 1; //默认单曲
          break;
      }
      const that = this;
      const host = "http://localhost:3000";
      const urlLocal = "/music/search?keywords=" + that.query + "&type=" + type;
      that.tags.unshift({ searchword: that.query });
      that.$ajax.get(urlLocal).then(res => {
        //if (type == 1) {
          that.songlist = res.result.song.songs;
          that.searchResult.forEach(e=>e.data=that.songlist)
        //}
      });
      const local_user = localStorage.user;
      if (local_user) {
        const user = JSON.parse(localStorage.user);
        user.recentSearch = that.tags;
        localStorage.user = JSON.stringify(user);
      }
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    query() {
      const that = this;
      clearTimeout(that.timer);
      that.timer = setTimeout(() => {
        if (that.query) {
          that.isSearchCompelete = true;
          const host = "http://localhost:3000";
          const urlLocal ="/music/search?keywords=" + that.query + "&type=1018";
          that.tags.unshift({ searchword: that.query });
          that.$ajax.get(urlLocal).then(res => {
            console.log(res);
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
  computed: {
    ...mapState(["music"])
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
        font-size: 0.35rem;
        font-weight: 600;
        line-height: 0.4rem;
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
      display: flex;
      flex-basis: 0.5rem;
      overflow: scroll;
      span {
        margin-left: 0.1rem;
        margin-right: 0.1rem;
        font-weight: 500;
        font-size: 0.3rem;
        white-space: nowrap;
      }
    }
  }
  .hot-list {
    display: flex;
    flex-direction: column;
    margin: 1rem 0.5rem;
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
              font-size: 0.5rem;
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
              line-height: 0.6rem;
              img {
                margin: 0;
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
              flex-basis: 0.2rem!important;
              color: #888;

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
