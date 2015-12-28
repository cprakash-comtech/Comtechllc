var http = require("http");
var utilObj = {
	getUrl:function(locationObj){
	   var endPointUrl = "http://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/CITY/{CITY}/STATE/{STATE}/JSON";
	   endPointUrl = endPointUrl.replace("{CITY}", locationObj.city);
	   endPointUrl = endPointUrl.replace("{STATE}", locationObj.state);
	   return endPointUrl;
	}
}; 
module.exports = {
	getUVIndexes:function(location,retval,next){
		console.log("In get UVIndexes test travis");
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
				responseObject = JSON.parse(responseString)
			   }catch(e){
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
			retval.success=false;
			retval.errMsg  = "Invalid Api response";
			next(responseObject);
		  }
	        );
		return;
	}
}
