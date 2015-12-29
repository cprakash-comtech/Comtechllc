var http = require("http");
var UVLOW_CONSTANT		=2;
var UVMODERATE_MIN_CONSTANT	=3;
var UVMODERATE_MAX_CONSTANT	=5;
var UVHIGH_MIN_CONSTANT		=6;
var UVHIGH_MAX_CONSTANT	    	=7;
var UVVERYHIGH_MIN_CONSTANT 	=8;
var UVVERYHIGH_MAX_CONSTANT  	=10;
var UVEXTREME_MIN_CONSTANT  	=11;
var utilObj = {
	getUrl:function(locationObj){
	   var endPointUrl = "http://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/CITY/{CITY}/STATE/{STATE}/JSON";
	   endPointUrl = endPointUrl.replace("{CITY}", locationObj.city);
	   endPointUrl = endPointUrl.replace("{STATE}", locationObj.state);
	   return endPointUrl;
	},
	categorizeUVIndexes:function(uvIndexes){
		// group the UV indexes into categories
		if(uvIndexes && uvIndexes.length){
			uvIndexes.map(function(result){
				if(result){
					var uvValue = result.UV_VALUE;
					if(uvValue <=UVLOW_CONSTANT) {
						result.EXPOSURE = "Low";
					}
					else if(uvValue >= UVMODERATE_MIN_CONSTANT && uvValue <= UVMODERATE_MAX_CONSTANT) {
						result.EXPOSURE = "Moderate";
					}
					else if(uvValue >= UVHIGH_MIN_CONSTANT && uvValue <=UVHIGH_MAX_CONSTANT) {
						result.EXPOSURE = "High";
					}
					else if(uvValue >=UVVERYHIGH_MIN_CONSTANT && uvValue <=UVVERYHIGH_MAX_CONSTANT) {
						result.EXPOSURE = "VeryHigh";
					}
					else if(uvValue >= UVEXTREME_MIN_CONSTANT) {
						result.EXPOSURE = "Extreme";
					}
					// return modified element
					return result;
				}
			});
		}
		
	}
	
}; 
module.exports = {
	// get UV Indexes as per user input
	getUVIndexes:function(location,retval,next){
		console.log("In get UVIndexes");
		var clientReq = http.get(utilObj.getUrl(location),function(res){
			console.log("In response from EPA:1");
			res.setEncoding('utf8');
			var responseString = '';
		  	res.on('data', function (chunk) {
				if(chunk){
				     responseString+=chunk;
				}
				
		  	});
			res.on('end', function() {
			   console.log("Response end Received");
			   var responseObject = null;
			   try{
				responseObject = JSON.parse(responseString);
				utilObj.categorizeUVIndexes(responseObject);
			   }catch(e){
				//Handle Error in case the EPA service is unavailable
				console.log("Error while parsing response:",responseString);
			      	console.log("Error is",e);
				retval.success=false;
				retval.errMsg  = "Invalid Api response";
                           }
			   next(responseObject);
			   console.log('No more data in response.')
			});
			 
		  },function(res){
			console.log("In error callback");
			var responseObject = null;
			retval.success=false;
			retval.errMsg  = "Invalid Api response";
			next(responseObject);
		  });
		return;
	}
}
