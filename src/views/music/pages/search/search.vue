<template>
  <div class="search-container">
    <section class="search-box-container">
      <van-icon name="arrow-left"/>
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
        <van-tag v-for="tag in tags" :key="tag.name"  round size="large" text-color="#202223" color='#e6e8ea' :class="tagrow">{{tag.name}}</van-tag>
      </div>
    </section>
    <section class="hot-list">
      <div class="title">热搜</div>
      <div class="list">
        <div class="list-row" v-for="item in 20" :key="item">{{item}}</div>
      </div>
    </section>
  </div>
</template>

<script>
import {Tag} from 'vant';
export default {
  name: "Search",
  props: {
    placeholder: {
      type: String,
      default: "如何在云村有房"
    }
  },
   data () {
    return {
      query: '',
      tags:[{name:"Kendrick Lamar"},{name:"周杰伦"},{name:"林俊杰"},{name:"追风筝的孩子"},{name:"后来的我们"},{name:"公路之歌"},{name:"爱情三十六计"},
      {name:"Kendrick Lamar"},{name:"周杰伦"},{name:"林俊杰"},{name:"追风筝的孩子"},{name:"后来的我们"},{name:"公路之歌"},{name:"爱情三十六计"},
      {name:"Kendrick Lamar"},{name:"周杰伦"},{name:"林俊杰"},{name:"追风筝的孩子"},{name:"后来的我们"},{name:"公路之歌"},{name:"爱情三十六计"}
      ]
    }
  },
   methods: {
    clear () {
      this.query = ''
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
  margin: 0.2rem,0.5rem;
  background-color: white;
  overflow: scroll;
  .search-box-container {
    z-index: 99;
    display: flex;
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
  .search-history{
    margin: 0.5rem 0.5rem;
    display: flex;
    flex-basis: 6rem;
    flex-direction: column;
    .title{
      display: flex;
      flex-basis: 1rem;
      justify-content:space-between;
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
    .tags{
      display: flex;
      flex-basis: 0.5rem;
      overflow:scroll;
      span{
        margin-left: 0.1rem;
        margin-right: 0.1rem;
        font-weight: 500;
        font-size: 0.3rem;
        white-space:nowrap;
      }
    }
  }

  .hot-list{
    display: flex;
    flex-direction: column;
    margin: 0.2rem 0.5rem;
    .title{
      display: flex;
      font-size: 0.35rem;
      font-weight: 600;
       line-height: 0.4rem;
    }
  }
}
</style>
