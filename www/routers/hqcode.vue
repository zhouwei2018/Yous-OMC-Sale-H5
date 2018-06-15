<template>
    <div>

    </div>
</template>
<script>
   /* import header1 from '../components/header.vue';
    import footer1 from '../components/footer.vue';
    import {Indicator} from 'mint-ui';
    import {InfiniteScroll} from 'mint-ui';
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    import {Actionsheet} from 'mint-ui';
    import {Search} from 'mint-ui';
    import axios from 'axios';
    import qs from 'qs';*/
    export default {
        components: {

        },
        data () {
            return {

            }
        },
        mounted(){
            this.GetQueryString("code");
            /*alert(this.GetQueryString("code"));*/
        },
        created: function () {
            /*console.log("created=================",this.para.curr_page);*/
        },
        computed: {

        },
        methods: {
            GetQueryString(name){
                var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r!=null) return r[2]; return null;
            }
        },
    }
</script>