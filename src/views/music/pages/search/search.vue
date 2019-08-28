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
    <section class="search-history" v-show="tags.length&isSearch">
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
    <section class="hot-list" v-show="isSearch">
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
    <section class="reach-result" v-show="!isSearch">
      <div class="result-tabs">
        <van-tabs swipeable animated>
          <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">内容 {{ index }}</van-tab>
        </van-tabs>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import { Tag, Dialog, Tab, Tabs } from "vant";
import GlobalBus from "../../components/GlobalBus";
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
      isSearch: false
    };
  },
  methods: {
    init() {
      const host = "http://localhost:3000";
      const urlLocal = host + "/search/hot/detail";
      const urlSearch = host + "/search/default";
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
      that.$http.get(urlLocal).then(res => {
        this.hotlist = res.data;
      });
      that.$http.get(urlSearch).then(res => {
        this.placeholder = res.data.realkeyword;
      });
    },
    clear() {
      this.query = "";
    },
    back() {
      this.$router.back(); //返回上一层
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
          const host = "http://localhost:3000";
          const urlLocal = host + "/search?keywords=" + that.query;
          that.tags.unshift({ searchword: that.query });
          that.$http.get(urlLocal).then(res => {
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
  }
};
</script>

<style lang="less">
.search-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
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
      font-size: 0.35rem;
      font-weight: 600;
      line-height: 0.4rem;
    }
    .list {
      display: flex;
      flex-direction: column;
      .list-row {
        height: 1.5rem;
        display: flex;
        padding: 0.1rem 0;
        //justify-content: center;
        .row-index {
          flex: 0 0 10%;
          font-size: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
        }
        .row-content {
          display: flex;
          flex-direction: column;
          .content-column1 {
            flex-basis: 1rem;
            display: flex;
            .searchword {
              font-size: 0.45rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .score {
              font-size: 0.28rem;
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
    margin-top: 1rem;
    .result-tabs {
      top: 1rem;
    }
  }
}
</style>
