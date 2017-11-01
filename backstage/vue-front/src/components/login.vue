<template>

		<div class="loginBody">
			<p style="position: absolute;text-align: center;width:100%;top:100px;">不登录就进去了算我输</p>
			<div class="loginform">
				<el-form  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="用户名" prop="name">
				    <el-input type="text" auto-complete="off" v-model="name"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="password">
				    <el-input type="password" auto-complete="off" v-model="password"></el-input>
				  </el-form-item>
				  <el-form-item label-width="120px">
				  	<el-button type="primary" size="large" style="width:180px;margin-top:20px;" @click="go">登录</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</div>

	
</template>

<script>
	import {mapGetters,mapActions} from 'vuex';
	import md5 from 'crypto-js/md5'

	export default{
		data(){
			return {
				name:'',
				password:''
			}
		},
		computed:{
			...mapGetters(['login','userId','userName'])
		},
		methods:{
			...mapActions(['checkLogin','getUser']),
			go(){
				this.password = md5(this.password).toString();
				this.$http.post('http://localhost:3000/users/find',{name:this.name,password:this.password})
				.then(msg=>{
					if( msg.data.status !== 404){
						this.getUser(msg.data[0]);
						this.checkLogin(true);
						this.$router.push('/');			//跳转
					}else{
						alert(msg.data.msg);
					}
				})	
			}
		}
	}
</script>

<style>
	html,body{
		height:100%;
	}
	.loginBody{
		background-image:url('../assets/login1.jpg');
		background-size:cover;
		height:100%;
		overflow: hidden;
	}
	.loginform{
		width:350px;
		margin:200px auto 0;
		box-shadow: 0 0 5px black;
		padding:80px 50px 50px 10px;
	}
</style>