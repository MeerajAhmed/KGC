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
    controller('KgcAppCtrl', ['$scope', '$log', '$rootScope', '$location', '$timeout', function ($scope, $log, $rootScope, $location, $timeout) {

//      ==================================== [START] Initialize variables for controller ===============================
        $rootScope.NavDrawer = { isOpen: false };
//      ==================================== [END] Initialize variables for controller =================================

//      ==================================== [START] All methods inside controller =====================================
        $rootScope.NavDrawer.toggle = function () {
            $rootScope.NavDrawer.isOpen = !$rootScope.NavDrawer.isOpen;
        };

        $rootScope.NavDrawer.reset = function () {
            $rootScope.NavDrawer.isOpen = false;
        };

        $scope.routeTo = function(path){
            $location.path(path);
            $timeout(function(){
                document.querySelector('core-drawer-panel').closeDrawer();
            },1000);
        };

//      ==================================== [END] All methods inside controller =======================================

//      ==================================== [START] All logic inside controller =======================================
        $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
            $rootScope.NavDrawer.reset();
        });
//      ==================================== [END] All logic inside controller =========================================


    }])
    .service('utilities', function(){
        this.isMobileDevice = function(){
          return true;
        };
    })
    .directive("carousel", ["$compile", "utilities", "$timeout", "$window", "$swipe", "$interval",
        function ($compile, utilities, $timeout, $window, $swipe, $interval) {
            var directiveDefObj;
            directiveDefObj = {
                restrict: "E",
                priority: 11,
                scope: {
                    watchThis: "="
                },
                transclude: true,
                template: "<div ng-transclude class='carousel'></div>",
                replace: true,
                controllerAs: "carouselCtrl",
                controller: ["$scope", "$element", "$attrs", function ($scope, $elem, $attr) {
                    var _this = this,
                        heightCalculated = false,
                        sCount = 1;

                    _this._reCalculateHeight = function () {
                        if ($attr.equalHeight !== "true") {
                            var slidesWrapper = $elem[0].querySelectorAll(".slides"),
                                slides = $elem[0].querySelectorAll(".slides > li");
                            if(sCount <= $scope.noOfSlides) {
                                sCount++;
                            } else {
                                heightCalculated = true;
                            }
                            var h = angular.element(slides[$scope.active - 1]).children()[0].offsetHeight;
                            if(!heightCalculated) {
                                angular.element(slides[$scope.active - 1]).css({ "height": h + "px" });
                            }
                            angular.element(slidesWrapper).css({ "height": h + "px" });
                        }
                    };
                    _this._moveSlide = function (index) {
                        if ($scope.active < index)
                            _this._nextSlide(index);
                        if ($scope.active > index)
                            _this._prevSlide(index);
                    };
                    _this._nextSlide = function (param) {
                        if ($scope.active < $scope.noOfSlides) {
                            $scope.active = (param === "next") ? ++$scope.active : param;
                            _this._reCalculateHeight();
                            _this._rePositionSlides();
                        }
                    };
                    _this._prevSlide = function (param) {
                        if ($scope.active > 1) {
                            $scope.active = (param === "prev") ? --$scope.active : param;
                            _this._reCalculateHeight();
                            _this._rePositionSlides();
                        }
                    };
                    _this._addPaging = function () {
                        var pagingTpl = '<div class="paging">' +
                            '<div ng-style="pagingHPosition">' +
                            '<a href="#" class="prev" ng-style="prevButtonStyle"></a>' +
                            '<span>{{active}} of {{noOfSlides}}</span>' +
                            '<a href="#" class="next" ng-style="nextButtonStyle"></a>' +
                            '</div>' +
                            '<div style="clear: both;"></div></div>';
                        pagingTpl = $compile(pagingTpl)($scope);

                        if ($attr.pagingVPosition === "bottom")
                            $elem.append(pagingTpl);
                        else
                            $elem.prepend(pagingTpl);

                        $scope.pagingHPosition = { "cssFloat": "right" };
                        if ($attr.pagingHPosition === "left")
                            $scope.pagingHPosition = { "cssFloat": "left" };

                        _this._setPagingStyle();
                        _this._bindEvent();
                    };
                    _this._addIndicators = function () {
                        var indicatorTpl = '<div class="indicators" ng-style="indicatorHPosition"><ol>';
                        for (var i = 1; i <= parseInt($scope.noOfSlides); i++) {
                            indicatorTpl += '<li ng-class="{active : (active == ' + i + ')}"><a href="#" ng-click="carouselCtrl._moveSlide('+i+')"></a></li>';
                        }
                        indicatorTpl += '</ol></div>';
                        indicatorTpl = $compile(indicatorTpl)($scope);

                        if ($attr.indicatorVPosition === "top")
                            $elem.prepend(indicatorTpl);
                        else
                            $elem.append(indicatorTpl);

                        $scope.indicatorHPosition = { "text-align": "center" };
                        if ($attr.indicatorHPosition === "right") {
                            $scope.indicatorHPosition = { "text-align": "right" };
                        }
                        if ($attr.indicatorHPosition === "left") {
                            $scope.indicatorHPosition = { "text-align": "left" };
                        }


                    };
                    _this._bindEvent = function () {
                        var numbering = $elem[0].querySelector(".paging");
                        if (numbering) {
                            angular.element(numbering.querySelector(".next"))
                                .on("click", function (e) {
                                    e.preventDefault();
                                    $scope.$apply(function () {
                                        _this._nextSlide('next');
                                    });
                                });
                            angular.element(numbering.querySelector(".prev"))
                                .on("click", function (e) {
                                    e.preventDefault();
                                    $scope.$apply(function () {
                                        _this._prevSlide('prev');
                                    });
                                });
                        }

                    };
                    _this._setPagingStyle = function () {
                        var nextButtonStyle,
                            prevButtonStyle;
                        if ($scope.active === $scope.noOfSlides) {
                            nextButtonStyle = { "opacity": "0.2", "cursor": "default" };
                            prevButtonStyle = {};
                        } else if ($scope.active === 1) {
                            prevButtonStyle = { "opacity": "0.2", "cursor": "default" };
                            nextButtonStyle = {};
                        } else {
                            nextButtonStyle = prevButtonStyle = {};
                        }
                        $scope.nextButtonStyle = nextButtonStyle;
                        $scope.prevButtonStyle = prevButtonStyle;
                    };
                    _this._addSwipes = function () {
                        var slides = $elem[0].querySelectorAll(".slides > li");
                        if (($attr.addSwipes === "true" && $scope.noOfSlides > 0) || utilities.isMobileDevice()) {
                            var threshold = 30,
                                startCoord = 0, endCoord = 0, validSwipe = true;
                            $swipe.bind(angular.element(slides), {
                                'start': function (coords) {
                                    startCoord = coords.x;
                                    validSwipe = true;
                                },
                                'cancel': function () {
                                    validSwipe = false;
                                },
                                'end': function (coords) {
                                    endCoord = coords.x;
                                    var diff = startCoord - endCoord;
                                    if (diff > threshold) {
                                        $scope.$apply(function () {
                                            _this._nextSlide('next');
                                        });
                                    }
                                    if (diff < -threshold) {
                                        $scope.$apply(function () {
                                            _this._prevSlide('prev');
                                        });
                                    }
                                }
                            });
                        }
                    };
                    _this._rePositionSlides = function () {
                        var activeIndex = parseInt($scope.active),
                            slides = $elem[0].querySelectorAll(".slides > li");

                        for (var i = parseInt($scope.noOfSlides); i >= 1; i--) {
                            if (i > activeIndex) {
                                angular.element(slides[i - 1]).removeClass("active").css(_this.createStyleString((i - activeIndex)));
                            } else if (i === activeIndex) {
                                angular.element(slides[i - 1]).addClass("active").css(_this.createStyleString(0));
                            } else {
                                angular.element(slides[i - 1]).removeClass("active").css(_this.createStyleString("-" + (activeIndex - i)));
                            }
                        }
                        _this._setPagingStyle();
                    };
                    _this.createStyleString = function (p) {
                        var isIE, styleString;

                        isIE = navigator.userAgent.indexOf('MSIE') != -1;

                        styleString = {
                            "transform": "translate3d(" + (p * 100) + "%, 0, 0)",
                            "-webkit-transform": "translate3d(" + (p * 100) + "%, 0, 0)"
                        };

                        if (isIE)
                            styleString = { "margin-left": (p * 100) + "%" };

                        return styleString;
                    }
                }],
                compile: function () {
                    return function (scope, elem, attrs, ctrl) {
                        var slides;

                        var _generateCarousel = function () {

                            ctrl._rePositionSlides();

                            var h = 0;
                            angular.forEach(slides, function (key, index) {
                                var el = angular.element(key);
                                el.addClass("slide slide-index-" + (index + 1) + "");
                                if (h < el[0].offsetHeight)
                                    h = el[0].offsetHeight;
                                el.css({ "height": el[0].offsetHeight + "px" });
                            });

                            if (attrs.equalHeight === "true") {
                                h = (h === 0) ? 20 : h;
                                angular.element(slides).css({ "height": h + "px" });
                            }

                            angular.element(slides).parent().css({ "height": h + "px" });

                            if (scope.duration)
                                angular.element(slides).css({
                                    "transition-duration": scope.duration + "ms",
                                    "-webkit-transition-duration": scope.duration + "ms",
                                    "-moz-transition-duration": scope.duration + "ms"
                                });

                            if (scope.noOfSlides > 0 && attrs.showPagging === "true") {
                                ctrl._addPaging();
                            }

                            if ((attrs.addSwipes === "true" || utilities.isMobileDevice()) && scope.noOfSlides > 1) {
                                ctrl._addSwipes();
                            }

                            if (attrs.showIndicators === "true" && scope.noOfSlides > 1) {
                                ctrl._addIndicators();
                            }

                            if (attrs.autoRotate === "true" && scope.noOfSlides > 1) {
                                var interval = $interval(function() {
                                    if(scope.active < scope.noOfSlides)
                                        ctrl._nextSlide('next');
                                    else
                                        ctrl._prevSlide(1);
                                }, 3000, 0, false);
                            }

                            if (attrs.resizeOnRotate === "true") {
                                var fn = _.debounce(function () {
                                    ctrl._reCalculateHeight();
                                }, 100);

                                angular.element($window).bind("resize", function () {
                                    fn();
                                });
                            }

                            scope.$on("$destroy", function () {
                                angular.element($window).unbind("resize");
                                $interval.cancel(interval);
                            });

                        };

                        var _init = function () {
                            slides = elem[0].querySelectorAll(".slides > li");
                            scope.noOfSlides = angular.element(slides).length;
                            scope.duration = (attrs.duration) ? attrs.duration : "500";
                            scope.active = (attrs.activeSlide) ? attrs.activeSlide : 1;
                            if (scope.active > scope.noOfSlides) {
                                scope.active = 1;
                            }
                            _generateCarousel();
                        };

                        if (angular.isDefined(attrs.watchThis)) {
                            scope.$watch("watchThis", function (newVal) {
                                if (newVal) {
                                    $timeout(function () {
                                        _init();
                                    });
                                }
                            });
                        } else {
                            $timeout(function () {
                                _init();
                            });
                        }
                    }
                }
            };
            return directiveDefObj;
        }
    ])
    .directive('a', function () {
        var directiveDefObj;
        directiveDefObj = {
            restrict: 'AEC',
            link: function (scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.bind('click', function (e) {
                        e.preventDefault();
                    });
                }
            }
        };
        return directiveDefObj;
    })
    .directive('mdl-layout__obfuscator', ['$rootScope', function($rootScope){
        return {
            restrict:'C',
            link: function(scope, elem, attrs){
                elem.on('click', function(){
                    $rootScope.NavDrawer.reset();
                });
            }
        };
    }]);
