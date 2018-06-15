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
                    <span class="ys_tit w224"><i>*</i> 新手机号：</span>
                    <div class="ys_item_con fl" style="width: 2.7rem !important;">
                        <input type="number" value="" v-model="nphone" maxlength="11" @blur="lose_phone" placeholder="请输入新手机号">
                    </div>
                    <span id="example">
                        <span v-if="sendMsgDisabled == 2"><a href="javascript:;">{{time+'秒后获取'}}</a></span>
                        <span v-if="!sendMsgDisabled"><a  style="background-color: rgb(123,198,249);border:1px solid rgb(123,198,249);color: white;padding:0.05rem;" href="javascript:;" @click="send">获取验证码</a></span>
                        <span v-if="sendMsgDisabled == 3"><a  style="background-color: rgb(123,198,249);border:1px solid rgb(123,198,249);color: white;padding:0.05rem;" href="javascript:;" @click="send">重新获取验证码</a></span>
                    </span>
                </li>
                <li class="clearfix pr">
                    <span class="ys_tit w224"><i>*</i> 验证码：</span>
                    <div class="ys_item_con fl">
                        <input class="npwd" type="number" value="" v-model="yzm" placeholder="请输入验证码">
                    </div>
                </li>
                <div style="margin-top: 0.4rem;">
                    <span style="width: 7.5rem;clear: both;margin-left: 0.2rem;"><img src="../resources/images/icons/icon.jpg"></span>
                    <span style="float: right;width: 6rem;margin-right: 0.3rem;">更换手机号不会影响您个人中心的内容和数据您将使用新手机号登录</span>
                </div>
            </ul>
        <a href="javascript:;" class="ys_default_btn mb80" @click="saveAreaMsg">保存</a>
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
                nphone:null,
                yzm:null,
                djverificode:1,
                time: 60, // 发送验证码倒计时
                sendMsgDisabled: false
            }
        },
        methods: {
            send() {
                this.djverificode = 2;
                if(this.nphone != null||this.nphone!=''){
                    var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                    if (!reg.test(this.nphone)) {
                        Toast({
                            message: '手机号格式输入有误,请重新输入！',
                            position: 'bottom',
                            duration: 1000
                        });
                        this.nphone = null;
                        return false;
                    }
                    else{
                        const user22 = JSON.parse(localStorage.getItem('cooknx'));
                        const _this = this, url = this.$api + "/yhcms/web/qduser/getUser1.do";
                        let that = this;
                        this.$http.post(url,
                            {
                                "parameters":{
                                    "phone":this.nphone,
                                    "cookie":user22.sjs
                                },
                                "foreEndType":2,
                                "code":"5"
                            }
                        ).then((res)=>{
                            Indicator.close();
                            var result = JSON.parse(res.bodyText);
                            if(result.success){
                                let that = this;
                                this.$http.post(this.$api + "/yhcms/web/qduser/getUser.do", {"parameters":{"phone":this.nphone},"foreEndType":2,"code":"4"}).then((res)=>{
                                    Indicator.close();
                                    var result = JSON.parse(res.bodyText);
                                    if(result.success){
                                        //可以修改    发送短信验证码
                                        const _this = this, sjsd = {"sjs":(new Date)};
                                        localStorage.setItem('cooknxcode', JSON.stringify(sjsd));
                                        const user22 = JSON.parse(localStorage.getItem('cooknxcode'));
                                        const url = this.$api + "/yhcms/web/qduser/getCode.do";
                                        let that = this;
                                        this.$http.post(url,
                                            {
                                                "parameters":{
                                                    "cookie":user22.sjs,
                                                    "phone":this.nphone,
                                                },
                                                "foreEndType":2,
                                                "code":"14"
                                            }
                                        ).then((res)=>{
                                            Indicator.close();
                                            var result = JSON.parse(res.bodyText);
                                            if(result.success){
                                                Toast({
                                                    message: '验证码已发送，请稍等！',
                                                    position: 'bottom',
                                                    duration: 1000
                                                });
                                                let me = this;
                                                me.sendMsgDisabled = 2;
                                                let interval = window.setInterval(function() {
                                                    if ((me.time--) <= 0) {
                                                        me.time = 59;
                                                        me.sendMsgDisabled = 3;
                                                        window.clearInterval(interval);
                                                    }
                                                }, 1000);
                                            }else{
                                                Toast({
                                                    message: '验证码发送失败: ' + result.message,
                                                    position: 'bottom'
                                                });
                                            }
                                        }, (res)=>{
                                            Indicator.close();
                                        });

                                    }else{
                                        Toast({
                                            message: result.message,
                                            position: 'bottom'
                                        });
                                        this.nphone = null;
                                    }
                                }, (res)=>{
                                    Indicator.close();
                                });
                            }else{
                                Toast({
                                    message: result.message,
                                    position: 'bottom'
                                });
                                this.nphone = null;
                            }
                        }, (res)=>{
                            Indicator.close();
                        });

                    }
                }else{
                    Toast({
                        message: '手机号不能为空！',
                        position: 'bottom'
                    });
                }
            },
            //正则手机号的验证
            yzphone(){
                var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                if (!reg.test(this.nphone)) {
                    Toast({
                        message: '手机号格式输入有误,请重新输入！',
                        position: 'bottom',
                        duration: 1000
                    });
                    this.nphone = null;
                    return false;
                }
            },
            lose_phone(){
            //判断手机号
                if(this.nphone != null||this.nphone==''){
                var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                if (!reg.test(this.nphone)) {
                    Toast({
                        message: '手机号格式输入有误,请重新输入！',
                        position: 'bottom',
                        duration: 1000
                    });
                    this.nphone = null;
                    return false;
                }else{
                    const user22 = JSON.parse(localStorage.getItem('cooknx'));
                    const _this = this, url = this.$api + "/yhcms/web/qduser/getUser1.do";
                    let that = this;
                    this.$http.post(url,
                        {
                            "parameters":{
                                "phone":this.nphone,
                                "cookie":user22.sjs
                            },
                            "foreEndType":2,
                            "code":"5"
                        }
                    ).then((res)=>{
                        Indicator.close();
                        var result = JSON.parse(res.bodyText);
                        if(result.success){
                            let that = this;
                            this.$http.post(this.$api + "/yhcms/web/qduser/getUser.do", {"parameters":{"phone":this.nphone},"foreEndType":2,"code":"4"}).then((res)=>{
                                Indicator.close();
                                var result = JSON.parse(res.bodyText);
                                if(result.success){

                                }else{
                                    Toast({
                                        message: result.message,
                                        position: 'bottom'
                                    });
                                    this.nphone = null;
                                }
                            }, (res)=>{
                                Indicator.close();
                            });
                        }else{
                            Toast({
                                message: result.message,
                                position: 'bottom'
                            });
                            this.nphone = null;
                        }
                    }, (res)=>{
                        Indicator.close();
                    });
                    }
                }else{
                    Toast({
                        message: '手机号不能为空！',
                        position: 'bottom'
                    });
                }
            },
            getverificode(){


            },
            saveAreaMsg(){
                if(this.djverificode == 2){
                    //校验验证码是否正确
                    if(this.nphone==''||this.nphone==null){
                        Toast({
                            message: '手机号不能为空！',
                            position: 'bottom',
                            duration: 1000
                        });
                        return false;
                    }

                    if(this.yzm==''||this.yzm==null){
                        Toast({
                            message: '验证码不能为空！',
                            position: 'bottom',
                            duration: 1000
                        });
                        return false;
                    }else{
                        //验证码校验
                        const user22 = JSON.parse(localStorage.getItem('cooknxcode'));
                        const url = this.$api + "/yhcms/web/qduser/compareCode.do";
                        let that = this;
                        this.$http.post(url,
                            {
                                "parameters":{
                                    "cookie":user22.sjs,
                                    "code":this.yzm,
                                },
                                "foreEndType":2,
                                "code":"15"
                            }
                        ).then((res)=>{
                            Indicator.close();
                            var result = JSON.parse(res.bodyText);
                            if(result.success){

                                if(this.nphone != null && this.yzm != null){
                                    const _this = this;
                                    const user22 = JSON.parse(localStorage.getItem('cooknx'));
                                    this.$http.post(
                                        this.$api + "/yhcms/web/qduser/getUser1.do",
                                        {
                                            "parameters":{
                                                "phone":this.nphone,
                                                "cookie":user22.sjs
                                            },
                                            "foreEndType":2,
                                            "code":"5"
                                        }
                                    ).then(function (res) {
                                        Indicator.close();
                                        var result = JSON.parse(res.bodyText);
                                        if (result.success){
                                            this.$http.post(
                                                this.$api + "/yhcms/web/qduser/updatePhoneUser.do",
                                                {
                                                    "parameters":{
                                                        "phone":this.nphone,
                                                        "cookie":user22.sjs
                                                    },
                                                    "foreEndType":2,
                                                    "code":"5"
                                                }
                                            ).then(function (res) {
                                                Indicator.close();
                                                var result = JSON.parse(res.bodyText);
                                                if (result.success) {
                                                    Toast({
                                                        message: '手机号修改成功！',
                                                        position: 'bottom'
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
                                            });
                                        } else {
                                            Toast({
                                                message: result.message,
                                                position: 'bottom'
                                            });
                                        }
                                    }, function (res) {
                                        Indicator.close();
                                    });
                                }else{
                                    MessageBox('提示',"必填项不能为空！");
                                }
                            }else{
                                this.yzm = null;
                                Toast({
                                    message: result.message,
                                    position: 'bottom'
                                });
                                return false;
                            }
                        }, (res)=>{
                            Indicator.close();
                        });

                    }
                }else{
                    Toast({
                        message: '验证码错误！',
                        position: 'bottom',
                        duration: 1000
                    });
                }

            },
        },
        mounted(){
            $('title').html('更换手机号');
        },
    }
</script>
