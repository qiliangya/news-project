var mongoose = require('mongoose');
//引入分页插件
var mongoosePaginate = require('mongoose-paginate');

//创建一个user集合
var userSchema = new mongoose.Schema({
    name:String,
    password:String,
    age:Number,
    email:String
});

//使用分页插件
userSchema.plugin(mongoosePaginate);

//将该user模型暴露
module.exports = mongoose.model('User',userSchema);