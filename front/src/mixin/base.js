import md5 from 'crypto-js/md5'

export default {
	data(){
		return {
			module:'',

			formLabelAlign:{},

			paginate:{
	      		page:0,
	      		pageSize:5,
	      		pageList:[5,10,15,20],
	      		total:0,
	      		name:''
      		},

      		tableData: [],
	        tableLoading:true,
	        tableSelect:[],

	        dialogFormVisible:false,

	        allType:[
	        	{
	        		type:1,
	        		text:'新闻分类'
	        	},
	        	{
	        		type:2,
	        		text:'上传分类'
	        	},
	        	{
	        		type:3,
	        		text:'相册分类'
	        	},
	        	{
	        		type:4,
	        		text:'评论分类'
	        	},
	        	{
	        		type:5,
	        		text:'产品分类'
	        	}
	        ],
		}
	},
	methods:{
		//重置表格
		resetTable(module=this.module,query={}){
	      	setTimeout(()=>{
	      		this.tableLoading = false;
	      	},500);
	      	var pageFilter = Object.assign({page:this.paginate.page,rows:this.paginate.pageSize},query);
	      	this.$http.post(`http://localhost:3000/${module}/list`,pageFilter).then((response) => {
	    		this.paginate.total = response.data.total;
	    		this.paginate.pageSize = response.data.limit;
	    		this.paginate.page = response.data.page;
			 	this.tableData = response.data.rows;
			 	this.tableLoading = true;
			})
     	},
     	//增加，修改数据
     	
     	submitData(row,fn=this.resetTable) {
	      	this.dialogFormVisible = true;
	      	var url = '';
	      	if(row._id){
	      		url = `http://localhost:3000/${this.module}/data/${row._id}`;
	      		this.formLabelAlign = row;
	      		// this.formLabelAlign.name = row.name;
	      		// this.formLabelAlign.password = row.password;
	      		// this.formLabelAlign.age = row.age;
	      		// this.formLabelAlign.email = row.email;
	      	}else{
	      		url = `http://localhost:3000/${this.module}/data`;
	      	}
	      	
	  		this.comfirmed = ()=>{
	  			this.$refs.formDialog.validate((valid)=>{
	  				if(valid){
	  					if(this.formLabelAlign.password){
	  						this.formLabelAlign.password = md5(this.formLabelAlign.password).toString();
	  					}
	  					this.$http.post(url,this.formLabelAlign)
	  					.then(()=>{
	  						this.dialogFormVisible = false;
			      			this.$message({
			      				message:'提交成功！',
			      				type:'success'
			      			});
			      			fn();
	  					});
	  				}else{
	  					this.$message({
      						message:'请正确输入!',
      						type:'error'
      					});
      					return false;
	  				}
	  			})

	  		}
        },
        comfirmed(){},	//用于区分是增加还是修改

     	//删除数据 
     	
     	removeData(row,fn=this.resetTable){
	      	var ids = [];
	      	var length = 1;
	      	var selects = this.tableSelect;
	      	if(selects.length < 1 && row._id){
	      		ids.push(row._id);
	      	}else if(selects.length>0){
	      		selects.forEach(v=>ids.push(v._id));
	      		length = selects.length;
	      	}else{
	      		this.$message({
	      			type:'warning',
	      			message:'请选择要删除的项'
	      		})
	      		return false;
	      	}
	      	this.askRemove(length,`http://localhost:3000/${this.module}/data/${ids}`,fn);
      	},

      	askRemove(length,url,fn){
      		this.$confirm(`此操作将会删除这${length}条数据, 是否继续?`, '提示', {
	        	confirmButtonText: '确定',
	        	cancelButtonText: '取消',
	        	type: 'warning'
	        }).then(() => {
	            this.$http.delete(url).then(msg=>{
		            if(msg){
		            	this.$message({
		            	type: 'success',
		            	message: '删除成功!'
			          	});
			          	this.tableSelect = [];	//清空所选的项
			          	fn&&fn();
		            }
		        });     
        	}).catch(() => {
				this.$message({
				type: 'success',
				message: '已取消删除'
				});
	        });
      	},

      	//查找按钮

      	handleIconClick(){
      		this.resetTable(this.module,{name:this.paginate.name});
	    },

	    //分页区间改变

	    handleSizeChange(val) {
	    	this.paginate.pageSize = val;
	    	this.resetTable();
	    },

	    //分页跳转

	    handleCurrentChange(val) {
	    	this.paginate.page = val;
	    	this.resetTable();
	    },
	    handleSelected(selection){
	    	this.tableSelect = selection;
	    },
	    closed(){
	    	this.dialogFormVisible = false;
	    	this.fileList = [];
	    	// this.formLabelAlign.name = '';
      // 		this.formLabelAlign.password = '';
      // 		this.formLabelAlign.age = '';
      // 		this.formLabelAlign.email = '';
      		this.$refs.formDialog.resetFields();
	    }
	},
	created(){
    	this.resetTable();
    }
}