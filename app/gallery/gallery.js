angular.module('kgcApp.gallery', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/gallery', {templateUrl: '/app/gallery/gallery.tpl.html', controller: 'GalleryCtrl'})
    }])

    .controller('GalleryCtrl', [ '$scope', function ($scope) {


    }]);