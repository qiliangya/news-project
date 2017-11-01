var Comment = require('../models/comment.model');
var mongoose = require('mongoose');

exports.create = (req,res,next)=>{     //参数顺序不能乱，request -> response -> next
    var comment = new Comment(req.body);          //获取数据，并且User模块的实例化
    comment.save().then(data=>res.json(data)); //  将数据转换成JSON格式 存入数据库
    console.log('save success');
    console.log(comment);
}

exports.remove = (req,res,next)=>{
    var ids = req.params.id.split(',');
    var bstop = true;
    ids.forEach((v)=>{
        Comment.findByIdAndRemove(v,(err,doc)=>{
            if(err){
                bstop = false;
            }
        });
    });
    if(bstop){
        res.json({msg:'数据删除成功',status:200});
    }else{
        res.json({msg:'数据删除失败',status:500});
    }
}

exports.update = (req,res,next)=>{
    var id = req.params.id;
    Comment.findByIdAndUpdate(id,{$set:req.body},{new:false}).then(data=>res.json({msg:"数据修改成功",status:200}));
}

exports.list = (req,res,next)=>{
    var page = (req.body.page)?req.body.page:1;
    //需要转成整型
    var rows = parseInt((req.body.rows)?req.body.rows:5);
    var queryCondition = {};
    var name = null;
    var news_id = null;
    if(req.body.name && req.body.name.trim().length > 0){
        name = req.body.name;
        queryCondition = {"name":new RegExp(name,'i')};
    }
    if(req.body.news_id && req.body.news_id.trim().length>0){
        news_id = req.body.news_id;
        queryCondition = {
            "news_id":news_id
        }
    }
    Comment.paginate(queryCondition,{page:page,limit:rows},(err,result)=>{
        //实现动态显示条数
        result.rows = result.docs;
        delete result.docs;    
        res.json(result);
    })
}