var app = angular.module('controllers');

app.controller('TrailsController', ['$scope', 'TrailsService', '$ionicPlatform', '$ionicLoading', '$cordovaSQLite', function ($scope, TrailsService, $ionicPlatform, $ionicLoading, $cordovaSQLite) {

        $scope.data = {
            sortSelected: "name",
            sortSelectedIndex: "0",
            filterLocation: "",
            filterTimeMin: "0",
            filterTimeMax: "999",
            filterDistanceMin: "0",
            filterDistanceMax: "999",
            filterDifficultyEasy: true,
            filterDifficultyModerate: true,
            filterDifficultyHard: true
        };

        $ionicPlatform.ready(function () {
            $ionicLoading.show({template: 'Loading...'});
            if (window.cordova) {
                window.plugins.sqlDB.copy("trails.db", 0, openDatabase, copyerror);

                function copyerror(error) {
                    console.error("There was an error copying the database: " + JSON.stringify(error));
                    window.plugins.sqlDB.remove("trails.db", 0, removedsuccess, removederror);
                }

                function removedsuccess() {
                    window.plugins.sqlDB.copy("trails.db", 0, openDatabase, openDatabase);
                }

                function removederror(error) {
                    console.error("There was an error removing the database: " + JSON.stringify(error));
                    openDatabase();
                }

                function openDatabase() {
                    db = $cordovaSQLite.openDB("trails.db");
                    $ionicLoading.hide();
                    getAllTrails();
                }

                function getAllTrails() {
                    var promise = TrailsService.getAllTrails();
                    promise.then(function (res) {
                        $scope.trails = res;
                        if (!$scope.trails)
                            $scope.failedPopupReload();
                    });
                }
            }
            else {
                $ionicLoading.hide();
            }
        });
    }]);

app.filter('trailFilter', function () {
    return function (trails, data) {
        var temp1 = trails;
        var temp2 = [];

        //Location
        if (data.filterLocation !== "") {
            var locationSelectedArray = data.filterLocation.toLowerCase().split(',');
            angular.forEach(temp1, function (trail) {
                var trailLocation = trail.location.toLowerCase();
                for (var i = 0; i < locationSelectedArray.length; i++) {
                    var indexOf = trailLocation.indexOf(locationSelectedArray[i]);
                    if (indexOf > -1) {
                        temp2.push(trail);
                        break;
                    }
                }
            });
            temp1 = temp2;
            temp2 = [];
        }

        //Time Min
        angular.forEach(temp1, function (trail) {
            if (Math.round(trail.time * 100) >= Math.round(data.filterTimeMin * 100)) {
                temp2.push(trail);
            }
        });

        temp1 = temp2;
        temp2 = [];

        //Time Max
        angular.forEach(temp1, function (trail) {
            if (Math.round(trail.time * 100) <= Math.round(data.filterTimeMax * 100)) {
                temp2.push(trail);
            }
        });
        temp1 = temp2;
        temp2 = [];

        //Distance Min
        angular.forEach(temp1, function (trail) {
            if (Math.round(trail.distance * 100) >= Math.round(data.filterDistanceMin * 100)) {
                temp2.push(trail);
            }
        });
        temp1 = temp2;
        temp2 = [];

        //Distance Max
        angular.forEach(temp1, function (trail) {
            if (Math.round(trail.distance * 100) <= Math.round(data.filterDistanceMax * 100)) {
                temp2.push(trail);
            }
        });
        temp1 = temp2;
        temp2 = [];

        //Difficulty
        if (data.filterDifficultyEasy === undefined || !data.filterDifficultyEasy) { //Easy is not checked
            angular.forEach(temp1, function (trail) {
                if (trail.difficulty !== 0)
                    temp2.push(trail);
            });
            temp1 = temp2;
            temp2 = [];
        }

        if (data.filterDifficultyModerate === undefined || !data.filterDifficultyModerate) { //Moderate is not checked
            angular.forEach(temp1, function (trail) {
                if (trail.difficulty !== 1)
                    temp2.push(trail);
            });
            temp1 = temp2;
            temp2 = [];
        }

        if (data.filterDifficultyHard === undefined || !data.filterDifficultyHard) { //Hard is not checked
            angular.forEach(temp1, function (trail) {
                if (trail.difficulty < 2)
                    temp2.push(trail);
            });
            temp1 = temp2;
            temp2 = [];
        }

        //Dog Accessible
        if (data.filterDogFriendly !== undefined && data.filterDogFriendly) { //Dog accessible is checked
            angular.forEach(temp1, function (trail) {
                if (trail.dogFriendly)
                    temp2.push(trail);
            });
            temp1 = temp2;
            temp2 = [];
        }

        //Transit Friendly       
        if (data.filterTransit !== undefined && data.filterTransit) { //Transit Friendly is checked
            angular.forEach(temp1, function (trail) {
                if (trail.transit)
                    temp2.push(trail);
            });
            temp1 = temp2;
            temp2 = [];
        }

        // In Season
        if (data.filterInSeason !== undefined && data.filterInSeason) { // In Season is checked
            var currentMonth = new Date().getMonth();
            angular.forEach(temp1, function (trail) {
                var parts = trail.season.split('-', 2);
                var from = parseInt(parts[0]);
                var to = parseInt(parts[1]);
                if (from === 1 && to === 12)
                    temp2.push(trail);
                else if (from < to && from <= currentMonth && to >= currentMonth)
                    temp2.push(trail);
                else if (from > to && (from <= currentMonth || to >= currentMonth))
                    temp2.push(trail);
                else if (from === to && from === currentMonth)
                    temp2.push(trail);
            });
            temp1 = temp2;
            temp2 = [];
        }

        return temp1;
    };
});