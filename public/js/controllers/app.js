var app = angular.module('EPA_RFI',['ui.router','google.places','ngLoadingSpinner']);
app.config(['$urlRouterProvider',
            '$stateProvider', function($urlRouterProvider,$stateProvider){
  'use strict';
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home',{
      url : '/',
      templateUrl : 'partials/home.html',
      controller : "homeCtrl"
    })
    .state('about',{
      url : '/about',
      templateUrl : 'partials/about.html'
    });
}]);
