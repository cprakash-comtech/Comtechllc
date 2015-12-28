angular.module('EPA_RFI')
	.controller('homeCtrl',["$scope","httpHelper", function($scope,httpHelper){
		// Initialize #scope variables
		$scope.noResponseError = false;
		$scope.invalidInputError = false;
		// Options to be passed to google places API
		$scope.autocompleteOptions = {
			componentRestrictions: { country: 'us' },
			types: ['(cities)']
		};
		// Used to remove all error notifications
		$scope.clearErrorBoxes= function(){
			$scope.noResponseError = false;
			$scope.invalidInputError = false;
		};
		// Used to clear the result table and errors
		$scope.clearUI = function () {
			$scope.results = false;
			$scope.location = null
		};
		// called when submit is pressed
		$scope.submit = function (location) {
			console.log(location);
			var city  = ctrlUtil.getCity(location);
			var state = ctrlUtil.getState(location);
			var place_id = location.place_id;
			// http Service
			if(city && state){
				httpHelper.queryByLocation(city , state, place_id).then(
					function(respObj){
						$scope.noResponseError = false;
						var retval = respObj.data;
						if(retval.data.length && retval.success){
							$scope.results = retval.data;
						}
						else if(!retval.data.length){
							// Tell user there was no response
							$scope.noResponseError = true;
							$scope.results = false;
						}
					}
				);
			}
			else{
				// Invalid Input
				$scope.results = false;
				$scope.invalidInputError = true;
			}
		}
}]);
// a object with functions to filter city and state from google places API output
var ctrlUtil = {
	getCity:function(location){
		if(location) {
			var formattedAddress = location.formatted_address.split(',');
			if (formattedAddress) {
				return formattedAddress[0].replace(/[0-9]/g, '').trim();
			}
		}
	},
	getState:function(location){
		if(location) {
			var formattedAddress = location.formatted_address.split(',');
			if (formattedAddress.length) {
				return formattedAddress[1].replace(/[0-9]/g, '').trim();
			}
		}
	}
};

