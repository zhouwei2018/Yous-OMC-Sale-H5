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
                    <span class="ys_tit w224"><i>*</i> 原密码：</span>
                    <div class="ys_item_con fl"">
                    <input type="password" @blur="lose_pwd1" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" value="" v-model="ypwd" placeholder="请输入原密码">
        </div>
        </li>
        <li class="clearfix pr">
            <span class="ys_tit w224"><i>*</i> 新密码：</span>
            <div class="ys_item_con fl">
                <input class="npwd" @blur="lose_pwd" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" type="password" value="" v-model="npwd" placeholder="请设置密码">
            </div>
        </li>
        <li class="clearfix pr">
            <span class="ys_tit w224"><i>*</i> 确认密码：</span>
            <div class="ys_item_con fl">
                <input type="password" value="" v-model="anpwd" placeholder="请再次确认密码">
            </div>
        </li>
        <!--<li>
            <span class="ys_tit w224">11</span>
            <div>
                22
            </div>
        </li>-->
        <div>
            <span class="pin"></span>
        </div>
        </ul>
        <a href="javascript:;" class="ys_default_btn mb80" @click="saveAreaMsg">确认修改</a>
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
                ypwd:null,
                npwd:null,
                anpwd:null,
            }
        },
        methods: {
            lose_pwd1(){
                if(this.ypwd == null){
                    Toast({
                        message: '密码不能为空!',
                        position: 'bottom',
                        duration: 1000
                    });
                    return false;
                }
                this.yzpwd();
            },
            lose_pwd(){
                if(this.npwd == null){
                    Toast({
                        message: '密码不能为空!',
                        position: 'bottom',
                        duration: 1000
                    });
                    return false;
                }
                this.yzpwd();
            },
            //密码的验证
            yzpwd(){
                var reg = /^.{6,15}$/;
                if (!reg.test(this.npwd)) {
                    Toast({
                        message: '密码长度为6~15位,请重新输入！',
                        position: 'bottom',
                        duration: 1000
                    });
                    this.npwd = null;
                    return false;
                }
            },
            saveAreaMsg(){
                if(this.ypwd != null && this.npwd != null &&this.anpwd != null ){
                    if(this.ypwd != this.npwd){
                        if(this.npwd == this.anpwd){
                            const _this = this;
                            const user22 = JSON.parse(localStorage.getItem('cooknx'));
                            const sha1 = crypto.createHash('sha1'), md5 = crypto.createHash('md5');
                            const sha11 = crypto.createHash('sha1'), md51 = crypto.createHash('md5');
                            sha1.update(this.ypwd);
                            sha11.update(this.npwd);
                            const pwd = sha1.digest('hex');
                            md5.update(pwd);
                            const npwd1 = sha11.digest('hex');
                            md51.update(npwd1);
                            const ypwd = md5.digest("hex");
                            const npwd = md51.digest("hex");
                            const msg = {"user": name,"time":(new Date).getMilliseconds()};
                            localStorage.setItem('loginnx', JSON.stringify(msg));
                            this.$http.post(
                                this.$api + "/yhcms/web/qduser/updatePassUser.do",
                                {
                                    "parameters": {
                                        "pass":ypwd,
                                        "cookie":user22.sjs,
                                        "pass1":npwd
                                    },
                                    "foreEndType":2,
                                    "code":"5"
                                }
                            ).then(function (res) {
                                Indicator.close();
                                var result = JSON.parse(res.bodyText);
                                if (result.success) {
                                    Toast({
                                        message: '修改密码成功',
                                        position: 'bottom',
                                        duration: 1000
                                    });
                                    setTimeout(function(){
                                        _this.$router.push({path:'/per_cen'});
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
                            MessageBox('提示',"两次输入的密码不一样！");
                        }
                    }else{
                        MessageBox('提示',"原始密码和新密码一样！");
                    }

                }else{
                    MessageBox('提示',"必填项不能为空！");
                }
            },
        },
        mounted(){
            $('title').html("修改密码");
        },
    }
</script>
