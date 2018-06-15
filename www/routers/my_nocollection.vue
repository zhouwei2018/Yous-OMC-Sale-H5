<template>
    <div>
        <div>
            <img style="margin-left: 4rem;margin-top: 1rem;" src="../resources/images/my_colle/backlk.png">
        </div>
        <div style="margin-left: 4rem;font-size: 18px;">
            <div style="color: #999999;">你还没有任何收藏，尽快收了我吧！</div>
            <div style="color: #999999;margin-left: 3rem;">我在<a style="color: #007aff;text-decoration: none;" href="javascript:;" @click="jxfy">精选房源</a>等你呦~</div>
        </div>
    </div>
</template>
<script>
    import header1 from '../components/header.vue';
    import footer1 from '../components/footer.vue';
    import {Indicator} from 'mint-ui';
    import {InfiniteScroll} from 'mint-ui';
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    import {Actionsheet} from 'mint-ui';
    import {Search} from 'mint-ui';
    import axios from 'axios';
    import qs from 'qs';
    export default {
        components: {
            header1,
            footer1,
            InfiniteScroll,
            Toast,
            Actionsheet,
            Search
        },
        data () {
            return {


            }
        },
        mounted(){

        },
        created: function () {

        },
        computed: {

        },
        methods: {
            jxfy(){
                this.$router.push({path: '/house'})
            },
        },
    }
</script>
