<style scoped lang='less'>
	@import "../../resources/css/reset.css";
  	@import "../../resources/css/base.less";
  	.box{
  		padding-bottom: 0.6rem;
  	}
  	.new_box {
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
			text-align: left;
			padding-left: 0.3rem;
			background: #eeeeee;
			-webkit-box-shadow: 0px 0px 8px #D9D9D9;
			box-shadow: 0px 0px 8px #D9D9D9;
		}
		p {
			display: flex;
			display: -webkit-flex;
			align-items: center;
			-webkit-align-items: center;
			height: 1.15rem;
			margin-left: 0.3rem;
			border-bottom: 1px solid #e4e4e4;
			span{
				display:inline-block;
				width: 1.5rem;
			}
			input {
				width: 3.8rem;
				font-size: @font32;
				margin-left: 0.5rem;
			}
			i{color: #fd7172;}
		}
		p:last-child {
			border-bottom: none;
		}
	}
	.default{
		ul{
			display: flex;
			display: -webkit-flex;
			align-items: center;
			-webkit-align-items: center;
			padding: 0.3rem 0 0 0.5rem;
			li:first-child{margin-right: 1.9rem;}
			li p:first-child{
				font-size: @font30;
				color: #323234;
			}
			li p:last-child{
				font-size: @font24;
				color: #959597;
			}
		}
	}
	.btn {
		display: block;
		width: 5.5rem;
		height: 0.75rem;
		line-height: 0.75rem;
		text-align: center;
		margin: 3.8rem auto 0;
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
</style>

<template>
	<div class='box'>
		<div class="new_box">
			<h3>收款账号</h3>
			<p>
				<span><i>*</i>户名</span>
				<input type="text" placeholder="请输入户名" v-model="username" />
			</p>
			<p>
				<span><i>*</i>开户行</span>
				<input type="text" placeholder="请输入开户行" v-model="bankplace" />
			</p>
			<p>
				<span><i>*</i>银行账号</span>
				<input type="number" placeholder="请输入银行账号" v-model="usernumber"/>
			</p>
		</div>
		<!--账号默认设置-->
		<div class="default">
			<ul>
				<li>
					<p>设为默认账号</p>
					<p>注：每次佣金审批时会使用该账号</p>
				</li>
				<li>
					<span>
						<mt-switch v-model="value" @change='state'></mt-switch>
					</span>
					
				</li>
			</ul>
		</div>
		<button class="btn btnactive" @click="save">{{btntext}}</button>
	</div>
</template>

<script>
import axios from 'axios';
import { Switch } from 'mint-ui';
import { Toast } from 'mint-ui';
export default{
	data(){
		return{
			username:'',
			bankplace:'',
			usernumber:'',
			value:false,//是否设置默认
			value1:0,
			id:'',//银行账户id
			btntext:'',//按钮文字
			zhData:{},//账户信息
		}
	},
	created(){
		this.id = this.$route.query.zhid;
		if(this.$route.query.zhid || location.search == ''){
			this.btntext = '保存';
		}else{
			this.btntext = '保存并使用';
		}
		if(location.hash.indexOf('?') != -1){
			this.btntext = '保存并使用';
		}
	},
	methods:{
		state(){
			if(this.value==true){
				this.value1 = 1;
//				console.log(this.value1);
			}else{
				this.value1 = 0;
//				console.log(this.value1);
			}
		},
		times(){//获取当前系统日期
			var myDate = new Date();
			var year = myDate.getFullYear();
			var month = myDate.getMonth()+1;
			var day = myDate.getDate();
			var hour = myDate.getHours();
			var minute = myDate.getMinutes();
			var second = myDate.getSeconds();
			if(month<10){month = '0' + month;}
			if(day<10){day = '0' + day;}
			if(hour<10){hour = '0' + hour;}
			if(minute<10){minute = '0' + minute;}
			if(second<10){second = '0' + second;}
			return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
		},
		save(){//保存
			var ctime = this.times();
			var cookxs = JSON.parse(localStorage.getItem('cooknx'));
//			console.log(cookxs)
			const url = this.$api + "/yhcms/web/qdyinhangzhanghao/saveQvDaoData.do";

			if(this.username != '' && this.bankplace != '' && this.usernumber != ''){
				axios.post(url,{
					"cookie":cookxs,
					"id":this.zhData.id,
					"qdid":this.zhData.qdid,
					"qdname":this.zhData.qdname,
					"huming":this.username,
					"kaihuhang":this.bankplace,
					"zhanghao":this.usernumber,
					"isfirst":this.value1,
					"ctime":ctime
	            }).then((res)=>{
	            	Toast({
					  message: '保存成功',
					  position: 'center',
					  duration: 1000
					});
					if(this.$route.query.zhgl == 1){
						this.$router.push({
							path:'/income_number',//跳转到账号列表
							query:{
								"zhid":res.data.data.id,//所传参数
								"qdid":this.$route.query.qdid,
								"passzt":this.$route.query.passzt,
								"zhgl":this.$route.query.zhgl
							}
						})
						return;
					}
					if(location.hash.indexOf('?') == -1){
						this.$router.push({
							path:'/income_number',//跳转到账号列表
						})
					}else{
						if(res.data.success && !this.$route.query.zhid){
							this.$router.push({
								path:'/channel',//跳转到渠道数据保存
								query:{
									"zhid":res.data.data.id,//所传参数
									"qdid":this.$route.query.qdid,
									"passzt":this.$route.query.passzt
								}
							})
						}else{
							this.$router.push({
								path:'/income_number',//跳转到账号列表
								query:{
									"zhid":res.data.data.id,//所传参数
									"qdid":this.$route.query.qdid,
									"passzt":this.$route.query.passzt
								}
							})
						}
					}
					console.log(res);
	            }, (err)=>{
					console.log(err);
	            });
			}else{
				Toast({
				  message: '请将信息填写完整！',
				  position: 'center',
				  duration: 3000
				});
			}
		},
		hqzh(){//根据id获取银行账号
//			const url = "http://192.168.1.40:8080/yhcms/web/qdyinhangzhanghao/getQdYHZHForid.do";
			const url = this.$api + "/yhcms/web/qdyinhangzhanghao/getQdYHZHForid.do";
			axios.post(url,{ 
				id:this.id//路由传递过来的银行账户id
			}).then((res)=>{
			 	if(res.data.success){
					this.username = res.data.data.huming;
					this.bankplace = res.data.data.kaihuhang;
					this.usernumber = res.data.data.zhanghao;
					this.zhData = res.data.data;
//					console.log(this.zhData)
			 	}
            }, (err)=>{
            	console.log(err);
            });
		}
	},
	mounted(){
		this.hqzh();
		if(this.$route.query.isfirst == 0){
			this.value=false;
			this.btntext = '保存';
		}
		if(this.$route.query.isfirst == '1'){
			this.value=true;
			this.btntext = '保存';
		}
	},
	
}
</script>
