<template>
    <van-popup
        v-model="isShowBottomSidebar"
        position="bottom"
        class="bottom-siderbar-container"
        round="true"
        @click-overlay="closeBottomSidebar"
    >
        <header class="header">
            <div class="list-title">播放列表({{ currentPlayList.length }})</div>
        </header>
        <div class="list-container">
            <div
                v-for="(music, i) in currentPlayList"
                :key="music.id"
                class="list-row"
                @click="playMusic(music, i)">
                <van-icon
                    v-if="currentMusicIndex===i"
                    name="volume"
                    class="isListening"/>
                <div class="name">{{ music.name }}</div>
                <div class="author"> - {{ music.author }}</div>
                <div class="icon"/>
            </div>
        </div>
    </van-popup>
</template>

<script>
    import Vue from 'vue';
    import {Popup} from 'vant';
    import {mapState} from 'vuex';
    import GlobalBus from './GlobalBus';
    Vue.use(Popup);
    export default {
        name: 'BottomList',
        data() {
            return {

            };
        },
        mounted() {

        },
        methods: {
            closeBottomSidebar() {
                this.$store.commit('changeIsShowBottomSidebar', false);
            },
            playMusic(music, index) {
                // 改变正在播放的音乐
                if (index !== this.currentMusicIndex) {
                    this.$store.commit('changeMusic', music);
                    this.$store.commit('changePlayState', true);
                    this.$store.commit('changeCurrentMusicIndex', index);
                    GlobalBus.$emit('playMusic', music);
                }
            }
        },
        computed: {
            ...mapState(['isShowBottomSidebar']),
            ...mapState(['currentPlayList', 'currentMusicIndex'])
        },
        watch: {

        }
    };
</script>

<style lang="less">
    .bottom-siderbar-container{
        width: 100%;
        height: 50%;
        border-radius: 0.5rem 0.5rem 0 0!important;
        .header{
            flex-basis: 1rem;
            padding: 0.3rem 0.4rem;
            position: fixed;
            width: 9.2rem;
            top: 50%;
            background-color: white;
            border-bottom: 1px solid #ccc;
            border-radius: 0.5rem 0.5rem 0 0!important;
            z-index: 2004;
            .list-title{
                font-size: 0.5rem;
                text-align: left;
            }
        }
        .list-container{
            display: flex;
            flex-direction: column;
            font-size: 0.46rem;
            padding-top: 1.5rem;
            .list-row{
                display: flex;
                align-items: center;
                text-align: left;
                padding: 0.4rem;
                .isListening{
                    color: red;
                    padding-right: 0.2rem;
                }
                .name{
                    font-size: 0.46rem;
                    overflow: hidden;
                    text-overflow:ellipsis; //溢出用省略号显示
                    white-space:nowrap; //溢出不换行
                }
                .author{
                    font-size: 0.35rem;
                    color: #999;
                    overflow: hidden;
                    text-overflow:ellipsis; //溢出用省略号显示
                    white-space:nowrap; //溢出不换行
                }
            }
        }
    }
</style>
