var express 	=  require("express");
var bodyParser 	=  require("body-parser");
var analytics = require("./api/controllers/analyticsManager");
var mongoose = require('./db');   // Initialize the DB
var app = express();
app.use(bodyParser.json());
console.log("In Server.js");
app.listen(process.env.PORT || 3000,function(){
	console.log("Server listening on 3000");
});
app.use('/',require('./api/controllers/static'));
app.use('/api/getUVIndex', require('./api/UVIndex'));
app.get('/api/getAnalytics', analytics.getAnalytics);
