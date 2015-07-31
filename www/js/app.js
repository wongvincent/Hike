var app = angular.module('app', ['ionic', 'trails']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('trails', {
        url: '/trails',
        abstract: true,
        templateUrl: 'trails/trails-template.html',
        controller: 'TrailsController'
    })
            .state('trails.list', {
                url: '/list',
                views: {
                    'list-tab': {
                        templateUrl: 'trails/list.html'
                    }
                }
            })
            .state('trails.map', {
                url: '/map',
                views: {
                    'map-tab': {
                        templateUrl: 'trails/map.html'
                    }
                }
            })

            .state('log', {
                url: '/log',
                templateUrl: 'logitems.html'
            });
            
    $urlRouterProvider.otherwise('/trails/list');
});

//For general app wide functionality
app.controller('StartController', function ($scope, $ionicModal, $ionicSideMenuDelegate) {

    $scope.togglePancake = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
});

app.filter('range', function(){
    return function(array, range){
        range = parseInt(range);
        for(i=0; i<range; i++)
            array.push(i);
        return array;
    };
});