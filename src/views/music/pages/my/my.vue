<template>
  <div class="my-container">
      <h1>my</h1>
      <section class="tools"></section>
      <section class="my-lists"></section>
      <secxtion class="music-list"></secxtion>
  </div>
</template>

<script>
export default {
  name: 'My'
}
</script>

<style lang="less">
    .my-container{
        display: flex;
        width: 100%;
        height: 100%;
        .tools{
          display: flex;
          flex-basis: 1.5rem;
          flex-grow: 1;
          flex-shrink: 1;
        }
        .my-lists{
          display: flex;
          flex-basis: 9rem;
          flex-grow: 1;
          flex-shrink: 1;
        }
        .music-list{
          display: flex;
          flex-basis: 6rem;
          flex-grow: 1;
          flex-shrink: 1;
        }
    }
</style>
