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
                <li class="clearfix pr" style="margin-top: 0.2rem;">
                    <span class="ys_tit w224"><i>*</i> 手机号：</span>
                    <div class="ys_item_con fl"">
                    <input style="width: 53% !important;" type="number"  value="" v-model.trim="phone" placeholder="请输入手机号">
                    <span id="example">
                        <span v-if="sendMsgDisabled == 2"><a href="javascript:;">{{time+'秒后获取'}}</a></span>
                        <span v-if="!sendMsgDisabled"><a href="javascript:;" style="background-color: rgb(123,198,249);border:1px solid rgb(123,198,249);color: white;padding:0.05rem;" @click="send">获取验证码</a></span>
                        <span v-if="sendMsgDisabled == 3"><a href="javascript:;" style="background-color: rgb(123,198,249);border:1px solid rgb(123,198,249);color: white;padding:0.05rem;" @click="send">重新获取验证码</a></span>
                    </span>
        </div>

        </li>
        <li class="clearfix pr">
            <span class="ys_tit w224"><i>*</i> 验证码：</span>
            <div class="ys_item_con fl">
                <input class="npwd" type="number" value="" v-model="verificode" placeholder="请输入验证码">
            </div>
        </li>
        <div>
            <span class="pin"></span>
        </div>
        </ul>
        <a href="javascript:;" class="ys_default_btn mb80" @click="yzverificode">下一步</a>
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
                phone:null,
                verificode:null,
                djverificode:1,
                time: 60, // 发送验证码倒计时
                sendMsgDisabled: false
            }
        },
        methods: {
            /*getdata(){
                const user22 = JSON.parse(localStorage.getItem('cooknx'));
                this.$http.post(
                    this.$api + "/yhcms/web/qduser/getQdUser.do",
                    {"cookie":user22.sjs,"foreEndType":2,"code":"3"}
                ).then(function (res) {
                    Indicator.close();
                    var result = JSON.parse(res.bodyText);
                    if (result.success) {
                        var data = JSON.parse(res.bodyText).data;
                        console.log(data);

                    } else {
                        Toast({
                            message: result.message,
                            position: 'bottom'
                        });
                    }
                }, function (res) {
                    Indicator.close();
                    Toast({
                        message: '修改密码失败! 请稍候再试',
                        position: 'bottom'
                    });
                });
            },*/
            send() {
                this.djverificode = 2;
                //判断手机号
                var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                if(this.phone==''||this.phone==null){
                    Toast({
                        message: '手机号不能为空！',
                        position: 'bottom',
                        duration: 1000
                    });
                    return false;
                }else{
                    if (!reg.test(this.phone)) {
                        Toast({
                            message: '手机号格式输入有误,请重新输入！',
                            position: 'bottom',
                            duration: 1000
                        });
                        this.phone = null;
                        return false;
                    }
                    //判断系统中有无此手机号注册信息
                    if(this.phone != ''){
                        const _this = this;
                        this.$http.post(
                            this.$api + "/yhcms/web/qduser/getRemUser.do",
                            {
                                "parameters":{
                                    "phone":this.phone
                                },
                                "foreEndType":2,
                                "code":"12"
                            }
                        ).then(function (res) {
                            Indicator.close();
                            var result = JSON.parse(res.bodyText);
                            if (result.success) {
                                const _this = this, sjsd = {"sjs":(new Date)};
                                localStorage.setItem('cooknxcode', JSON.stringify(sjsd));
                                const user22 = JSON.parse(localStorage.getItem('cooknxcode'));
                                const url = this.$api + "/yhcms/web/qduser/getCode.do";
                                let that = this;
                                this.$http.post(url,
                                    {
                                        "parameters":{
                                            "cookie":user22.sjs,
                                            "phone":this.phone,
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
                            } else {
                                Toast({
                                    message: result.message,
                                    position: 'bottom'
                                });
                                this.phone=null;

                            }
                        }, function (res) {
                            Indicator.close();
                            Toast({
                                message: '修改密码失败! 请稍候再试',
                                position: 'bottom'
                            });
                        });
                    }
                }
            },
             yzphone(){
                var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                if(this.phone==''||this.phone==null){
                Toast({
                        message: '手机号不能为空！',
                        position: 'bottom',
                        duration: 1000
                    });
                    return false;
                }else{
                if (!reg.test(this.phone)) {
                    Toast({
                        message: '手机号格式输入有误,请重新输入！',
                        position: 'bottom',
                        duration: 1000
                    });
                    this.phone = null;
                    return false;
                }

                  if(this.phone != ''){
                    const _this = this;
                    this.$http.post(
                        this.$api + "/yhcms/web/qduser/getRemUser.do",
                        {
                            "parameters":{
                                "phone":this.phone
                            },
                            "foreEndType":2,
                            "code":"12"
                        }
                    ).then(function (res) {
                        Indicator.close();
                        var result = JSON.parse(res.bodyText);
                        if (result.success) {      

                        } else {
                            Toast({
                                message: result.message,
                                position: 'bottom'
                            });
                                this.phone=null;
                        }
                    }, function (res) {
                        Indicator.close();
                        Toast({
                            message: '修改密码失败! 请稍候再试',
                            position: 'bottom'
                        });
                    });
                }

                }
            },
            getverificode(){

            },
            //验证验证码
            yzverificode(){
                if(this.djverificode == 2){
                    if(this.phone==''||this.phone==null){
                        Toast({
                            message: '手机号不能为空！',
                            position: 'bottom',
                            duration: 1000
                        });
                        return false;
                    }
                    if(this.verificode==''||this.verificode==null){
                        Toast({
                            message: '验证码不能为空！',
                            position: 'bottom',
                            duration: 1000
                        });
                        return false;
                    }else{
                        const user22 = JSON.parse(localStorage.getItem('cooknxcode'));
                        const url = this.$api + "/yhcms/web/qduser/compareCode.do";
                        let that = this;
                        let _this = this;
                        this.$http.post(url,
                            {
                                "parameters":{
                                    "cookie":user22.sjs,
                                    "code":this.verificode,
                                },
                                "foreEndType":2,
                                "code":"15"
                            }
                        ).then((res)=>{
                            Indicator.close();
                            var result = JSON.parse(res.bodyText);
                            if(result.success){
                                //成功跳转到  修改密码
                                setTimeout(function(){
                                    _this.$router.push({path:'/reset_pwd/'+_this.phone});
                                },1000);

                            }else{
                                this.verificode = null;
                                Toast({
                                    message: result.message,
                                    position: 'bottom'
                                });
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
            saveAreaMsg(){
                if(this.phone != null && this.verificode != null){
                    const _this = this;
                    this.$http.post(
                        this.$api + "/yhcms/web/qduser/getRemUser.do",
                        {
                            "parameters":{
                                "phone":this.phone
                            },
                            "foreEndType":2,
                            "code":"12"
                        }
                    ).then(function (res) {
                        Indicator.close();
                        var result = JSON.parse(res.bodyText);
                        if (result.success) {
                            setTimeout(function(){
                                _this.$router.push({path:'/reset_pwd/'+_this.phone});
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
                            message: '修改密码失败! 请稍候再试',
                            position: 'bottom'
                        });
                    });
                }else{
                    MessageBox('提示',"必填项不能为空！");
                }
            },
        },
        mounted(){
            /*this.getdata();*/
            $('title').html('忘记密码');
        },
    }
</script>
