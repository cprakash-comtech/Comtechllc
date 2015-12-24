angular.module("EPA_RFI")
.factory("httpHelper",['$http',function($http){
        return {
            queryByLocation: function (city, state){
                return $http.post('/api/getUVIndex',{
                    city :city,
                    state:state
                });
        }
        } 
    }]);