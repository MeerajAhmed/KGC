angular.module('kgcApp.service', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/service', {templateUrl: '/app/service/service.tpl.html', controller: 'ServiceCtrl'})
    }])

    .controller('ServiceCtrl', [ '$scope', function ($scope) {


    }]);
