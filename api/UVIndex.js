var router = require("express").Router();
var controllerObj = require("./controllers/UVIndexController");
var analyticsManager = require("./controllers/AnalyticsManager");
router.get("/",function(req,res,next){
});
router.post("/",function(req,res){
	var city  = req.body.city;
	var state = req.body.state;
	var place_id = req.body.place_id;
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
				var uvValue = result.UV_VALUE;
				if(uvValue < 3) {
					result.EXPOSURE = "Low";
				}
				if(uvValue >= 3 && uvValue <= 5) {
					result.EXPOSURE = "Moderate";
				}
				if(uvValue >= 6 && uvValue <=7) {
					result.EXPOSURE = "High";
				}
				if(uvValue >=8 && uvValue <=10) {
					result.EXPOSURE = "VeryHigh";
				}
				if(uvValue >= 11) {
					result.EXPOSURE = "Extreme";
				}
				// return Modified array element
				return result;
			}
		});
		retval.data = val; // to be sent to client
		// now increase the visit counter for each city queried
		analyticsManager.updateVisitCount({
			state: state,
			city: city,
			place_id: place_id
		}, function(err, status){
			if(err){
				console.log(err);
			}
			if(status === 'success'){
				console.log("visit count for %s updated!", city);
			}
		});
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
