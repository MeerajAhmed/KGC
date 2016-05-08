angular.module('kgcApp.services', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/rental', {templateUrl: '/app/services/rental/rental.html'})
        $routeProvider.when('/contract', {templateUrl: '/app/services/contract/contract.html'})
        $routeProvider.when('/construction', {templateUrl: '/app/services/construction/construction.html'})
    }]);
