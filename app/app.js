/*
angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }
  });
})

;
*/

'use strict';

angular.module('kgcApp', [
        'ngRoute',
        'kgcApp.home',
        'kgcApp.about',
        'kgcApp.finance',
        'kgcApp.service',
        'kgcApp.project',
        'kgcApp.gallery',
        'kgcApp.contact'
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]).
    controller('KgcAppCtrl',['$scope','$log','$rootScope',function($scope,$log,$rootScope){

//      ==================================== [START] Initialize variables for controller ===============================
        $scope.NavDrawer = { isOpen : false };
//      ==================================== [END] Initialize variables for controller =================================

//      ==================================== [START] All methods inside controller =====================================
        $scope.NavDrawer.toggle = function(){
            $scope.NavDrawer.isOpen = !$scope.NavDrawer.isOpen;
        };

        $scope.NavDrawer.reset = function(){
            $scope.NavDrawer.isOpen = false;
        };

//      ==================================== [END] All methods inside controller =======================================

//      ==================================== [START] All logic inside controller =======================================
        $rootScope.$on("$routeChangeStart",function(event, next, current){
            $scope.NavDrawer.reset();
        });
//      ==================================== [END] All logic inside controller =========================================



    }]);

