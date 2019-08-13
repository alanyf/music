<template>
  <div class="search-container">
      <div class="search-box-container">
        <i class="back el-icon-back"></i>
        <div class="search-box">
          <input :placeholder="如何在云村有房" type="text" class="box">
          <i class="delete el-icon-delete"></i>
        </div>
        <i class="user el-icon-user"></i>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang="less">
    .search-container{
        display: flex;
        width: 100%;
        height: 100%;
        .search-box-container{
          z-index: 99;
          display: flex;
          flex-wrap: nowrap;
        }
    }
</style>
