angular.module('kgcApp.services', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/rental', {templateUrl: '/app/services/rental/rental.html'})
    }]);
