<script src="../../../omcxsxxlr/www/main.js"></script>
<style scoped lang="less">
  @import "../resources/css/website/list.less";
  .page-infinite-loading {
    text-align: center;
    background-color: #FFF;
    & > span {
      display: inline-block;
    }
  }

.ys_item_con{margin-bottom:0.3rem}
.price-bot input{height:100% !important;width:30% !important}
.price-bot button{position:static !important;width:2rem !important;height:0.8rem !important}
.btn{float:left;width:50%;text-align:center}
.special{padding-left:0 !important}
.special .ys_item_con{display:block;width:100%}
.bg-white li{border-bottom:none !important}
.box-flex1{border-bottom:1px solid rgb(232, 232, 232);}
.bg_gray {
  padding: .3rem .02rem;
  height: auto !important
}
.supply_house{width:100% !important}
.supply_msg_box dd.supply_house{font-size:.3rem !important}
.supply_price{top:.79rem !important}
.supply_price > span{color:red;font-size:.4rem}
.supply_color{min-height:.32rem}
.ys_tit{line-height:0.8rem}
.ys_tag {
  display: inline-block;
  padding: 0 .25rem;
  height: .55rem;
  line-height: .55rem;
  background-color: #dbdadf;
  font-size: 0.24rem;
  margin-right: .08rem;
  margin-bottom: .08rem;
  border-radius: .1rem;
}
.active {
  background-color: #16abdc !important;
  color: #fff !important;
}
.supply_msg_box > dl > dd:not(:last-child){padding-bottom:.13rem}
.supply_msg_box > dl > dd:last-child > dl > dd:not(:last-child){padding-bottom:.17rem}
#filter-features{height:6rem;overflow-y:scroll}
#filter-features .warpper:last-child{margin-bottom:0.5rem}
.supply_msg_box dd.supply_house{margin-top:0 !important}
.hilight a{color:#476CBA !important}
.cell > dd{float: left;margin-right: .3rem;margin-bottom: .06rem;}
.tagClass{font-size: 0.5em !important;}
.zc{background-color:#ef104e !important;color:#FFF !important;font-size: 0.5em !important;}
.dj{ background: url("../resources/images/house/dj.png") no-repeat;background-size: 100% 100%;background-color: white !important;}
.fuc{width: 1rem;height: 1rem;-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: 50px;background-color: rgb(255,101,0);margin: auto;display: flex;justify-content: center;align-items: center;}
.wacfc{width:1.3rem;height:1.3rem;-moz-border-radius: 50px;-webkit-border-radius: 50px;border-radius: 50px;position: fixed;bottom:2rem;right:0.2rem;background-color: rgb(255,191,142);
  display: flex;//是将布局变为弹性布局
  align-items: center;//垂直居中
  justify-content: center;//水平居中
}
</style>
<template>
  <div>
    <!--header-->
    <section id="header">
      <header1></header1>
    </section>
    <a href="javascript:;" class="detail-search" style="position: fixed;left: 0; top: 0;border-radius: 0.1rem;">
      <input type="text" id="keyword" placeholder="请输入楼盘关键字搜索" v-model.trim="para.search_keywork" maxlength="50"
             @focus="changeRou">
    </a>
    <section class="section"
             :class="{'in-filter':this.currentFilterTab=='district'||this.currentFilterTab=='price'||this.currentFilterTab=='area'||this.currentFilterTab=='features'}">
      <div class="option">
        <div class="filtate-outter">
          <div class="list-filtrate">
            <!--筛选条件标题开始-->
            <section class="filtrate-nav">
              <ul @click="chooseFilter($event)">
                <li data-role="filterItem" data-type="district"
                    :class="{'active-filter':this.currentFilterTab=='district'}">
                  <a href="javascript:void(0);">
                    <h2 class="ellipsis district-h">位置</h2>
                    <i class="filt-arrow"></i>
                  </a>
                </li>
                <li data-role="filterItem" data-type="price" id="jgtjian">
                  <a href="javascript:void(0);" @click="setPriceFilter">
                    <h2 class="ellipsis price-h">价格</h2>
                    <i class="filt-arrow"></i>
                  </a>
                </li>
                <li data-role="filterItem" data-type="area" id="mjtjian">
                  <a href="javascript:void(0);" @click="setAreaFilter">
                    <h2 class="ellipsis area-h">面积</h2>
                    <i class="filt-arrow"></i>
                  </a>
                </li>
                <li data-role="filterItem" data-type="features"
                    :class="{'active-filter':this.currentFilterTab=='features'}">
                  <a href="javascript:void(0);">
                    <h2 class="ellipsis feature-h">筛选</h2>
                    <i class="filt-arrow"></i>
                  </a>
                </li>
              </ul>
            </section>

            <div class="wacfc" v-if="xzfystatus == ''" @click="yzfydj">
              <div class="fuc">
                <div style="color: white;">预租<br/>房源</div>
              </div>
            </div>
            <div class="wacfc" v-else @click="yzfydj">
              <div class="fuc">
                <div style="color: white;">精选<br/>房源</div>
              </div>
            </div>
            <!--筛选条件标题结束-->

            <!--筛选条件内容start-->
            <div class="filt-container">
              <div class="filt-open" id="filter-district" :class="{show:this.currentFilterTab=='district'}">
                <div class="warpper box-flex1 grey-bg price-height">
                  <ul>
                    <li class="price-sub" :class="{act:this.positionType=='a'}" @click="positionType='a';curTab=''">
                      <a href="javascript:void(0);" style="color: #302F35;">行政区域</a>
                    </li>
                    <li class="price-sub" :class="{act:this.positionType=='y'}" @click="positionType='y';curTab=''">
                      <a href="javascript:void(0);" style="color: #302F35;">业务区域</a>
                    </li>
                    <li class="price-sub" :class="{act:this.positionType=='l'}" @click="positionType='l';curTab=''">
                      <a href="javascript:void(0);" style="color: #302F35;">地铁</a>
                    </li>
                    <div id="position_filter" class="warpper2 box-flex1 bg-white" :class="{choose:this.curTab=='a'||this.curTab=='l'||this.curTab=='y'}">
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='a'}">
                        <li data-type="positionA" @click="where='不限';subBuesiness=[];searchChoose('','','不限', $event)"><a href="javascript:;">不限</a></li>
                        <li v-for="item in govDistrictArray" data-type="positionA" :class="{hilight:item.fdcode==his.ercode}"
                            @click="searchSubArea(item.fdcode, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='y'}">
                        <li data-type="positionY" @click="where='不限';otherBusiness=[];searchChoose('','','不限', $event)"><a href="javascript:;">不限</a></li>
                        <li v-for="item in districtArray" data-type="positionY" :class="{hilight:item.id==his.ercode}"
                            @click="searchArea(item.id, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='l'}">
                        <li data-type="positionL" @click="where='不限';stationArray=[];searchChoose('','','不限', $event)"><a href="javascript:;">不限</a></li>
                        <li v-for="item in lineArray" data-type="positionL" :class="{hilight:item.id==his.ercode}"
                            @click="searchStation(item.id, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                    </div>

                    <div id="third-tab" class="warpper2 box-flex1 bg-white" :class="{show:this.curTab!=''&&this.thirdpart!=''}">
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='a'}">
                        <li v-for="item in subBuesiness" data-type="positionA" :class="{hilight:item.fdcode==his.sancode}"
                            @click="searchChoose(item.fdcode,'',item.fdname, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='y'}">
                        <li v-for="item in otherBusiness" data-type="positionY" :class="{hilight:item.id==his.sancode}"
                            @click="searchChoose(item.id,'',item.fdname, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                      <ul class="price-ul cut-height" :class="{show:this.curTab!=''&&this.thirdpart=='dt'}">
                        <li v-for="item in stationArray" data-type="positionL" :class="{hilight:item.id==his.sancode}"
                            @click="searchChoose(item.id,'',item.fdname, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                    </div>
                  </ul>
                </div>
              </div>

              <div class="filt-open" id="filter-features" :class="{show:this.currentFilterTab=='features'}">
                <div class="warpper box-flex1">
                  <ul class="box-flex1 bg-white cut-height">
                    <li class="clearfix">
                      <span class="ys_tit">面积(平米)：</span>
                    </li>
                    <li class="clearfix bg_gray">
                      <div class="ys_item_con fl">
                        <span v-for="a in areaArray" class="ys_tag" :class="{'active':areaTag===a || a==areasta}" :value="a" target="area" @click="selectTag($event)">{{a !== "-1" ? a + "㎡" : "不限"}}</span>
                      </div>
                      <div class="ys_item_con fl">
                        <div class="price-bot">
                          <input type="number" @focus="filterFocus" rel="area" id="beginArea" value="" v-model.trim="areaRange[0]" maxlength="5" placeholder="平米"><i>----</i>
                          <input type="number" @focus="filterFocus" rel="area" id="endArea" value="" v-model.trim="areaRange[1]" maxlength="5" placeholder="平米">
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="warpper box-flex1">
                  <ul class="box-flex1 bg-white cut-height">
                    <li class="clearfix">
                      <span class="ys_tit">价格：</span>
                    </li>
                    <li class="clearfix bg_gray">
                      <div class="ys_item_con fl">
                        <span v-for="a in priceArray" class="ys_tag" :class="{'active':priceTag===a || a==price}" target="price" :value="a" @click="selectTag($event)">{{a !== "-1" ? a + "元" : "不限"}}</span>
                      </div>
                      <div class="ys_item_con fl">
                        <div class="price-bot">
                          <input type="number" rel="price" @focus="filterFocus" id="beginPrice" value="" maxlength="5" placeholder="元"
                                 v-model.trim="priceRange[0]"><i>----</i>
                          <input type="number" rel="price" @focus="filterFocus" id="endPrice" value="" maxlength="5" placeholder="元" v-model.trim="priceRange[1]">
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="warpper box-flex1">
                  <ul class="box-flex1 bg-white cut-height">
                    <li class="clearfix">
                      <span class="ys_tit">产权性质：</span>
                    </li>
                    <li class="clearfix bg_gray">
                      <div class="ys_item_con fl">
                        <span v-for="a in chqxz" class="ys_tag" :class="{'active':xzTag.indexOf(a) > -1 || xztagasta.indexOf(a) > -1}" :id="a" @click="pickTag($event)">{{a}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="warpper box-flex1 filter-fixed">
                  <ul class="box-flex1 bg-white cut-height">
                    <li class="clearfix bg_gray special">
                      <div class="ys_item_con fl">
                        <div class="price-bot btn">
                          <button rel="reset" @click.stop="setFilter($event)">重置</button>
                        </div>
                        <div class="price-bot btn">
                          <button rel="confirm" @click.stop="setFilter($event)">确定</button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--筛选条件内容end-->
          </div>
        </div>

        <!--筛选框fixed时替代div-->
        <div  id="pos_block"></div>

        <!--筛选结果start-->
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="100"
          infinite-scroll-immediate-check="checked" id="zhezcly">
          <li class="ys_listcon pv15" v-for="item in resultData">
            <router-link :to="{path:'order',query:{house_id:item.id}}" @click.native="jiyishuj" class="supply_box">
              <div class="supply_price">
                <span>{{item.daily_price === '0.0' ? '' : item.daily_price}}</span> 元/㎡·天
              </div>
              <dl class="supply">
                <dt>
                  <img v-if="item.housing_icon" :src="$prefix + '/' + item.housing_icon" :alt="item.img_alt">
                  <img v-else :src="$prefix + '/upload/2017-08-27/6404b4de960b81fc5403c870aefcea34.png'" :alt="item.img_alt">
                </dt>
                <dd class="supply_msg_box">
                  <dl>
                    <dd v-if="item.zdh.indexOf('独栋') > -1" class="supply_house">{{item.topic}}&nbsp;&nbsp;<label v-if="item.decoration_level == '预租房'">即将上线</label><label v-else>{{item.fybh}}</label></dd>
                    <dd v-else class="supply_house">{{item.topic}}&nbsp;&nbsp;<label v-if="item.decoration_level == '预租房'">即将上线</label><label v-else>{{item.zdh}} - {{item.fybh}}</label></dd>
                    <dd class="supply_color ellipsis">{{item.district}}</dd>
                    <dd>
                      <dl class="cell clearfix" style="width: 5rem;">
                        <dd>{{item.housing_area === '0.0' ? '': item.housing_area}}㎡</dd>
                        <dd v-if="item.decoration_level == '预租房'"></dd><dd v-else-if="item.lc">{{item.lc}}层</dd>
                        <dd v-if="item.decoration_level" class="tagClass zc" style="font-size: 0.22rem !important;padding: 0.03rem;">{{item.decoration_level}}</dd>
                        <dd v-if="item.djbsh" class="tagClass zc dj" style="font-size: 0.22rem !important;padding: 0.03rem;">{{item.djbsh}}</dd>

                        <dd v-if="item.topic == '嘉盛中心' && item.zdh == '独栋' && item.fybh == 0506" style="position: absolute;z-index: 12;left:0.05rem;width: 0.4rem;bottom:15px;"><img src="../resources/images/house/3d.png" width="100%" height="100%"></dd>
                        <dd v-if="item.topic == '建外SOHO' && item.zdh == 2 && item.fybh == 705" style="position: absolute;z-index: 12;left:0.05rem;width: 0.4rem;bottom:15px;"><img src="../resources/images/house/3d.png" width="100%" height="100%"></dd>
                        <dd v-if="item.topic == '天元港中心' && item.zdh == 'B' && item.fybh == 1805" style="position: absolute;z-index: 12;left:0.05rem;width: 0.4rem;bottom:15px;"><img src="../resources/images/house/3d.png" width="100%" height="100%"></dd>
                        <dd v-if="item.topic == '建外SOHO' && item.zdh == 3 && item.fybh == 2103" style="position: absolute;z-index: 12;left:0.05rem;width: 0.4rem;bottom:15px;"><img src="../resources/images/house/3d.png" width="100%" height="100%"></dd>
                        <dd v-if="item.topic == '建外SOHO' && item.zdh == 10 && item.fybh == 904" style="position: absolute;z-index: 12;left:0.05rem;width: 0.4rem;bottom:15px;"><img src="../resources/images/house/3d.png" width="100%" height="100%"></dd>
                        <dd v-if="item.topic == '建外SOHO' && item.zdh == 12 && item.fybh == 2706" style="position: absolute;z-index: 12;left:0.05rem;width: 0.4rem;bottom:15px;"><img src="../resources/images/house/3d.png" width="100%" height="100%"></dd>

                      </dl>
                    </dd>
                  </dl>
                </dd>
              </dl>
            </router-link>
          </li>
        </ul>
        <p v-if="loading" class="page-infinite-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
        </p>
      </div>
      <div class="mask" id="maskEl" @click="closeFilter"
           :class="{show:this.currentFilterTab=='district'||this.currentFilterTab=='features'}">
      </div>
    </section>
  </div>
</template>
<script>
  import header1 from '../components/header.vue';
  import footer1 from '../components/footer.vue';
  import {Indicator} from 'mint-ui';
  import {InfiniteScroll} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import {MessageBox} from 'mint-ui';
  import {Actionsheet} from 'mint-ui';
  import {Search} from 'mint-ui';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    components: {
      header1,
      footer1,
      InfiniteScroll,
      Toast,
      Actionsheet,
      Search
    },
    data () {
      return {
        hist:{},
        his:'',
        er:'',
        xzfystatus:'',
        districtArray: [],
        govDistrictArray: [],
        lineArray:[],
        subBuesiness:[],
        otherBusiness:[],
        stationArray:[],
        priceFilter: "",
        areaFilter: "",
        areaArray:["-1", "<100", "100-299", "300-499", "500-599", "1000-1499", ">1500"],
        priceArray:["-1", "<3", "3-4.9", "5-7.9", "8-9.9", "10-14.9", ">=15"],
        featureArray: [],
        //chqxz: ["写字楼","公寓","商务楼","住宅","商业","酒店","综合","别墅","商业综合体","酒店式公寓"],
        chqxz: ["写字楼","公寓","商务楼","商业"],
        priceTag: "",
        areaTag: "",
        xzTag: [],
        priceRange: ["", ""],
        areaRange: ["", ""],
        xztagasta:[],
        curTab:'',
        thirdpart:'',
        currentFilterTab: 'nth',
        priceFilterTab: 'p',
        positionType:'a',
        loading: false,
        noMore: false,
        checked: false,
        areasta:'',
        price:'',
        status:'',
        para: {
          "search_keywork": "",
          "district": "",
          "business": "",
          "district1": "",
          "business1": "",
          "line_id": "",
          "station_id": "",
          "area": "",
          "price_dj": "",
          "label": "",
          "chqxz": "",
          "orderby": "D",
          "curr_page": 1,
          "items_perpage": 10,
        },
        resultData: [],
        resultData1: []
      }
    },
    mounted(){
      if(localStorage.getItem("xzfystatus1")){
          this.xzfystatus = localStorage.getItem("xzfystatus1").replace("\"","").replace("\"","");
      }
      if(localStorage.getItem("fhdata1") && localStorage.getItem("xzqv")){
              this.resultData = localStorage.getItem("fhdata1");
              this.para.district = localStorage.getItem("xzqv").replace("\"", "").replace("\"", "");
              this.para.business = localStorage.getItem("sq").replace("\"", "").replace("\"", "");
              this.para.district1 = localStorage.getItem("ywqv").replace("\"", "").replace("\"", "");
              this.para.business1 = localStorage.getItem("fq").replace("\"", "").replace("\"", "");
              this.para.line_id = localStorage.getItem("xl").replace("\"", "").replace("\"", "");
              this.para.station_id = localStorage.getItem("zd").replace("\"", "").replace("\"", "");
            /*if(this.para.district == '' && this.para.business == '' && this.para.district1 == '' && this.para.business1 == '' && this.para.line_id == '' && this.para.station_id == ''){
              alert(5555);

          }else{
              alert(6666);
              this.searchArea();
              this.searchChoose();
          }*/
              this.para.area = localStorage.getItem("mj").replace("\"", "").replace("\"", "");


              if(localStorage.getItem("price")){
                /*对于缓存的判断时要考虑他的双重引号*/
                  this.price = JSON.parse(localStorage.getItem("price"));
                /*localStorage.removeItem("price");*/
          }
              if(localStorage.getItem("areasta")){
                /*对于缓存的判断时要考虑他的双重引号*/
                  this.areasta = JSON.parse(localStorage.getItem("areasta"));
                /* localStorage.removeItem("areasta");*/
          }


              this.para.price_dj = localStorage.getItem("jg").replace("\"", "").replace("\"", "");
              this.para.chqxz = localStorage.getItem("chqxz").replace("\"", "").replace("\"", "");
              this.priceFilter  = localStorage.getItem("px").replace("\"", "").replace("\"", "");


              this.xzfystatus = localStorage.getItem("xzfystatus").replace("\"", "").replace("\"", "");
              if(localStorage.getItem("hist")){
                  this.his = JSON.parse(localStorage.getItem("hist"));
                  this.positionType = this.his.yicode;
                  this.thirdpart = this.his.sicoole;
                  this.curTab = this.his.wucoole;
                  if(this.positionType == "a"){
                      this.searchSubAreafh(this.his.ercode);
              }
                  else if(this.positionType == "y"){
                  this.searchAreafh(this.his.ercode);
              }else{
                  this.searchStationfh(this.his.ercode);
              }
                /*localStorage.removeItem("hist");*/
          }
          if(localStorage.getItem("jgtjian")){
              if(localStorage.getItem("jgtjian") == 1){
                  this.setPriceFilterfh();
              }
              if(localStorage.getItem("jgtjian") == 2){
                  this.setAreaFilterfh();
              }
              /*localStorage.removeItem("jgtjian");*/
          }
          if(localStorage.getItem("xztagasta")){

              this.xztagasta = localStorage.getItem("xztagasta").replace("\"","").replace("\"","");
              /*localStorage.removeItem("xztagasta");*/
          }
        /*取出缓存中的数组*/
        if(localStorage.getItem("areaRange")){
            this.areaRange  = JSON.parse(localStorage.getItem("areaRange"));
          /*localStorage.removeItem("areaRange");*/
        }
        if(localStorage.getItem("priceRange")){
            this.priceRange  = JSON.parse(localStorage.getItem("priceRange"));
           /* localStorage.removeItem("priceRange");*/
        }







          var topsl = localStorage.getItem("topsj1");
          //$("body,html").scrollTop(topsl);
          $('body,html').animate({scrollTop:topsl},2);//设置距离上面顶部的距离
          //$("document").scrollTop(topsl);
          this.resultData = JSON.parse(this.resultData);
          localStorage.removeItem("fhdata1");
          localStorage.removeItem("topsj1");
          this.getFilters();
          this.para.curr_page = localStorage.getItem("page1");
          this.para.curr_page = parseInt(this.para.curr_page);
          localStorage.removeItem("page1");
          localStorage.removeItem("xzqv");
          localStorage.removeItem("sq");
          localStorage.removeItem("ywqv");
          localStorage.removeItem("fq");
          localStorage.removeItem("xl");
          localStorage.removeItem("zd");
          localStorage.removeItem("mj");
          localStorage.removeItem("jg");
          localStorage.removeItem("chqxz");
          localStorage.removeItem("px");
      }else{
          localStorage.removeItem("price");
          localStorage.removeItem("areasta");
          localStorage.removeItem("hist");
          localStorage.removeItem("jgtjian");
          localStorage.removeItem("xztagasta");
          localStorage.removeItem("areaRange");
          localStorage.removeItem("priceRange");
          this.init();
      }
      $("body").removeAttr("style");
      $("html").removeAttr("style");
      $('title').html('房源列表');
      //下滑时，条件tab固定
      $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
          $('.filtate-outter').css({
            position: 'fixed',
            top: '.88rem',
            left: 0
          });

          $('#pos_block').show();

        } else {
          $('.filtate-outter').css({
            position: 'relative',
            top: 0,
            left: 0
          });
          $('#pos_block').hide();
        }
      });
    },
    created: function () {

    },
    computed: {
      unitword(){
        if (this.priceFilterTab === 'p') {
          return "元/天";
        } else {
          return "万元/月";
        }
      }
    },
    methods: {
      jiyishuj(){
          for(var i=0;i<this.resultData.length;i++){
              if(this.resultData[i].bsh != ''){
                  this.resultData1[i] = this.resultData[i]
              }
          }
          localStorage.setItem('fhdata1', JSON.stringify(this.resultData1));
          localStorage.setItem('topsj1', JSON.stringify($(window).scrollTop()));
          localStorage.setItem('page1', JSON.stringify(this.para.curr_page));
          localStorage.setItem('xzqv', JSON.stringify(this.para.district));
          localStorage.setItem('sq', JSON.stringify(this.para.business));
          localStorage.setItem('ywqv', JSON.stringify(this.para.district1));
          localStorage.setItem('fq', JSON.stringify(this.para.business1));
          localStorage.setItem('xl', JSON.stringify(this.para.line_id));
          localStorage.setItem('zd', JSON.stringify(this.para.station_id));
          localStorage.setItem('mj', JSON.stringify(this.para.area));
          localStorage.setItem('jg', JSON.stringify(this.para.price_dj));
          localStorage.setItem('xzfystatus', JSON.stringify(this.xzfystatus));
          localStorage.setItem('chqxz', JSON.stringify(this.para.chqxz));
          if(this.priceFilter != ''){
              localStorage.setItem('px', JSON.stringify(this.priceFilter));
          }else if(this.areaFilter != ''){
              localStorage.setItem('px', JSON.stringify(this.areaFilter));
          }else{
              localStorage.setItem('px', JSON.stringify("D"));
          }
      },

      init(){
        axios.defaults.baseURL = this.$api; 
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
        if(this.$route['query']['keyword']){
          this.para.search_keywork = this.$route['query']['keyword'];
        }
        this.resetGetData();
        this.getFilters();
      },
      yzfydj(){
          this.para.curr_page = 1;
          if(this.xzfystatus == ""){
              this.resultData = [];
              this.xzfystatus = 1;
              this.getData();
          }else{
              this.xzfystatus = "";
              this.resultData = [];
              this.getData();
          }
          localStorage.setItem('xzfystatus1', JSON.stringify(this.xzfystatus));
      },
      selectTag(e){
        const target = $(e.target), val = target.attr("value"), t = target.attr("target"), which = t ==="price" ? "priceTag" : "areaTag";
        if(t == 'area'){
            localStorage.setItem('areasta', JSON.stringify(val));
        }else if(t == 'price'){
            localStorage.setItem('price', JSON.stringify(val));
        }else{
            this.areasta = '';
            this.price = '';
        }
        const range = t ==="price" ? "price_dj" : "area";
        let final = val === "-1" ? "" : val.replace("<","0-").replace(">","").replace("=","").split("-"); 
        if(val !== "-1" && final.length < 2){
            final.push("10000");
        }
        if(val !== "-1"){
            final[0] = t === "price" ? parseFloat(final[0]) : parseInt(final[0]);
            final[1] = t === "price" ? parseFloat(final[1]) : parseInt(final[1]);
        }  
        if(which === "priceTag"){
            this.priceRange = ["",""];
        }
        else{
            this.areaRange = ["",""];
        }

        if(!val || !t){return;}
        if ($(target).hasClass('active')) {
          this[which] = val;
          this.para[range] = "";
          $(target).removeClass('active');
        } else {
          this[which] = val;
          this.para[range] = final === "" ? final : JSON.stringify(final);
          $(target).addClass('active');
          $(target).siblings().removeClass('active');
        }
      },
      pickTag(e){
        const target = $(e.target), id = target.attr("id");
        if(!id){return;}
        if ($(target).hasClass('active')) {
          let _t = new Set(this.xzTag);
          _t.delete(id);
          this.xzTag = [..._t];
          $(target).removeClass('active');
        } else {
          let _t = new Set(this.xzTag);
          _t.add(id);
          this.xzTag = [..._t];
          $(target).addClass('active');
        }
        localStorage.setItem('xztagasta', JSON.stringify(this.xzTag));
        this.para.chqxz = this.xzTag.join("、");
      },
      filterFocus(e){
          const target = $(e.target), rel = target.attr("rel");
          if(rel === "price"){
              $.each($("span[target='price']"), (idx, item)=>{$(item).removeClass("active");});
              this.para.price_dj = "";
          }
          else if(rel === "area"){
              $.each($("span[target='area']"), (idx, item)=>{$(item).removeClass("active");});
              this.para.area = "";
          }
          if(rel === "price"){

          }
      },
      setFilter(e){
        const target = $(e.target), which = target.attr("rel");
        if(which==="confirm") {
            const aa = this.areaRange[0], ea = this.areaRange[1];
            if(aa && ea && parseInt(aa) >= parseInt(ea)){
                MessageBox('提示', '面积区间填写有误。请重新填写');
                return;
            }
            else if(aa && ea){
                this.para.area = JSON.stringify([parseInt(aa), parseInt(ea)]);
            }
            const ap = this.priceRange[0], ep = this.priceRange[1];
            if(ap && ep && parseInt(parseFloat(ap) * 100) >= parseInt(parseFloat(ep) * 100)){
                MessageBox('提示', '价格区间填写有误。请重新填写');
                return;
            }
            else if(ap && ep){
                this.para.price_dj = JSON.stringify([parseInt(ap), parseFloat(ep)]);
            }
        }

        if (which === 'reset') {
            this.priceTag = "";
            this.xzTag = [];
            this.areaTag = "";
            this.priceRange = ["", ""];
            this.areaRange = ["", ""];
            this.para.price_dj = "";
            this.para.area = "";
            this.para.chqxz = "";
            this.xztagasta = [];
            this.price = "";
            this.areasta = "";
            return;
        }
        /*向缓存中存入数组*/
        localStorage.setItem('priceRange', JSON.stringify(this.priceRange));
        localStorage.setItem('areaRange', JSON.stringify(this.areaRange));
        this.priceFilter = '';
        this.areaFilter = '';
        this.resetGetData();
      },
      searchSubArea:function(code,e){
        this.curTab = "a";
        this.thirdpart = "sq";
        Indicator.open({
           text: '',
           spinnerType: 'fading-circle'
        });
        const li = $(e.target).closest("li"), txt = $(li).find("a").text();
        li.addClass("hilight").siblings().removeClass("hilight");
        this.hist.ercode = code;
        this.er = code;
        this.where = txt;
        this.hist.txt = txt;
        var paraObj = {"parameters":{"district":code},"foreEndType":2,"code":"300000010"}, this_ = this;
        axios.post('/yhcms/web/lpjbxx/getLpXzqyFq.do', paraObj)
          .then(function (response) {
            Indicator.close();
            this_.subBuesiness = [{"fdcode":code,"fdname":"不限"}].concat(response.data.data.xzfq);
          }).catch(function (error) {
            Indicator.close();
        });
      },
      searchSubAreafh:function(code){
          this.er = code;
          this.where = this.his.txt;
          $('h2.district-h').html(this.where);
          var paraObj = {"parameters":{"district":code},"foreEndType":2,"code":"300000010"}, this_ = this;
          axios.post('/yhcms/web/lpjbxx/getLpXzqyFq.do', paraObj)
              .then(function (response) {
                  Indicator.close();
                  this_.subBuesiness = [{"fdcode":code,"fdname":"不限"}].concat(response.data.data.xzfq);
              }).catch(function (error) {
              Indicator.close();
          });
      },
      searchArea:function(code,e){
        this.curTab = "y";
        this.thirdpart = "sq";
        Indicator.open({
           text: '',
           spinnerType: 'fading-circle'
        });
        const li = $(e.target).closest("li"), txt = $(li).find("a").text();
        li.addClass("hilight").siblings().removeClass("hilight");
        this.where = txt;
        this.hist.ercode = code;
        this.er = code;
        this.hist.txt = txt;
        var paraObj = {"parameters":{"district":code},"foreEndType":2,"code":"300000012"}, this_ = this;
        axios.post('/yhcms/web/lpjbxx/getLpYwqyFq.do', paraObj)
          .then(function (response) {
            Indicator.close();
            this_.otherBusiness = [{"id":code,"fdname":"不限"}].concat(response.data.data.ywfq);
          }).catch(function (error) {
            Indicator.close();
        });
      },
      searchAreafh:function(code){
          this.er = code;
          this.where = this.his.txt;
          $('h2.district-h').html(this.where);
          var paraObj = {"parameters":{"district":code},"foreEndType":2,"code":"300000012"}, this_ = this;
          axios.post('/yhcms/web/lpjbxx/getLpYwqyFq.do', paraObj)
              .then(function (response) {
                  Indicator.close();
                  this_.otherBusiness = [{"id":code,"fdname":"不限"}].concat(response.data.data.ywfq);
              }).catch(function (error) {
              Indicator.close();
          });
      },
      searchStation:function(line,e){
        this.curTab = "l";
        this.thirdpart = "dt";
        Indicator.open({
           text: '',
           spinnerType: 'fading-circle'
        });
        const li = $(e.target).closest("li"), txt = $(li).find("a").text();
        li.addClass("hilight").siblings().removeClass("hilight");
        this.hist.ercode = line;
        this.er = line;
        this.where = txt;
        if(txt != "不限"){
            this.hist.txt = txt;
        }else{
            this.hist.txt = "不限";
        }
        var paraObj = {"parameters":{"line_id":line},"foreEndType":2,"code":"30000008"}, this_ = this;
        axios.post('/yhcms/web/lpjbxx/getLpSubwaystation.do', paraObj)
          .then(function (response) {
            Indicator.close();
            this_.stationArray = [{"id":line,"fdname":"不限"}].concat(response.data.data.subway_station);
          }).catch(function (error) {
            Indicator.close();
        });
      },
      searchStationfh:function(line){
          this.er = line;
          this.where = this.his.txt;
          $('h2.district-h').html(this.where);
          var paraObj = {"parameters":{"line_id":line},"foreEndType":2,"code":"30000008"}, this_ = this;
          axios.post('/yhcms/web/lpjbxx/getLpSubwaystation.do', paraObj)
              .then(function (response) {
                  Indicator.close();
                  this_.stationArray = [{"id":line,"fdname":"不限"}].concat(response.data.data.subway_station);
              }).catch(function (error) {
              Indicator.close();
          });
      },
      setPriceFilter(e){
          const li = $(e.target).closest("li");
          $(li).addClass("hilight").toggleClass("active-filter");

          if(this.priceFilter === '' || this.priceFilter === 'P2'){
              this.priceFilter = 'P1';
          }
          else{
              this.priceFilter = 'P2';
          }
          this.areaFilter = '';
          localStorage.setItem('jgtjian',1);
          const that = this;
          setTimeout(function(){
              that.resetGetData();
          }, 500);
      },
      setPriceFilterfh(){
          $('#jgtjian').addClass("hilight");
          if(this.priceFilter == 'P1'){
              $('#jgtjian').addClass("active-filter");
          }
      },
      setAreaFilter(e){
          const li = $(e.target).closest("li");
          $(li).addClass("hilight").toggleClass("active-filter");
          if(this.areaFilter === '' || this.areaFilter === 'A2'){
              this.areaFilter = 'A1';
          }
          else{
              this.areaFilter = 'A2';
          }
          this.priceFilter = '';
          localStorage.setItem('jgtjian',2);
          const that = this;
          setTimeout(function(){
              that.resetGetData();
          }, 500);
      },
      setAreaFilterfh(){
          $('#mjtjian').addClass("hilight");
          if(this.priceFilter == 'A1'){
              $('#mjtjian').addClass("active-filter");
          }
      },
      getQueryString: function (key) {
        var t = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"),
          n = window.location.search.substr(1).match(t);
        return null != n ? decodeURI(n[2]) : "";
      },
      closeFilter: function () {
        this.currentFilterTab = 'nth';
      },
      changeRou: function () {
        this.$router.push({path: '/filter?r=house', query: {keyword33:this.para.search_keywork}})
      },
      searchChoose: function (code, val, value, e) {
        const li = $(e.target).closest('li');
        if(value == "不限"){

        }else{
            this.hist.txt = value;
        }
        li.addClass("hilight").siblings().removeClass("hilight");
        this.hist.ercode = this.er;
        this.hist.sancode = code;
        this.hist.sicoole = this.thirdpart;
        this.hist.wucoole = this.curTab;
        this.hist.yicode = this.positionType;
        localStorage.setItem('hist', JSON.stringify(this.hist));
        switch (li.attr('data-type')) {
          case 'positionA':
            //行政区域
            $('h2.district-h').html(value);
            if(value==="不限"){
                this.para.district1 = code;
                this.para.business1 = "";
                $('h2.district-h').html(this.where || value);
            }
            else{
                this.para.business1 = code;
                this.para.district1 = "";
            }
            this.para.business = "";
            this.para.district = "";

            this.para.line_id = '';
            this.para.station_id = '';
            break;
          case 'positionY':
            //业务区域
            $('h2.district-h').html(value);
            if(value==="不限"){
                this.para.district = code;
                this.para.business = "";
                $('h2.district-h').html(this.where || value);
            }
            else{
                this.para.business = code;
                this.para.district = "";
            }
            this.para.business1 = "";
            this.para.district1 = "";
            this.para.line_id = '';
            this.para.station_id = '';
            break;
          case 'positionL':
            $('h2.district-h').html(value);
            if(value==="不限"){
                this.para.line_id = code;
                this.para.station_id = "";
                $('h2.district-h').html(this.where || value);
            }
            else{
                this.para.line_id = "";
                this.para.station_id = code;
            }
            this.para.business = '';
            this.para.district = '';
            this.para.business1 = '';
            this.para.district1 = '';
            break;
          default:
            break;
        }
        this.currentFilterTab = 'nth';
        Indicator.open({
          text: '',
          spinnerType: 'fading-circle'
        });
        this.resultData = [];
        this.para.curr_page = 1;
        this.getData();
      },
      getGovDistrict(){
          Indicator.open({
             text: '',
             spinnerType: 'fading-circle'
          });
          const url = this.$api + "/yhcms/web/lpjbxx/getLpcity.do";
          let that = this;
          this.$http.post(url).then((res)=>{
            Indicator.close()
            const data = JSON.parse(res.bodyText).data;
            that.govDistrictArray = data.xzqy;
          }, (res)=>{
            Indicator.close()
          });
      },
      getDistrict(){
          Indicator.open({
             text: '',
             spinnerType: 'fading-circle'
          });
          const url = this.$api + "/yhcms/web/lpjbxx/getLpBusiness.do";
          let that = this;
          this.$http.post(url).then((res)=>{
            Indicator.close()
            const data = JSON.parse(res.bodyText).data;
            that.districtArray = data.ywqy;
          }, (res)=>{
            Indicator.close()
          });
      },
      getLines(){
          Indicator.open({
             text: '',
             spinnerType: 'fading-circle'
          });
          const url = this.$api + "/yhcms/web/lpjbxx/lpsubway.do";
          let that = this;
          this.$http.post(url).then((res)=>{
            Indicator.close()
            const data = JSON.parse(res.bodyText).data;
            that.lineArray = data.subway;
          }, (res)=>{
            Indicator.close()
          });
      },
      getFilters: function () {
        this.getGovDistrict();
        this.getDistrict();
        this.getLines();
      },
      chooseFilter: function (e) {
        var e = e || window.event;
        const li = $(e.target).closest('li');
        this.currentFilterTab = li.attr('data-type');
        $(li).siblings().removeClass("active-filter");
        $(li).siblings().removeClass("hilight");
        if(this.currentFilterTab=='features' || this.currentFilterTab=='district'){
            this.areaFilter = '';
            this.priceFilter = '';
            localStorage.removeItem("jgtjian");
        }
      },
      resetGetData: function () {
        this.noMore = false;
        this.loading = false;
        $("#zhezhaoc").remove();
        this.para.curr_page = 1;
        this.resultData = [];

        Indicator.open({
           text: '',
           spinnerType: 'fading-circle'
        });
        this.getData();

        Indicator.close();
      },
      getData(){
        const paraObj = {
          "parameters": {
            "search_keywork": this.para.search_keywork,
            "district": this.para.district,//行政区域
            "business": this.para.business,//商圈
            "district1": this.para.district1,//业务区域
            "business1": this.para.business1,//分区
            "line_id": this.para.line_id,//线路
            "station_id": this.para.station_id,//站点
            "area": this.para.area,//面积
            "price_dj": this.para.price_dj,//价格
            "label": this.para.label,
            "chqxz": this.para.chqxz,//产权性质
            "orderby": this.priceFilter || this.areaFilter || "D",//按什么排序
            "curr_page": this.para.curr_page,//当前的页数
            "items_perpage": 10//每次传递的几天数据
          },
          "foreEndType": 2,
          "code": "30000001"
        }, this_ = this;
        this.currentFilterTab = 'nth';
        let successCb = function (result) {
          Indicator.close();
          this_.loading = false;
          $("#zhezhaoc").remove();
          if(result.data.data.length == 0){

          }else{
              this_.resultData = this_.resultData.concat(result.data.data);
          }
          for(var i=0;i<this_.resultData.length;i++){
              if(this_.resultData[i].djbsh == 1){
                  this_.resultData[i].djbsh = "定金";
              }
          }
          if (result.data.data.length < this_.para.items_perpage) {
            this_.noMore = false;
          }
          if (this_.resultData.length <= 0) {
            Toast({
              message: '抱歉,暂无符合条件的房源!',
              position: 'middle',
              duration: 1000
            });
          } else if (this_.resultData.length > 0 && result.data.data.length == 0) {
            Toast({
              message: '已经获得当前条件的所有房源!',
              position: 'middle',
              duration: 1000
            });
          }
        };
        let errorCb = function (result) {
          Indicator.close();
          Toast({
            message: '抱歉,暂无符合条件的房源!',
            position: 'middle',
            duration: 1000
          });
        };

        Indicator.open({
           text: '',
           spinnerType: 'fading-circle'
        });
        this.gRemoteData(paraObj, successCb, errorCb);
      },

      gRemoteData(paraobj, successcb, errorcb){
          if(this.xzfystatus == ""){
              axios.post("/yhcms/web/lpjbxx/getWxLbFyxx1.do", paraobj)
                  .then(function (response) {
                      if (typeof successcb === "function") {
                          successcb(response)
                      }
                  }).catch(function (error) {
                  if (typeof errorcb === "function") {
                      errorcb(error)
                  }
              });
          }else{
              axios.post("/yhcms/web/lpjbxx/getWxLbFyxx.do", paraobj)
                  .then(function (response) {
                      if (typeof successcb === "function") {
                          successcb(response)
                      }
                  }).catch(function (error) {
                  if (typeof errorcb === "function") {
                      errorcb(error)
                  }
              });
          }

      },

      loadMore(){
        if (!this.loading && !this.noMore) {
          this.loading = true;
          var wwd = $(window).width();
          var wgd = $('#zhezcly').height() + 120;
          $("body").prepend('<div id="zhezhaoc"></div>');
          $("#zhezhaoc").css({
              width: "" + wwd + "px",
              height: "" + wgd + "px",
              "background-color": "#FFFFFF",
              "z-index": "1200",
              opacity: "0",
              position: "absolute",
              top: "0px",
              left: "0px",
              "overflow":"hidden",
          });
          this.para.curr_page = parseInt(this.para.curr_page);
          this.para.curr_page += parseInt(1);
          this.getData();
        }
      }
    },
  }
</script>
