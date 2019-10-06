<template>
    <div class="row-container">
        <div class="list-row">
            <van-icon name="volume" v-if="isListening" class="isListening"/>
            <div class="music-info">
                <div class="music-title">{{music.name}}</div>
                <div class="detail-info">
                    <div class="music-quality"><div class="icon">{{music.quality}}</div></div>
                    <div class="author-album">{{music.author}} - {{music.album}}</div>
                </div>
            </div>
            <div class="music-mv" @click.stop>
                <van-icon name="video-o"  v-if="music.mv"/>
            </div>
            <div class="more-operation" @click.stop><van-icon name="ellipsis" class="rotate-90"/></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RowItem',
    data(){
        return {
            
        }
    },
    props: {
        music: {},
        isListening: false
    },
    mounted(){
           
    },
    methods: {
        
    }
}
</script>

<style lang="less">
    .row-container{
        width: 100%;
        height: 100%;
        background-color: white;
        overflow: scroll;

        .list-row{
            display: flex;
            height: 1.5rem;
            padding: 0.1rem 0.5rem;
            text-align: left;
            border-bottom: 1px solid #ddd;
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
    }
</style>