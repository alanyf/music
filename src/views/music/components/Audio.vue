<template>
    <audio ref='audio' id="audio" preload="auto" class="audio" src="./song.mp3"></audio>
</template>

<script>
export default {
  name: 'Audio',
  data(){
     return {
       audio: null,
     }
  },
  mounted(){
		this.audio = this.$refs.audio;
		this.currentTime = this.audio.currentTime;
  },
  methods: {
    play(){
			this.audio.play();
		},
		stop(){
			this.audio.pause();
		}
  }
}
</script>

<style lang="less">

</style>