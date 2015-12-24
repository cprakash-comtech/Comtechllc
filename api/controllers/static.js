var express = require("express");
var router  = express.Router()
var path    = require('path');
console.log("path pub is :"+path.join(__dirname,'/../../', 'public'));
router.use(express.static(path.join(__dirname,'/../../', 'public')));
router.get('/',function(req,res){
	res.sendfile('public/index.html');
});
module.exports=router;
