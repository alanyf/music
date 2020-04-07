<template>
    <div>
        <h1>{{ text }}</h1>
    </div>
</template>

<script>
    export default {
        name: 'Example',
        props: {
            text: {
                type: String,
                default() {
                    return '还没开始做，占个位先';
                }
            }
        }
    };
</script>

<style lang="less">
    .container{
        display: flex;
        width: 100%;
        height: 100%;
    }
</style>
