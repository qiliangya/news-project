var News = require('../models/news.model');
var User = require('../models/user.model');
var Cate = require('../models/cate.model');
var mongoose = require('mongoose');

exports.create = (req,res,next)=>{     //参数顺序不能乱，request -> response -> next
    var news = new News(req.body);          //获取数据，并且User模块的实例化
    news.save().then(data=>res.json(data)); //  将数据转换成JSON格式 存入数据库
    console.log('save success');
}

exports.remove = (req,res,next)=>{
    var ids = req.params.id.split(',');
    var bstop = true;
    ids.forEach((v)=>{
        News.findByIdAndRemove(v,(err,doc)=>{
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
    News.findByIdAndUpdate(id,{$set:req.body},{new:false}).then(data=>res.json({msg:"数据修改成功",status:200}));
}

exports.find = (req,res,next)=>{
    var query = req.body.query || {};
    News.find(query,function(err,data){
        res.json(data);
   })
}


exports.list = (req,res,next)=>{
    var page = (req.body.page)?req.body.page:1;

    //需要转成整型
    var rows = parseInt((req.body.rows)?req.body.rows:5);
    var id = req.body.id || null;
    var ids = [];
    var queryCondition = {};
    var title = null;
    if(req.body.title && req.body.title.trim().length > 0){
        title = req.body.title;
        queryCondition = {"title":new RegExp(title,'i')};
    }
    if(req.body.news_id && req.body.news_id.trim().length > 0){
        news_id = req.body.news_id;
        News.findById(news_id,function(err,result){
            res.json(result);
        });
        return ;
    }
    //mongodb查询操作是并发异步执行的，所以queryCondition会不同步
    
    News.paginate(queryCondition,{page:page,limit:rows},(err,result)=>{
        //实现动态显示条数
        if(id !== null){
            Cate.findOne({_id:id},(err,doc)=>{
                if(doc){
                    ids = [doc._id];
                    doc.getChildren().then(docs=>{
                        for(var i = 0;i<docs.length;i++){
                            ids.push(docs[i]._id);
                        }
                        News.find({"typeId" : {$in:ids}},(err,data)=>{
                            result.rows = data;
                            findUser();
                        })
                    })
                }
            })
        }else{
            result.rows = result.docs;
            delete result.docs;
            findUser();
        }




        function findUser(){
            if(result.rows.length > 0){         //这里要用length来判断数组是否为空
                User.findById(result.rows[0].user_id,function(err,project){ //得引入User
                    if(err){
                        console.log(err);
                    }
                }).then(data=>{
                    if(data){
                        result.rows.forEach(v=>{    //如果不用循环遍历，则只会第一个获得发布人信息
                            if(data.name){
                                v.user = data.name;
                            }
                        })
                    }
                    res.json(result);
                })
            }else{
                res.json(result);
            }
        }
        
    })
}