var Upload = require('../models/upload.model');
var User = require('../models/user.model');
var Cate = require('../models/cate.model');
var multer = require('multer');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

var filePath = '';
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads');
    },
    filename:(req,file,cb)=>{
        filePath = file.fieldname + '-' + Date.now()+path.extname(file.originalname);
        cb(null,filePath);
    }
})

exports.remove = (req,res,next)=>{

     var ids = req.params.id.split(',');

    var bstop = true;
    ids.forEach((v)=>{
        Upload.findByIdAndRemove(v,(err,doc)=>{
            if(err){
                bstop = false;
            }
            fs.unlink('./uploads/'+doc.path, function(err){
             if(err){
              throw err;
             }
             console.log('文件:'+doc.path+'删除成功！');
            });
        });
    });
    if(bstop){
        res.json({msg:'数据删除成功',status:200});
    }else{
        res.json({msg:'数据删除失败',status:500});
    }

    // var filepath = '126.txt';
    
}

exports.upload = (req,res,next)=>{
    var upload = multer({
        storage:storage,
        fileFilter:(req,file,callback)=>{
            var ext = path.extname(file.originalname);
            if(ext !== '.png'){
                return callback(res.end('文件类型不符合'))
            }
            callback(null,true);
        }
    }).single('avatar');

    upload(req,res,err=>{
        var saveData = {};
        var originalname = req.file.originalname.split('.');
        saveData.name = originalname[0];
        saveData.fileType = originalname[1];
        saveData.userName = req.body.userName;
        saveData.path = filePath;
        var uploadSave = new Upload(saveData);
        uploadSave.save().then(data=>res.json(data));
        console.log('save success');
    })
}

exports.list = (req,res,next)=>{
    var page = (req.body.page)?req.body.page:1;

    //需要转成整型
    var rows = parseInt((req.body.rows)?req.body.rows:5);
    var queryCondition = {};
    var name = null;
    if(req.body.name && req.body.name.trim().length > 0){
        name = req.body.name;
        queryCondition = {"name":new RegExp(name,'i')};
    }
    
    Upload.paginate(queryCondition,{page:page,limit:rows},(err,result)=>{
        //实现动态显示条数
            result.rows = result.docs;
            delete result.docs;
            res.json(result);
    })
}
