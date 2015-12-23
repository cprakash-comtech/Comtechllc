/**
 * Created by syedf on 12/20/2015.
 */
angular.module('EPA_RFI')
  .controller('homeCtrl',["$scope","$http", function($scope,$http){
    $scope.autocompleteOptions = {
      componentRestrictions: { country: 'us' },
      types: ['geocode']
    };
    $scope.submit = function (location) {
      var city  = ctrlUtil.getCity(location);
      var state = ctrlUtil.getState(location);
      $http.post('/api/getUVIndex', {
		city :city,
		state:state
      }).then(
	function(respObj){
           var retval = respObj.data;
	   if(retval && retval.success){
             $scope.results = retval.data;
	   }
	}
      );
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
}

