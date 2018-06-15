<style scoped lang="less">
    @import "../resources/css/reset.css";
    @import "../resources/css/website/login.less";

    .page-infinite-loading {
        text-align: center;
        background-color: #FFF;
        & > span {
            display: inline-block;
        }
    }
    .back{
        background: url("../resources/images/login/login_inp0234.png") no-repeat;
        background-size: 5.55rem 1rem;
    }
    .mt5rem {
        margin-top: .55rem;
    }
    .forgor_pwd{
        width: 1.5rem;
        //border:1px solid red;
        float: right;
        a{
            color: white !important;
        }
        margin-top: .2rem;
    }

</style>
<template>
    <div class="all_elements" id="ys_user">
        <div class="all_wrap">
           <!-- <i class="back"></i>-->
            <div class="login_wrap">
                <div class="login_box" >
                    <div class="inp_item">
                        <div class="inp_bg"></div>
                        <i class="ys_icon user"></i>
                        <i class="ys_icon1 user"></i>
                        <input type="number" id="userName"  style="border: 0.5px solid rgb(255,255,255);background-image:  url('../resources/images/login/login_inp0234.png') no-repeat"
                               class="mt5rem" value=""
                               v-model.trim="username" @blur="yzphone"  placeholder="请输入手机号">
                    </div>
                    <div class="inp_item">
                        <div class="inp_bg"></div>
                        <i class="ys_icon pass"></i>
                        <i class="ys_icon1 pass"></i>
                        <input type="password" style="border: 0.5px solid rgb(255,255,255);" value="" class="mt5rem" @blur="lose_pwd" v-model.trim="password" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" placeholder="请输入密码">
                    </div>
                    <div class="inp_item login loginss" style="margin-top: .5rem;clear: both;">
                        <a href="javascript:;" style="line-height: 1.4rem;margin-top: .14rem;" class="ys_btn" @click="login">登 录</a>
                    </div>
                    <div style="margin-top: -0.2rem;">     
                        <span class="forgor_pwd">           
                            <a href="javascript:;" @click="forgot_pwd">忘记密码？</a>
                        </span>  
                        <!--<span class="inp_item">
                            <a href="javascript:;" style="line-height: 1.4rem;margin-top: .14rem" class="ys_btn" @click="register">新用户注册</a>
                        </span>--> 
                        <span class="forgor_pwd" style="float:left !important;margin-left: 0.2rem">
                            <a href="javascript:;" @click="register">新用户注册</a>
                        </span>                   
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'; //toast
    import {Indicator} from 'mint-ui';
    import {MessageBox} from 'mint-ui'; //弹窗
    import crypto from 'crypto';

    export default {
        data () {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            forgot_pwd(){
                this.$router.push({path:'/forgot_pwd'});
            },
            //密码的验证
            yzpwd(){
                var reg = /^.{6,15}$/;
                if (!reg.test(this.password)) {
                    Toast({
                        message: '你的密码格式有误,请重新输入！',
                        position: 'bottom',
                        duration: 1000
                    });
                    this.password = null;
                    return false;
                }
            },
            lose_pwd(){
                if(this.password == ""||this.password ==null){
                    Toast({
                        message: '密码不能为空!',
                        position: 'bottom',
                        duration: 1000
                    });
                    return false;
                }
                this.yzpwd();
            },
            login(){
                const _this = this, un = this.username, pw = this.password;
                if (!un || !pw) {
                    MessageBox('提示', '请输入用户名和密码');
                    return;
                }
                const sha1 = crypto.createHash('sha1'), md5 = crypto.createHash('md5');
                sha1.update(this.password);
                const pwd = sha1.digest('hex');
                const time1 = Date.parse(new Date());
                md5.update(pwd);
                const password = md5.digest("hex");
                let head = JSON.parse(localStorage.getItem('nxhead'));
//              alert(head);
                this.$http.post(
                    this.$api + "/yhcms/web/qduser/login.do",
                    {
                        "parameters":{
                            "phone":this.username,
                            "upass":password,
                            "img":head
                        },
                        "cookie":time1,
                        "foreEndType":2,
                        "code":"8"
                    }
                ).then(function (res) {
                    Indicator.close();
                    var result = JSON.parse(res.bodyText);
                    if (result.success) {
                        const sjsd = {"sjs":(time1)};
                        localStorage.setItem('cooknx', JSON.stringify(sjsd));
                        const msg = {"user": name,"time":(new Date).getMilliseconds()};
                        localStorage.setItem('loginnx', JSON.stringify(msg));
                        localStorage.setItem('usernx', JSON.stringify(result.uname));
                        let ss = JSON.parse(localStorage.getItem('usernx'));
                        console.log(ss);
                        Toast({
                            message: '登录成功',
                            position: 'bottom',
                            duration: 1000
                        });

                        setTimeout(function(){
                            //_this.$router.push({path:'/index'});
                            history.go(-1);
                        },1000);

                    } else {
                        Toast({
                            message: '登录失败: ' + result.message,
                            position: 'bottom'
                        });
                    }
                }, function (res) {
                    Indicator.close();
                    Toast({
                        message: '登录失败! 请稍候再试',
                        position: 'bottom'
                    });
                });
            },
            register(){
                this.$router.push({path:'/register'});
            },
            yzphone(){
                var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                if(this.username==''||this.username==null){
                Toast({
                        message: '手机号不能为空！',
                        position: 'bottom',
                        duration: 1000
                    });
                }else{
                if (!reg.test(this.username)) {
                    Toast({
                        message: '手机号格式输入有误,请重新输入！',
                        position: 'bottom',
                        duration: 1000
                    });
                    this.username = null;
                    return false;
                }
                }
            },
        },
        mounted(){
            $('title').html("幼狮科技");
        },
    }
</script>
