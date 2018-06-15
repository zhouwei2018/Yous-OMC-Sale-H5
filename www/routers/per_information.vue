<style scoped lang="less">
    @import "../resources/css/reset.css";
    @import "../resources/css/base2.less";

    .page-infinite-loading {
        text-align: center;
        background-color: #FFF;
        & > span {
            display: inline-block;
        }
    }
    .upload_btn{
        position: relative;
        input{
            width: 100%;
            height: 100%;
            z-index: 99999;
            opacity: 0;
        }
    }
    .image_wrap {
        .img_demo{
            margin-right: .3rem;
            margin-bottom: .3rem;
        }
    }
    .mpzm{
        background: url("../resources/images/per_cen/per_inform/mpzm.png") no-repeat;
        background-size: 100% 100%;
        width: 5.7rem;
        height: 3rem;
        margin-left: 0.4rem;
    }
    .mpbm{
        background: url("../resources/images/per_cen/per_inform/mpbm.png") no-repeat;
        background-size: 100% 100%;
        width: 5.7rem;
        height: 3rem;
        margin-left: 0.4rem;
    }

</style>
<style>
    .mint-cell-wrapper{
        font-size: 0.32rem;margin-left: -0.2rem;
        background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 0%, transparent 0%);
        background-size:0% 0px;
    }
    .mint-field-core{margin-left: -0.3rem;font-size: 0.32rem;}

