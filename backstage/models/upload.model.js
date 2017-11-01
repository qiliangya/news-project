var mongoose = require('mongoose');
//引入分页插件
var mongoosePaginate = require('mongoose-paginate');

//创建一个user集合
var uploadSchema = new mongoose.Schema({
    name:String,
    date:{type:Date,default:Date.now},
    userName:String,
    fileType:String,
    path:String
});

//使用分页插件
uploadSchema.plugin(mongoosePaginate);

//将该user模型暴露
module.exports = mongoose.model('Upload',uploadSchema);