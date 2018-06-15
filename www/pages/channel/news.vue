<style scoped lang='less'>
	@import "../../resources/css/reset.css";
  	@import "../../resources/css/base.less";
  	.box{
  		position: absolute;
  		left: 0;
  		top: 0;
  		right: 0;
  		bottom: 0;
  		overflow: auto;
  		padding-left: 0.22rem;
  		padding-top: 0.9rem;
  		background: #fff;
  	}
  	.new_box{
  		display: flex;
  		justify-content: space-between;
  		width: 6.05rem;
  	}
  	.newspic{
  		width: 0.75rem;
  		height: 0.75rem;
  		img{
  			width: 100%;
  		}
  	}
  	.news_list{
  		position: relative;
  		width: 5.1rem;
  		background: #fff;
  		border-radius: 0.08rem;
  		-webkit-box-shadow:0px 1px 3px #DBDAE0; 
  		box-shadow:0px 1px 3px #DBDAE0;
  		margin-bottom: 1.2rem;
  		padding: 0.1rem 0.3rem;
  		.time{
  			position: absolute;
  			top: -0.6rem;
  			left: 50%;
  			margin-left: -1.13rem;
  			display: inline-block;
  			width: 2.26rem;
  			height: 0.45rem;
  			line-height: 0.45rem;
  			background: #d7d7d9;
  			color: #fff;
  			text-align: center;
  			border-radius: 0.08rem;
  		}
  		li{
  			height: 0.5rem !important;
  			font-size: @font26;
  			/*line-height: 0.5rem;*/
  		}
  		.tip{
  			font-size: @font28;
  		}
  		.title{
  			font-size: @font30;
  			color: #feac00;
  			line-height: 0.5rem;
  			background: none !important;
  			padding-left: 0 !important;
  		}
  		.price,.huname,.name{
  			color: #969696;
  		}
  		.spzt{
  			color: #0fad60;
  		}
  		li:last-child{
  			line-height: 0.5rem;
  			border-top: 1px solid #e4e4e4;
  		}
  	}
  	.kong{
  		display: flex;
  		flex-direction: column;
  		justify-content: center;
  		align-items: center;
  		margin-top: 1.62rem;
  		.k_ion{
  			width: 1.75rem;
  			height: 1.78rem;
  			img{width: 100%;}
  		}
  		.k_text{
  			font-size: @font30;
  			color: #999;
  			text-align: center;
  			margin-top: 0.46rem;
  		}
  	}
  	.dian{
  		position: absolute;
  		right: 0.1rem;
  		top: 50%;
  		margin-top: -0.05rem;
  		display: inline-block;
  		width: 0.1rem;
  		height: 0.1rem;
  		border-radius: 50%;
  		background: red;
  	}
</style>

<template>
	<div class="box">
		<!--消息为空-->
		<div class="kong" v-if="newData.length == 0">
			<p class="k_ion">
				<img src="../../resources/images/news/new_icon.png" alt="" />
			</p>
			<p class="k_text">暂无消息</p>
		</div>
		
		<div class="new_box" v-for="(item,index) in newData">
			<p class="newspic" v-if="item.type==5">
				<img src="../../resources/images/news/1.png"/>
			</p>
			<!--收款通知-->
			<p class="newspic" v-if="item.type==6">
				<img src="../../resources/images/news/3.png"/>
			</p>
			
			
			<p class="news_list">
				<span class="time">{{item.updated_at | newtime}}</span>
				<!--佣金确认消息状态-->
				<ul v-if="item.type==5">
					<li class="title" style="color: #0fad60;">佣金确认</li>
					<li class="tip">{{item.content}}</li>
					<li class="name">申请人：{{item.send_from_name}}</li>
					<li @click="tolink(item.id,item.sourcemid,item.status)">查看详情<span class="dian" v-if="item.status != 2"></span></li>
					
				</ul>
				<!--消息阅读状态-->
				<!--收款消息通知-->
				<ul v-if="item.type==6">
					<li class="title" style="color: #3486f2;">收款通知</li>
					<li class="tip">{{item.content}}</li>
					<li class="name">申请人：{{item.send_from_name}}</li>
					<li class="price">佣金金额：￥{{item.yongjin}}</li>
					<li @click="tolink1(item.id,item.sourcemid,item.status)">查看详情<span class="dian" v-if="item.status != 2"></span></li>
				</ul>
				
			</p>
		</div>
		
		
		
		
		
		<!--审批消息状态-->
		<!--<div class="new_box" v-for="(item,index) in newData" v-if="item.type==8">
			<p class="newspic">
				<img src="../../resources/images/news/2.png"/>
			</p>
			<p class="news_list">
				<span class="time">{{item.updated_at | newtime}}</span>
				<ul>
					<li class="title">审批</li>
					<li class="tip">{{item.content}}</li>
					<li class="name">申请人：{{item.send_from_name}}</li>
					<li class="spzt">审批通过</li>
					<li @click="tolink1(item.id,item.sourcemid)">查看详情</li>
				</ul>
			</p>
		</div>-->
		<!--审批消息驳回状态-->
		<!--<div class="new_box" v-for="(item,index) in newData" v-if="item.type==7">
			<p class="newspic">
				<img src="../../resources/images/news/2.png"/>
			</p>
			<p class="news_list">
				<span class="time">{{item.updated_at | newtime}}</span>
				<ul>
					<li class="title">审批</li>
					<li class="tip">{{item.content}}</li>
					<li class="name">申请人：{{item.send_from_name}}</li>
					<li class="spzt">审批被驳回</li>
					<li @click="tolink2(item.id,item.sourcemid)">查看详情</li>
				</ul>
			</p>
		</div>-->
		
		
		
		<!--收款通知消息状态-->
		<!--<div class="new_box" v-for="(item,index) in newData" v-if="item.type==6">
			<p class="newspic">
				<img src="../../resources/images/news/3.png"/>
			</p>
			<p class="news_list">
				<span class="time">{{item.updated_at | newtime}}</span>
				<ul>
					<li class="title" style="color: #3486f2;">收款通知</li>
					<li class="tip">{{item.content}}</li>
					<li class="name">申请人：{{item.send_from_name}}</li>
					<li class="price">佣金金额：￥{{item.yongjin}}</li>
					<li class="huname" style="border: none;line-height: inherit;">{{item.yongjin}}</li>
					<li @click="tolink3(item.id,item.sourcemid)">查看详情</li>
				</ul>
			</p>
		</div>-->
		
	</div>
