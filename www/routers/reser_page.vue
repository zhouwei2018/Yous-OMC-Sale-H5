<style scoped lang="less">
    @import "../resources/css/reset.css";
    @import "../resources/css/base2.less";
    .tsbq{width:100% !important}

</style>
<template>
    <div class="all_elements">
        <div class="build_top">
            <ul class="ys_item_ul mb60">
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;">姓名：</span>
                    <div class="ys_item_con fl" v-text="name"></div>
                </li>
                <li class="clearfix pr">
                    <span class="ys_tit" style="width: 1.5rem !important;">电话：</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="phone" readonly placeholder="请选择">
                        <i class="right_arrow" @click="chang_phone">&gt;</i>
                    </div>
                </li>
                <li class="clearfix pr">
                    <span class="ys_tit" style="width: 1.5rem !important;">看房时间：</span>
                    <div class="ys_item_con fl">
                        <input type="text" value=""
                               readonly
                               placeholder="请选择看房时间"
                               v-model="seetime"
                               @click="openPicker()">
                        <i class="calendar_icon" style="top:0px !important;background-color: white !important;" @click="openPicker()">&gt;</i>
                    </div>
                </li>
                <li class="clearfix pr">
                    <span>备注：</span>
                    <textarea v-model="beizhu" style="background-color: white !important;" rows="3" cols="20" placeholder="请输入看房说明"></textarea>
                </li>

            </ul>
            <a href="javascript:;" class="ys_default_btn mb80" @click="saveBuildMsg">提交预约</a>
        </div>

        <!--日期选择-->
        <mt-datetime-picker
                ref="picker"
                v-model="pickerValue"
                type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                :startDate="startDate"
                @confirm="handleConfirm">
        </mt-datetime-picker>





        <div class="" v-show="agnphone" style="height: 100%;position: fixed;top: 0px;background-color: white;width: 100%;">
            <ul class="ys_item_ul mb60">
                <li class="clearfix pr">
                    <span class="ys_tit w224"><i>*</i> 新手机号：</span>
                    <div class="ys_item_con fl" style="width: 3.5rem !important;">
                        <input type="number" value="" v-model="nphone" @blur="lose_phone" placeholder="请输入新手机号">
                    </div>
                    <span class="" @click="getverificode">获取验证码</span>
                </li>
                <li class="clearfix pr">
                    <span class="ys_tit w224"><i>*</i> 验证码：</span>
                    <div class="ys_item_con fl">
                        <input class="npwd" type="text" value="" v-model="yzm" placeholder="请输入验证码">
                    </div>
                </li>
                <div style="margin-top: 0.4rem;">
                    <span style="width: 7.5rem;clear: both;margin-left: 0.2rem;"><img src="../resources/images/icons/icon.jpg"></span>
                    <span style="float: right;width: 6.5rem;margin-right: 0.3rem;">更换手机号不会影响您个人中心的内容和数据您将使用新手机号登录</span>
                </div>
            </ul>
            <a href="javascript:;" class="ys_default_btn mb80" @click="saveAreaMsg">保存</a>
        </div>




    </div>
