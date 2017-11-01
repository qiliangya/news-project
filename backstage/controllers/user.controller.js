var User = require('../models/user.model');
var mongoose = require('mongoose');

exports.create = (req,res,next)=>{     //参数顺序不能乱，request -> response -> next
    var user = new User(req.body);          //获取数据，并且User模块的实例化
    user.save().then(data=>res.json(data)); //  将数据转换成JSON格式 存入数据库
    console.log('save success');
}

exports.remove = (req,res,next)=>{
    var ids = req.params.id.split(',');
    var bstop = true;
    ids.forEach((v)=>{
        User.findByIdAndRemove(v,(err,doc)=>{
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
    User.findByIdAndUpdate(id,{$set:req.body},{new:false}).then(data=>res.json({msg:"数据修改成功",status:200}));
}

exports.find = (req,res,next)=>{
    var querys = req.body;
    User.find(querys,(err,data)=>{
        if(data.length > 0){
            res.json(data);
        }else{
            res.json({msg:'没有该用户',status:404});
        }
    })
}

exports.list = (req,res,next)=>{
    var page = (req.body.page)?req.body.page:1;

    //需要转成整型
    var rows = parseInt((req.body.rows)?req.body.rows:10);
    var queryCondition = {};
    var name = null;
    if(req.body.name && req.body.name.trim().length > 0){
        name = req.body.name;
        queryCondition = {"name":new RegExp(name,'i')};
    }

    User.paginate(queryCondition,{page:page,limit:rows},(err,result)=>{
        //实现动态显示条数
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
    })
}