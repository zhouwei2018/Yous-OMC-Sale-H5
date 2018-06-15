<style scoped lang='less'>
	@import "../../resources/css/reset.css";
  	@import "../../resources/css/base.less";
  	.box{
  		/*position: absolute;*/
  	}
  	.list{
  		font-size: @font30;
  		overflow: hidden;
  	}
  	.list li{
  		position: relative;
  		display: flex;
  		align-items: center;
  		width: 135%;
  		padding:0 0 0 0.45rem;
  		background: #ffffff;
  		margin-bottom: 0.2rem;
  		/*margin-left: -2.5rem;*/
  		/*-webkit-transition:all 0.2s linear;*/
  		/*transition:all 0.2s linear;*/
  		-webkit-box-shadow:0px 1px 4px #D6D5DA;
  		box-shadow:0px 1px 4px #D6D5DA;
  		text-transform: uppercase;
  		p span:nth-child(1){color: #969696;}
  		p span:nth-child(2){color: #323232;}
  	}
  	.userleft,.userright{
  		position: relative;
  	}
  	.userleft{
  		width: 6.8rem;
  		p:last-child{margin-bottom: 0.3rem;}
  		p:first-child{margin-top: 0.3rem;}
  	}
  	.userright{
  		position: relative;
  		left: -0.1rem;
  		z-index: 999;
  		display: flex;
  		align-items: center;
  		flex: 1;
  		p{
  			width: 1.25rem;
  			height: 2.2rem;
  			line-height: 2.2rem;
  			font-size: @font24;
  			text-align: center;
  		}
  		.bj{
  			width: 1.25rem;
  			height: 2.1rem;
  			background: url(../../resources/images/commission/bj.png) no-repeat center;
  			background-size: 0.45rem 0.45rem;
  		}
  		.mr{
  			box-sizing: border-box;
	  		color: #969698;
	  		background: #EBEBEB;
	  		border-left: 1px solid #dcdcdc;
	  		-webkit-box-shadow:-1px 0px 10px #F4F4F4; 
	  		box-shadow:-1px 0px 10px #F4F4F4;
  		}
  		.del{color: #fff;background: #f32f30;}
  	}
  	/*右侧边线*/
  	.userleft:after{
  		position: absolute;
  		top: 50%;
  		margin-top: -0.375rem;
  		right: 0.10rem;
  		content: "";
  		display: block;
  		height: 0.75rem;
  		width: 0.02rem;
  		border-left: 1px solid #e4e4e4;
  	}
 	.swipeleft{transform:translateX(-2.5rem);-webkit-transform:translateX(-2.5rem);}
 	.check{
 		display: block;
 		width: 0.4rem;
 		height: 0.2rem;
 		border-left: 1px solid #fd3331;
 		border-bottom: 1px solid #fd3331;
 		transform: rotate(-45deg);
 		margin-right: 0.2rem;
 	}
	.userleft p{
		position: relative;
		margin-bottom: 0.2rem;
	}
	/*默认*/
	.mricon{
		position: absolute;
		display: inline-block;
		height: 0.3rem;
		width: 0.62rem;
		line-height: 0.3rem;
		border: 1px solid #fd3130;
		border-radius: 0.05rem;
		font-size: 0.10rem;
		color: #fd3130;
		text-align: center;
		margin-left: 0.3rem;
	}
	.btn {
		display: block;
		width: 5.5rem;
		height: 0.75rem;
		line-height: 0.75rem;
		text-align: center;
		margin: 0.5rem auto 1rem;
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
	.kong_box{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #fff;
	}
	.kong{
		.icon{
			width: 2.78rem;
			height: 1.72rem;
			margin:  1.9rem auto 0;
			background: url(../../resources/images/commission/kong_icon.png) no-repeat center;
			background-size: cover;
		}
		.add{
			width: 2.65rem;
			height: 0.73rem;
			margin:  0 auto 0;
			line-height: 0.73rem;
			border-radius: 0.08rem;
			background: #3586f2;
			font-size: @font28;
			color: #fff;
			text-align: center;
		}
		.tip{
			width: 2.65rem;
			height: 0.95rem;
			line-height: 0.95rem;
			margin: 0 auto 0;
			font-size: @font26;
			color: #b2b2b2;
			text-align: center;
		}
	}
</style>

<template>
	<div class="box">
		<div class="list">
			<ul>
				<li v-for="(item,index) in listData" @click="tochanel(item.id)" class="item_list">
					<i class="check" v-if="item.id == id"></i>
					<div class="userleft">
						<p>
							<span>户名：</span>
							<span>{{item.huming}}</span>
							<i class="mricon" v-if='item.isfirst=="1"'>默认</i>
						</p>
						<p>
							<span>开户行：</span>
							<span>{{item.kaihuhang}}</span>
						</p>
						<p>
							<span>银行账号：</span>
							<span>{{item.zhanghao | delkg}}</span>
						</p>
					</div>
					<div class="userright">
						<p class="bj" @click.stop='bjclick(item.id,item.isfirst)'></p>
						<p class="mr" @click.stop="setdefault(item.id)">设置默认</p>
						<p class="del" @click.stop="del(item.id,index)">删除</p>
					</div>
				</li>
			</ul>
		</div>
		<button class="btn btnactive" @click="toadd" v-if="listData.length != 0">+新建收款账号</button>
		<!--当列表为空白的时候显示的样式-->
		<div class="kong_box" v-if="listData.length == 0 && cardshow">
			<div class="kong">
				<p class="icon"></p>
				<p class="tip">暂无账号信息</p>
				<p class="add" @click="toaddcard">立即添加</p>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default{
	data(){
		return{
			listData:[],//个人银行账户列表
			id:'',//选择的银行卡
			cardshow:false,//银行卡列表为空时的状态显示
		}
	},
	created(){
		this.init();
		this.id = this.$route.query.zhid;
	},
	methods:{
		bjclick(id,isfirst){
			this.$router.push({
				path:'/adduser',//跳转到账户数据保存
				query:{
					"zhid":id,//所传参数
					"qdid":this.$route.query.qdid,
					"passzt":this.$route.query.passzt,
					"zhgl":this.$route.query.zhgl,
					"isfirst":isfirst
				}
			})
		},
		init(){//渠道银行账号列表
			var cookxs = JSON.parse(localStorage.getItem('cooknx'));
//			const url = "http://192.168.1.40:8080/yhcms/web/qdyinhangzhanghao/getQdYHZHForQvdao.do";
			const url = this.$api + "/yhcms/web/qdyinhangzhanghao/getQdYHZHForQvdao.do";
			axios.post(url,{
				"cookie":cookxs
            }).then((res)=>{
            	if(res.data.success){
	            	this.listData = res.data.data;
	            	if(this.listData.length == 0){
						this.cardshow = true;
					}
            	}
            }, (err)=>{
				console.log(err);
            });
		},
		setdefault(id){//设置默认
			var cookxs = JSON.parse(localStorage.getItem('cooknx'));
//			const url = "http://192.168.1.40:8080/yhcms/web/qdyinhangzhanghao/setDefaultById.do";
			const url = this.$api + "/yhcms/web/qdyinhangzhanghao/setDefaultById.do";
			axios.post(url,{
				"cookie":cookxs,
				id:id
           }).then((res)=>{
            	location.reload();
            }, (err)=>{
				console.log(err);
            });
		},
		del(id,idx){//删除银行账户
			this.listData.splice(idx,1)
			var cookxs = JSON.parse(localStorage.getItem('cooknx'));
//			const url = "http://192.168.1.40:8080/yhcms/web/qdyinhangzhanghao/deleteYHZH.do";
			const url = this.$api + '/yhcms/web/qdyinhangzhanghao/deleteYHZH.do';
			axios.post(url,{
				"cookie":cookxs,
				id:id
			}).then((res)=>{
//				location.reload();
//				console.log(res);
				if(this.listData.length == 0){
					location.reload();
				}
			},(err)=>{
				console.log(err)
			});
		},
		tochanel(id){
			if(location.hash.indexOf('?') == -1){
				return;
			}else{
				if(this.$route.query.zhgl == 1){
					return;
				}else{
					this.$router.push({
						path:'/channel',//跳转到渠道数据保存
						query:{
							"zhid":id,//所传参数
							"qdid":this.$route.query.qdid,
							"passzt":this.$route.query.passzt
						}
					})									
				}
			}

		},
		toadd(){
			this.$router.push({
				path:'/adduser',//跳转到添加账户功能界面
				query:{
					"qdid":this.$route.query.qdid,
					"passzt":this.$route.query.passzt
				}
			})
		},
		toaddcard(){
			this.$router.push({
				path:'/adduser',//跳转到添加账户功能界面
				query:{
					"qdid":this.$route.query.qdid,
					"passzt":this.$route.query.passzt
				}
			})
		}
	},
	mounted(){
		setTimeout(()=>{//延时一秒为列表添加功能
	        var lines = $(".item_list");// 获取所有行，对每一行设置监听  
	        var len = lines.length;  
	        var lastX,lastXForMobile;  
	        var pressedObj;  // 用于记录被按下的对象  
	        var pressedObj1=[];    //定义一个用于存储滑动过的对象的数组  
	        var start;  // 用于记录按下的点  
		    for (var i = 0; i < len; ++i) {  // 网页在移动端运行时的监听  
		        lines[i].addEventListener('touchstart', function(e) {  
		            lastXForMobile = e.changedTouches[0].pageX;  //记录手指触摸点的横坐标  
		            pressedObj = this;   // 记录被按下的对象  
		            var touches = event.touches[0];    // 记录开始按下时的点  
		            start = {  
		                x : touches.pageX, // 横坐标  
		                y : touches.pageY // 纵坐标  
		            };  
		        });  
		  
                lines[i].addEventListener('touchmove', function(e) {  
        			// 计算划动过程中x和y的变化量  
                    var touches = event.touches[0];  
                    var delta = {  
                        x : touches.pageX - start.x,  
                        y : touches.pageY - start.y  
                    };  
                    // 横向位移大于纵向位移，阻止纵向滚动  
                    if (Math.abs(delta.x) > Math.abs(delta.y)) {  
                        event.preventDefault();  
                    }  
                });  
		  
		        lines[i].addEventListener('touchend', function(e) {  
		            var diffX = e.changedTouches[0].pageX - lastXForMobile;  
		            if (diffX < -100) {  
		                for(var i = 0; i < pressedObj1.length; ++i){  
		                    $(pressedObj1[i]).animate({marginLeft:"0"}, 300);  
		                    //清空数组  
		                    if(i==(pressedObj1.length-1)){  
		                        pressedObj1=[];  
		                    }  
		                }  
		                $(pressedObj).animate({marginLeft : "-2.5rem"}, 300);// 左滑  
		                pressedObj1.push($(this));   
		                //记录被滑的这个对象，已被下一次滑动删除这个对象的左移效果  
		            } else if (diffX > 100) {  
		                $(pressedObj).animate({marginLeft : "0"}, 300);// 右滑  
		            }  
		        });  
		    }
		},1000)
		

	}
}
</script>
