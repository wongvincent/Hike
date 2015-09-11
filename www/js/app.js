var app = angular.module('app', ['ionic', 'ngCordova', 'controllers', 'services', 'directives']);
var db = null;

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

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $stateProvider
        .state('/start', {
            url: '/',
            templateUrl: 'start.html'
        })

        .state('trails', {
            url: '/trails',
            abstract: true,
            templateUrl: 'trails/index.html',
            controller: 'TrailsController'
        })
        .state('trails.list', {
            url: '/list',
            views: {
                'trails-list-tab': {
                    templateUrl: 'trails/list.html'
                }
            }
        })
        .state('trails.map', {
            url: '/map',
            views: {
                'trails-map-tab': {
                    templateUrl: 'trails/map.html'
                }
            }
        })

        .state('trail', {
            url: '/trail/:name',
            abstract: true,
            cache: false,
            templateUrl: 'trail/index.html',
            controller: 'TrailController'
        })
        .state('trail.details', {
            url: '/list',
            views: {
                'trail-details-tab': {
                    templateUrl: 'trail/details.html'
                }
            }
        })
        .state('trail.map', {
            url: '/map',
            views: {
                'trail-map-tab': {
                    templateUrl: 'trail/map.html'
                }
            }
        })
        .state('trail.gallery', {
            url: '/gallery',
            views: {
                'trail-gallery-tab': {
                    templateUrl: 'trail/gallery.html'
                }
            }
        })

        .state('favourites', {
            url: '/favourites',
            templateUrl: 'favourites/index.html',
            controller: 'FavouritesController'
        })

        .state('log', {
            url: '/log',
            templateUrl: 'logitems.html'
        });

    $urlRouterProvider.otherwise('/trails/list');


    //Tab style
    $ionicConfigProvider.tabs.style("striped");

    // Tab position
    $ionicConfigProvider.tabs.position("top");
});

//For general app wide functionality
app.controller('StartController', ['$scope', '$state', '$ionicSideMenuDelegate', '$ionicScrollDelegate', '$ionicPopup', function ($scope, $state, $ionicSideMenuDelegate, $ionicScrollDelegate, $ionicPopup) {
    $scope.goState = function (state) {
        $state.go(state);
    };

    $scope.scrollToTop = function () {
        $ionicScrollDelegate.scrollTop();
    };

    $scope.failedPopup = function () {
        var failedPopup = $ionicPopup.alert({
            title: 'An unexpected error occurred'
            //template:
        });
        failedPopup.then(function (res) {
            $state.go('trails.list');
        });
    };

    $scope.failedPopupReload = function () {
        var failedPopup = $ionicPopup.alert({
            title: 'An unexpected error occurred'
            //template:
        });
        failedPopup.then(function (res) {
            window.location.reload(true);
        });
    };
}]);

app.filter('range', function () {
    return function (array, range) {
        range = parseInt(range);
        for (i = 0; i < range; i++)
            array.push(i);
        return array;
    };
});

app.filter('BoolToString', function () {
    return function (bool) {
        return bool ? "Yes" : "No";
    };
});

app.filter('HumanizeDifficulty', function () {
    return function (int) {
        var difficultyScale = ["Easy", "Moderate", "Hard", "Very Hard"];
        if (int < 0 || int >= difficultyScale.length)
            return int;
        return difficultyScale[int];
    };
});

app.filter("HumanizeSeason", function () {
    return function (input) {
        var monthNameArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var parts = input.split('-', 2);

        return (parts[0] === "1" && parts[1] === "12") ? "Year-round" :
        monthNameArray[parts[0] - 1] + " - " + monthNameArray[parts[1] - 1];
    };
});