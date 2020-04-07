<template>
    <div class="audioplayer-container">
        <audio
            ref="audio"
            :src="music.url"
            preload="auto"
            class="audio"/>
        <slot name="control"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: 'RouteLink',
        data() {
            return {

            };
        },
        mounted() {
            const that = this;
            this.$refs.audio.playAsync = function () {
                setTimeout(() => {
                    that.$refs.audio.play();
                }, 500);
            };
            this.$store.commit('setAudio', this.$refs.audio);
        },
        methods: {

        },
        computed: {
            ...mapState(['music']),
            ...mapState(['playState']),
            ...mapState(['audio'])
        },
        watch: {

        }
    };
</script>

<style lang="less">

</style>
