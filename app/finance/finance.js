angular.module('kgcApp.finance', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/finance', {templateUrl: '/app/finance/finance.tpl.html', controller: 'FinanceCtrl'})
    }])

    .controller('FinanceCtrl', [ '$scope', function ($scope) {


    }]);
