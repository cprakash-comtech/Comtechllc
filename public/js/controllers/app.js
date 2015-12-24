var app = angular.module('EPA_RFI',['ui.router','google.places','ngLoadingSpinner']);

  app.config(['$urlRouterProvider','$stateProvider','$locationProvider', function($urlRouterProvider,$stateProvider,$locationProvider){
    "use strict";
    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode({
    //  enabled: true,
    //  requireBase: false
    //});
    $stateProvider
      .state('home',{
        url: '/',
        templateUrl: 'partials/home.html',
        controller: "homeCtrl"
      })
      .state('about',{
        url:'/about',
        templateUrl : 'partials/about.html'
      });
      //.state('header',{
      //  templateUrl: 'partials/header.html',
      //  controller : 'navCtrl'
      //})
      //.state('footer',{
      //  templateUrl: "partials/footer.html",
      //  controller : 'navCtrl'
      //})

  }]);
