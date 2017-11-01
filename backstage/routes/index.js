var express = require('express');
var router = express.Router();
var path = require('path');
var multiparty = require('multiparty');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/images',function(req,res,next){
  var imgUrl = req.query.imgUrl;
  fs.readFile(`./uploads/${imgUrl}`,'binary',(err,file)=>{
    if(err){
      res.json('出错');
    }else{
      res.write(file,'binary');
      res.end();
    }
  });
});


module.exports = router;
