var mongoose = require('mongoose');
//引入分页插件
var mongoosePaginate = require('mongoose-paginate');


var commentSchema = new mongoose.Schema({
    news_id:String,
    cate_id:String,
    user_id:String,
    commentDate:{type:Date,default:Date.now},
    name:String,
    content:String,
    rate:Number
});

//使用分页插件
commentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment',commentSchema);