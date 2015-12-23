var router = require("express").Router();
var controllerObj = require("./controllers/UVIndexController");
router.get("/",function(req,res,next){
});
router.post("/",function(req,res){
	var city  = req.body.city;
	var state = req.body.state;
	var location = {
	  city:city,
	  state:state
    };
	var retval = {
	  success :true
	};
	if(city && state){
	  controllerObj.getUVIndexes(location,retval,function(val){
		retval.data = val;
		res.send(retval);
	   });
        }
	else{
	  retval.success = false;
	  retval.errMsg  = "Invalid State or City";
	  res.send(retval);
	}
	
});
module.exports = router;
