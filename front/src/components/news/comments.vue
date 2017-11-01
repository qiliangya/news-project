<template>
	<div style="padding:10px;height:720px;">
		<el-row>
			<el-col :span="24">
				<el-breadcrumb separator="/">
				  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{ path: '/news' }">新闻管理</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{ path:`/news/comments` }">评论管理</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
		</el-row>
		<el-row class="fit" style="margin-top:10px;">
			<el-col :span="4" class="fit" style="box-shadow: 0 0 5px #324157">
				<div style="background-color:#58B7FF; text-align: center; color:#fff; padding:10px 0;"><i class="el-icon-setting" style="margin-right:10px"></i>评论操作</div>
				<!-- 由于加载过慢，这里得做个一个判断 -->
				<el-tree :data="cateList[0].children" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"></el-tree>
			</el-col>
			<el-col :span="20" class="fit" style="overflow-y: auto;">
				<div>
					<el-row style="background-color: #eee">
						<el-col :span="23" :offset="1">
							<transition name="el-zoom-in-top">
								<el-button-group v-show="showBtn" class="transition-box">
									<el-button class="transition-box" type="success" icon="plus" @click="handleCateSubmit" style="margin-right:10px;">添加评论</el-button>
									<el-button class="transition-box" type="danger" icon="delete" @click="removeData">删除评论</el-button>
								</el-button-group>
						    </transition>
						</el-col>
					</el-row>
				</div>
				<el-table 
					v-loading="tableLoading"
		    		element-loading-text="拼命加载中"
		    		:data="tableData"
				    @select = "handleSelected"
				    style="width: 100%; "
				    >
				    <el-table-column
		    		v-for="(item,index) in tableFiled"
		    		:key="index"
		    		:type="item.type"
		    		:prop="item.prop"
		    		:label="item.label"
		    		:width="item.width">
		    		</el-table-column>
		    		<el-table-column
					prop="rate"
					label="评分"
					width="200"
		    		>
		    		<template scope="scope">
		    		<!--关键评分-->
		    			<el-rate
		    			  v-model="scope.row.rate"			
		    			  :disabled="true"
						  >
						</el-rate>
		    		</template>
		    		</el-table-column>
		    		<el-table-column
				      label="操作"
				      width="150">
				      <template scope="scope">
				        <el-button @click="submitData(scope.row)" type="success" size="small">修改</el-button>
				        <el-button type="danger" size="small" @click="removeData(scope.row)">删除</el-button>
				      </template>
				    </el-table-column>	
				</el-table>
				<el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="paginate.page"
			      :page-sizes="paginate.pageList"
			      :page-size="paginate.pageSize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="paginate.total">
			    </el-pagination>
			</el-col>
		</el-row>
		

		<el-dialog title="评论操作" :visible.sync="dialogFormVisible">
			<el-form label-width="80px" :model="formLabelAlign" ref="formDialog">
			  <el-form-item label="用户名" prop="name" :rules="[{require:true,message:'名称不能为空'}]">
			    <el-input v-model="formLabelAlign.name"></el-input>
			  </el-form-item>
			  <el-form-item label="所属新闻标题" prop="news_id" :rules="[{require:true,message:'标题不能为空'}]">
			    <el-select v-model="formLabelAlign.news_id" placeholder="请选择">
				    <el-option
				      v-for="item in newsList"
				      :key="item._id"
				      :label="item.title"
				      :value="item._id">
				    </el-option>
			  	</el-select>
			  </el-form-item>
			  <el-form-item label="您对该新闻的评价" prop="rate">
			  	<el-rate
    			  v-model="formLabelAlign.rate"
				  :show-text="true">
				</el-rate>
			  </el-form-item>
			    <el-form-item label="评论内容" prop="content" :rules="[{require:true,message:'评论不能为空'}]">
			    	<el-input
					  type="textarea"
					  :rows="2"
					  :cols="5"
					  placeholder="请输入内容"
					  v-model="formLabelAlign.content">
					</el-input>
			  	</el-form-item>
				</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="comfirmed">确 定</el-button>
				<el-button  @click="dialogFormVisible = false">取 消</el-button>
			</div>
		</el-dialog>	
	</div>
</template>

<script>
	import base from '../../mixin/base.js'
	import {mapGetters,mapActions} from 'vuex';
	export default{
		mixins:[base],
		data(){
			return {
				showBtn:false,
				tree:[],
				reloadBstop:false,	//用于重载树形控件
				defaultProps:{
					children:'children',
					label:'text'
				},
				module:'comment',

				formLabelAlign:{
					name:'',
					news_id:'',
					content:'',
					rate:1,
					type:'',
					parentId:''
				},
				node:'',
				nowCate:'',	//当前操作的分类

				cateIds:[],

				tableFiled:[
					{type:"selection"},
					{prop:"name",label:"姓名",width:"100"},
					{prop:"content",label:"内容",width:"340"},
					{prop:"commentDate",label:"发布时间",width:"220"}
				]
			}
		},
		computed:{
			...mapGetters(['newsList','cateList']),
		},
		methods:{
			...mapActions(['getNewsData','cateListInit']),
			handleNodeClick(data){
				this.showBtn = true;
				this.node = data;
				var result = this.allType.filter(v=>v.type==data.type)[0];
				this.nowCate = result.text;
				this.formLabelAlign.type = data.type;
				this.formLabelAlign.parentId = data._id;
				this.resetTable('comment',{cate_id:data._id});
			},
			handleCateSubmit(){
				if(this.node){
					this.submitData('',this.setCateInit);
				}else{
					this.submitData(this.node,this.setCateInit);
				}
			},
			handleSizeChange(val) {
	    		this.paginate.pageSize = val;
	    		this.resetTable('comment');
		    },

		    //分页跳转

		    handleCurrentChange(val) {
		    	this.paginate.page = val;
		    	if(this.$router.history.current.query.news_id){
					var news_id = this.$router.history.current.query.news_id;
					this.resetTable('comment',{news_id:news_id});
				}else{
					this.resetTable('comment');
				}
		    }
		}
	}
</script>

<style>
	.fit{height:100%;}
</style>