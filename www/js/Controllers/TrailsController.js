var app = angular.module('controllers');

app.controller('TrailsController', ['$rootScope', '$scope', 'TrailsService', '$ionicPlatform', '$ionicLoading', '$cordovaSQLite', function ($rootScope, $scope) {

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

    $scope.$on('$ionicView.enter', function(){
        $rootScope.lastMainState = 'trails.list';
    });
}]);

app.filter('trailsFilter', function () {
    return function (trails, data) {
        if(trails === undefined) return true;

        locationFilter = function (trail) {
            if (data.filterLocation === "")
                return true;
            var locationSelectedArray = data.filterLocation.toLowerCase().split(',');
            var trailLocation = trail.location.toLowerCase();
            for (var i = 0; i < locationSelectedArray.length; i++) {
                var indexOf = trailLocation.indexOf(locationSelectedArray[i]);
                if (indexOf > -1) {
                    return true;
                }
            }
            return false;
        };

        timeFilter = function (trail) {
            return (Math.round(trail.time * 100) >= Math.round(data.filterTimeMin * 100) &&
            Math.round(trail.time * 100) <= Math.round(data.filterTimeMax * 100));
        };

        distanceFilter = function (trail) {
            return (Math.round(trail.distance * 100) >= Math.round(data.filterDistanceMin * 100) &&
            Math.round(trail.distance * 100) <= Math.round(data.filterDistanceMax * 100));
        };

        difficultyFilter = function (trail) {
            switch (trail.difficulty) {
                case(0):
                    return data.filterDifficultyEasy;
                case(1):
                    return data.filterDifficultyModerate;
                case(2):
                default: //bigger than 2
                    return data.filterDifficultyHard;
            }
        };

        dogAccessibleFilter = function (trail) {
            if (data.filterDogFriendly === undefined || !data.filterDogFriendly)
                return true;
            return trail.dogFriendly;
        };

        transitFilter = function (trail) {
            if (data.filterTransit === undefined || !data.filterTransit)
                return true;
            return trail.transit;
        };

        inSeasonFilter = function (trail) {
            if (data.filterInSeason === undefined || !data.filterInSeason)
                return true;
            var currentMonth = new Date().getMonth();
            var parts = trail.season.split('-', 2);
            var from = parseInt(parts[0]);
            var to = parseInt(parts[1]);
            return ((from === 1 && to === 12) ||
            (from < to && from <= currentMonth && to >= currentMonth) ||
            (from > to && (from <= currentMonth || to >= currentMonth)) ||
            (from === to && from === currentMonth));
        };


        return trails.filter(function (trail) {
            return locationFilter(trail) &&
                timeFilter(trail) &&
                distanceFilter(trail) &&
                difficultyFilter(trail) &&
                dogAccessibleFilter(trail) &&
                transitFilter(trail) &&
                inSeasonFilter(trail);
        });
    };
});