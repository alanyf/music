<template>
    <div class="account-container" :style="{left: positionLtft}">
        <div class="account-content">
            <div class="account-main-content">
                <header class="account-header">
                    <div class="head-account-img"><img :src="user.headImg"/></div>
                    <div class="head-account-text">
                        <div class="nickname">{{user.nickname}}</div>
                        <div class="level">Lv.{{user.level}}</div>
                        <div class="sign"><div class="sign-button">签到</div></div>
                    </div>
                </header>
                <div class="tools">
                    <div class="tools-row">
                        <Circular class="circular" v-for="tool in toolsList" :title="tool.title" :icon="tool.icon" :key="tool.icon"/>
                    </div>
                </div>
                <div class="set-list">
                    <div class="list-row" v-for="item in setList" :key="item.title" >
						<div class="head-img"><i :class="item.icon"/></div>
						<div class="row-content">
							<div class="list-title">{{item.title}}</div>
							<!-- <div class="list-info">{{item.num}}首，已下载{{item.downloadNum}}首</div> -->
						</div>
						<div class="more-icon"></div>
					</div>
                </div>
            </div>
            
        </div>
        <div class="mask" @click.stop="hidden"></div>
    </div>
</template>

<script>
import Circular from '../../components/Circular'
export default {
    name: 'Account',
    data(){
        return {
            toolsList: [
				{icon: 'el-icon-alarm-clock', title: '我的消息'},
				{icon: 'el-icon-basketball', title: '我的好友'},
				{icon: 'el-icon-heavy-rain', title: '个性换肤'},
				{icon: 'el-icon-dish', title: '听歌识曲'}
            ],
            setList: [
                {title: '商城', icon: 'el-icon-shopping-bag-2'},
                {title: '演出', icon: 'el-icon-mic'},
                {title: '附近的人', icon: 'el-icon-location-outline'},
                {title: '我的订单', icon: 'el-icon-s-fold'},
                {title: '定时停止播放', icon: 'el-icon-time'},
                {title: '扫一扫', icon: 'el-icon-camera'},
                {title: '音乐闹钟', icon: 'el-icon-alarm-clock'},
                {title: '音乐云盘', icon: 'el-icon-coin'},
                {title: '在线听歌免流量', icon: 'el-icon-reading'},
                {title: '游戏推荐', icon: 'el-icon-reading'},
                {title: '优惠券', icon: 'el-icon-collection-tag'},
                {title: '加入网易音乐人', icon: 'el-icon-chat-line-round'},
                {title: '我要直播', icon: 'el-icon-microphone'},
                
            ],
            user: {
                nickname: "Alan",
                headImg: "/static/images/head-img-1.jpeg",
                level: 7
            }
        }
    },
    methods: {
        hidden(){
            this.$emit('hiddenSidebar');
        }
    },
    props: {
        isShow: {
            type: String
        }
    },
    mounted(){
        
    },
    computed: {
        positionLtft(){
            return this.isShow ? 0 :'-10rem';
        }
    },
    components: {
        Circular
    }
}
</script>

<style lang="less">
    .account-container{
        display: flex;
        width: 100%;
		height: 100%;
		position: fixed;
        left: 0;
        bottom: 0;
        transition: 0.35s all; 
        .account-content{
            width: 80%;
            height: 100%;
            background-color: white;
            display: flex;
            .account-main-content{
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                overflow: scroll;
                .account-header{
                    flex-basis: 6rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    background-color: rgb(245, 245, 245);
                    padding: 0 0.5rem;
                    .head-account-img{
                        width: 2rem;
                        height: 2rem;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                    .head-account-text{
                        margin: 0.2rem 0;
                        display: flex;
                        height: 1rem;
                        width: 100%;
                        line-height: 1rem;
                        .nickname{
                            flex-basis: 2rem;
                            text-align: center;
                        }
                        .level{
                            font-size: 0.35rem;
                            line-height: 1rem;
                        }
                        .sign{
                            align-self: baseline;
                            line-height: 1rem;
                            flex-grow: 1;
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                            height: 100%;
                            .sign-button{
                                height: 0.6rem;
                                line-height: 0.6rem;
                                font-size: 0.35rem;
                                background-color: red;
                                padding: 0 0.4rem;
                                border-radius: 0.4rem;
                                color: white;
                            }
                        }
                    }
                }
                .tools{
                    flex-basis: 1.5rem;
                    padding: 0 0.5rem;
                    .tools-row{
                        display: flex;
                        overflow: scroll;
                        margin: 0.3rem 0;
                        .circular{
                            margin: 0 0.15rem;
                        }
                    }
                }
                .set-list{
                    display: flex;
                    flex-direction: column;
                    padding: 0 0.5rem;
                    border-top: 1px solid #ddd;
                    //flex-basis: 20rem;
                    .list-row{
                        display: flex;
                        flex-basis: 1.4rem;
                        .head-img{
                            flex-basis: 2rem;
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
                        .row-content{
                            display: flex;
                            flex-basis: 7rem;
                            height: 1.4rem;
                            line-height: 1.4rem;
                            font-size: 0.4rem;
                            flex-direction: column;
                            text-align: left;
                            vertical-align: top;
                            .list-title{
                                flex-basis: 60%;
                                display: flex;
                                align-items: flex-end;
                            }
                        }
                        .more-icon{
                            flex-basis: 1rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #666;
                            font-weight: lighter;
                            
                        }
                    }
                }
            }
            .footer{
                flex-basis: 1rem;
            }
        }
        .mask{
            width: 20%;
            height: 100%;
            opacity: 0.5;
            background-color: black;
        }
    }
</style>
