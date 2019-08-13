<template>
  <div class="my-container">
    <section class="carousels">
      <el-carousel>
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </section>
    <section class="tools">
      <div class="tools-row">
        <Circular v-for="tool in toolsList" :title="tool.title" :icon="tool.icon" :key="tool.icon" />
      </div>
    </section>
    <section class="recommend-list">
      <div class="list-hearder">
        <div class="hearder-title">推荐歌单</div>
        <div class="hearder-button">
          <el-button round>歌单广场</el-button>
        </div>
      </div>
      <div class="list-content">
        <div class="list-row" v-for="item in playList" :key="item.id">
          <div class="row-image">
            <img :src="item.picUrl" />
            <p class="play-count">
              <i class="el-icon-video-play"></i>
              {{Math.floor(item.playCount / 10000) }}万
            </p>
            <div class="row-title">{{item.name}}</div>
          </div>
        </div>
      </div>
    </section>
    <section class="new-album">
      <div class="list-hearder">
        <div class="hearder-title">新碟</div>
        <div class="hearder-button">
          <el-button round>更多新碟</el-button>
        </div>
      </div>
         <div class="list-content">
        <div class="list-row" v-for="item in songList" :key="item.id">
          <div class="row-image">
            <img :src="item.picUrl" />
            <div class="row-title">{{item.name}}</div>
            <div class="row-title">{{item.artist}}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Circular from "../../components/Circular";
export default {
  name: "Find",
  data() {
    return {
      toolsList: [
        { icon: "el-icon-attract", title: "每日推荐" },
        { icon: "el-icon-s-custom", title: "歌单" },
        { icon: "el-icon-star-on", title: "排行榜" },
        { icon: "el-icon-dish", title: "电台" },
        { icon: "el-icon-bicycle", title: "直播" }
      ],
      playList: [
        {
          id: 1,
          playCount: 26564652,
          picUrl: "/static/images/head-img-1.jpeg",
          name: "[华语私人定制]你爱的好歌都在这儿"
        },
        {
          id: 2,
          playCount: 24652,
          picUrl: "/static/images/head-img-2.jpeg",
          name: "男友嗓|俏皮声线的温柔暴击"
        },
        {
          id: 3,
          playCount: 12222,
          picUrl: "/static/images/head-img-3.jpeg",
          name: "乐队的夏天|31支乐队的酷爽一夏"
        },
        {
          id: 4,
          playCount: 12222121,
          picUrl: "/static/images/head-img-4.jpeg",
          name: "后摇的夏天"
        },
        {
          id: 1,
          playCount: 26564652,
          picUrl: "/static/images/head-img-5.jpeg",
          name: "夏至已至:准备好一双舞鞋和躁动的心"
        },
        {
          id: 5,
          playCount: 2612564652,
          picUrl: "/static/images/head-img-6.jpeg",
          name: "励志演讲|愿你还在坚持你的梦想"
        }
      ],
      songList: [
        {
          id: 1,
          picUrl: "/static/images/head-img-6.jpeg",
          name: "王一博热门单曲",
          artist: ""
        },
        {
          id: 2,
          picUrl: "/static/images/head-img-7.jpeg",
          name: "骄傲男孩",
          artist: "白举纲"
        },
        {
          id: 3,
          picUrl: "/static/images/head-img-3.jpeg",
          name: "没什么大不了",
          artist: "高珊"
        }
      ]
    };
  },
  components: {
    Circular
  }
};
</script>

<style lang="less">
.my-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .carousels {
    margin: 0.2rem 0.5rem;
    z-index: -99;
    .el-carousel {
      border-radius: 0.2rem;
      .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
      }
      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }
      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
  }
  .tools {
    display: flex;
    flex-basis: 1.2rem;
    flex-shrink: 1;
    border-block-end: #a6bad3;
    border-block-end-style: solid;
    border-block-end-width: 0.005rem;
    .tools-row {
      display: flex;
      margin: 0.2rem 0;
    }
  }
  .recommend-list {
    margin: 0.2rem 0.5rem;
    display: flex;
    flex-basis: 6rem;
    flex-direction: column;
    .list-hearder {
      display: flex;
      flex-basis: 1rem;
      justify-content: space-between;
      .hearder-title {
        font-size: 0.5rem;
        font-weight: 600;
        line-height: 0.8rem;
      }
      .hearder-button {
        flex-basis: 0.2rem;
      }
    }
    .list-content {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      .list-row {
        flex: 0 0 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .row-image {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .img {
            height: 100%;
            width: 100%;
            border-radius: 5%;
          }
          .row-title {
            flex-wrap: wrap;
            flex-basis: 40%;
            font-size: 0.3rem;
            height: 0.5rem;
            color: #999;
            overflow-wrap: break-word;
            text-align: left;
          }
        }
      }
    }
  }
  .new-album {
    margin: 0.2rem 0.5rem;
    display: flex;
    flex-basis: 6rem;
    flex-direction: column;
    .list-hearder {
      display: flex;
      flex-basis: 1rem;
      justify-content: space-between;
      .hearder-title {
        font-size: 0.5rem;
        font-weight: 600;
        line-height: 0.8rem;
      }
      .hearder-button {
        flex-basis: 0.2rem;
      }
    }
     .list-content {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      .list-row {
        flex: 0 0 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .row-image {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .img {
            height: 100%;
            width: 100%;
            border-radius: 5%;
          }
          .row-title {
            flex-wrap: wrap;
            flex-basis: 40%;
            font-size: 0.3rem;
            height: 0.5rem;
            color: #999;
            overflow-wrap: break-word;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
