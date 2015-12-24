angular.module('EPA_RFI')
  .controller('homeCtrl',["$scope","httpHelper", function($scope,httpHelper){
	$scope.noResponseError = false;
	$scope.invalidInputError = false;
    $scope.autocompleteOptions = {
      componentRestrictions: { country: 'us' },
      types: ['(cities)']
    };
	$scope.clearErrorBoxes= function(){
		$scope.noResponseError = false;
		$scope.invalidInputError = false;
	}
	$scope.clearUI = function () {
		$scope.results=[];
		$scope.location = null
	};
    $scope.submit = function (location) {
		var city  = ctrlUtil.getCity(location);
		var state = ctrlUtil.getState(location);
		// http Service
		if(city && state){
			httpHelper.queryByLocation(city , state).then(
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
var ctrlUtil = {
 	getCity:function(location){
		if(location && location.address_components && location.address_components.length 
			&& location.address_components[0].long_name){
			return location.address_components[0].long_name;
		}
	},
	getState:function(location){
		if(location && location.address_components && location.address_components.length 
			&& location.address_components.length>=3){
			return location.address_components[2].short_name;
		}
	}
};

