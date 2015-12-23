/**
 * Created by syedf on 12/20/2015.
 */
var app = angular.module('EPA_RFI',['ui.router','google.places']);

  app.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider){
    "use strict";
    $urlRouterProvider.otherwise('/');
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
