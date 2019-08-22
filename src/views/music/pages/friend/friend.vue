<template>
    <div class="friend-container">
        <van-index-bar :index-list="indexList">
            <div v-for="(list, key) in friendSort" :key="key">
                <van-index-anchor :index="key">{{key}}</van-index-anchor>
                <!-- <div v-for="val in list" :key="val.id">
                    <div class="list-row">
                        <div class="head-img"><img :src="val.picUrl"/></div>
                        <div class="list-title">{{val.name}}</div>
                    </div>
                </div> -->
                <van-swipe-cell v-for="(val, index) in list" :key="val.id">
                    <div class="list-row" >
                        <div class="head-img"><img :src="val.picUrl"/></div>
                        <div class="list-title">{{val.name}}</div>
                    </div>
                    <template slot="right">
                        <van-button square type="danger" text="删除" @click="deleteFriend(key, index)"/>
                    </template>
                </van-swipe-cell>
            </div>
            
        </van-index-bar> 
    </div>
</template>

<script>
import Vue from 'vue';
import { IndexBar, IndexAnchor, Button, SwipeCell } from 'vant';
Vue.use(IndexBar).use(IndexAnchor).use(Button).use(SwipeCell);
export default {
    name: 'Friend',
    data(){
        return {
            indexList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            friendList: [
                {id: 0, name: 'Alan', initial: 'A', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 1, name: 'Bom', initial: 'B', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 2, name: 'Cat', initial: 'C', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'D', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 4, name: 'Elice', initial: 'E', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: '方圆', initial: 'F', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: '郭冬临', initial: 'G', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: '黄家驹', initial: 'H', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'ice', initial: 'I', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'jone', initial: 'J', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: '康有为', initial: 'K', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: '李响', initial: 'L', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: '米粒', initial: 'M', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'nick', initial: 'N', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Open', initial: 'O', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: '庞云', initial: 'P', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: '琪琪', initial: 'Q', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'rick', initial: 'R', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: '斯文', initial: 'S', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: '腾飞', initial: 'T', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Unix', initial: 'U', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'vivan', initial: 'V', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: '王丽', initial: 'W', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: '小明', initial: 'X', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Yun', initial: 'Y', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: '张宇', initial: 'Z', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},



                {id: 3, name: 'Done', initial: 'I', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'J', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'K', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'L', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'M', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'N', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'O', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'I', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'J', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'K', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'L', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'M', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'N', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
                {id: 3, name: 'Done', initial: 'O', group: '朋友', picUrl: '/static/images/head-img-1.jpeg'},
            ],
            friendSort: {}
        }
    },
    props: {
        text:{
            type: String,
            default() {
                return 'friend'
            }
        }
    },
    created(){
        // 按照姓名首字母分类
        this.friendList.forEach(e=>{
            if(this.friendSort[e.initial] && this.friendSort[e.initial].length > 0){
                this.friendSort[e.initial].push(e);
            }else{
                this.friendSort[e.initial] = [e];
            }
        });
        console.log(this.friendSort);
    },
    methods: {
        deleteFriend(key, index){
            console.log('delete:', key, index, this.friendSort[key][index].name);
        }
    }
}
</script>

<style lang="less">
    .friend-container{
        width: 100%;
        height: 100%;
        font-size: 0.4rem;
        background-color: #fff;
        padding-bottom: 1rem;
        .van-index-bar{
            text-align: left;
            .list-row{
                display: flex;
                padding-left: 0.3rem;
                .head-img{
                    flex-basis: 1rem;
                    height: 1.4rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        width: 1rem;
                        height: 1rem;
                        border-radius: 5%;
                    }
                }
                .list-title{
                    flex-basis: 60%;
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    margin-left: 0.3rem;
                    border-bottom: 1px solid #ddd;
                }
            }
            .van-index-anchor{
                padding-left: 0.3rem;
                font-size: 0.35rem;
                line-height: 0.6rem;
                background-color: #eee;
            }
            .van-index-bar__index{
                font-size: 0.4rem;
                line-height: 0.7rem;
            }
            .van-index-bar__index{
                font-size: 0.3rem;
                line-height: 0.5rem;
            }
            .van-swipe-cell__right{
                display: flex;
                align-items: center;
                .van-button{
                    padding: 0 0.3rem;
                    height: 100%;
                    font-size: 0.4rem;
                    border: none;
                }
            }

        }

    }
</style>
