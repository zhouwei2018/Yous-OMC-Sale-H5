<style scoped lang="less">
    @import "../resources/css/reset.css";
    @import "../resources/css/base2.less";
    @import "../resources/css/website/select2.min.css";
    .tsbq{width:100% !important}
    i{
        color:rgb(255,0,0);
    }
    .select2-container{
        width:400px !important;
    }
    .select2-container .select2-selection--multiple{
        height:auto;
    }
    .mint-cell-wrapper{
        font-size: 14px !important;
    }
    /*.clearfix{line-height: 1 !important;}
    .ys_tit{padding-top: 0.2rem;}*/
</style>
<style>
    .mint-cell-wrapper{
        font-size: 0.32rem;margin-left: -0.2rem;
        background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 0%, transparent 0%);
        background-size:0% 0px;
    }
    .mint-field-core{margin-left: -0.5rem;font-size: 0.32rem;}
</style>
<template>
    <div class="all_elements">
        <div class="build_top">
            <ul class="ys_item_ul mb60">
                <li class="clearfix" style="margin-top: 0.2rem;">
                    <span class="ys_tit" style="width: 1.5rem !important;"><i>*</i>姓名</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model.trim="name"  placeholder="请输入真实姓名">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;"><i>*</i>密码</span>
                    <div class="ys_item_con fl">
                        <input type="password" value="" @blur="lose_pwd" v-model="pwd" placeholder="请设置密码">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;"><i>*</i>确认密码</span>
                    <div class="ys_item_con fl">
                        <input type="password" value="" v-model="apwd" placeholder="请再次确认密码">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;"><i>*</i>手机号</span>
                    <div class="ys_item_con fl" style="width: 3.5rem !important;">
                        <input type="number" value="" v-model.trim="phone" placeholder="请输入手机号">
                    </div>
                    <span id="example">
                        <span v-if="sendMsgDisabled == 2"><a href="javascript:;">{{time+'秒后获取'}}</a></span>
                        <span v-if="!sendMsgDisabled"><a href="javascript:;" style="background-color: rgb(123,198,249);border:1px solid rgb(123,198,249);color: white;padding:0.05rem;" @click="send">获取验证码</a></span>
                        <span v-if="sendMsgDisabled == 3"><a href="javascript:;" style="background-color: rgb(123,198,249);border:1px solid rgb(123,198,249);color: white;padding:0.05rem;" @click="send">重新获取验证码</a></span>
                    </span>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;"><i>*</i>验证码</span>
                    <div class="ys_item_con fl">
                        <input type="number" value="" v-model="verificode" @blur="yzverificode" placeholder="请输入验证码">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;">推荐人</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" onkeyup="this.value=this.value.replace(/[^0-9a-zA-Z]/g,'')" v-model="tjperson" placeholder="请输入推荐人邀请码">
                    </div>
                </li>
                <li class="clearfix">
                    <div class="ys_item_con fl" style="width: 7rem !important;">
                        <span class="ys_tit" style="width: 1.5rem !important;">渠道公司</span>
                        <input label="渠道公司" placeholder="请输入渠道公司" v-model="company">
                        <mt-cell
                                v-show="companyShow"
                                v-for="item in companyList"
                                :title="item.gsname"
                                :key="item.id"
                                @click.native="fuzhi0(item)">
                        </mt-cell>
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;">所属项目</span>
                    <div class="ys_item_con fl">
                        <input v-if="projectjy" type="text" @blur="ssxm" value="" v-model="project" placeholder="所属项目">
                        <input v-else type="text" value="" readonly v-model="project" placeholder="所属项目">
                    </div>
                </li>
            </ul>
            <a v-if="registerqd == 2" href="javascript:;" style="background-image:url();background-color: silver;" class="ys_default_btn mb80">注册并登录</a>
            <a v-else href="javascript:;" class="ys_default_btn mb80" @click="register">注册并登录</a>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui'; //toast
    import { Indicator } from 'mint-ui'; //toast
    import crypto from 'crypto';
    import { MessageBox } from 'mint-ui'; //弹窗

    import {DatetimePicker} from 'mint-ui';  //日期选择
    import {Popup} from 'mint-ui'; //弹窗
    import '../resources/js/select2.min.js';

    export default {
        components: {
            DatetimePicker,
            Popup
        },

        data () {
            return {
                "name": null, //姓名
                "phone":null, //电话
                "verificode": null, //验证码
                "pwd": null, //密码
                "apwd": null, //确认密码
                "bindcomp": "", //渠道公司
                bindcompid:null,//渠道公司的id
                qdid:"",
                "project": "", //所属项目
                code:1,
                djverificode:1,
                time: 60, // 发送验证码倒计时
                sendMsgDisabled: false,
                companyShow:false,
                companyList:[],
                company:'',
                tjperson:'',
                companyId:'',
                projectjy:false,
                registerqd:1,
            }
        },
        computed:{

        },
        watch:{
            company(){
                /*if(this.company!=""&&!this.companyId){
                    this.$http.post('http://116.62.68.26:8080/yhcms/web/qduser/getQdCompany.do',{
                        "companyName":this.company
                    }).then((res)=>{
                        this.companyList = JSON.parse(res.data).data;
                        this.companyShow = true;
                    });this.$api + "/yhcms/web/qduser/getQdCompany.do"
                }*/
                if(this.company!=""&&!this.companyId) {
                    this.$http.post(this.$api + "/yhcms/web/qduser/getQdCompany.do", {
                        "companyName": this.company
                    }).then((res) => {
                        this.companyList = JSON.parse(JSON.stringify(res.data)).data;
                        if(this.companyList.length == 0){
                            this.projectjy = true;
                            this.project = "";
                        }else{
                            this.projectjy = false;
                        }
                        this.companyShow = true;
                    });
                }else{
                    this.companyId="";
                }
                console.log(this.companyId);
            },
        },
        methods: {
            ssxm(){
                if(this.project != ""){
                    const url = this.$api + "/yhcms/web/qduser/addCompany.do";
                    this.$http.post(url, {"gsname":this.company,"xmname":this.project}).then((res)=>{
                        Indicator.close();
                        var result = JSON.parse(res.bodyText);
                        if(result.success){

                        }else{
                            Toast({
                                message: '添加渠道公司失败: ' + result.message,
                                position: 'bottom'
                            });
                        }
                    }, (res)=>{
                        Indicator.close();
                    });
                }else{
                    Toast({
                        message: '所属项目不能为空！',
                        position: 'bottom'
                    });
                }
                },
            //模糊搜索
            hello(){
                //console.log(this.search)
                const arr = {title:this.search,id:1};
                this.resultmh.push(arr);
            },
            fuzhi0(item){
                this.companyShow = false;
                this.companyId = item.id;
                this.company=item.gsname;
                this.project = item.xmname;
                this.bindcompid = this.companyId;
            },
            //生成验证码
            send() {
                this.djverificode = 2;
                if(this.phone==''||this.phone==null){
                    Toast({
                        message: '手机号不能为空！',
                        position: 'bottom',
                        duration: 1000
                    });
                    return false;
                }
                //手机号验证
                var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                if (!reg.test(this.phone)) {
                    Toast({
                        message: '手机号格式输入有误,请重新输入！',
                        position: 'bottom',
                        duration: 1000
                    });
                    this.phone = null;
                    return false;
                }
                //判断数据库中有无此手机号注册信息
                if(this.phone != null){
                    const url = this.$api + "/yhcms/web/qduser/getUser.do";

                    this.$http.post(url, {"parameters":{"phone":this.phone},"foreEndType":2,"code":"4"}).then((res)=>{
                        Indicator.close();
                        var result = JSON.parse(res.bodyText);
                        if(result.success){
                            //可以注册 发送验证码   获取当前的cookie

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
                                    return false;
                                }
                            }, (res)=>{
                                Indicator.close();
                            });


                        }else{
                            Toast({
                                message: result.message,
                                position: 'bottom'
                            });
                            this.phone = null;
                            return false;
                        }
                    }, (res)=>{
                        Indicator.close();
                        return false;
                    });
                }else{
                    Toast({
                        message: '手机号不能为空！',
                        position: 'bottom'
                    });
                    return false;
                }
            },
            qdxz2(){
                console.log(this.slots);
                console.log(this.qdid);
                for(var i=0;i<this.slots.length;i++){
                    if(this.qdid == this.slots[i].id){
                        this.project = this.slots[i].xmname;
                        this.bindcomp = this.slots[i].gsname;
                    }
                }

            },
            //正则手机号的验证
            yzphone(){
                var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
                if (!reg.test(this.phone)) {
                    Toast({
                        message: '手机号格式输入有误,请重新输入！',
                        position: 'bottom',
                        duration: 1000
                    });
                    this.phone = null;
                    return false;
                }
            },
            //密码的验证
            yzpwd(){
                var reg = /^.{6,15}$/;
                if (!reg.test(this.pwd)) {
                    Toast({
                        message: '密码长度为6~15位,请重新输入！',
                        position: 'bottom',
                        duration: 1000
                    });
                    this.pwd = null;
                    return false;
                }
            },
            lose_phone(){
                if(this.phone != null){
                    this.yzphone();
                    const url = this.$api + "/yhcms/web/qduser/getUser.do";
                    let that = this;
                    this.$http.post(url, {"parameters":{"phone":this.phone},"foreEndType":2,"code":"4"}).then((res)=>{
                        Indicator.close();
                        var result = JSON.parse(res.bodyText);
                        if(result.success){

                        }else{
                            Toast({
                                message: result.message,
                                position: 'bottom'
                            });
                            this.phone = null;
                            return false;
                        }
                    }, (res)=>{
                        Indicator.close();
                    });
                }else{
                    Toast({
                        message: '手机号不能为空！',
                        position: 'bottom'
                    });
                }
            },
            lose_pwd(){
                if(this.pwd == ""){
                    Toast({
                        message: '密码不能为空!',
                        position: 'bottom',
                        duration: 1000
                    });
                    return false;
                }
                this.yzpwd();
            },
            register(){
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
                        //验证码校验
                        const user22 = JSON.parse(localStorage.getItem('cooknxcode'));
                        const url = this.$api + "/yhcms/web/qduser/compareCode.do";
                        let that = this;
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
                                if(this.name != null && this.phone != null && this.verificode != null && this.pwd != null && this.apwd != null){

                                    const sjsd = {"sjs":(new Date)};
                                    localStorage.setItem('cooknx', JSON.stringify(sjsd));
                                    const _this = this, user22 = JSON.parse(localStorage.getItem('cooknx'));
                                    const url = this.$api + "/yhcms/web/qduser/register.do";
                                    let that = this;
                                    const sha1 = crypto.createHash('sha1'), md5 = crypto.createHash('md5');
                                    sha1.update(this.pwd);
                                    const pwd = sha1.digest('hex');
                                    md5.update(pwd);
                                    const password = md5.digest("hex");
                                    this.registerqd = 2;
                                    let head = JSON.parse(localStorage.getItem('nxhead'));
                                    this.$http.post(url, {"parameters":{"cookie":user22.sjs,"img":head,"name":this.name,"phone":this.phone,"pass":password,"gsid":this.bindcompid,"gsname":this.company,"xmname":this.project,"saleNum":this.tjperson},"foreEndType":2,"code":"1"}).then((res)=>{
                                        Indicator.close();
                                        var result = JSON.parse(res.bodyText);
                                        if(result.success){
                                            Toast({
                                                message: '注册成功',
                                                position: 'bottom',
                                                duration: 1000
                                            });
                                            const msg = {"user": name,"time":(new Date).getMilliseconds()};
                                            localStorage.setItem('usernx', JSON.stringify(this.name));
                                            localStorage.setItem('loginnx', JSON.stringify(msg));
                                            localStorage.setItem('cooknx', JSON.stringify(sjsd));
                                            setTimeout(function(){
                                                _this.$router.push({path:'/index'});
                                            },1000);
                                        }else{
                                            Toast({
                                                message: '注册失败: ' + result.message,
                                                position: 'bottom'
                                            });
                                        }
                                    }, (res)=>{
                                        Indicator.close();
                                    });
                                }else{
                                    Toast({
                                        message: '信息填写不完整！',
                                        position: 'bottom'
                                    });
                                }

                            }else{
                                this.verificode = null;
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

            //验证验证码
            yzverificode(){

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
                //验证码校验
                const user22 = JSON.parse(localStorage.getItem('cooknxcode'));
                const url = this.$api + "/yhcms/web/qduser/compareCode.do";
                let that = this;
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

                    }else{
                        this.verificode = null;
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
            },
            getInitData(){
                this.$http.post(
                    this.$api + "/yhcms/web/qduser/getQdCompany.do"
                ).then((res)=> {
                    Indicator.close();
                    const qdData=JSON.parse(res.bodyText).data;
                    this.slots = qdData;
                    console.log(this.slots);
                }, (res)=>{
                    Indicator.close();
                });
                console.log(this.qdid);
                this.qdid = 0;
                console.log(this.qdid);
                Indicator.open({
                    text: '',
                    spinnerType: 'fading-circle'
                });
            },
        },
        mounted(){
            $("#cyry").select2({//责任销售多选框选择初始化
                placeholder: "请输入渠道公司名称",
                maximumSelectionLength:1,//最多可选4个
                tokenSeparators: [',', ' ']
            });
            $('title').html('用户注册');
            this.getInitData();
        },
    }
</script>
