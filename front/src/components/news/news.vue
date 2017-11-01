<template>
	<div style="padding:10px;height:720px;">
		<el-row>
			<el-col :span="24">
				<el-breadcrumb separator="/">
				  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{ path: '/news' }">新闻管理</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
		</el-row>
		<el-row class="fit" style="margin-top:10px;">
			<el-col :span="4" class="fit" style="box-shadow: 0 0 5px #324157">
				<div style="background-color:#58B7FF; text-align: center; color:#fff; padding:10px 0;"><i class="el-icon-setting" style="margin-right:10px"></i>新闻分类</div>
				<el-tree :data="cateList[0].children" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"></el-tree>
			</el-col>
			<el-col :span="20" class="fit" style="overflow-y: auto;">
				<div>
					<el-row style="background-color: #eee">
						<el-col :span="23" :offset="1">
							<el-button-group>
								<el-button type="success" icon="plus" @click="submitData" style="margin-right:10px;">添加新闻</el-button>
								<el-button type="danger" icon="delete" @click="removeData">删除新闻</el-button>
							</el-button-group>
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
				      label="操作"
				      width="250">
				      <template scope="scope">
				        <el-button @click="submitData(scope.row)" type="success" size="small">修改</el-button>
				        <el-button type="danger" size="small" @click="removeData(scope.row)">删除</el-button>
				        <el-button type="primary" size="small" @click="catchComment(scope.row)">查看评论</el-button>
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
		



		<el-dialog title="新闻操作" :visible.sync="dialogFormVisible">
			<el-form label-width="80px" :model="formLabelAlign" ref="formDialog" :rules="rules">
			  <el-form-item label="标题" prop="title">
			    <el-input v-model="formLabelAlign.title"></el-input>
			  </el-form-item>
			  <el-form-item label="作者" prop="author">
			    <el-input v-model="formLabelAlign.author"></el-input>
			  </el-form-item>
			  <el-form-item label="副标题" prop="subtitle">
			    <el-input v-model="formLabelAlign.subtitle"></el-input>
			  </el-form-item>
			  <el-form-item label="发布日期" prop="newsdate">
			    <el-date-picker
			      v-model="formLabelAlign.newsdate"
			      align="right"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item label="所属类别" prop="typeId">
			  	<el-select v-model="formLabelAlign.typeId" placeholder="请选择">
				    <el-option
				      v-for="item in cateList[0].children"
				      :key="item._id"
				      :label="item.text"
				      :value="item._id">
				    </el-option>
			  	</el-select>
			  </el-form-item>
			  <el-form-item label="新闻内容" prop="content">
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
				rules:{
					title: [
						    { required: true, message: '请输入标题', trigger: 'blur' },
						    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
						  ],
					作者: [
					{ required: true, message: '请输入作者' }
					],
					subtitle: [
					{ required: true, message: '请输入副标题' }
					],
					typeId: [
					{ required: true, message: '请选择所属类型', trigger: 'change' }
					],
					content: [
					{ required: true, message: '请输入新闻内容', trigger: 'blur' }
					]
				},
				reloadBstop:false,	//用于重载树形控件
				defaultProps:{
					children:'children',
					label:'text'
				},
				module:'news',

				formLabelAlign:{
					title:'',
					author:'',
					subtitle:'',
					newsdate:'',
					typeId:'',
					content:'',
					userId:'',
					type:'',
					parentId:''
				},

				node:'',

				tableFiled:[
					{type:"selection"},
					{prop:"title",label:"标题",width:"100"},
					{prop:"author",label:"作者",width:"100"},
					{prop:"subtitle",label:"副标题",width:"120"},
					{prop:"content",label:"内容",width:"290"},
					{prop:"newsdate",label:"发布时间",width:"120"},
					{prop:"user",label:"发布人",width:"120"},
				]
			}
		},
		computed:{
			...mapGetters(['newsList','cateList']),
		},
		methods:{
			...mapActions(['getNewsData','cateListInit']),
			handleNodeClick(data){
				this.node = data;
				this.formLabelAlign.type = data.type;
				this.formLabelAlign.parentId = data._id;
				this.resetTable('news',{id:data._id});
			},
			catchComment(row){
				this.$router.push({path:`/news/comments?news_id=${row._id}`});
			}
			
		}
	}
</script>

<style>
	.fit{height:100%;}
</style>