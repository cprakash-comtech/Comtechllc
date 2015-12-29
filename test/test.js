var request = require('superagent');
var expect  = require('expect.js');
var http    = require('http');
var assert  = require('assert');
//TODO: Pick server url automatically
//TODO: Find better way to force fail with some message
var host    = 'infinite-atoll-4296.herokuapp.com';
describe('Suite one', function(){
  it('test server available',function(done){
	
  	 http.get("http://"+host,function(res){
   		expect(res).to.exist;
		expect(res.statusCode).to.equal(200);
		done();
  	});
	
  });
  it('Check UV Indexes',function(done){
	var postData = JSON.stringify({city: '', state: ''});
	var options = {
  		host: host,
  		path: '/api/getUVIndex',
  		method: 'POST',
		headers: {
		    'Content-Type': 'application/json',
		    'Content-Length': postData.length
  		}
	};

	var req = http.request(options, function(res) {
		expect(res).to.exist;
		expect(res.statusCode).to.equal(200);
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		var respString = ""
  		res.on('data', function (chunk) {
    			respString+=chunk;
		});
		res.on('end', function() {
			var responseObject = null;
			try{
				responseObject = JSON.parse(respString);
				if(responseObject.success!==false && responseObject.success!==true){
					assert.equal(responseObject.success,undefined);
					assert.equal(responseObject.success,null);
					assert.equal(responseObject.success,"");
				}
				
			}catch(e){
				console.log("Error while parsing response:",e,responseObject);
				console.log("Error is",e);
				assert.equal(false,true);
				
			}
			done();
  		});
		
  	});
	req.on('error', function(e) {
		console.log("*********** force failing");
  		console.log('problem with request: ' + e.message,e);
		//Force fail
		assert.equal(false,true);
		done();
	});
	req.write(postData);
	req.end();
 });



});
