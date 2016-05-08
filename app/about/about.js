angular.module('kgcApp.about', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/about', {templateUrl: '/app/about/about.tpl.html', controller: 'AboutCtrl'})
    }])

    .controller('AboutCtrl', [ '$scope', function ($scope) {
    }]);