</template>

<script>
import axios from 'axios';
export default{
	data(){
		return{
			userid:'',//用户id
			newData:[],//消息通知数据
		}
	},
	created(){
		this.takeid();
	},
	methods:{
		takeid(){//获取用户id
			var cookxs = JSON.parse(localStorage.getItem('cooknx'));
//			console.log(cookxs);
//			const url = "http://116.62.68.26:8080/yhcms/web/qdyongjin/getLoginInfo.do";
			const url = this.$api + "/yhcms/web/qdyongjin/getLoginInfo.do";
			axios.post(url,{
				"cookie":cookxs,
				"ptype":2
           }).then((res)=>{
	           	if(res.data.success){
	//         		console.log(res.data.data.userid)
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
//			const url = "http://beta.youshikongjian.com/receiveMessage/"+ this.userid + "/sys/qd";//消息接口地
			axios.get(url, {
				
			}).then((res)=>{
//				clearInterval(timer);//清楚定时器
				if(res.data.success){
					this.newData = res.data.data;
//					console.log(this.newData);
//					var timer = setTimeout(this.takenews,2000);//定时查询
				}				
            }, (err)=>{
				console.log(err);
            });
		},
		tolink(id,sourcemid,status){//佣金待确认跳转
			this.delnew(id);
			if(status != 2){
				this.$router.push({
					path:'/channel',//跳转渠道佣金展示详情
					query:{
						"passzt":0,//所传参数
						"qdid":sourcemid
					}
				})				
			}else{
				this.$router.push({
					path:'/channel',//跳转渠道佣金展示详情
					query:{
						"passzt":1,//所传参数
						"qdid":sourcemid
					}
				})
			}
		},
		tolink1(id,sourcemid,status){//收款通知跳转
			this.delnew(id);
			if(status != 2){
				this.$router.push({
					path:'/channel',//跳转渠道佣金数据保存
					query:{
						"passzt":1,//所传参数
						"qdid":sourcemid
					}
				})				
			}else{
				this.$router.push({
					path:'/channel',//跳转渠道佣金数据保存
					query:{
						"passzt":1,//所传参数
						"qdid":sourcemid
					}
				})
			}
		},
		delnew(id){
			const url = "http://erp.youshikongjian.com/readMessage/"+ id;
//			const url = "http://beta.youshikongjian.com/readMessage/"+ id;
			axios.get(url, {
				
			}).then((res)=>{
				if(res.data.success){
					
				}	
				console.log(res)
            }, (err)=>{
				console.log(err);
            });
		},
		
		
//		this.$router.push({
//			path:'/channel',//跳转渠道佣金数据保存
//			query:{
//				"passzt":1,//所传参数
//				"idx":0,
//				"qdid":3
//			}
//		})
		
	},
	filters:{
		newtime(t){
			var time;
			var time1 = t.split(' ')[0].split('-');//年份
			var time2 = t.split(' ')[1].split(':');//时间
			time1 = time1[1] + '月' + time1[2] + '日';
			time2 = time2[0] + ':' + time2[1];
			return time = time1 + " " + time2;
		}
	}
}
</script>
