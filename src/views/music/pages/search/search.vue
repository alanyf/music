<template>
  <div class="search-container">
    <section class="search-box-container">
      <van-icon name="arrow-left" @click="back"/>
      <div class="search-box">
        <input :placeholder="placeholder" v-model="query" type="text" class="box" />
        <i v-show="query" class="delete el-icon-close" @click="clear"></i>
      </div>
      <van-icon name="manager-o"/>
    </section>
    <section class="search-history">
      <div class="title">
        <div class="hearder-title">历史记录</div>
        <div class="hearder-button">
            <van-icon name="delete"/>
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
        >{{tag.searchword}}</van-tag>
      </div>
    </section>
    <section class="hot-list">
      <div class="title">热搜</div>
      <div class="list">
        <div class="list-row" v-for="(item, index) in hotlist" :key="index">
          <div class="row-index">
            <span v-if="index<3" style="color:red">{{index+1}}</span>
            <span v-else>{{index+1}}</span>
          </div>
          <div class="row-content">
            <div class="content-column1">
              <span class="searchword">{{item.searchWord}}</span>
              <span class="score">{{item.score}}</span>
              <img :src="item.iconUrl" />
            </div>
            <div class="content-column2">
              <span>{{item.content}}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Tag } from "vant";
import GlobalBus from "../../components/GlobalBus";
export default {
  name: "Search",
  props: {
    placeholder: {
      type: String,
      default: "如何在云村有房"
    }
  },
  data() {
    return {
      query: "",
      tags: [],
      hotlist: []
    };
  },
  methods: {
    init() {
      const host = "http://localhost:3000";
      const urlLocal = host + "/search/hot/detail";
      const that = this;
      const local_user = localStorage.user;
      let user = null;
      if (local_user) {
        user = JSON.parse(localStorage.user);
         if(!user.recentSearch)user.recentSearch=this.tags;
          this.tags = user.recentSearch;
      }
      else{
				user = {
					name: 'Alan',
					recentSearch: this.tags,
				}
			};
			localStorage.user = JSON.stringify(user);
      that.$http.get(urlLocal).then(res => {
        this.hotlist = res.data;
        console.log(this.hotlist);
      });
    },
    clear() {
      this.query = "";
    },
    back() {
      this.$router.back(); //返回上一层
    }
  },
  mounted() {
    this.init();
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
    i {
      flex: 0 0 15%;
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
        font-size: 0.5rem;
        border: none;
        outline: medium;

        &::placeholder {
          color: rgba(212, 211, 211, 0.6);
        }
      }
    }
  }
  .search-history {
    margin: 1rem 0.5rem;
    display: flex;
    flex-basis: 6rem;
    flex-direction: column;
    .title {
      display: flex;
      flex-basis: 1rem;
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
    margin: 0.2rem 0.5rem;
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
        display: flex;
        justify-content: center;
        .row-index {
          flex: 0 0 10%;
          font-size: 0.5rem;
        }
        .row-content {
          display: flex;
          flex-direction: column;
          .content-column1 {
            display: inline;
            .searchword {
              font-size: 0.5rem;
            }
            .score {
              font-size: 0.2rem;
            }
          }
          .content-column2 {
            font-size: 0.2rem;
          }
        }
      }
    }
  }
}
</style>
