<template>
	<div class="main-right">
		<el-row>
			<el-col :span="24">
				<el-breadcrumb separator="/">
				  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{ path: '/user' }">查看用户</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
		</el-row>
		<div style="margin-top:20px;">
			<el-row>
				<el-col :span="16">
					<el-button-group>
					  <el-button type="success" icon="plus" @click="submitData">添加</el-button>
					  <el-button type="danger" icon="delete" @click="removeData">删除</el-button>
					</el-button-group>
				</el-col>
				<el-col :span="6">
					<el-input
					  placeholder="请输入姓名"
					  icon="search"
					  v-model="paginate.name"
					  :on-icon-click="handleIconClick">
					</el-input>
				</el-col>
			</el-row>
		</div>
		<el-table
			v-loading="tableLoading"
    		element-loading-text="拼命加载中"
		    :data="tableData"
		    border
		    @select = "handleSelected"
		    style="width: 100%;margin-top:20px; ">
		    <el-table-column
		    type="selection">
		    	
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="名字"
		      width="150">
		    </el-table-column>
		    <el-table-column
			  prop="password"
			  label="密码"
		    >
		    </el-table-column>
		    <el-table-column
		      prop="age"
		      label="年龄"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="email"
		      label="邮箱"
		      >
		    </el-table-column>
		    <el-table-column
		      fixed="right"
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


		<el-dialog title="用户操作" :visible.sync="dialogFormVisible">
			<el-form label-width="80px" :model="formLabelAlign" ref="formDialog" :show-message="false">
			  <el-form-item label="名字" prop="name" :rules="[{require:true,message:'名字不能为空'}]">
			    <el-input v-model="formLabelAlign.name"></el-input>
			  </el-form-item>
			   <el-form-item label="密码" prop="password" :rules="[ { required: true, message: '密码不能为空'},{ type: 'string', message: '密码'}]"
			  >
			  	<el-input type="password" v-model="formLabelAlign.password"></el-input>
			  </el-form-item>
			  <el-form-item label="年龄" prop="age" :rules="[ { required: true, message: '年龄不能为空'},{ type: 'number', message: '年龄必须为数字值'}]"
			  >
			  	<el-input type="age" v-model.number="formLabelAlign.age"></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱" prop="email":rules="[{required:true,message:'邮箱不能为空'},{type:'email',message:'必须输入邮箱',trigger:'blur'}]">
			    <el-input v-model="formLabelAlign.email"></el-input>
			  </el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="comfirmed">确 定</el-button>
				<el-button  @click="closed">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import base from '../../mixin/base.js'
	export default {
	mixins:[base],
	methods:{

	},
    data() {
		return {

			formLabelAlign: {
				name: '',
				password:'',
				age:'',
				email:'',
			},
			aa:{
				name:'',
				password:'',
				age:'',
				email:'',
			},
			module:'users'
		}
    }
    
  }
</script>

<style>
	.el-loading-mask{	/*为了使加载更好看*/
		background-color:#f5f5f5;
	}

	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
























