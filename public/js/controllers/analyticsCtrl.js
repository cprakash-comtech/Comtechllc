angular.module('EPA_RFI')
    .controller("analyticsCtrl",["$scope","httpHelper",function($scope,httpHelper){
        httpHelper.getAnalyticsData().success(function(data){
          $scope.labels = _.pluck(data, 'city');
          $scope.data = _.pluck(data, 'visitCount');
        })
}]);