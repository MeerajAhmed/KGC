angular.module('kgcApp.project', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/project', {templateUrl: '/app/project/project.tpl.html', controller: 'ProjectCtrl'})
    }])

    .controller('ProjectCtrl', [ '$scope', function ($scope) {


    }]);