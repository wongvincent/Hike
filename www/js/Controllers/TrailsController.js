var app = angular.module('controllers');

app.controller('TrailsController', ['$scope', 'TrailsService', '$ionicPlatform', '$ionicLoading', '$cordovaSQLite', function ($scope, TrailsService, $ionicPlatform, $ionicLoading, $cordovaSQLite) {

        $scope.data = {
            sortSelected: "name",
            sortSelectedIndex: "0",
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
                window.plugins.sqlDB.copy("trails.db", 0, successfunc, failfunc);
                function successfunc() {
                    db = $cordovaSQLite.openDB("trails.db");
                    $ionicLoading.hide();
                    var promise = TrailsService.getAllTrails();
                    promise.then(function (res) {
                        $scope.trails = res;
                    });
                }
                function failfunc(error) {
                    console.error("There was an error copying the database: " + JSON.stringify(error));
                    db = $cordovaSQLite.openDB("trails.db");
                    $ionicLoading.hide();
                    var promise = TrailsService.getAllTrails();
                    promise.then(function (res) {
                        $scope.trails = res;
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
                if (trail.difficulty !== 2)
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

        return temp1;
    };
});