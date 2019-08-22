<template>
  <div class="my-container">
    <section class="carousels">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="item in carouselItems" :key="item.to">
          <img v-lazy="item.picUrl" />
        </van-swipe-item>
      </van-swipe>
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
          <van-tag round plain color="#333">歌单广场</van-tag>
        </div>
      </div>
      <div class="list-content">
        <div class="list-row" v-for="item in playList" :key="item.id">
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
    </section>
    <section class="new-album">
      <div class="list-hearder">
        <div class="hearder-title">新碟</div>
        <div class="hearder-button">
          <van-tag round plain color="#333">更多新碟</van-tag>
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
import Vue from 'vue';
import Circular from "../../components/Circular";
import {Swipe, SwipeItem, Lazyload, Tag} from "vant";
Vue.use(Swipe).use(SwipeItem).use(Tag);
Vue.use(Lazyload);
export default {
  name: "Find",
  data() {
    return {
      carouselItems: [
        {picUrl: '/static/images/carousels_1.jpg', to: ''},
        {picUrl: '/static/images/carousels_2.jpg', to: ''},
        {picUrl: '/static/images/carousels_3.jpg', to: ''},
        {picUrl: '/static/images/carousels_4.jpg', to: ''},
        {picUrl: '/static/images/carousels_5.jpg', to: ''},
      ],
      toolsList: [
        { icon: "notes-o", title: "每日推荐" },
        { icon: "orders-o", title: "歌单" },
        { icon: "bar-chart-o", title: "排行榜" },
        { icon: "bulb-o", title: "电台" },
        { icon: "cashier-o", title: "直播" }
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
    .hearder-button {
      flex-basis: 2rem;
      .van-tag{
        font-size: 0.3rem;
      }
      .van-tag::after{
        border-color: #aaa;
      }
    }
  .carousels {
    flex-basis: 4rem;
    margin: 0.2rem 0.5rem;
    .van-swipe__track{
      height: 4rem;
    }
    .van-swipe__indicator{
      background-color: #444;
    }
    .van-swipe__indicator-active{
      background-color: #111;
    }
    .van-swipe-item{
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .tools {
    display: flex;
    flex-basis: 1.2rem;
    flex-shrink: 1;
    border-block-end: #ddd;
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
        margin-bottom: 0.3rem;
        .row-image {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .head-img{
            width: 2.5rem;
            height: 2.5rem;
            position: relative;
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
            flex-basis: 40%;
            font-size: 0.3rem;
            width: 2.5rem;
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
