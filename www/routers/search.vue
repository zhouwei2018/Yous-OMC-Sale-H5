<style scoped lang="less">
  @import "../resources/css/website/list.less";
   .search{
     -webkit-box-sizing: border-box;
     box-sizing: border-box;
     position: fixed;
     top:0;
     left: 0;
     right: 0;
     bottom: 0;
     z-index: 9;
     background-color: #fff;
     #s-header{
       position: relative;
       padding-top: .13rem;
       width: 100%;
       height: .88rem;
       line-height:.88rem;
       color: #FFF;
       font-size: .36rem;
       background-color: #302F35;
       -webkit-box-sizing: border-box;
       box-sizing: border-box;
       .close-icon {
         display: block;
         position: absolute;
         right: .30rem;
         top: 0;
         width: .40rem;
         height: .88rem;
         img {
           width: 100%;
           margin-top: -.06rem;
         }
       }
       .search-text {
         position: relative;
         margin-left: 6%;
         display: block;
         width: 78%;
         height: .62rem;
         line-height: .62rem;
         text-align: left;
         background: rgba(255, 255, 255, 0.2);
         background-size: .40rem auto;
         box-sizing: border-box;
         border-radius: .31rem;
         .sbtn{
           position: absolute;
           width: .36rem;
           height:.36rem;
           right: .28rem;
           top: .1378rem;
            background:url(../resources/images/list/ss_01.png) center center no-repeat;
            background-size: contain;
         }
         input {
           width: 88%;
           color: #FFF;
           background: none;
         }
       }
     }
   }
   .more-house{
    position: relative;
    .hot-out{
      border:1px solid transparent;
      display: block;
    }
    .history-out{
      display: block;
    }
    .result-search{
      display: none;
      background-color: #fff;
      position: fixed;
      width: 100%;
      top: .88rem;
      max-height: 7.4rem;
      overflow-y: scroll;
       li{
         margin-left: .360rem;
         padding-right: .22rem;
         height:.88rem;
         line-height: .88rem;
         border-bottom: 0.01rem solid rgba(5, 8, 2, 0.2);
       }
    }
    .more-house-title {
      font-size: .30rem;
      color: #302F35;
      font-weight: 700;
      margin: .30rem !important;
    }
    .search-list {
      padding: 0 .30rem;
      li {
        float: left;
        margin-bottom: .14rem;
        margin-right: 1%;
        padding: .02rem .32rem;
        text-align: center;
        border: 1px solid #D8D8D8;
        border-radius: .60rem;
        box-sizing: border-box;
      }
    }
    .del-btn {
      position: absolute;
      top: 0;
      right:.30rem;
      width: .32rem;
      height: .22rem;
      text-align: center;
      img {
        width: 100%;
        vertical-align: middle;
      }
    }
    .fr{
      float: right;
      em{
        font-size: .42rem;
        font-weight: 900;
        color: red;
      }
    }
      .clearfix{
        clear: both;
      }
  }
</style>
<template>
    <div class="search">
      <div id="s-header">
          <a href="javascript:void(0);" class="search-text">
            <input type="text" id="keyword" placeholder="请输入楼盘关键字搜索" maxlength="50" v-model.trim="search_keyword" autofocus="autofocus" @keyup.enter="find">
            <i class="sbtn" @click="toList2"></i>
          </a>
        <a href="javascript:void(0);" class="close-icon" @click="toList">
            <img src="http://img2.static.uban.com/www/images/xuan-close_1.png" alt="">
        </a>
      </div>
      <div class="more-house">
        <div class="hot-out">
          <h3 class="more-house-title mt15 mb15">热门搜索</h3>
          <ul class="search-list clearfix">
            <li v-for="item in hotArray" @click="toListw(item.name)">{{item.name}}</li>
          </ul>
        </div>
        <!--<div class="pr history-out">
          <h3 class="more-house-title mt10 mb15">历史搜索</h3>
          <a href="javascript:;" class="del-btn" @click="clearHistoty">
            <img src="../resources/images/list/del-icon.png" alt="清除">
          </a>
          <ul class="search-list clearfix historyArray">
            <li v-for="item in historyArray" @click="toListw(item.name)">{{item.name}}</li>
          </ul>
        </div>-->
        <ul class="result-search">
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
  import { Indicator } from 'mint-ui';
  import { InfiniteScroll } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import { Actionsheet } from 'mint-ui';
  import { Search } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    components: {
      InfiniteScroll,
      Toast,
      Actionsheet,
      Search
    },

    data () {
      return {
        search_keyword:'',
        historyArray:[
          {name:"望京soho"},
          {name:"盈科中心"},
          {name:"万达广场"},
          {name:"银河soho"},
        ],
        hotArray:[
          {name:"建外SOHO"},
          {name:"住邦2000"},
          {name:"万达广场"}
        ],
        resultData: [],
        r: ""
      }
    },
    created:function(){
        var history = localStorage.getItem("historyData");
        if(history){
          this.historyArray = JSON.parse(history);
        }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
          if(this.$route.query.keyword33){
              this.search_keyword = this.$route.query.keyword33;
          }
        axios.defaults.baseURL = this.$api;
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
        const r = this.$route.query.r;
        this.r = !r ? "" : r;
      },
      clearHistoty:function(){
           this.historyArray = [];
           localStorage.removeItem("historyData");
      },
      changeHistory:function(arg){
           this.historyArray.unshift({name:arg});
           localStorage.setItem("historyData",JSON.stringify(this.hotArray));
      },
      toList:function(){
        this.$router.push({path: '/' + this.r});
          //history.go(-1);
      },
      toList2:function(){
        if(this.search_keyword){
             this.changeHistory(this.search_keyword);
        }

        this.$router.push({path: '/' + this.r, query: {keyword: this.search_keyword}});
      },
      find:function(){
        if(!this.search_keyword){
            MessageBox('提示', '请输入关键字');
            return;
        }
        this.$router.push({path: '/' + this.r, query: {keyword: this.search_keyword}});
      },
      toListw:function(k){
        this.$router.push({path: '/' + this.r, query: {keyword:k}});
      },
      closeFilter:function(){
        this.currentFilterTab='nth';
      }
    }
  }
</script>
