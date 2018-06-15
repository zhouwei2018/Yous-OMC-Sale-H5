<style scoped lang="less">
    @import "../resources/css/reset.css";
    @import "../resources/css/base2.less";
    .tsbq{width:100% !important}
    .headt{width: 100%;background-color: rgb(220,220,220);border: 1px solid rgb(220,220,220);border-bottom: 1px solid rgb(255, 255 ,255); }
    .headcen{background-color: white;width: 1.5rem;height:1.5rem;border-radius:50%;}
    .headers{width:3.7rem;height:2rem;margin: auto;margin-top: .5rem;margin-bottom: .2rem;margin-left: auto;}
    .headname{margin: auto;}
    .headb{background: url("../resources/images/per_cen/per_cenba.png") no-repeat;background-size: 100% 100%;}
    .perli{width: 50%;float: left;height: 3rem;background-color:rgb(238,238,238) !important;padding-top: 0.6rem;padding-left: 1.35rem !important;img{width: 1.2rem;}border-bottom: 1px solid rgb(219, 218, 223);}
    .perbott{height: 2.55rem;margin-top: 6rem;}
</style>
<template>
    <div class="all_elements" style="background-color:rgb(238,238,238);">
        <div class="build_top">
            <div class="headt headb" style="height: 4rem;padding-top: 0.4rem;">
                <div class="headers" style="">
                    <div class="" style="float: left;"><img id="headimg" style="width: 1.8rem;height: 1.8rem;" src="../resources/images/per_cen/headtx.png"></div>
                    <div style="margin-top: 0.5rem;margin-left: 2.1rem;padding-top: 0.4rem;">
                        <div v-if="userif" class="headname" v-text="name" style="font-size: 0.36rem;margin-left: 0.2rem;color: white;"></div>
                        <a v-else href="javascript:;"><div class="headname" v-text="name" @click="denglu" style="font-size: 0.36rem;margin-left: 0.2rem;color: white;"></div></a>
                        <div class="" v-show="renzhang">
                            <img v-if="status == 0" style="width: 1.1rem;margin-top: 0.1rem;" src="../resources/images/per_cen/per_renzh3.png">
                            <img v-if="status == 1" style="width: 1.1rem;margin-top: 0.1rem;" src="../resources/images/per_cen/per_renzh1.png">
                            <img v-if="status == 2" style="width: 1.1rem;margin-top: 0.1rem;" src="../resources/images/per_cen/per_renzh2.png">
                        </div>
                    </div>
                </div>
                <div class="clearfix" v-if="wsxx == 1" style="padding-left: 1.7rem;">
                    <span class="ys_tit" style="width: 2.8rem !important;">您的个人信息还未完善</span>
                    <a href="javascript:;" @click="per_information" style="width: 2.25rem !important;color: rgb(31,71,239);">立即完善</a>
                </div>
                <!--<div class="clearfix" v-if="wsxx == 2">
                    <span class="ys_tit" style="width: 4rem !important;">您的实名认证已通过！</span>
                </div>-->
            </div>
            <ul class="ys_item_ul mb60" style="">
                <li class="clearfix perli" @click="per_information" style="border-right: 1px solid #dbdadf;">
                    <span class="ys_tit"><a href="javascript:;"><img src="../resources/images/per_cen/per_infor.png"></a></span>
                    <div class="ys_item_con fl">个人信息</div>
                </li>
                <li class="clearfix perli" @click="modify_pwd">
                    <span @click="modify_pwd" class="ys_tit"><a href="javascript:;"><img src="../resources/images/per_cen/mod_pwd.png"></a></span>
                    <div class="ys_item_con fl">修改密码</div>
                </li>
                <li class="clearfix perli" @click="my_collection" style="border-right: 1px solid #dbdadf;">
                    <span class="ys_tit"><a href="javascript:;"><img src="../resources/images/per_cen/my_col.png"></a></span>
                    <div class="ys_item_con fl">我的收藏</div>
                </li>
                <!--<li class="clearfix perli" @click="my_reser">
                    <span class="ys_tit"><a href="javascript:;"><img src="../resources/images/per_cen/my_reset.png"></a></span>
                    <div class="ys_item_con fl">我的预约</div>
                </li>-->
                <li class="clearfix perli" @click="my_zhgl">
                    <span class="ys_tit"><a href="javascript:;"><img src="../resources/images/per_cen/zhgl.png"></a></span>
                    <div class="ys_item_con fl">账户管理</div>
                </li>
            </ul>
            <div class="perbott">
                <div style=""><img style="width: 44%;height: 1.7rem;margin-left: 0.2rem;margin-top: 0.5rem;float: left;" src="../resources/images/per_cen/per_pop.png"></div>
                <div style="margin-left: 4.2rem !important;width:3.3rem;padding-top: 0.6rem;line-height: 0.5rem;color: rgb(168,168,168);font-size: 0.32rem;">我们的程序员正在挑灯夜战努力建设中...........更多功能，敬请期待！</div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui'; //toast
    import { Indicator } from 'mint-ui'; //toast

    import { MessageBox } from 'mint-ui'; //弹窗

    import {DatetimePicker} from 'mint-ui';  //日期选择

    import {Popup} from 'mint-ui'; //弹窗

    export default {
        components: {
            DatetimePicker,
            Popup
        },

        data () {
            return {
                wsxx:1,//完善信息的状态
                renzhang:false,
                userif:false,
                "name": "", //
                "topic": "", //楼盘名称
                "address": "", //地址
                "tsbq": [], //特色标签
                "kfsh": "", //开发商名称
                "kprq": "", //开盘日期(必选)
                "lpjb": "", //楼盘级别(必选)
                "chqxz": [], //产权性质
                "lppz": "", //楼盘品质 1优 2良 3差
                "zxjnjg": "", //均价
                "shyl": "",  //使用率
                "hshkzbl": "", //户数空置比例
                "zxptmx": "",  //装修设施配套明细
                "lpsjgs": "", //楼盘设计公司
                "lpsjs": "", //楼盘设计师
                "lpsjfg": "", //楼盘设计风格
                "tsbq_all":[],
                "ryzt":"",//人员状态的权限
                "qxzt":"",//权限状态码
                status:"",
            }
        },
        computed:{

        },
        methods: {
            denglu(){
                this.$router.push({path:'/login'});
            },
            modify_pwd(){
                if(localStorage.getItem('cooknx')){
                    this.$router.push({path:'/modify_pwd'});
                }else{
                    this.$router.push({path:'/login'});
                }

            },
            per_information(){
                if(localStorage.getItem('cooknx')){
                    this.$router.push({path:'/per_information'});
                }else{
                    this.$router.push({path:'/login'});
                }

            },
            my_collection(){
                if(localStorage.getItem('cooknx')){
                    this.$router.push({path:'/my_collection'});
                }else{
                    this.$router.push({path:'/login'});
                }

            },
            my_zhgl(){//帐户管理
            	if(localStorage.getItem('cooknx')){
                    this.$router.push({
                    	path:'/income_number',
                    	query:{
                    		zhgl:1
                    	}
                    });
                }else{
                    this.$router.push({path:'/login'});
                }
            },
            my_reser(){
//          	return;
                this.$router.push({path:'/my_reser'});
            },


            //日期panel展示
            openPicker() {
                this.$refs.picker.open();
            },

            //日期确定
            handleConfirm(value){
                this.kprq = this.transformDate(value);
            },

            //楼盘类型panel展示
            openLevel() {
                //this.lpjb = '乙';
                this.popupVisible = true;
            },


            //选择类型
            selectLevel(picker, values) {
                this.lpjb = values[0];
            },

            //类型确定
            sureLevel(){
                this.popupVisible = false;
            },


            //打开品质
            openQuality(){
                //this.lppz = '差';
                this.popQuality = true;
            },

            //选择品质
            selectQuality(picker, values){
                this.lppz = values[0];
            },

            //品质确定
            sureQuality(){
                this.popQuality = false;
            },


            //打开品质
            openUse(){
                this.shyl = '非常';
                this.popUse = true;
            },

            //选择品质
            selectUse(picker, values){
                this.shyl = values[0];
            },

            //品质确定
            sureUse(){
                this.popUse = false;
            },

            //日期转换
            transformDate: function (date) {
                var str = '';
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                str = year + '-' + this.addZero(month) + '-' + this.addZero(day);
                return str;
            },

            //补零
            addZero(n){
                return n = n < 10 ? '0' + n : '' + n;
            },

            //选择tag
            selectTag(e){
                const target = $(e.target), val = target.attr("value");
                if(!val){return;}

                if ($(e.target).hasClass('active')) {
                    let tsbq_t = new Set(this.tsbq);
                    tsbq_t.delete(val);
                    this.tsbq = [...tsbq_t];

                    $(e.target).removeClass('active');
                } else {
                    let tsbq_t = new Set(this.tsbq);
                    tsbq_t.add(val);
                    this.tsbq = [...tsbq_t];

                    $(e.target).addClass('active');
                }
            },

            //获取后台的数据
            getInitData(){
                /*Indicator.open({
                    text: '',
                    spinnerType: 'fading-circle'
                });*/
                const user22 = JSON.parse(localStorage.getItem('cooknx'));
                if(localStorage.getItem('cooknx')){
                    const url = this.$api + "/yhcms/web/qduser/getQdUser.do";
                    let that = this;
                    this.$http.post(url,{"cookie":user22.sjs,"foreEndType":2,"code":"3"}).then((res)=>{
                        Indicator.close();
                        const result = JSON.parse(res.bodyText);
                        if(result.success){
                            const data = JSON.parse(res.bodyText).data.qduser;
                            const data1 = JSON.parse(res.bodyText).data.mppic1;
                            const data2 = JSON.parse(res.bodyText).data.mppic2;
                            this.status = data.status2;
                            this.name = data.name;
                            this.userif = true;
                            this.renzhang = true;
                            if(data1.length != 0 && data2.length != 0 && data.gsname != "" && data.xmname != "" && data.card != ""){
                                this.wsxx = 11;
                            }else{
                                this.wsxx = 1;
                            }
                        }
                    }, (res)=>{
                        Indicator.close();
                    });
                }else{
                    this.userif = false;
                    this.wsxx = 11;
                    this.name = "立即登录";
                    $(".headname").css("margin-top","0.3rem");
                }

            },
            fanhui(){
                window.history.go(-1);
            },
            saveBuildMsg(){
                var _this = this;
                if(this.topic==''){
                    MessageBox('提示', '请填写楼盘名称');
                    return;
                }

                var tt= this.chqxz.join("、");
                if(tt==''){
                    MessageBox('提示', '请选择产权性质');
                    return;
                }
                Indicator.open({
                    text: '保存中...',
                    spinnerType: 'fading-circle'
                });

                /*
                 setTimeout(function(){
                 _this.$router.push({path:'/list2'});
                 },1000);
                 */
                this.$http.post(
                    this.$api + "/yhcms/web/lpjbxx/saveLp.do",
                    {
                        "parameters": {
                            "lpid": this.lpid, //楼盘id
                            "topic": this.topic, //楼盘名称
                            "address": this.address, //地址
                            "tsbq": "、" + this.tsbq.join("、") + "、", //特色标签
                            "kfsh": this.kfsh, //开发商名称
                            "kprq": this.kprq, //开盘日期(必选)
                            "lpjb": level[this.lpjb], //楼盘级别(必选)
                            "chqxz": this.chqxz.join("、"), //产权性质
                            "lppz": lang[this.lppz], //楼盘品质 1优 2良 3差
                            "zxjnjg": this.zxjnjg, //均价
                            "shyl": this.shyl,  //使用率
                            "hshkzbl": this.hshkzbl, //户数空置比例
                            "zxptmx": this.zxptmx,  //装修设施配套明细
                            "lpsjgs": this.lpsjgs, //楼盘设计公司
                            "lpsjs": this.lpsjs, //楼盘设计师
                            "lpsjfg": this.lpsjfg //楼盘设计风格
                        },
                        "foreEndType": 2,
                        "code": "300000041"
                    }
                ).then(function (res) {
                    Indicator.close();
                    var result = JSON.parse(res.bodyText);
                    if (result.success) {
                        Toast({
                            message: '保存成功',
                            position: 'bottom',
                            duration: 1000
                        });

                        setTimeout(function(){
                            history.go(-1);
                            // _this.$router.push({path:'/index'});
                        },1000);
                    } else {
                        //this.$Message.error(res.message);
                        Toast({
                            message: '保存失败: ' + result.message,
                            position: 'bottom'
                        });
                    }
                }, function (res) {
                    //this.$Message.error('保存失败');
                    Toast({
                        message: '保存失败! 请稍候再试',
                        position: 'bottom'
                    });
                });
            }

        },
        mounted(){
            this.getInitData();
            $('title').html('个人中心');
            //获取微信的头像
            if(localStorage.getItem('nxhead')){
                let head1 = JSON.parse(localStorage.getItem('nxhead'));
                if(head1 != ""){
                    console.log(head1);
                    $('#headimg').attr('src',head1);
                    $('#headimg').css('border-radius','50%');
                }
            }

        },
    }
</script>
