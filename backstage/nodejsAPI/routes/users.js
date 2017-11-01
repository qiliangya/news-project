var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/user.controller');

router.post('/data',dataCtrl.create);
router.delete('/data/:id',dataCtrl.remove);
router.post('/data/:id',dataCtrl.update);
router.post('/list',dataCtrl.list);
router.post('/find',dataCtrl.find);



module.exports = router;
