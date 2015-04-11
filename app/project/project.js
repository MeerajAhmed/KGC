angular.module('kgcApp.project', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/project', {templateUrl: '/app/service/project.tpl.html', controller: 'ProjectCtrl'})
    }])

    .controller('ProjectCtrl', [ '$scope', function ($scope) {


    }]);