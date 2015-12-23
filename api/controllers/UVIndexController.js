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
		console.log("In get UVIndexes");
		var clientReq = http.get(utilObj.getUrl(location),function(res){
			console.log("In response from EPA:1");
			res.setEncoding('utf8');
			var responseString = '';
		  	res.on('data', function (chunk) {
				responseString+=chunk;
		    		//console.log('BODY: ' + chunk);
		  	});
			res.on('end', function() {
			   //console.log("Response String is:"+responseString);
			   var responseObject = JSON.parse(responseString);
			   next(responseObject);
			    console.log('No more data in response.')
			});
			 
		  }
	        );
		return;
	}
}
