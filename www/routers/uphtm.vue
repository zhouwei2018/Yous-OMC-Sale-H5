<style scoped lang="less">
    .uppage{ background: url("../resources/images/uppage.png") no-repeat;background-size: 100% 100%;width: 100%;height:37.5rem;}
    .uppagezt{padding-top: 20rem;margin-left: 4.2rem;font-size: 1.1rem;}
</style>
<template>
    <div class="uppage">
        <div class="uppagezt">系统跟新维护中，请稍后再试</div>
    </div>
</template>
<script>
    export default {
        components: {

        },
        data () {
            return {

            }
        },
        mounted(){
            $("html").css({margin:0,padding:0});
            $("body").css({margin:0,padding:0});
            //下滑时，条件tab固定
        },
        created: function () {

        },
        computed: {

        },
        methods: {

        },
    }
</script>
