angular.module("EPA_RFI")
.factory("httpHelper",['$http',function($http){
        return {
            queryByLocation: function (city, state, place_id) {
                return $http.post('/api/getUVIndex', {
                    city: city,
                    state: state,
                    place_id: place_id
                });
            },
            getAnalyticsData : function(){
                return $http.get('/api/getAnalytics');
            }
        } 
    }]);