</template>
<script>

    const lang = {
        '优': 1,
        '良': 2,
        '差': 3,
    };

    const level = {
        "5A":"1","甲":"2","乙":"3","公寓":"4","商务":"5","综合":"6"
    };

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
                djverificode:1,
                "name": "", //姓名
                "phone": "", //电话
                nphone:"",
                yzm:"",
                "seetime": "", //预约看房
                "beizhu": [], //备注
                house_id:"",//房源id
                agnphone:false,//是否显示更换手机号


                //日期
                pickerValue: '',
                startDate: new Date("1990-01-01 12:00"),

                //楼盘级别
                lpjb: '',
                slots: [
                    {
                        values: ['5A', '甲', '乙', '公寓', '商务', '综合'],
                    }
                ],

                //品质
                slots_quality: [
                    {
                        values: ["优", "良", "差"],  //1优 2良 3差
                    }
                ],



                //级别弹窗显示隐藏
                popupVisible: false,

                //品质弹窗隐藏
                popQuality: false,


            }
        },
        computed:{


        },
        methods: {

            //日期panel展示
            openPicker() {
                this.$refs.picker.open();
            },

            //日期确定
            handleConfirm(value){
                this.seetime = this.transformDate(value);
            },

            //更换手机号
            chang_phone(){
                this.agnphone = true;
            },
            saveAreaMsg(){
                if(this.djverificode == 2){
                    this.agnphone = false;
                    this.phone = this.nphone;
                }else{
                    Toast({
                        message: '验证码错误！',
                        position: 'bottom',
                        duration: 1000
                    });
                }

            },
            lose_phone(){
                if(this.nphone != null){
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
                }else{
                    Toast({
                        message: '手机号不能为空！',
                        position: 'bottom'
                    });
                }
            },
            getverificode(){
                this.djverificode = 2;
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
                    }else{
                        Toast({
                            message: '验证码发送失败: ' + result.message,
                            position: 'bottom'
                        });
                    }
                }, (res)=>{
                    Indicator.close();
                });
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
                this.house_id = this.$route.query.house_id;
                const user22 = JSON.parse(localStorage.getItem('cooknx'));
                Indicator.open({
                    text: '',
                    spinnerType: 'fading-circle'
                });
                const url = this.$api + "/yhcms/web/qduser/getQdUser.do";
                let that = this;
                this.$http.post(url, {"cookie":user22.sjs,"foreEndType":2,"code":"3"}).then((res)=>{
                    Indicator.close();
                    const result = JSON.parse(res.bodyText);
                    if(result.success){
                        const data = JSON.parse(res.bodyText).data.qduser;
                        this.name = data.name;
                        this.phone = data.phone;
                    }else{
                        Toast({
                            message: result.message,
                            position: 'bottom',
                            duration: 1000
                        });
                    }
                    $('title').html("预约看房");
                }, (res)=>{
                    Indicator.close();
                });
            },

            getTsbq(){
                Indicator.open({
                    text: '',
                    spinnerType: 'fading-circle'
                });
                const url = this.$api + "/yhcms/web/lpjbxx/getTsbq.do";
                let that = this;
                this.$http.post(url).then((res)=>{
                    Indicator.close()
                    const data = JSON.parse(res.bodyText).data;
                    that.tsbq_all = data;
                }, (res)=>{
                    Indicator.close()
                });
            },

            //特色标签权限的判断
            tebqqxpd(){
                let user22 = JSON.parse(localStorage.getItem('cooknx'));
                const url = this.$api + "/yhcms/web/wxqx/getLpqx.do";
                this.$http.post(url, {"cookie":user22.sjs,"lpid":this.$route.params.lpid,"foreEndType":2,"code":"30000008"}).then((res)=>{
                    Indicator.close();
                    const data = JSON.parse(res.bodyText).data;
                    const meg = JSON.parse(res.bodyText).message;
                    this.ryzt = data.ryzt;
                    this.qxzt = data.qxzt;
                    console.log("ryzt:"+data.ryzt+",  qxzt: "+data.qxzt);
                    console.log(data.qxzt);
                    //data.qxzt = 11;
                    if(data.qxzt == 0){
                        this.teqx = false;
                        MessageBox('提示',meg);
                        window.history.go(-1);
                        return;
                    }
                    //此用户有所有权限
                    if(data.qxzt == 1 || data.qxzt == 21 || data.qxzt == 31 || data.qxzt == 41 || data.qxzt == 43){
                        this.teqx = true;
                        this.kfsqx = false;
                        this.cqxzqx = true;
                        this.lpjjqx = false;
                        this.zxptqx = false;
                        this.lpsjqx = false;
                        this.plsjsqx = false;
                        this.lpsjsfgqx = false;
                        this.kprqqx = true;
                        this.lpjbqx = true;
                        this.lppzqx = true;
                        this.saveqx = true;
                    }
                    if(data.qxzt == 2){
                        MessageBox('提示',"此用户已被禁用，请联系管理员！");
                        this.$router.push({path: '/login'});
                    }
                    if(data.qxzt == 3){
                        this.$router.push({path: '/login'});
                    }
                    //只有查看权限
                    if(data.qxzt == 11){
                        this.teqx = false;
                        this.kfsqx = true;
                        this.cqxzqx = false;
                        this.lpjjqx = true;
                        this.zxptqx = true;
                        this.lpsjqx = true;
                        this.plsjsqx = true;
                        this.lpsjsfgqx = true;
                        this.kprqqx = false;
                        this.lpjbqx = false;
                        this.lppzqx = false;
                        this.saveqx = false;
                        $("input").attr('placeholder',"");
                    }

                    if(data.qxzt == 46){
                        MessageBox('提示',"此用户不属于收购部人员！");
                        this.$router.push({path: '/login'});
                    }
                    this.getInitData();
                    this.getTsbq();

                }, (res)=>{
                    Indicator.close()
                });
            },
            fanhui(){
                window.history.go(-1);
            },
            saveBuildMsg(){
                var _this = this;
                /*if(!this.kfsh){
                 MessageBox('提示', '请填写开发商');
                 return;
                 }

                 if(this.kprq == ''){
                 MessageBox('提示', '请选择开盘日期');
                 return;
                 }

                 if(this.lpjb == ''){
                 MessageBox('提示', '请选择楼盘级别');
                 return;
                 }

                 if(!this.lppz){
                 MessageBox('提示', '请选择楼盘品质');
                 return;
                 }*/

                /*
                 Toast({
                 message: '保存成功',
                 position: 'bottom'
                 });
                 */
                Indicator.open({
                    text: '保存中...',
                    spinnerType: 'fading-circle'
                });

                /*
                 setTimeout(function(){
                 _this.$router.push({path:'/list2'});
                 },1000);
                 */
                let user22 = JSON.parse(localStorage.getItem('cooknx'));
                this.$http.post(
                    this.$api + "/yhcms/web/orderhouse/saveOrder.do",
                    {
                        "parameters":
                            {
                                "phone":this.phone,
                                "cookie":user22.sjs,
                                "id":this.house_id,
                                "remark":this.beizhu,
                                "ltime":this.seetime
                            },
                        "foreEndType":2,
                        "code":"19"
                    }
                ).then(function (res) {
                    Indicator.close();
                    var result = JSON.parse(res.bodyText);
                    if (result.success) {
                        Toast({
                            message: '添加预约房源成功',
                            position: 'bottom',
                            duration: 1000
                        });

                        setTimeout(function(){
                            history.go(-1);
                        },1000);
                    } else {
                        //this.$Message.error(res.message);
                        Toast({
                            message: '添加预约房源失败: ' + result.message,
                            position: 'bottom'
                        });
                    }
                }, function (res) {
                    //this.$Message.error('保存失败');
                    Toast({
                        message: '添加预约房源失败! 请稍候再试',
                        position: 'bottom'
                    });
                });
            }

        },
        mounted(){
            this.getInitData();

        },
    }
</script>
