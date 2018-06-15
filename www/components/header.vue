<style lang="less">
  @import "../resources/css/reset.less";
  @import "../resources/css/color.less";
  @import "../resources/css/base.less";
  @import "../resources/css/website/list2.less";

  [header]{
    .mint-popup{
      width:100%;
      position: fixed;
      left:0;
      top:0;
    }
    .headback{
      background: url("../resources/images/left_list/headback.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .news{
  	position: relative;
  	top: 50%;
  	margin-top: -0.2rem;
    display:block;
    width:0.43rem;
    height:0.4rem;
    float:right;
    margin-right:0.52rem;
    /*border: 1px solid #fff;*/
    img{
    	width: 100%;
    	vertical-align: inherit;
    }
    .newcount{
			position: absolute;
			top: -0.165rem;
			right: -0.2rem;
			width: 0.33rem;
			height: 0.33rem;
      text-align: center;
			background: url(../resources/images/news/point.png) no-repeat center;
			background-size: cover;
			line-height: 0.33rem;
      display: flex;
      justify-content: center;
			i{
				text-align: center;
				color: #fff;
			}
    }
  }
  .news:link{
  	background: url(../resources/images/news/new_ion.png) no-repeat center;
  	background-size: cover;
  }
  .news:active{
  	background: url(../resources/images/news/new_ion1.png) no-repeat center;
  	background-size: cover;
  }
  #header{
  	line-height: inherit;
  }
</style>
<template>
  <div header>
    <!--header start-->
    <header id="header" class="clearfix">
      <label class="side_nav side-nav" @click.native="popupVisible= true"  v-on:click="showMenu">
        <img src="../resources/images/ys_more.png" width="20" alt="">
      </label>
      <!--消息通知-->
      <a href="javascript:;" class="news" v-show="newshow" @click="tonews">
      	<span class="newcount" v-if='newData.length != 0 && status != 0'><i style="display: inline-block;transform: scale(0.5);">{{status}}</i></span>
      </a>
      
      <!--<a href="javascript:;" class="detail-search" style="position: fixed;left: 0; top: 0">
        <input type="text" id="keyword" placeholder="请输入关键字搜索" v-model="para.search_keywork" maxlength="50"
               @focus="changeRou">
      </a>-->
      <router-view></router-view>
    </header>
    <mt-popup v-model="popupVisible" position="left" class="mint-popup-3" :modal="false">
      <!--左侧登录div-->
      <div class="main-nav-wrapper sidenav" style="position:absolute;background-color: rgb(233,239,247) !important;width: 60%;">
        <div class="user-box clearfix">
          <div class="mb20 headback" style="height: 4rem;">
            <div style="padding-top:.6rem;padding-left: 1.6rem;">
              <img style="margin:0rem !important;" id="headimg" class="portrait" src="../resources/images/left_list/headback_head.png" alt="">
            </div>
            <div v-if="userif" class="tc" style="margin-top: 0.2rem;font-size:0.4rem">{{username}}</div>
            <div v-else class="tc" style="margin-top: 0.2rem;font-size:0.4rem" @click="denglu"><a href="javascript:;">立即登录</a></div>
          </div>
          <div style="height: 6rem;background-color: rgb(233,239,247);">
            <div class="ys_function tc" style="background-color: rgb(255,255,255);margin-top: -0.4rem;">
              <!--<router-link :to="{path:'/list2'}" id="first_list_link">精选房源</router-link>-->
              <div style="height: 1rem;margin-left: 0.4rem;border-bottom: 1px solid rgb(167,196,223);border-collapse:collapse;">
                <span style=""><img style="float: left;width: 0.5rem;height: 0.48rem;margin-top: 0.25rem;" src="../resources/images/left_list/house.png"></span>
                <a href="javascript:;" style="color: black !important;width: 2rem;font-size: 0.38rem;" @click="house">精选房源</a>
              </div>
              <div style="height: 1rem;margin-left: 0.4rem;border-bottom: 1px solid rgb(167,196,223);">
                <span style=""><img style="float: left;width: 0.5rem;height: 0.48rem;margin-top: 0.25rem;" src="../resources/images/left_list/select.png"></span>
                <a href="javascript:;" style="color: black !important;width: 2rem;font-size: 0.38rem;" @click="select">今日销控</a>
              </div>
              <div style="border-bottom: 1px solid rgb(167,196,223);">
                <div style="height: 1rem;margin-left: 0.4rem;">
                  <span style=""><img style="float: left;width: 0.5rem;height: 0.48rem;margin-top: 0.25rem;" src="../resources/images/left_list/list.png"></span>
                  <a href="javascript:;" style="color: black !important;width: 2rem;font-size: 0.38rem;" @click="list">楼盘列表</a>
                </div>
              </div>
              <div style="border-bottom: 1px solid rgb(167,196,223);">
                <div style="height: 1rem;margin-left: 0.4rem;">
                  <span style=""><img style="float: left;width: 0.38rem;height: 0.5rem;margin-top: 0.25rem;" src="../resources/images/left_list/price_list.png"></span>
                  <a href="javascript:;" style="color: black !important;width: 2rem;font-size: 0.38rem;" @click="yjlist">佣金展示</a>
                </div>
              </div>


            </div>
            <div style="background-color:rgb(255,255,255);border-bottom: 1px solid rgb(167,196,223);height: 1rem;margin-top: 0.3rem;">
              <div style="margin-left: 0.4rem;" class="tc ys_function">
                <span style=""><img style="float: left;width: 0.5rem;height: 0.48rem;margin-top: 0.25rem;" src="../resources/images/left_list/per_cen.png"></span>
                <a href="javascript:;" style="color: black !important;width: 2rem;font-size: 0.38rem;" @click="percent">个人中心</a>
              </div>
            </div>
          </div>
        </div>
        <div style="position: relative;bottom: 0rem;left: -0.2rem;height: 2rem;" v-show="tuichu">
          <a href="javascript:;" class="log_out_btn" style="width: 4rem;" @click="login_out()">退出登录</a>
        </div>
      </div>
    </mt-popup>
  </div>
  <!--header end-->
</template>
<script type="text/babel">
import axios from 'axios';
  import $ from 'jquery';
  import {Indicator} from 'mint-ui';
  export default {
    data() {
      return {
        popupVisible: false,
          tuichu:false,
          username:"",
          userif:false,
          para: {
              "search_keywork": "",
          },
          head:"",
          newshow:true,
          userid:'',//用户id
          newData:[],//消息通知数据
          status:0,
      };
    },
    created(){
    	if(this.$route.query.news==false){
    		this.newshow = this.$route.query.news;    		
    	}else{
    		this.newshow = true;
    	}
    	if(location.hash.indexOf('/select') == 1){
    		this.newshow = false;
    	}
      this.takeid();
    },
    methods: {
      takeid(){//获取用户id
        var cookxs = JSON.parse(localStorage.getItem('cooknx'));
        console.log(cookxs);
//        const url = "http://116.62.68.26:8080/yhcms/web/qdyongjin/getLoginInfo.do";
        const url = this.$api + "/yhcms/web/qdyongjin/getLoginInfo.do";
        axios.post(url,{
          "cookie":cookxs,
          "ptype":2
             }).then((res)=>{
                if(res.data.success){
    //            console.log(res.data.data.userid)
                  this.userid = res.data.data.userid
                  this.takenews();
                }else{
                  return;
                }
              }, (err)=>{
          console.log(err);
              });
      },
      takenews(){//接收消息
        const url = "http://erp.youshikongjian.com/receiveMessage/"+ this.userid + "/sys/qd";//消息接口地
//      const url = "http://beta.youshikongjian.com/receiveMessage/"+ this.userid + "/sys/qd";//消息接口地
        axios.get(url, {
          
        }).then((res)=>{
  //        clearInterval(timer);//清楚定时器
          if(res.data.success){
            this.newData = res.data.data;
            for(var i=0; i<this.newData.length; i++){
              if(this.newData[i].status == 0){
                this.status ++;
              }
            }
            console.log(this.status);
  //          var timer = setTimeout(this.takenews,2000);//定时查询
          }       
              }, (err)=>{
          console.log(err);
              });
      },
      init(){
          this.para.search_keywork = this.$route.query.keyword;
      },
      changeRou: function () {
          this.$router.push({path: '/search?rt=index'})
      },
      showMenu: function () {
        this.popupVisible = true;
        var wwd = $("#section").width();
        if (!wwd) {
          wwd = $(".section").width();
        }
        var wgd = $(window).height() + 50;
        $("body").prepend('<div id="zhezhao"></div>');
        $("#zhezhao").css({
          width: "" + wwd + "px",
          height: "" + wgd + "px",
          "background-color": "#000",
          "z-index": "1200",
          opacity: "0.5",
          position: "absolute",
          top: "0px",
          left: "0px"
        });
        $(".sidenav").css("left", "-100%");
        $(".sidenav").show();
        $("#zhezhao").animate({
          left: "60%"
        }, 150);
        $("#zhezhao").animate({
          backgroundColor: "#000000"
        }, 150);
        $(".sidenav").animate({
          left: "0"
        }, 150, function () {
          $('html').css({'height': '100%', 'overflow': 'hidden'});
          $('body').css({'height': '100%', 'overflow': 'hidden'});
          $("#zhezhao").on("click",
            function () {
              $('.sidenav').animate({
                left: '-100%'
              }, 150, function () {
                $('.sidenav').hide();
              });
              $("#section").animate({
                left: '0'
              }, 150);
              $(".section").animate({
                left: '0'
              }, 150);
              this.popupVisible = false;
              $("#zhezhao").remove();
              $('html').removeAttr("style");
              $("body").removeAttr("style");
            }
          )
        });
        $("#section").animate({
          left: "60%"
        }, 150);
        $(".section").animate({
          left: "60%"
        }, 150);
      },
      house(){
          if(window.location.href.indexOf("house") != -1){
              $('.sidenav').animate({
                  left: '-100%'
              }, 150, function () {
                  $('.sidenav').hide();
              });
              $("#section").animate({
                  left: '0'
              }, 150);
              $(".section").animate({
                  left: '0'
              }, 150);
              this.popupVisible = false;
              $("#zhezhao").remove();
              $('html').removeAttr("style");
              $("body").removeAttr("style");
              this.$router.push({
                path:'/house',
                query:{
                  "news":true//所传参数
                }
              });
          }else{
              $("#zhezhao").remove();
              $('html').removeAttr("style");
              $("body").removeAttr("style");
              this.$router.push({
                path:'/house',
                query:{
                  "news":true//所传参数
                }
              });
          }
          localStorage.removeItem("xzfystatus1");

      },
      select(){
          if(window.location.href.indexOf("select") != -1){
              $('.sidenav').animate({
                  left: '-100%'
              }, 150, function () {
                  $('.sidenav').hide();
              });
              $("#section").animate({
                  left: '0'
              }, 150);
              $(".section").animate({
                  left: '0'
              }, 150);
              this.popupVisible = false;
              $("#zhezhao").remove();
              $('html').removeAttr("style");
              $("body").removeAttr("style");
              this.$router.push({
                path:'/select',
                query:{
                  "news":false//所传参数
                }
              });
          }else{
              $("#zhezhao").remove();
              $('html').removeAttr("style");
              $("body").removeAttr("style");
              this.$router.push({
                path:'/select',
                query:{
                  "news":false//所传参数
                }
              });
          }
          localStorage.removeItem("xzfystatus1");
      },
      list(){
        if(window.location.href.indexOf("list") != -1 || window.location.href.indexOf("index") != -1 || window.location.href.lastIndexOf("/") != -1){
            $('.sidenav').animate({
                left: '-100%'
            }, 150, function () {
                $('.sidenav').hide();
            });
            $("#section").animate({
                left: '0'
            }, 150);
            $(".section").animate({
                left: '0'
            }, 150);
            this.popupVisible = false;
            $("#zhezhao").remove();
            $('html').removeAttr("style");
            $("body").removeAttr("style");
            this.$router.push({
              path:'/',
              query:{
                  "news":true//所传参数
                }
            });
        }else{
            $("#zhezhao").remove();
            $('html').removeAttr("style");
            $("body").removeAttr("style");
            this.$router.push({
              path:'/',
              query:{
                  "news":true//所传参数
                }
            });
        }
        localStorage.removeItem("xzfystatus1");
      },
      yjlist(){//渠道佣金列表
      	this.$store.state.tabzt = 0;//tab切换状态
				this.$store.state.page1 = 1;//当前页
				this.$store.state.page = 1;//当前页
				this.$store.state.datas = '';//数据
				this.$store.state.datas1 = '';//数据
      	 
         if(localStorage.getItem('cooknx')){
              $("#zhezhao").remove();
              $('html').removeAttr("style");
              $("body").removeAttr("style");
              this.$router.push({path:'/channel_list'});
          }else{
              $("#zhezhao").remove();
              $('html').removeAttr("style");
              $("body").removeAttr("style");
              this.$router.push({path:'/login'});
              return;
          }
      	
      	// this.$router.push({path:'/channel_list'});
      },
      percent(){
        $("#zhezhao").remove();
        $('html').removeAttr("style");
        $("body").removeAttr("style");
        localStorage.removeItem("xzfystatus1");
        this.$router.push({path:'/per_cen'});
      },

      modify_pwd(){
          $("#zhezhao").remove();
          $('html').removeAttr("style");
          $("body").removeAttr("style");
          this.$router.push({path:'/modify_pwd'});
      },
      login_out(){
          const url = this.$api + "/yhcms/web/qduser/loginOut.do";
          const user22 = JSON.parse(localStorage.getItem('cooknx'));
          let that = this;
          this.$http.post(url,{"cookie":user22.sjs,"foreEndType":2,"code":"10"}).then((res)=>{
              Indicator.close();
              const data = JSON.parse(res.bodyText).success;
              if(data){
                  //左侧啦导航栏隐藏
                  $('.sidenav').animate({
                      left: '-100%'
                  }, 150, function () {
                      $('.sidenav').hide();
                  });
                  $("#section").animate({
                      left: '0'
                  }, 150);
                  $(".section").animate({
                      left: '0'
                  }, 150);
                  this.popupVisible = false;
                  $("#zhezhao").remove();
                  $('html').removeAttr("style");
                  $("body").removeAttr("style");

                  //$('html').css({'height': 'auto', 'overflow': 'auto'});
                  localStorage.removeItem('cooknx');
                  localStorage.removeItem('usernx');
                  localStorage.removeItem('nxhead');
                  localStorage.removeItem("xzfystatus1");
                  //this.$router.push({path:'/login'});
                  location.reload();
              }else{
                  Toast({
                      message: '系统异常，请稍后再试!',
                      position: 'middle',
                      duration: 3000
                  });
              }
          }, (res)=>{
              Indicator.close();
          });
      },
      denglu(){
          this.$router.push({path:'/login'});
          //去掉遮罩层且删除html的style样式
          $("#zhezhao").remove();
          $('html').removeAttr("style");
          $("body").removeAttr("style");
          localStorage.removeItem("xzfystatus1");
      },
      tonews(){
      	
      	if(localStorage.getItem('cooknx')){
	      	this.$router.push({
						path:'/news',//跳转到消息列表
	//					query:{
	//						"zhid":id//所传参数
	//					}
					})
      	}else{
      		this.$router.push({path:'/login'});
          return;
      	}
      }
    },
    mounted: function () {
      var _this = this;

      if(localStorage.getItem('usernx')){
          this.userif = true;
          this.tuichu = true;
          let user = JSON.parse(localStorage.getItem('usernx'));
          this.username = user;
          $('#first_list_link').click(function(){
              $("#zhezhao").remove();
          });
      }else{
          this.userif = false;
          this.tuichu = false;
          $('#first_list_link').click(function(){
              $("#zhezhao").remove();
          });
      }
      if(localStorage.getItem('nxhead')){
          //获取微信的头像
          let head1 = JSON.parse(localStorage.getItem('nxhead'));
          if(head1 != ""){
              console.log(head1);
              $('#headimg').attr('src',head1);
          }
      }else{


      }


    }
  };
</script>
