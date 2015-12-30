describe('Home Controllers', function(){
	beforeEach(module('EPA_RFI'));
	var scope, ctrl, $httpBackend,httpHelper;
	beforeEach(inject(function(_$httpBackend_,_httpHelper_, $rootScope, $controller) {
		$httpBackend = _$httpBackend_;
		httpHelper   = _httpHelper_;
		scope ={};
		ctrl = $controller('homeCtrl', {$scope: scope});
	}));
	it('should clear error boxes',function(){
		scope.clearErrorBoxes();
		expect(scope.noResponseError).to.be.false;
		expect(scope.invalidInputError).to.be.false;
	});
	it('service should get uvindexes',function(){
		var testResut = {"success":true,"data":[
			{"SEQUENCE":1,"CITY":"ATLANTA","STATE":"GA",
			"DATE_TIME":"DEC/29/2015 06 AM","UV_VALUE":0,"EXPOSURE":"Low"}]};
		 $httpBackend.whenPOST('/api/getUVIndex')
  			.respond(testResut);
		 httpHelper.queryByLocation("ATLANTA","GA").then(function(retval) {
			expect(retval.data.success).to.be.true;
			expect(retval.data.data.SEQUENCE).to.equal(testResut.data.SEQUENCE);
			expect(retval.data.data.CITY).to.equal(testResut.data.CITY);
    		});
		$httpBackend.flush();	
	});
	
});

