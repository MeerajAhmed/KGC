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
        'ngMaterial',
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
    config(['$mdThemingProvider', '$mdIconProvider',
        function($mdThemingProvider, $mdIconProvider){

       /* $mdIconProvider
            .defaultIconSet("../../assets/svg/avatars.svg", 128)
            .icon("menu"       , "../../assets/svg/menu.svg"        , 24)
            .icon("share"      , "../assets/svg/share.svg"       , 24)
            .icon("google_plus", "../assets/svg/google_plus.svg" , 512)
            .icon("hangouts"   , "../assets/svg/hangouts.svg"    , 512)
            .icon("twitter"    , "../assets/svg/twitter.svg"     , 512)
            .icon("phone"      , "../assets/svg/phone.svg"       , 512);*/

        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue')
            .accentPalette('orange');

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
                        //handle tap or click.

                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    });
                };
            }
        }
    }]).
    service('SessionKeeper', ['$log', function ($log) {
        var value, str;
        this.nameSpace = 'now';
        try {
            this[this.nameSpace] = JSON.parse(sessionStorage.getItem(this.nameSpace)) || {};
        } catch (e) {
            this[this.nameSpace] = {};
            $log.error('SessionKeeper :: init : exception : ' + e.toString());
        }

        this.read = function () {
            return this[this.nameSpace];
        };
        this.save = function () {
            try {
                sessionStorage.setItem(this.nameSpace, JSON.stringify(this[this.nameSpace]));
            } catch (e) {
                $log.error('SessionKeeper :: save : exception : ' + e.toString());
            }
        }
    }]).
    controller('KgcAppCtrl', ['$scope', '$log', '$rootScope', '$mdSidenav', '$location',
        function ($scope, $log, $rootScope, $mdSidenav, $location) {

//      ==================================== [START] Initialize variables for controller ===============================
        $scope.NavDrawer = { isOpen: false };
//      ==================================== [END] Initialize variables for controller =================================

//      ==================================== [START] All methods inside controller =====================================
       /* $scope.NavDrawer.toggle = function () {
            $scope.NavDrawer.isOpen = !$scope.NavDrawer.isOpen;
        };*/
        $scope.NavDrawer.open = function () {
            $scope.NavDrawer.isOpen = true;
            $mdSidenav('left-nav').toggle();
            $mdSidenav('left-nav')
                .open()
                .then(function(){
                 //   $log.debug('opened');
                });
        };
        $scope.NavDrawer.close = function () {
            $scope.NavDrawer.isOpen = false;
        };
     /*   $scope.NavDrawer.reset = function () {
            $scope.NavDrawer.isOpen = false;
        };*/

            $scope.toppings = [
                { name: 'Pepperoni', wanted: true },
                { name: 'Sausage', wanted: false },
                { name: 'Black Olives', wanted: true },
                { name: 'Green Peppers', wanted: false }
            ];

            $rootScope.MenuList = [
                { link: "/home", name: "Home" },
                { link: "/about", name: "About" },
                { link: "/finance", name: "Finance" },
                { link: "/service", name: "Services" },
                { link: "/project", name: "Projects" },
                { link: "/gallery", name: "Gallery" },
                { link: "/contact", name: "Contacts" }
            ];

            $rootScope.menuIndex = 0;
            $scope.navigateTo = function(link, index){
                $rootScope.menuIndex = index;
                $location.path(link);
            };

//      ==================================== [END] All methods inside controller =======================================

//      ==================================== [START] All logic inside controller =======================================
        $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
            var path = $location.path();
            if(current){
                $mdSidenav('left-nav')
                    .close()
                    .then(function(){
                      //  $log.debug('closed');
                    });
            } else {
                $rootScope.menuIndex = 0;
                for(var i=0; i<  $rootScope.MenuList.length; i++){
                    if( path == $rootScope.MenuList[i].link ){
                        $rootScope.menuIndex = i;
                        break
                    }
                }
            }
        });
//      ==================================== [END] All logic inside controller =========================================


    }]);
