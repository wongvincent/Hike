var app = angular.module('app', ['ionic', 'ngCordova', 'controllers', 'services', 'directives']);
var db = null;

app.run(function ($rootScope, $ionicPlatform, $ionicHistory, $ionicPopup) {
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

    $ionicPlatform.registerBackButtonAction(function(e) {
        if ($ionicHistory.backView()) {
            $ionicHistory.goBack();
        } else {
            var exitAppPopup = $ionicPopup.confirm({
                title: "Exit",
                template: "Are you sure want to close Hiking Vancouver?",
                cancelText: "NO",
                cancelType: "button-dark",
                okText: "YES",
                okType: "button-dark"
            });
            exitAppPopup.then(function (res) {
                if (res) {
                    ionic.Platform.exitApp();
                }
            });
        }
        e.preventDefault();
        return false;
    }, 101);
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
            templateUrl: 'views/trails/index.html',
            controller: 'TrailsController'
        })
        .state('trails.list', {
            url: '/list',
            templateUrl: 'views/trails/list.html',
            controller: 'TrailsListController'
        })
        .state('trails.map', {
            url: '/map',
            templateUrl: 'views/trails/map.html',
            controller: 'TrailsMapController'
        })

        .state('trail', {
            url: '/trail/:name',
            abstract: true,
            cache: false,
            templateUrl: 'views/trail/index.html',
            controller: 'TrailController'
        })
        .state('trail.details', {
            url: '/list',
            views: {
                'trail-details-tab': {
                    templateUrl: 'views/trail/details.html'
                }
            }
        })
        .state('trail.gallery', {
            url: '/gallery',
            views: {
                'trail-gallery-tab': {
                    templateUrl: 'views/trail/gallery.html'
                }
            }
        })

        .state('favourites', {
            url: '/favourites',
            templateUrl: 'views/favourites.html',
            controller: 'FavouritesController'
        })

        .state('nearby', {
            url: '/nearby',
            templateUrl: 'views/nearby.html',
            controller: 'NearbyController'
        });

    $urlRouterProvider.otherwise('/trails/list');


    //Tab style
    $ionicConfigProvider.tabs.style("striped");

    // Tab position
    $ionicConfigProvider.tabs.position("top");
});

//For general app wide functionality
app.controller('StartController', ['$rootScope', '$scope', '$state', '$ionicSideMenuDelegate', '$ionicScrollDelegate', '$ionicPopup', 'TrailsService', 'FavouritesService', '$ionicPlatform', '$ionicLoading', '$cordovaSQLite', '$cordovaSplashscreen', '$q', '$ionicHistory', function ($rootScope, $scope, $state, $ionicSideMenuDelegate, $ionicScrollDelegate, $ionicPopup, TrailsService, FavouritesService, $ionicPlatform, $ionicLoading, $cordovaSQLite, $cordovaSplashscreen, $q, $ionicHistory) {
    $ionicPlatform.ready(function () {
        if (window.cordova) {
            $ionicLoading.show({template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading'});
            window.plugins.sqlDB.copy("trails.db", 0, openDatabase, openDatabase);

            function openDatabase() {
                db = $cordovaSQLite.openDB("trails.db");
                getAllTrails();
            }

            function getAllTrails() {
                TrailsService.getAllTrails().then(function (res) {
                    $scope.trails = res;
                    if (!$scope.trails)
                        $scope.failedPopupReload();
                    else {
                        $scope.updateFavourites().then(function(){
                            $cordovaSplashscreen.hide();
                        });
                    }


                });
            }
            $ionicLoading.hide();
        }
    });

    $scope.$on('$ionicView.beforeEnter', function () {
        $ionicSideMenuDelegate.canDragContent(true);
    });

    $scope.updateFavourites = function(){
        var q = $q.defer();
        $ionicLoading.show({template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading'});

        // Get the favouriteIds
        var promise = FavouritesService.getFavourites();
        promise.then(function (res){
            $scope.favouriteIds = [];
            angular.forEach(res, function(obj){
                $scope.favouriteIds.push(obj.trailId);
            });

            if($scope.favouriteIds !== undefined && $scope.favouriteIds.length !== 0) {
                //Sort the favouriteIds in ascending number order
                $scope.favouriteIds.sort(function (a, b) {
                    return a - b
                });
            }

            // Assuming both Trails Ids and FavouriteIds are sorted in ascending number order
            // We add the trail matching the favourite trailId to favourites list
            // This is an O(n) operation
            $scope.favourites = [];
            var favouriteIndex = 0;

            for(var i=0; i < $scope.trails.length ; i++){
                var trail = $scope.trails[i];
                if($scope.favouriteIds[favouriteIndex] == trail.id){
                    $scope.trails[i].favourite = true;
                    $scope.favourites.push($scope.trails[i]);
                    favouriteIndex++;
                }
                else {
                    $scope.trails[i].favourite = false;
                }
            }

            // Order list of favourites alphabetically
            $scope.sortAlphabetically($scope.favourites);

            $ionicLoading.hide();

            q.resolve();
        });
        return q.promise;
    };

    $scope.goState = function (state, disableBack) {
        if (disableBack) {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
        }
        $state.go(state);
    };

    $scope.goBackState = function(){
        $scope.goState($rootScope.lastMainState, true);
    };

    $scope.scrollToTop = function () {
        $ionicScrollDelegate.scrollTop();
    };

    $scope.failedPopup = function (message, redirectTo) {
        var errorMessage = message ? message : "An unexpected error occurred";
        var goToState = redirectTo ? redirectTo : "trails.list";
        var failedPopup = $ionicPopup.alert({
                title: errorMessage
                //template:
        });
        failedPopup.then(function (res) {
            $state.go(goToState);
        });
    };

    $scope.failedPopupReload = function () {
        $scope.failedPopupReload('An unexpected error occurred');
    };

    $scope.failedPopupReload = function (message) {
        var failedPopup = $ionicPopup.alert({
            title: message
            //template:
        });
        failedPopup.then(function (res) {
            window.location.reload(true);
        });
    };
    $scope.sortAlphabetically = function(array){
        function compare(a,b) {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        }

        array.sort(compare);
    };

    $rootScope.$on('event:favourite-change', function() {
        $scope.updateFavourites();
    });
}]);

app.filter('range', function () {
    return function (array, range) {
        range = parseInt(range);
        for (var i = 0; i < range; i++)
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

app.filter("ConvertDistanceCategoryToString", function () {
   return function (categoryInt) {
       if (categoryInt === 0) return "One-Way";
       if (categoryInt === 1) return "Round-Trip";
   };
});

app.filter("ProcessElevationToString", function () {
   return function (elevation) {
       if (elevation === 0) return "minimal";
       if (elevation > 0) return elevation + "m";
   };
});