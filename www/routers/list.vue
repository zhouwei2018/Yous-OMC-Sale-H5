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
.supply_house{font-size:.3rem !important}
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
.supply_price{text-align:right}
.supply_price > span{font-size:.4rem !important;color:#e01222;}
.supply_price i{font-size:.23rem !important}
.supply_tag dd{padding:.03rem !important}
.active {
  background-color: #16abdc !important;
  color: #fff !important;
}
.supply_msg_box dd.supply_house{margin-top:-0.02rem !important}
#filter-features{height:6rem;overflow-y:scroll}
#filter-features .warpper:last-child{margin-bottom:0.5rem}
.zc{background-color:#ef104e !important;color:#FFF !important;font-size: 0.5em !important;}
.highlight a{color:#476CBA !important}
.tagClass{font-size: 0.5em !important;}
.zhezhaoc{
  border:1px solid red;background-color: #ooo !important; opacity:0.5 !important;}

</style>
<template>
  <div>
    <!--header-->
    <section id="header">
      <header1></header1>
    </section>
    <a href="javascript:;" class="detail-search" style="position: fixed;left: 0; top: 0;border-radius: .1rem;">
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
                    <!--第二级的数据-->
                    <div id="position_filter" class="warpper2 box-flex1 bg-white" :class="{choose:this.curTab=='a'||this.curTab=='l'||this.curTab=='y'}">
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='a'}">
                        <li data-type="positionA" @click="where='不限';subBuesiness=[];searchChoose('','','不限', $event)"><a href="javascript:;">不限</a></li>
                        <li v-for="item in govDistrictArray" data-type="positionA" :class="{highlight:item.fdcode==his.ercode}"
                            @click="searchSubArea(item.fdcode, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='y'}">
                        <li data-type="positionY" @click="where='不限';otherBusiness=[];searchChoose('','','不限', $event)"><a href="javascript:;">不限</a></li>
                        <li v-for="item in districtArray" data-type="positionY" :class="{highlight:item.id==his.ercode}"
                            @click="searchArea(item.id, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='l'}">
                        <li data-type="positionL" @click="where='不限';stationArray=[];searchChoose('','','不限', $event)"><a href="javascript:;">不限</a></li>
                        <li v-for="item in lineArray" data-type="positionL" :class="{highlight:item.id==his.ercode}"
                            @click="searchStation(item.id, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                    </div>
                    <!--第三级的数据-->
                    <div id="third-tab" class="warpper2 box-flex1 bg-white" :class="{show:this.curTab!=''&&this.thirdpart!=''}">
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='a'}">
                        <li v-for="item in subBuesiness" data-type="positionA" :class="{highlight:item.fdcode==his.sancode}"
                            @click="searchChoose(item.fdcode,'',item.fdname, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='y'}">
                        <li v-for="item in otherBusiness" data-type="positionY" :class="{highlight:item.id==his.sancode}"
                            @click="searchChoose(item.id,'',item.fdname, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                      <ul class="price-ul cut-height" :class="{show:this.curTab!=''&&this.thirdpart=='dt'}">
                        <li v-for="item in stationArray" data-type="positionL" :class="{highlight:item.id==his.sancode}"
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
                      <span class="ys_tit">特色：</span>
                    </li>
                    <li class="clearfix bg_gray">
                      <div class="ys_item_con fl">
                        <span v-for="a in featureArray" class="ys_tag" :class="{'active':tsTag.indexOf(a.id)>-1 || xztagasta.indexOf(a.id) > -1}" :id="a.id" @click="pickTag($event)">{{a.topic}}</span>
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
            <router-link :to="{path:'/detail',query:{building_id:item.id}}" @click.native="jiyishuj" class="supply_box">
              <div class="supply_price">
                <span>{{item.price}}</span> 元/㎡·天
                <i v-if="item.lpkzfy > 1" style="display: block">{{item.min_areas}} - {{item.max_areas}}㎡</i>
                <i v-else style="display: block">{{item.min_areas}}㎡</i>
              </div>
              <dl class="supply">
                <dt>
                  <img v-if="item.img_path" :src="$prefix + '/' + item.img_path" :alt="item.img_alt">
                  <img v-else :src="$prefix + '/upload/2017-08-27/6404b4de960b81fc5403c870aefcea34.png'" :alt="item.img_alt">
                </dt>
                <dd class="supply_msg_box clearfix">
                  <dl>
                    <dd class="supply_house">{{item.building_name}}</dd>
                    <dd class="supply_color ellipsis">{{item.district}}</dd>
                    <dd class="supply_color ellipsis">{{item.lpkzfy}}套房源可租</dd>
                    <dd>
                      <dl class="supply_tag clearfix">
                        <dd v-if="item.label" v-for="tag in item.label.split(',').slice(0,3)" class="tagClass">{{tag}}</dd>
                        <dd class="tagClass zc" v-show="item.zc.indexOf('不可') < 0">{{item.zc.indexOf('不可') > -1 ? '': item.zc}}</dd>
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
        areasta:'',
        price:'',
        hist:{},
        his:'',
        er:'',
        xztagasta:[],
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
        priceTag: "",
        areaTag: "",
        tsTag: [],
        priceRange: ["", ""],
        areaRange: ["", ""],
        curTab:'',
        thirdpart:'',
        currentFilterTab: 'nth',
        priceFilterTab: 'p',
        positionType:'a',
        loading: false,
        noMore: false,
        checked: false,
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
          "orderby": "D",
          "curr_page": 1,
          "items_perpage": 10,
        },
        resultData: [],
        where: ""
      }
    },
    mounted(){
        if(localStorage.getItem("fhdata") && localStorage.getItem("xzqv")){
            this.resultData = localStorage.getItem("fhdata");
            var topsl = localStorage.getItem("topsj");
            $('body,html').animate({scrollTop:topsl},2);//设置距离上面顶部的距离
            this.resultData = JSON.parse(this.resultData);
            this.para.district = localStorage.getItem("xzqv").replace("\"","").replace("\"","");
            this.para.business = localStorage.getItem("sq").replace("\"","").replace("\"","");
            this.para.district1 = localStorage.getItem("ywqv").replace("\"","").replace("\"","");
            this.para.business1 = localStorage.getItem("fq").replace("\"","").replace("\"","");
            this.para.line_id = localStorage.getItem("xl").replace("\"","").replace("\"","");
            this.para.station_id = localStorage.getItem("zd").replace("\"","").replace("\"","");
            this.para.area = localStorage.getItem("mj").replace("\"","").replace("\"","");
            this.para.price_dj = localStorage.getItem("jg").replace("\"","").replace("\"","");
            this.priceFilter  = localStorage.getItem("px").replace("\"","").replace("\"","");





            if(localStorage.getItem("areastalist")){
              /*对于缓存的判断时要考虑他的双重引号*/
                this.areasta = JSON.parse(localStorage.getItem("areastalist"));
                /*localStorage.removeItem("areasta");*/
            }
            if(localStorage.getItem("pricelist")){
              /*对于缓存的判断时要考虑他的双重引号*/
                this.price = JSON.parse(localStorage.getItem("pricelist"));
                /*localStorage.removeItem("price");*/
            }
            if(localStorage.getItem("histlist")){
                this.his = JSON.parse(localStorage.getItem("histlist"));
                this.positionType = this.his.yicode;
                this.thirdpart = this.his.sicoole;
                this.curTab = this.his.wucoole;
                if(this.positionType == "a"){
                    this.searchSubAreafh(this.his.ercode);
                }else if(this.positionType == "y"){
                    this.searchAreafh(this.his.ercode);
                }else{
                    this.searchStationfh(this.his.ercode);
                }
                /*localStorage.removeItem("histlist");*/
            }
            if(localStorage.getItem("jgtjianlist")){
                if(localStorage.getItem("jgtjianlist") == 1){
                    this.setPriceFilterfh();
                }
                if(localStorage.getItem("jgtjianlist") == 2){
                    this.setAreaFilterfh();
                }
                /*localStorage.removeItem("jgtjianlist");*/
            }
            if(localStorage.getItem("xztagastalist")){
                this.xztagasta = localStorage.getItem("xztagastalist");
                /*localStorage.removeItem("xztagastalist");*/
            }
          /*取出缓存中的数组*/
            if(localStorage.getItem("areaRangelist")){
                this.areaRange  = JSON.parse(localStorage.getItem("areaRangelist"));
                /*localStorage.removeItem("areaRangelist");*/
            }
            if(localStorage.getItem("priceRangelist")){
                this.priceRange  = JSON.parse(localStorage.getItem("priceRangelist"));
                /*localStorage.removeItem("priceRangelist");*/
            }






            localStorage.removeItem("fhdata");
            localStorage.removeItem("topsj");
            this.getFilters();
            this.para.curr_page = localStorage.getItem("page");
            this.para.curr_page = parseInt(this.para.curr_page);
            localStorage.removeItem("page");
            localStorage.removeItem("xzqv");
            localStorage.removeItem("sq");
            localStorage.removeItem("ywqv");
            localStorage.removeItem("fq");
            localStorage.removeItem("xl");
            localStorage.removeItem("zd");
            localStorage.removeItem("mj");
            localStorage.removeItem("jg");
            localStorage.removeItem("px");
        }else{
            localStorage.removeItem("areastalist");
            localStorage.removeItem("pricelist");
            localStorage.removeItem("histlist");
            localStorage.removeItem("jgtjianlist");
            localStorage.removeItem("xztagastalist");
            localStorage.removeItem("areaRangelist");
            localStorage.removeItem("priceRangelist");
            this.init();
        }
        //var wxcode = this.GetQueryString("code");
        /*if(wxcode == null){
            window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx109df14878717ecb&redirect_uri=http%3A%2F%2Fomc.urskongjian.com%2Fwanx%2F%23%2Flist&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
        }else{
            alert(wxcode);
            /!*$.get("http://omc.urskongjian.com/yhcms/web/jcsj/getOpenid.do?code="+wxcode,
                {
                },
                {
                    headers:{
                        "Access-Control-Allow-Origin":"*",
                        "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
                        "Access-Control-Allow-Methods":"GET, PUT, DELETE, POST, OPTIONS"

                    },
                    dataType: 'jsonp',
                    crossDomain: true
                }
            ).then((data) => {
                alert("aa2");
                var data = JSON.parse(data.bodyText).data;
                alert(data);
                alert(data.subscribe);
                if (data.subscribe == 1 || data.subscribe == 3 ) {
                    next();
                } else {
                    alert("aa3");
                    window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0NjY4ODM5OQ==#wechat_redirect";
                }
            }).catch(function(response) {
            });*!/


            this.$http.post(
                this.$api + "/yhcms/web/jcsj/getOpenid.do?code="+wxcode
            ).then(function (res) {
                var data = JSON.parse(res.bodyText);
                if (data.success) {
                    if (data.subscribe == 1 || data.subscribe == 3 ) {
                        alert(111);
                        next();
                    } else {
                        alert("aa3");
                        window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0NjY4ODM5OQ==#wechat_redirect";
                    }

                } else {
                    Toast({
                        message: '获取筛选条件失败: ' + data.message,
                        position: 'bottom'
                    });
                }
            }, function (res) {
                Toast({
                    message: '获取筛选条件失败! 请稍候再试',
                    position: 'bottom'
                });
            });
        }*/
        //jquery中删除style样式
      $("body").removeAttr("style");
      $("html").removeAttr("style");
      /*console.log("mounted=================",this.para.curr_page);*/
      $('title').html('楼盘列表');

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
        /*console.log("created=================",this.para.curr_page);*/
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
          localStorage.setItem('fhdata', JSON.stringify(this.resultData));
          localStorage.setItem('topsj', JSON.stringify($(window).scrollTop()));
          localStorage.setItem('page', JSON.stringify(this.para.curr_page));
          localStorage.setItem('xzqv', JSON.stringify(this.para.district));
          localStorage.setItem('sq', JSON.stringify(this.para.business));
          localStorage.setItem('ywqv', JSON.stringify(this.para.district1));
          localStorage.setItem('fq', JSON.stringify(this.para.business1));
          localStorage.setItem('xl', JSON.stringify(this.para.line_id));
          localStorage.setItem('zd', JSON.stringify(this.para.station_id));
          localStorage.setItem('mj', JSON.stringify(this.para.area));
          localStorage.setItem('jg', JSON.stringify(this.para.price_dj));
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
      selectTag(e){
        const target = $(e.target), val = target.attr("value"), t = target.attr("target"), which = t ==="price" ? "priceTag" : "areaTag";
        if(t == 'area'){
            localStorage.setItem('areastalist', JSON.stringify(val));
        }else{
            localStorage.setItem('pricelist', JSON.stringify(val));
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
          let _t = new Set(this.tsTag);
          _t.delete(id);
          this.tsTag = [..._t];
          $(target).removeClass('active');
        } else {
          let _t = new Set(this.tsTag);
          _t.add(id);
          this.tsTag = [..._t];
          $(target).addClass('active');
        }
        localStorage.setItem('xztagastalist', JSON.stringify(this.tsTag));
        this.para.label = this.tsTag.join(",");
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
            this.areaTag = "";
            this.para.price_dj = "";
            this.para.area = "";
            this.tsTag = [];
            this.priceRange = ["", ""];
            this.areaRange = ["", ""];
            this.xztagasta = [];
            this.price = "";
            this.areasta = "";
            return;
        }
        localStorage.setItem('priceRangelist', JSON.stringify(this.priceRange));
        localStorage.setItem('areaRangelist', JSON.stringify(this.areaRange));
        this.priceFilter = '';
        this.areaFilter = '';
        this.resetGetData();
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
            that.featureArray = data;
          }, (res)=>{
            Indicator.close()
          });
      },
        //点击行政区域获取后面的数据方法
      searchSubArea:function(code,e){
        this.curTab = "a";
        this.thirdpart = "sq";
        Indicator.open({
           text: '',
           spinnerType: 'fading-circle'
        });
        const li = $(e.target).closest("li"), txt = $(li).find("a").text();
        li.addClass("highlight").siblings().removeClass("highlight");
        this.where = txt;
        this.hist.ercode = code;
        this.er = code;
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
        li.addClass("highlight").siblings().removeClass("highlight");
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
        li.addClass("highlight").siblings().removeClass("highlight");
        this.where = txt;
        this.hist.ercode = line;
        this.er = line;
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
          $(li).addClass("highlight").toggleClass("active-filter");

          if(this.priceFilter === '' || this.priceFilter === 'P2'){
              this.priceFilter = 'P1';
          }
          else{
              this.priceFilter = 'P2';
          }
          this.areaFilter = '';
          localStorage.setItem('jgtjianlist',1);
          const that = this;
          setTimeout(function(){
              that.resetGetData();
          }, 500);
      },
      setPriceFilterfh(){
          $('#jgtjian').addClass("highlight").toggleClass("active-filter");;
          if(this.priceFilter == 'P1'){
              $('#jgtjian').addClass("active-filter");
          }
      },
      setAreaFilter(e){
          const li = $(e.target).closest("li");
          $(li).addClass("highlight").toggleClass("active-filter");
          if(this.areaFilter === '' || this.areaFilter === 'A2'){
              this.areaFilter = 'A1';
          }
          else{
              this.areaFilter = 'A2';
          }
          this.priceFilter = '';
          localStorage.setItem('jgtjianlist',2);
          const that = this;
          setTimeout(function(){
              that.resetGetData();
          }, 500);
      },
      setAreaFilterfh(){
          $('#mjtjian').addClass("highlight");
          if(this.priceFilter == 'A1'){
              $('#mjtjian').addClass("active-filter");
          }
      },
      /*getQueryString: function (key) {
        var t = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"),
          n = window.location.search.substr(1).match(t);
        return null != n ? decodeURI(n[2]) : "";
      },*/
      closeFilter: function () {
        this.currentFilterTab = 'nth';
      },
      changeRou: function () {
          //vue中的get传值时逗号后面必须是query参数（其他的单词会报错，不能随便定义）
        this.$router.push({path: '/filter', query: {keyword33:this.para.search_keywork}});
      },
      searchChoose: function (code, val, value, e) {
        const li = $(e.target).closest('li');
        if(value == "不限"){

        }else{
            this.hist.txt = value;
        }
        li.addClass("highlight").siblings().removeClass("highlight");
        this.hist.ercode = this.er;
        this.hist.sancode = code;
        this.hist.sicoole = this.thirdpart;
        this.hist.wucoole = this.curTab;
        this.hist.yicode = this.positionType;
        localStorage.setItem('histlist', JSON.stringify(this.hist));
        switch (li.attr('data-type')) {
          case 'positionA':
            //行政区域
            $('h2.district-h').html(value);
            if(value==="不限"){
                this.para.district1 = code;
                this.para.business1 = "";
                 var a = $('h2.district-h').html(this.where || value);
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
        this.getTsbq();
      },
      chooseFilter: function (e) {
        var e = e || window.event;
        const li = $(e.target).closest('li');
        this.currentFilterTab = li.attr('data-type');
        $(li).siblings().removeClass("active-filter");
        $(li).siblings().removeClass("highlight");
        if(this.currentFilterTab=='features' || this.currentFilterTab=='district'){
            this.areaFilter = '';
            this.priceFilter = '';
            localStorage.removeItem("jgtjianlist");
        }
      },
      resetGetData: function () {
        this.noMore = false;
        this.loading = true;

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
          console.log(this.para.area);
        const paraObj = {
          "parameters": {
            "search_keywork": this.para.search_keywork,
            "district": this.para.district,
            "business": this.para.business,
            "district1": this.para.district1,
            "business1": this.para.business1,
            "line_id": this.para.line_id,
            "station_id": this.para.station_id,
            "area": this.para.area,
            "price_dj": this.para.price_dj,
            "label": this.para.label,
            "orderby": this.priceFilter || this.areaFilter || "D",
            "curr_page": this.para.curr_page,
            "items_perpage": 10
          },
          "foreEndType": 2,
          "code": "30000001"
        }, this_ = this;
        this.currentFilterTab = 'nth';
        let successCb = function (result) {
          Indicator.close();
          this_.loading = false;
            $("#zhezhaoc").remove();
            this_.resultData = this_.resultData.concat(result.data.data.buildings);
          if (result.data.data < this_.para.items_perpage) {
            this_.noMore = true;
          }
          if (this_.resultData.length <= 0) {
            Toast({
              message: '抱歉,暂无符合条件的房源!',
              position: 'middle',
              duration: 3000
            });
          } else if (this_.resultData.length > 0 && result.data.data.buildings.length == 0) {
            Toast({
              message: '已经获得当前条件的所有楼盘!',
              position: 'middle',
              duration: 3000
            });
          }
        };
        let errorCb = function (result) {
          Indicator.close();
          this_.loading = false;
          $("#zhezhaoc").remove();
          Toast({
            message: '抱歉,暂无符合条件的房源!',
            position: 'middle',
            duration: 3000
          });
        };

        Indicator.open({
           text: '',
           spinnerType: 'fading-circle'
        });
        this.gRemoteData(paraObj, successCb, errorCb);
      },

      gRemoteData(paraobj, successcb, errorcb){
        axios.post('/yhcms/web/lpjbxx/getZdLpjbxx.do', paraobj)
          .then(function (response) {
            if (typeof successcb === "function") {
              successcb(response)
            }
          }).catch(function (error) {
          if (typeof errorcb === "function") {
            errorcb(error)
          }
        });
      },
      //这块是干什么的
      loadMore(){
          /*console.log("loadMore1=================",this.para.curr_page);*/
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
          this.para.curr_page += 1;
            /*console.log("loadMore2=================",this.para.curr_page);*/
          this.getData();
        }
      }
    },
  }
</script>
