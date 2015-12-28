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
		// group the UV indexes into categories
		val.map(function(result){
			if(result){
				var UV_VALUE = result.UV_VALUE;
				if(UV_VALUE < 3)
					result['EXPOSURE'] = "Low";
				if(UV_VALUE >= 3 && UV_VALUE <= 5)
					result['EXPOSURE'] = "Moderate";
				if(UV_VALUE >= 6 && UV_VALUE <=7)
					result['EXPOSURE'] = "High";
				if(UV_VALUE >=8 && UV_VALUE <=10)
					result['EXPOSURE'] = "VeryHigh";
				if(UV_VALUE >= 11)
					result['EXPOSURE'] = "Extreme";
				// return Modified array element
				return result;
			}
		});
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
