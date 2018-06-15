<style scoped lang='less'>
	@import "../../resources/css/reset.css";
  	@import "../../resources/css/base.less";
  	.box{
  		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
  		overflow-x: hidden;
  		overflow-y: scroll;
  		-webkit-overflow-scrolling: touch;
  	}
  	.box_b{
  		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
  		padding-bottom: 0.6rem;
  		overflow: auto;
  	}
  	.flow{
  		width: 100%;
  		height: 2.35rem;
  		background: #fff;
  		padding: 0.2rem 0;
  		font-size: @font24;
  		-webkit-box-shadow:0px 2px 4px #D8D7DC; 
  		box-shadow:0px 2px 4px #D8D7DC;
  		/*display:none;*/  		
  		ul{
  			display: flex;
  			justify-content: space-around;
  		}
  		li{
  			display: flex;
			flex-direction: column;
  			align-items: center;
  			visibility:hidden;
  			p{margin-bottom: 0.1rem;position: relative;}
  			.flow_l,.flow_r{
  				position: absolute;
  				top: 50%;
  				margin-top: -0.015rem;
  				display:inline-block;
  				width: 2rem;
  				height: 0.03rem;
  				background: #969696;
  			}
  			.flow_l{
  				left: -1.55rem;
  			}
  			.flow_r{
  				right: -2rem;
  				/*线性渐变*/
  				/*background: -webkit-linear-gradient(left,blue,red);*/
  			}
  		}
  		li p:first-child{
  			width: 1rem;
  			height: 1rem;
  			line-height: 0.9rem;
  			border: 2px solid #969696;
  			border-radius: 50%;
  			box-sizing: border-box;
  			text-align: center;
  			background: #fff;
  		}
  		.flow_tip{padding-left: 0.5rem;color: #3785f4;}
  	}
  	.site_card {
		width: 7.06rem;
		height: 2.05rem;
		margin: 0.25rem auto 0;
		border-radius: 0.07rem;
		background: url(../../resources/images/commission/card_bg.png) no-repeat center;
		background-size: cover;
		-webkit-box-shadow: 0px 0px 7px #2991f4;
		box-shadow: 0px 0px 7px #2991f4;
		color: @cl_white;
		padding: 0.45rem 0 0 .3rem;
		p{
			margin-bottom: 0.25rem;
			width: 6.3rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		p:first-child{font-size: @font36;}
		p:last-child{font-size: @font30;}
	}
	.new_box {
		position: relative;
		width: 7.06rem;
		/*height:4.53rem;*/
		margin: 0.25rem auto 0;
		border-radius: 0.08rem;
		-webkit-box-shadow: 0px 0px 8px #C5C4C9;
		box-shadow: 0px 0px 8px #C5C4C9;
		font-size: @font30;
		background-color: #fff;
		overflow:hidden;
		h3 {
			border-top-left-radius: 0.08rem;
			border-top-right-radius: 0.08rem;
			height: 0.95rem;
			line-height: 0.95rem;
			font-weight: bold;
			padding-left: 0.3rem;
			background: #eeeeee;
			-webkit-box-shadow: 0px 0px 8px #D9D9D9;
			box-shadow: 0px 0px 8px #D9D9D9;
		}
		/*.icon{
			position: absolute;
			top: 0.25rem;
			right: 0.55rem;
			display: block;
			width: 1.45rem;
			height: 1.45rem;
			background: url(../../resources/images/commission/icon.png) no-repeat center;
			background-size: cover;
			animation: change 1s linear;
		}*/
		ul{padding:0.3rem 0.3rem 0.4rem 0.3rem;}
		ul li{
			color: #323232;
			margin-bottom: 0.20rem;
			span:first-child{color: #969696;}
		}
		.choose{
			position: relative;
			min-height: 2.45rem;
			height: auto;
			.sel{
				position: absolute;
				height: 0.32rem;
				width: 2.5rem;
				top: 50%;
				left: 50%;
				margin-top: -0.16rem;
				margin-left: -1.25rem;
				font-size: @font32;
				color: #ffab03;
				display:flex;
				align-items: center;
				span:first-child{
					display: inline-block;
					width: 0.32rem;
					height: 0.32rem;
					border-radius: 50%;
					background: #ffab03 url(../../resources/images/close1.png) no-repeat center;
					background-size: 50%;
					margin-right: 0.15rem;
					transform: rotate(45deg);
				}
			}
		}
		ol{
			list-style: none;
			font-size: @font30;
			padding: 0.3rem 0 0.15rem 0.3rem;
			margin: 0 0 0.15rem 0;
			background: #fff;
			li{
				display: flex;
				justify-content: flex-start;
				margin-bottom: 0.2rem;
				span:first-child{
					font-weight: bold;
					color: #333333;
				}
				span:last-child{
					display: inline-block;
					width: 4.9rem;
					color: #464646;
				}
			}
		}
		ol:last-child{
			border-bottom-left-radius: 0.08rem;
			border-bottom-right-radius: 0.08rem;
			margin-bottom: 0;
		}
		.bz{
			display: flex;
			height: 1.9rem;
			font-size: @font30;
			color:#323232;
			padding: 0.25rem 0.3rem;
			span{width: 0.8rem;}
			textarea{
				background: #fff;
				border: none;
				/*padding-top: 0.06rem;*/
				font-size: @font34;
				width: 5.5rem;
			}
		}
		
	}
	.btn {
		display: block;
		width: 5.5rem;
		height: 0.75rem;
		line-height: 0.75rem;
		text-align: center;
		margin: 0.2rem auto 0;
		border: none;
		background: #aaaaaa;
		border-radius: 0.08rem;
		color: #c8c8c8;
		font-size: @font32;
	}
	/*按钮背景*/
	.btnactive {
		background: url(../../resources/images/commission/btn_bg.png) no-repeat center;
		background-size: cover;
		color: #fff;
	}
	.fppop{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: rgba(0,0,0,0.3);
		padding-top: 2.15rem;
	}
	@keyframes change{
		from {
			width: 3.45rem;
			height: 3.45rem;
			top: 50%;
			right: 50%;
			margin-right: -0.725rem;
		}
		to {
			width: 1.45rem;
			height: 1.45rem;
			top: 0.25rem;
			right: 0.55rem;
		}
	}
	.truebox{
		padding-left: 0.6rem;
	}
</style>
<style>
.mint-cell:last-child,.mint-cell-wrapper{
	background: none;
}
.mint-checkbox-core{
	border-radius: initial;
}
/*文字yanse*/
.mint-checkbox-label{
	font-size: 0.3rem;
	color: #A9ACB1;
}
.mint-checkbox-core{
	width: 0.3rem;
	height: 0.3rem;
}
.mint-checkbox-core::after{
	top: 0rem;
	left: 0.08rem;
}
</style>

<template>
	<div class="box">
		<div class="box_b">
			<div class="flow" v-show='passzt != 0'>
				<ul>
					<li class="betrue">
						<p>已确认<span class="flow_r"></span></p>
						<p style="visibility: hidden;">12/19 15:31</p>
					</li>
					<li class="ing" v-show='qdlist.taskZt != 1'>
						<p>审批中<span class="flow_r"></span></p>
						<p style="visibility: hidden;">12/19 15:31</p>
					</li>
					<li class="suc">
						<p>已完成</p>
						<p style="visibility: hidden;">12/19 15:31</p>
					</li>
				</ul>
				<div class="flow_tip">我们正在为您提交佣金审批，请耐心等待！</div>
			</div>
			<div class="site_card">
				<p>{{qdlist.loupan}}</p>
				<p>{{qdlist.loudong}}-{{qdlist.fanghao}}</p>
			</div>
			<div class="new_box">
				<h3>佣金信息</h3>
				<ul>
					<li>
						<span>佣金金额：</span>
						<span>￥{{qdlist.xsyongjin | splitK}}</span>
					</li>
					<li>
						<span>销售姓名：</span>
						<span>{{qdlist.xiaoshou}}</span>
					</li>
					<li v-if="false">
						<span>联系方式：</span>
						<span>{{qdlist.xsqvdaotel}}</span>
					</li>
					<li>
						<span>发票类型：</span>
						<span>{{qdlist.xsfpleixing}}</span>
						<i style="color: #3385f3; float: right;" @click="fptt">发票抬头</i>
					</li>
				</ul>
				<span class="icon"></span>
			</div>
			<div class="new_box">
				<h3>收款方信息</h3>
				<div class="choose">
					<p class="sel" v-if='defaultData.id=="" && passzt == 0' @click="selnum2(defaultData)">
						<span></span>
						<span>选择收款账号</span>
					</p>
					<!--选择好收款账号显示的样式-->
					<ul @click="selnum1(defaultData.id)" v-if="defaultData.id!='' && passzt == 0">
						<li>
							<span>户名：</span>
							<span>{{defaultData.huming}}</span>
						</li>
						<li>
							<span>开户行：</span>
							<span>{{defaultData.kaihuhang}}</span>
							<i style="color: #3385f3; float: right;" @click="selnum(defaultData.id)">></i>
						</li>
						<li>
							<span>银行账号：</span>
							<span>{{defaultData.zhanghao | delkg}}</span>
						</li>
					</ul>
					<!--账户显示-->
					<ul  v-if="passzt == 1 && qdlist.qdhuming">
						<li>
							<span>户名：</span>
							<span>{{qdlist.qdhuming}}</span>
						</li>
						<li>
							<span>开户行：</span>
							<span>{{qdlist.qdkaihuhang}}</span>
						</li>
						<li>
							<span>银行账号：</span>
							<span>{{qdlist.qdzhanghao | delkg}}</span>
						</li>
					</ul>
					
				</div>
			</div>
			<div class="new_box">
				<div class="bz">
					<span>备注:</span>
					<textarea  rows="6" cols="35" placeholder="请输入备注信息" v-model="bz"></textarea>
				</div>
			</div>
			<!--确认框-->
			<div class="truebox">
				<mt-checklist v-if='passzt == 0'
				  v-model="value"
				  :options="options" @change='selvalue'>
				</mt-checklist>
			</div>
			<button v-if='passzt == 0' :class="qrfp && this.defaultData.id != ''?'btn btnactive':'btn'" @click="save">提交</button>
			<!--抬头发票-->
			<div class="fppop" v-if="popshow" @click="popshow=false">
				<div class="new_box" style="background: #f0eff5;">
					<h3 style="text-align: center;">发票抬头</h3>
					<ol>
						<li>
							<span>名称：</span>
							<span>{{qdlist.xsfpdanwei}}</span>
						</li>
						<li>
							<span>税号：</span>
							<span>{{qdlist.xsfpnashuiren}}</span>
						</li>
					</ol>
					
					<ol v-if="qdlist.xsfpdizhidianhua != ''">
						<li>
							<span>电话：</span>
							<span>{{qdlist.xsfpdizhidianhua.split(' ')[1]}}</span>
						</li>
						<li>
							<span>地址：</span>
							<span>{{qdlist.xsfpdizhidianhua.split(' ')[0]}}</span>
						</li>
						<li>
							<span>开户行：</span>
							<span>{{qdlist.xsfpkaihuhang.split(' ')[0]}}</span>
						</li>
						<li>
							<span>银行账号：</span>
							<span>{{qdlist.xsfpkaihuhang.split(' ')[1]}}</span>
						</li>
					</ol>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { Checklist } from 'mint-ui';
import { Toast } from 'mint-ui';
export default{
	data(){
		return{
			bz:'',//备注信息
			value:[],
			options:[
				{
			    	label: '确认已开具发票，发票信息准确无误',
			    	value: 'valueA'
				},
			],
			qdlist:{},//渠道佣金列表数据
			popshow:false,
			qrfp:'',//发票确认
			ids:'',//银行账户id
			defaultData:{
				id :'',
			 	huming :'',
				kaihuhang :'',
				zhanghao:''
			},//选择的银行账户数据
			success:false,//渠道数据保存后显示审批状态
			passzt:0,//状态（是否可以修改）
		}
	},
	created(){
		this.ids = this.$route.query.zhid;
		this.qddetails();
	},
	methods:{
		qddetails(){//获取渠道单个信息
			const url = this.$api + "/yhcms/web/qdyongjin/getQdYjForid.do";
			axios.post(url,{ 
        		"id":this.$route.query.qdid,
            }).then((res)=>{
	            if(res.data.success){
	            	this.qdlist = res.data.data;
	            	if(res.data.data.qdhuming){
	            		this.defaultData.huming = res.data.data.qdhuming;
	            		this.defaultData.kaihuhang = res.data.data.qdkaihuhang;
	            		this.defaultData.zhanghao = res.data.data.qdzhanghao;
//	            		console.log(this.defaultData)
	            	}
//	            	console.log('======================')
//	            	console.log(this.qdlist);
					this.bz = this.qdlist.qdbeizhu;
					this.qdflow();
	            }
            }, (err)=>{
				console.log(err);
            });
		},
		fptt(){
			this.popshow = true;
		},
		selvalue(a){
			if(a.length>0){
				this.qrfp = true;
				$('.mint-checkbox-label').css('color','#3385f3');
			}else{
				this.qrfp = false;
				$('.mint-checkbox-label').css('color','#A9ACB1');
			}
//			console.log(this.qrfp);
		},
		save(){//保存提交
			const url = this.$api + "/yhcms/web/qdyongjin/saveQvDaoData.do";
			var cookxs = JSON.parse(localStorage.getItem('cooknx'));
			if(!this.defaultData.id || this.qrfp!=true){
				Toast({
				  message: '请选择您的银行账号，并确认已开具发票',
				  position: 'center',
				  duration: 4000
				});
			}else{
	            axios.post(url,{ 
	            	"ccode":this.qdlist.ccode,
	        		"cookie":cookxs,
	        		"createdate":this.qdlist.createdate,
	        		"taskJd":this.qdlist.taskJd,
	        		"taskId":this.qdlist.taskId,
					"fanghao":this.qdlist.fanghao,
					"fanghaoid":this.qdlist.fanghaoid,
					"hetongid":this.qdlist.hetongid,
					"htbianhao":this.qdlist.htbianhao,
					"id":this.qdlist.id,
					"loudong":this.qdlist.loudong,
					"loudongid":this.qdlist.loudongid,
					"loupan":this.qdlist.loupan,
					"loupanid":this.qdlist.loupanid,
					"qdbeizhu":this.bz,
					"taskZt":this.qdlist.taskZt,
					"xiaoshou":this.qdlist.xiaoshou,
					"xiaoshouid":this.qdlist.xiaoshouid,
					"xsfpdanwei":this.qdlist.xsfpdanwei,
					"xsfpdizhidianhua":this.qdlist.xsfpdizhidianhua,
					"xsfpkaihuhang":this.qdlist.xsfpkaihuhang,
					"xsfpleixing":this.qdlist.xsfpleixing,
					"xsfpnashuiren":this.qdlist.xsfpnashuiren,
					"xsjisuangongshi":this.qdlist.xsjisuangongshi,
					"xsqvdao":this.qdlist.xsqvdao,
					"xsqvdaoid":this.qdlist.xsqvdaoid,
					"xsqvdaotel":this.qdlist.xsqvdaotel,
					"xsyongjin":this.qdlist.xsyongjin,
					"xsyongjinxinxi":this.qdlist.xsyongjinxinxi,
					"qdhuming":this.defaultData.huming,
					"qdkaihuhang":this.defaultData.kaihuhang,
					"qdquerenfapiao":this.qrfp,
					"qdzhanghao":this.defaultData.zhanghao
	            }).then((res)=>{
	            	if(res.data.success){
	            		Toast({
							message: '提交成功',
							position: 'center',
							duration: 2000
						});
	            		this.success = true;
						this.$router.push({
							path:'/channel_list',//跳转到渠道佣金展示
							resault:'success'//提交成功后回到列表根据该字段刷新页面
						})        		
	            	}
	            	console.log(res);
	            	
	            }, (err)=>{
	            	console.log(err);
	            });
	        }
		},
		selnum(id){//变更账户
			if(this.passzt == 1){
				return
			}else{
				this.$router.push({
					path:'/income_number',//跳转到银行账户列表
					query:{
						"zhid":id,//所传参数
						"qdid":this.$route.query.qdid,
						"passzt":this.$route.query.passzt
					}
				})				
			}
		},
		selnum1(id){
			if(this.passzt == 1){
				return
			}else{
				this.$router.push({
					path:'/income_number',//跳转到银行账户列表
					query:{
						"zhid":id,//所传参数
						"qdid":this.$route.query.qdid,
						"passzt":this.$route.query.passzt
					}
				})				
			}
		},
		selnum2(id){
			if(this.passzt == 1){
				return
			}else{
				this.$router.push({
					path:'/income_number',//跳转到银行账户列表
					query:{
						"zhid":id,//所传参数
						"qdid":this.$route.query.qdid,
						"passzt":this.$route.query.passzt
					}
				})
			}
		},
		defaultzh(){//获取默认账号
			var cookxs = JSON.parse(localStorage.getItem('cooknx'));
//			const url = "http://192.168.1.40:8080/yhcms/web/qdyinhangzhanghao/getQdYHZHForQdid.do";
			const url = this.$api + "/yhcms/web/qdyinhangzhanghao/getQdYHZHForQdid.do";
			axios.post(url,{ 
				"cookie":cookxs,
				"qdid":this.qdlist.xsqvdaoid//通过渠道id获取渠道默认银行账号
			 }).then((res)=>{
				if(res.data.data.id!='undefined' || res.data.data.id!=''){
				 	this.defaultData.id = res.data.data.id;
				 	this.defaultData.huming = res.data.data.huming;
					this.defaultData.kaihuhang = res.data.data.kaihuhang;
					this.defaultData.zhanghao = res.data.data.zhanghao;
				}else{
					this.hqzh();
				}
            }, (err)=>{
            	console.log(err);
            });
		},
		hqzh(){//根据id获取银行账号
//			const url = "http://192.168.1.40:8080/yhcms/web/qdyinhangzhanghao/getQdYHZHForid.do";
			const url = this.$api + "/yhcms/web/qdyinhangzhanghao/getQdYHZHForid.do";
			axios.post(url,{ 
				"id":this.$route.query.zhid//路由传递过来的银行账户id
			 }).then((res)=>{
//			 console.log(res)
			 	this.defaultData = res.data.data;
            }, (err)=>{
            	console.log(err);
            });
		},
		qdflow(){
			this.passzt = this.$route.query.passzt;
			//上方状态更新流程样式显示
			if(this.passzt == 1){//禁用备注输入
				$('.bz textarea').attr('disabled','disabled')
			}
			if(this.passzt == 1 && this.qdlist.taskZt=='2'){//已确认审核中样式
				$('.flow li').css('visibility','inherit');
				$('.betrue p:first-child').css({
					"border":'2px solid #3586f2',
					"color":'#3586f2'
				});
				$('.betrue .flow_r').css({
					'background': '-webkit-linear-gradient(left,#3586f2,#ffab02)'
				});
				$('.ing p:first-child').css({
					"border":'2px solid #ffab02',
					"color":'#ffab02'
				});
				$('.flow_tip').html('您的佣金正在审批中，请耐心等待！').css('color','#ffab02');
			}
			if(this.passzt == 1 && this.qdlist.taskZt=='3'){//审核完成样式
				$('.flow li').css('visibility','inherit');
				$('.suc p:first-child').css({
					"border":'2px solid #0eac5f',
					"color":'#0eac5f'
				});
				$('.ing .flow_r').css({
					'background': '-webkit-linear-gradient(left,#ffab02,#0eac5f)'
				});
				$('.ing p:first-child').css({
					"border":'2px solid #ffab02',
					"color":'#ffab02'
				});
				$('.flow_tip').html('您的佣金已通过审批，已打入您的账户，请注意查收！').css('color','#0eac5f');
			}
			if(this.passzt == 1 && this.qdlist.taskZt=='4'){//已驳回样式
				$('.betrue').css('visibility','inherit');
				$('.ing').css('visibility','inherit');
				$('.ing p:first-child span').css('visibility','hidden');
				
				$('.ing p:first-child').css({
					"border":'2px solid #ff7070',
					"color":'#ff7070'
				});
				$('.ing p:first-child').text('已驳回');
				$('.betrue .flow_r').css({
					'background': '-webkit-linear-gradient(left,#3586f2,#ff7070)'
				});
				$('.betrue p:first-child').css({
					"border":'2px solid #3586f2',
					"color":'#3586f2'
				});
				$('.flow_tip').html('抱歉，您的佣金信息已驳回，我们会为您重新提交！').css('color','#ff7070');
			}
		}
	},
	mounted(){
		if(this.$route.query.zhid){
			this.hqzh();
		}else{
			this.defaultzh();//获取用户默认账户
		}
		if(this.qdlist.qdbeizhu){
			this.bz = this.qdlist.qdbeizhu;//渠道备注
		}
		
		
	}
}
</script>