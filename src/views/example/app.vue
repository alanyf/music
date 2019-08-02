<template>
    <div class="main">
        <keep-alive>
            <router-view class="content-wrap" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view class="content-wrap" v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
console.log("app loaded")
export default {
    name: 'App',
    data() {
        return {
        };
    },
    methods: {
    },
    created() {

    },
    components: {

    }
};
</script>

<style>
.main {
  padding: 0;
  margin: 0;
}

</style>
