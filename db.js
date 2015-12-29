var mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI || 'mongodb://localhost/epa_uvindex';
try{
	mongoose.connect(url,	function(err){
		if(err){
			console.log("Failed to initialize Mongoose, Check if Mongo server is running!");
			process.exit(1);
		}
		else
			console.log("mongodb connected");
	});
}
catch(e) {
	console.log("error caught", e);
}
module.exports = mongoose;
