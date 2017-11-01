<template>
	<div style="padding:10px;height:720px;">
		<el-row>
			<el-col :span="24">
				<el-breadcrumb separator="/">
				  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{ path: '/upload' }">上传管理</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
		</el-row>
		<el-row class="fit" style="margin-top:10px;">
			<el-col :span="4" class="fit" style="box-shadow: 0 0 5px #324157">
				<div style="background-color:#58B7FF; text-align: center; color:#fff; padding:10px 0;"><i class="el-icon-setting" style="margin-right:10px"></i>上传分类</div>
				<el-tree :data="cateList[1].children" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true"></el-tree>
			</el-col>
			<el-col :span="20" class="fit" style="overflow-y: auto;">
				<div>
					<el-row style="background-color: #eee">
						<el-col :span="23" :offset="1">
							<el-button-group>
								<el-button type="success" icon="plus" @click="submitData" style="margin-right:10px;">上传文件</el-button>
								<el-button type="danger" icon="delete" @click="removeData">删除文件</el-button>
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
				      width="200">
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
		



		<el-dialog title="上传操作" :visible.sync="dialogFormVisible">
			<el-form label-width="80px" :model="formLabelAlign" ref="formDialog">
			</el-form>
			<el-upload
			  class="upload-demo"
			  action="http://localhost:3000/upload/upload"
			  name="avatar"
			  :data="{'userName':$store.getters.userName}"
			  :on-success="uploadSuccess"
			  :on-error="uploadError"
			  :file-list="fileList"
			  ref="upload"
			  :multiple="false"
			  :auto-upload="false"
			  list-type="picture">
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="uploadSubmit">确 定</el-button>
				<el-button  @click="closed">取 消</el-button>
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
				reloadBstop:false,	//用于重载树形控件
				defaultProps:{
					children:'children',
					label:'text'
				},
				module:'upload',

				formLabelAlign:{
					type:'',
					parentId:''
				},

				node:'',

				fileList:[],

				tableFiled:[
					{type:"selection"},
					{prop:"name",label:"文件名称"},
					{prop:"path",label:"文件路径"},
					{prop:"fileType",label:"文件类型"},
					{prop:"userName",label:"上传用户"},
					{prop:"date",label:"上传时间"},
					
				]
			}
		},
		computed:{
			...mapGetters(['cateList']),
		},
		methods:{
			...mapActions(['cateListInit']),


			uploadSuccess(res,file,fileList){
				this.$message({
					type:'success',
					message:'上传成功！'
				});
				this.dialogFormVisible = false;
			},
			uploadError(err,file,fileList){
				this.$message({
					type:'error',
					message:`发生了错误，${err}`
				});
			},
			uploadSubmit(){
				this.$refs.upload.submit();
			},
			handleNodeClick(data){
				this.node = data;
				this.formLabelAlign.type = data.type;
				this.formLabelAlign.parentId = data._id;
				this.resetTable('upload',{id:data._id});
			}
			
		},
		watch:{
			dialogFormVisible(){
				if(!this.dialogFormVisible){
					this.fileList = [];
					this.resetTable();
				}
			}
		}
	}
</script>

<style>
	.fit{height:100%;}
</style>