var Cate = require('../models/cate.model');
var mongoose = require('mongoose');

exports.create = (req,res,next)=>{
    var cate = new Cate(req.body);
    cate.save().then(data=>res.json(data));
    console.log('save success');
}

exports.update = (req,res,next)=>{
    var id = req.params.id;
    Cate.findByIdAndUpdate(id,{$set:req.body},{new:false}).then(data=>res.json({msg:"数据修改成功",status:200}));
}

function reverseTree(data,pid){//pid=>parentId
    var result=[],
    temp;
    var data=JSON.parse(JSON.stringify(data));//将数据模型的data转化成了普通的json对象
                                //data为数据模型时，不能对其添加属性，所以需要转化为普通json对象。
    for(var i in data){
        data[i].id = data[i]._id;
        if(data[i].parentId===pid){
            result.push(data[i]);//第一层操作：把parentId=null的放入了result中。第二层操作：把以上一层加入result中的数据的_id作为parentId的数据加入result。。。。。。
            temp=reverseTree(data,data[i]._id);//递归操作。
            if(temp.length>0){//>0表示数据不止一层，所以可以添加children属性
                data[i].children=temp;//给对象增加了一个属性（children）
            }
        }
    }
    return result;
}

//查找
exports.list = function(req,res,next){
    var id = null;
    if(req.body.t_id && req.body.t_id.trim().length > 0){
        id = req.body.t_id;
        Cate.findById(id,function(err,result){
            res.json(result);
        })
    }else{
        Cate.find({},function(err,data){
            var rpTree=reverseTree(data,null);//parentId默认为空
            res.json(rpTree);
       })
    }
   
}

exports.remove=function(req,res,next){
    var id=req.params.id;
    var ids=[];//删掉的是个数组

    Cate.findOne({_id:id},function(err,doc){
        if(doc){
            ids=[doc._id];//因为用的是getchildren不包括自己，所以需要先将自己放到数组中
            
            doc.getChildren().then(function(docs){//多个子代
                for(var i=0;i<docs.length;i++){
                    ids.push(docs[i]._id)//getchildren可以将嵌套关系变成平行关系，所以可以直接进行for循环
                }


                Cate.remove({_id:{$in:ids}})
                .then(data=>{
                    res.json({"msg":"数据删除成功",status:200})
                })
            })
        }
    });
}