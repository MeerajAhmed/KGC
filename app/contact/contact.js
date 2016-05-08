angular.module('kgcApp.contact', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/contact', {templateUrl: '/app/contact/contact.tpl.html', controller: 'ContactCtrl'})
    }])

    .controller('ContactCtrl', [ '$scope', function ($scope) {
    }]);