</style>
<template>
    <div class="all_elements">
        <div class="build_top">
            <ul class="ys_item_ul mb60">
                <li class="clearfix" style="margin-top: .2rem;">
                    <span class="ys_tit" style="width: 1.7rem !important;">姓名</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="name" placeholder="请输入真实姓名">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.7rem !important;">手机号</span>
                    <div class="ys_item_con fl" style="width: 3.5rem !important;">
                        <input type="text" value="" readonly v-model="phone" placeholder="请输入手机号">
                    </div>
                    <span class=""><a style="background-color: rgb(123,198,249);border:1px solid rgb(123,198,249);color: white;padding:0.05rem;" href="javascript:;" @click="chang_phone">更换手机号</a></span>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;">推荐人</span>
                    <div class="ys_item_con fl">
                        <input type="text" name="yqma" value="" onkeyup="this.value=this.value.replace(/[^0-9a-zA-Z]/g,'')" v-model="tjperson" placeholder="请输入推荐人邀请码">
                    </div>
                </li>
                <li class="clearfix">
                    <div class="ys_item_con fl" style="width: 6rem !important;">
                        <mt-field label="渠道公司" placeholder="" v-model="company"></mt-field>
                        <mt-cell
                                v-show="companyShow"
                                v-for="item in companyList"
                                :title="item.gsname"
                                :key="item.id"
                                @click.native="fuzhi0(item)">
                        </mt-cell>
                        <!--<select v-model='qdid' @change="qdxz2" placeholder="请选择渠道">
                            <option value="0"> 请选择渠道</option>
                            <option v-for="option in slots" v-bind:value="option.id">
                                {{ option.gsname}}
                            </option>
                        </select>-->
                    </div>

                   <!-- <asp:DropDownList ID="ddlCountry" runat="server" data-placeholder="Choose a Country..."
                                      Width="200px" class="chzn-select">
                    </asp:DropDownList>-->
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.7rem !important;">所属项目</span>
                    <div class="ys_item_con fl">
                        <input v-if="projectjy" type="text" @blur="ssxm" value="" v-model="project" placeholder="所属项目">
                        <input v-else type="text" value="" readonly v-model="project" placeholder="所属项目">
                    </div>
                </li>
                <li class="clearfix" style="margin-top: .2rem;">
                    <span class="ys_tit" style="width: 1.7rem !important;">身份证号</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="code" placeholder="身份证号">
                    </div>
                    <!--<div class="ys_item_con fl">
                        <input type="text" value="" v-model="code" placeholder="身份账号">
                    </div>-->
                </li>
            </ul>
            <div class="all_elements" style="margin-top: -1rem;overflow-x: inherit !important;">
                <div class="build_top">
                    <div class="common_title" style="background-color: white;border-bottom: 0px solid #dbdadf;">名片上传</div>
                    <div class="common_title" style="background-color: white;border-bottom: 0px solid #dbdadf;padding-left: 3.2rem;">名片正面</div>
                    <div class="image_wrap clearfix mb140" style="min-height: 4.5rem !important;">
                        <div v-if="il < 1" class="mr10 fl">
                            <!--<input @change='add_img1' id="file_add" tag="lp" type="file" multiple>-->
                            <div class="mpzm" style="padding-top: 0.7rem;">
                                <div style="border-radius:50%;width: 1.5rem;height: 1.5rem;background-color:rgb(115,185,254);opacity:0.7;margin-left: 2rem;padding-top: 0.3rem;">
                                    <div class="upload_btn" style="width: 1rem;margin-left: 0.25rem;">
                                        <input @change='add_img1' id="file_add" tag="lp" type="file" multiple>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="img_demo fl pr" v-for='(item,index) in imgList' v-if="item.isdelete==0">
                            <img style="width: 5.7rem;height: 3rem;margin-left: 0.4rem;" class="upload_demo_img" :src="item.id==='xxx'? item.url : $prefix + '/' + item.url" alt="" />
                            <i class="delete_icon" tag="lp" @click='delete_img(index, item.id, $event)'></i>
                        </div>
                    </div>
                    <!--<div class="common_title">楼盘封面图</div>-->
                    <div class="common_title" style="background-color: white;border-bottom: 0px solid #dbdadf;padding-left: 3.2rem;margin-top: -1rem;">名片背面</div>
                    <div class="image_wrap clearfix mb140" style="min-height: 4.5rem !important;">
                        <div v-if="fl < 1" class="mr10 fl">
                            <!--<input @change='add_img2' id="file_add" tag="fm" type="file">-->
                            <div class="mpbm"style="padding-top: 0.7rem;">
                                <div style="border-radius:50%;width: 1.5rem;height: 1.5rem;background-color:rgb(115,185,254);opacity:0.7;margin-left: 2rem;padding-top: 0.3rem;">
                                    <div class="upload_btn" style="width: 1rem;margin-left: 0.25rem;">
                                        <input @change='add_img2' id="file_add" tag="fm" type="file" multiple>
                                    </div>
                                </div>
                            </div>
                            <!--<div class="mpbm" style="padding-top: 0.7rem;">
                                <div style="border-radius:50%;width: 1.5rem;height: 1.5rem;background-color:rgb(115,185,254);opacity:0.7;margin-left: 2rem;">
                                    <img style="width: 1rem;margin-left: 0.2rem;margin-top: 0.3rem;" src="../resources/images/per_cen/per_inform/xj.png" alt="" />
                                </div>
                            </div>-->
                        </div>
                        <div class="img_demo fl pr" v-for='(item,index) in fmList' v-if="item.isdelete==0">
                            <img style="width: 5.7rem;height: 3rem;margin-left: 0.4rem;" class="upload_demo_img" :src="item.id==='xxx'? item.url : $prefix + '/' + item.url" alt="" />
                            <i class="delete_icon" tag="fm" @click='delete_img(index, item.id, $event)'></i>
                        </div>
                    </div>
                    <!--<div>
                        <span style="width: 7.5rem;clear: both;margin-left: 0.2rem;"><img src="../resources/images/icons/icon.jpg"></span>
                        <span style="float: right;width: 6rem;margin-right: 0.3rem;">名片禁止使用Photoshop等修图软件造价，一经发现，将取消合作！</span>
                    </div>-->
                </div>
                <a href="javascript:;" style="clear: both;margin-top: 0.8rem;" class="ys_default_btn mb80" @click.stop.prevent="saveToserver">保存</a>
            </div>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    import {Indicator} from 'mint-ui';
    import { MessageBox } from 'mint-ui'; //弹窗

    export default {
        data(){
            return{
                name: "",
                phone: "",
                bindcomp: "",
                project:"",
                code:"",
                imgList:[],
                fmList:[],
                il: 0,
                fl: 0,
                upload: 0,
                uploaded: 0,
                statu:0,
                companyShow:false,
                companyList:[],
                company:'',
                tjperson:'',
                companyId:'',
                projectjy:false,
                bindcompid:'',
                sm:'',//佣金列表实名认证状态
            }
        },
        created(){
        	this.sm = this.$route.query.sm;
        },
        watch:{
            company(){
                /*if(this.company!=""&&!this.companyId){
                 this.$http.post('http://116.62.68.26:8080/yhcms/web/qduser/getQdCompany.do',{
                 "companyName":this.company
                 }).then((res)=>{
                 this.companyList = JSON.parse(res.data).data;
                 this.companyShow = true;
                 });
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
        methods:{
            //模糊搜索
            fuzhi0(item){
                this.companyShow = false;
                this.companyId = item.id;
                this.company=item.gsname;
                this.project = item.xmname;
                console.log(this.companyId);
                this.bindcompid = this.companyId;
            },
            qdxz2(){
                for(var i=0;i<this.slots.length;i++){
                    if(this.qdid == this.slots[i].id){
                        this.project = this.slots[i].xmname;
                        this.bindcomp = this.slots[i].gsname;
                    }
                }

            },
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
            //正则身份证号的验证
            yzcard(){
                var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
                if(reg.test(this.code))
                {
                }else{
                    Toast({
                        message: '身份证输入不合法',
                        position: 'bottom',
                        duration: 1000
                    });
                    this.code = "";
                    return  false;
                }
            },
            lose_card(){
                if(this.code == ""){
                    Toast({
                        message: '身份证号不能为空!',
                        position: 'bottom',
                        duration: 1000
                    });
                    return false;
                }
                this.yzcard();
            },
            delete_img(index, id, event){
                const tag = $(event.target).attr("tag"), which = tag === "lp" ? "imgList":"fmList";
                const filter = tag === "lp" ? "il" : "fl";
                if(id !== 'xxx'){
                    this[which][index].isdelete = "1";
                }
                else{
                    this[which].splice(index,1);
                    this.upload -= 1;
                }
                this[filter] -= 1;
            },
            add_img1(event){
                const fis = event.target.files;
                let len = fis.length;
                len = Math.min(len, 5 - this.il);
                for(let i = 0; i < len; ++i){
                    this.append_img(fis[i]);
                }
            },
            add_img2(event){
                const fis = event.target.files;
                let len = fis.length;
                len = Math.min(len, 5 - this.fl);
                for(let i = 0; i < len; ++i){
                    this.append_img(fis[i]);
                }
            },
            append_img(image){
                const type = image.type;
                if (!/\/(?:jpeg|jpg|png)/i.test(type)){
                    return;
                }
                const tag = $(event.target).attr("tag"), which = tag === "lp" ? "imgList":"fmList";
                const filter = tag === "lp" ? "il" : "fl";
                const that=this, reader = new FileReader();
                reader.onloadend = () => {
                    let ret;
                    const imgx = new Image();
                    imgx.src = reader.result;
                    imgx.onload = function(){
                        var canvas = document.createElement('canvas');
                        canvas.width = imgx.naturalWidth;
                        canvas.height = imgx.naturalHeight;
                        canvas.getContext("2d").drawImage(imgx, 0, 0);
                        ret = canvas.toDataURL(type, .2);//图片压缩比例

                        const obj = {
                            id: "xxx",
                            lpid: that.lpid,
                            isdelete: 0,
                            type: 2,
                            suffix:type,
                            url: ret
                        };
                        that[which].push(obj)
                    }
                }
                reader.readAsDataURL(image);
                this[filter] += 1;
                this.upload += 1;
            },
            fanhui(){
                window.history.go(-1);
            },
            saveToserver(){
                //开始上传图片
                const that = this;
                let fp = [], fm = [];
                const cb = (img, obj) => {
                    if(img.id === "xxx"){
                        const [_, data] = img.url.split(","), [prefix, t] = img.suffix.split('/');
                        that.saveImages(data, t, function(path){
                            obj.push({"id":"", "isdelete":"0", "url":path})
                            that.uploaded += 1;
                            if(that.uploaded >= that.upload){
                                // 新图片上传完成
                                Indicator.close();
                                setTimeout(function(){
                                    that.saveImageData();
                                }, 1000);
                            }
                        });
                    }
                    else{
                        obj.push({"id": img.id, "isdelete": img.isdelete, "url": img.url});
                    }
                };

                if(this.upload > 0){
                    Indicator.open({
                        text: '上传图片中...',
                        spinnerType: 'fading-circle'
                    });
                }

                this.imgList.forEach((img)=>{cb(img,fp)});
                this.imgList = fp;
                this.fmList.forEach((img)=>{cb(img,fm)});
                this.fmList = fm;

                //保存信息
                if(this.upload < 1){
                    // 没有新图片要上传
                    setTimeout(function(){
                        Indicator.close();
                        that.saveImageData();
                    }, 1000);
                }
            },
            saveImages(pic, type, cb){
                const that = this;
                this.$http.post(
                    this.$api + "/yhcms/web/jcsj/uploadPic.do",
                    {"parameters":{ "smallPic":pic,"suffix": "." + type},"foreEndType":2,"code":"300000084"}
                ).then((res)=>{
                    var result = JSON.parse(res.bodyText);
                    if (result.success) {

                        cb && cb(result.data);
                    }
                    else{
                    }
                }, (res)=>{});
            },
            saveImageData(){
                const user22 = JSON.parse(localStorage.getItem('cooknx'));
                const that = this;

                let fp = this.imgList.map((item, idx)=>{
                    return {"id": item.id, "isdelete": item.isdelete, "url": item.url};
                });
                let fm = this.fmList.map((item, idx)=>{
                    return {"id": item.id, "isdelete": item.isdelete, "url": item.url};
                });
                var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
                if(this.code == ""){
                    Indicator.open({
                        text: '保存中...',
                        spinnerType: 'fading-circle'
                    });
                    this.$http.post(
                        this.$api + "/yhcms/web/qduser/updateUser.do",
                        {"parameters":{"saleNum":this.tjperson,"gsid":this.bindcompid,"gsname":this.company,"xmname":this.project,"cookie":user22.sjs,"name":this.name,"phone":this.phone,"card":this.code,"mptp1":fp,"mptp2":fm},"foreEndType":2,"code":"2"}).then((res)=>{
                        Indicator.close();
                        var result = JSON.parse(res.bodyText);
                        if (result.success) {
                            const namee = this.name;
                            localStorage.setItem('usernx', JSON.stringify(namee));
                            Toast({
                                message: '保存成功',
                                position: 'bottom',
                                duration: 1000
                            });
							
							
							setTimeout(function(){
							    that.$router.push({path:'/per_cen'});
							},1000);								
							
                        } else {
                            Toast({
                                message: '保存失败: ' + result.message,
                                position: 'bottom'
                            });
                        }
                    },(res)=>{
                        Indicator.close();
                        Toast({
                            message: '保存失败! 请稍候再试',
                            position: 'bottom'
                        });
                    });
                }else{
                    if(reg.test(this.code))
                    {
                        Indicator.open({
                            text: '保存中...',
                            spinnerType: 'fading-circle'
                        });

                        this.$http.post(
                            this.$api + "/yhcms/web/qduser/updateUser.do",
                            {"parameters":{"saleNum":this.tjperson,"gsid":this.bindcompid,"gsname":this.company,"xmname":this.project,"cookie":user22.sjs,"name":this.name,"phone":this.phone,"card":this.code,"mptp1":fp,"mptp2":fm},"foreEndType":2,"code":"2"}).then((res)=>{
                            Indicator.close();
                            var result = JSON.parse(res.bodyText);
                            if (result.success) {
                                Toast({
                                    message: '保存成功',
                                    position: 'bottom',
                                    duration: 1000
                                });
								if(that.sm == 0){
									setTimeout(function(){
		                                that.$router.push({path:'/channel_list'});
		                            },1000);
								}else{
									setTimeout(function(){
									    that.$router.push({path:'/per_cen'});
									},1000);									
								}
									
                            } else {
                                Toast({
                                    message: '保存失败: ' + result.message,
                                    position: 'bottom'
                                });
                            }
                        },(res)=>{
                            Indicator.close();
                            Toast({
                                message: '保存失败! 请稍候再试',
                                position: 'bottom'
                            });
                        });
                    }else{
                        Toast({
                            message: '身份证输入不合法',
                            position: 'bottom',
                            duration: 1000
                        });
                        return false;
                    }
                }

            },
            chang_phone(){
                this.$router.push({path:'/chang_phone'});
            },
            real_name_auth(){
                this.$router.push({path:'/real_name_auth'});
            },
            /*图片上传压缩*/
           /* add_img1(event){
                const images = event.target.files;
                let len = images.length;
                len = Math.min(len, 8 - this.fy);
                for(let i = 0; i < len; ++i){
                    this.append_img(images[i]);
                }
            },*/
            getInitData(){
                this.$http.post(
                    this.$api + "/yhcms/web/qduser/getQdCompany.do",{
                    "companyName": this.company
                }).then((res)=> {
                    Indicator.close();
                    const qdData=JSON.parse(res.bodyText).data;
                    this.companyList = qdData;
                }, (res)=>{
                    Indicator.close();
                });
                this.qdid = 0;
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
                        const data1 = JSON.parse(res.bodyText).data.mppic1;
                        const data2 = JSON.parse(res.bodyText).data.mppic2;
                        this.name = data.name;
                        this.phone = data.phone;
                        this.bindcompid = data.gsid;
                        this.company = data.gsname;
                        this.companyId = this.bindcompid;
                        this.project = data.xmname;
                        this.code = data.card;
                        this.imgList = data1;
                        this.fmList = data2;
                        this.il = this.imgList.length;
                        this.fl = this.fmList.length;
                        if(data.saleName == ''){
                            //邀请码是输入状态
                        }else{
                            this.tjperson = data.saleName;
                            $('input[name=yqma]').attr('readonly','readonly');
                        }
                        this.statu = data.status2;
                    }else{
                        Toast({
                            message: result.message,
                            position: 'bottom',
                            duration: 1000
                        });
                    }
                    $('title').html("个人信息");
                }, (res)=>{
                    Indicator.close();
                });
            },
            fanhui(){
                window.history.go(-1);
            },
        },
        mounted(){
            this.getInitData();
        }
    }

</script>
