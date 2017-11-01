<template>
	<div style="padding:10px;height:720px;">
		<el-row>
			<el-col :span="24">
				<el-breadcrumb separator="/">
				  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{ path: '/category' }">分类管理</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{ path:`/category` }">{{nowCate}}</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
		</el-row>
		<el-row class="fit" style="margin-top:10px;">
			<el-col :span="4" class="fit" style="box-shadow: 0 0 5px #324157">
				<div style="background-color:#58B7FF; text-align: center; color:#fff; padding:10px 0;"><i class="el-icon-setting" style="margin-right:10px"></i>分类操作</div>
				<el-tree :data="cateList" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"></el-tree>
			</el-col>
			<el-col :span="20" class="fit" style="overflow-y: auto;">
				<div>
					<el-row style="background-color: #eee">
						<el-col :span="23" :offset="1">
							<transition name="el-zoom-in-top">
								<el-button-group v-show="showBtn" class="transition-box">
									<el-button class="transition-box" type="success" icon="plus" @click="handleCateSubmit" style="margin-right:10px;">添加分类</el-button>
									<el-button class="transition-box" type="primary" icon="edit" @click="handleCateSubmit" style="margin-right:10px;">修改分类</el-button>
									<el-button class="transition-box" type="danger" icon="delete" @click="removeData">删除分类</el-button>
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
		    		:prop="item.prop"
		    		:label="item.label"
		    		:width="item.width">
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
		



		<el-dialog title="分类操作" :visible.sync="dialogFormVisible">
			<el-form label-width="80px" :model="formLabelAlign" ref="formDialog">
			  <el-form-item label="分类名称" prop="text" :rules="[{require:true,message:'名称不能为空'}]">
			    <el-input v-model="formLabelAlign.text"></el-input>
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
				reloadBstop:false,	//用于重载树形控件
				defaultProps:{
					children:'children',
					label:'text'
				},
				module:'cate',

				formLabelAlign:{
					text:'',
					type:'',
					parentId:''
				},

				node:'',

				nowCate:'',	//当前操作的分类

				cateIds:[],

				tableFiled:[
					{prop:"title",label:"标题",width:"100"},
					{prop:"author",label:"作者",width:"100"},
					{prop:"subtitle",label:"副标题",width:"120"},
					{prop:"content",label:"内容",width:"290"},
					{prop:"newsdate",label:"发布时间",width:"120"},
					{prop:"user",label:"发布人",width:"120"}
				]
			}
		},
		computed:{
	      ...mapGetters(['cateList'])
	    },
		methods:{
			...mapActions(['cateListInit']),
			handleNodeClick(data){
				this.showBtn = true;
				this.node = data;
				var result = this.allType.filter(v=>v.type==data.type)[0];
				this.nowCate = result.text;
				this.formLabelAlign.type = data.type;
				this.formLabelAlign.parentId = data._id;
				this.resetTable('news',{id:data._id});
			},
			handleCateSubmit(){
				if(this.node){
					this.submitData('',this.cateListInit);
				}else{
					this.submitData(this.node,this.cateListInit);
				}
			},
			removeData(){
				var id = this.node._id;
				var url = `http://localhost:3000/cate/data/${id}`;
				if(id){
					this.askRemove(1,url,()=>this.cateListInit());		
				}else{
					this.$message({
						type:'warning',
						message:'请选择要删除的内容！'
					})
				}
			},
			handleSizeChange(val) {
	    		this.paginate.pageSize = val;
	    		this.resetTable('news');
		    },

		    //分页跳转

		    handleCurrentChange(val) {
		    	this.paginate.page = val;
		    	this.resetTable('news');
		    }
		}
	}
</script>

<style>
	.fit{height:100%;}
</style>