
var mongoose = require('mongoose'),
materializedPlugin=require('mongoose-materialized'),
Schema=mongoose.Schema;

var CateSchema=new Schema({//定义分类
    text:{type:String},
    id:{type:String},
    type:{type:Number}	//	1 新闻分类  2上传分类
});

CateSchema.plugin(materializedPlugin);
module.exports=mongoose.model('Cate',CateSchema,'cate');//Category