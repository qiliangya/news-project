<template>
	<div class="container">
    	<!-- 头部导航 -->
	    <v-header></v-header>

	    <el-row>
	      <el-col :span="4" class="main-left">
	        <v-sider></v-sider>
	      </el-col>
	      <el-col :span="20">
	        <router-view></router-view>
	      </el-col>
	    </el-row>
	    <v-footer></v-footer>
	</div>
</template>

<script>
	import vHeader from './header.vue'
	import vSider from './sider.vue'
	import vFooter from './footer.vue'
	import {mapGetters,mapActions} from 'vuex';

	export default {
	  components:{
	    vHeader,
	    vSider,
	    vFooter
	  },
	  computed:{
      ...mapGetters(['cateList','newsList'])
	    },
      methods:{
      ...mapActions(['cateListInit','getNewsData'])
      },
	  created(){
	  	this.cateListInit();
	  	this.getNewsData();
	  },
	}
</script>

<style>
body{

}
.container{
  width:1280px;
  margin:0 auto;
}
/* 头部导航 */
.logo{
  font:700 24px/60px "";
  padding-left:30px;
  color:#bfcbd9;
}
/* 主内容区 */
.main-left{min-height:760px;background-color: #324157;}
.main-right{padding:10px;height:740px;overflow:hidden;}
/* 底部 */
footer{
  color:#bfcbd9;
  text-align: center;
  font:16px/98px "";
  background-color: #324157;
}
</style>