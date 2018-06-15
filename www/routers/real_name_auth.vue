<style scoped lang="less">
    @import "../resources/css/reset.css";
    @import "../resources/css/base2.less";
    .pin{
        //border:1px solid red;
        margin: 2.5rem;
        display: none;
    }
    i{
        color:rgb(255,0,0);
    }
</style>
<template>
    <div class="all_elements">
        <div class="build_top">
            <ul class="ys_item_ul mb60">
                <li class="clearfix pr">
                    <span class="ys_tit w224"><i>*</i> 姓名：</span>
                    <div class="ys_item_con fl"">
                    <input type="password" value="" v-model="name" placeholder="请输入姓名">
        </div>
        </li>
        <li class="clearfix pr">
            <span class="ys_tit w224"><i>*</i> 身份证号：</span>
            <div class="ys_item_con fl">
                <input class="npwd" type="password" value="" v-model="verificode" placeholder="请输入身份证号">
            </div>
        </li>
        <div>
            <span class="pin"></span>
        </div>
        </ul>
        <a href="javascript:;" class="ys_default_btn mb80" @click="saveAreaMsg">认证</a>
    </div>
    </div>
</template>
<script>

    import { Toast } from 'mint-ui'; //toast
    import { Indicator } from 'mint-ui';
    import crypto from 'crypto';
    import { MessageBox } from 'mint-ui'; //弹窗

    export default {
        data () {
            return {
                name:null,
                verificode:null,
            }
        },
        methods: {
            saveAreaMsg(){
                if(this.ypwd != null && this.npwd != null &&this.anpwd != null ){
                    const _this = this;
                    const user22 = JSON.parse(localStorage.getItem('cook'));
                    this.$http.post(
                        this.$api + "/yhcms/web/qduser/updateCard.do",
                        {
                            "parameters":{
                                "card":this.verificode,
                                "cookie":user22.sjs,
                                "name":this.name
                            },
                            "foreEndType":2,
                            "code":"8"
                        }
                    ).then(function (res) {
                        Indicator.close();
                        var result = JSON.parse(res.bodyText);
                        if (result.success) {
                            Toast({
                                message: '认证成功！',
                                position: 'bottom',
                                duration: 1000
                            });
                            setTimeout(function(){
                                _this.$router.push({path:'/per_information'});
                            },1000);

                        } else {
                            Toast({
                                message: result.message,
                                position: 'bottom'
                            });
                        }
                    }, function (res) {
                        Indicator.close();
                        Toast({
                            message: '认证失败! 请稍候再试',
                            position: 'bottom'
                        });
                    });
                }else{
                    MessageBox('提示',"必填项不能为空！");
                }
            },
        },
        mounted(){

        },
    }
</script>
