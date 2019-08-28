import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        count: 0,
        numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        playState: false,
        currentPlayList: [],
        currentMusicIndex: -1,
        music: {},
        audio: null
    },
    getters: {
    },
    mutations: {
        setAudio(state, audio) {
            if (!state.audio) {
                state.audio = audio;
            }
        },
        changeCurrentPlayList(state, list) {
            state.currentPlayList = list;
        },
        changeCurrentMusicIndex(state, index) {
            state.currentMusicIndex = index;
        },
        changeMusic(state, music) {
            state.music = music;
        },
        changePlayState(state, musicState) {
            state.playState = Boolean(musicState);
        }
    },
    actions: {
        changeCount1s(context) {
            setTimeout(() => {
                context.commit('changeCount');
            }, 1000);
        }
    }
});
