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
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]).
    directive('material', [function () {
        return {
            restrict: 'A',
            compile: function (tElement, tAttrs) {
                var ripple = angular.element("<span class='ripple'></span>");
                tElement.prepend(ripple);

                return function (scope, iElement, iAttrs) {

                    var _setRippleSize = function (ripple, e) {
                        if (!ripple.prop('offsetHeight') && !ripple.prop('offsetWidth')) {
                            var size = Math.max(e.target.offsetWidth, e.target.offsetHeight);
                            ripple.css('width', size + 'px');
                            ripple.css('height', size + 'px')
                        }
                    };

                    iElement.on('click touchstart', function (e) {
                        var x, y;
                        _setRippleSize(ripple, e);
                        // Remove animation effect
                        ripple.removeClass('animate');
                        if (e.type == 'click') {
                            x = e.pageX;
                            y = e.pageY;
                        } else if (e.type == 'touchstart') {
                            x = e.changedTouches[0].pageX;
                            y = e.changedTouches[0].pageY;
                        }

                        x = x - iElement.prop('offsetLeft') - ripple.prop('offsetWidth') / 2;
                        y = y - iElement.prop('offsetTop') - ripple.prop('offsetHeight') / 2;

                        // set new ripple position by click or touch position
                        ripple.css('top', y + 'px');
                        ripple.css('left', x + 'px');
                        ripple.addClass('animate');
                    });
                };
            }
        }
    }]).
    controller('KgcAppCtrl', ['$scope', '$log', '$rootScope', function ($scope, $log, $rootScope) {

//      ==================================== [START] Initialize variables for controller ===============================
        $scope.NavDrawer = { isOpen: false };
//      ==================================== [END] Initialize variables for controller =================================

//      ==================================== [START] All methods inside controller =====================================
        $scope.NavDrawer.toggle = function () {
            $scope.NavDrawer.isOpen = !$scope.NavDrawer.isOpen;
        };

        $scope.NavDrawer.reset = function () {
            $scope.NavDrawer.isOpen = false;
        };

//      ==================================== [END] All methods inside controller =======================================

//      ==================================== [START] All logic inside controller =======================================
        $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
            $scope.NavDrawer.reset();
        });
//      ==================================== [END] All logic inside controller =========================================


    }]);
