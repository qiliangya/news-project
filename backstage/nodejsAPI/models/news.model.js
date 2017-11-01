var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var newsSchema = new mongoose.Schema({
    title:String,
    author:String,
    subtitle:String,
    content:String,
    newsdate:{type:Date,default:Date.now},
    typeId:String,
    user_id:{type:String,default:'59cc546f95f33c1a6c50aba7'},
    user:{type:String}
});

//使用分页插件
newsSchema.plugin(mongoosePaginate);

//将该user模型暴露
module.exports = mongoose.model('News',newsSchema);