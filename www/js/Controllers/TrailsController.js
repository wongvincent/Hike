var app = angular.module('controllers');

app.controller('TrailsController', ['$rootScope', '$state', '$scope', function ($rootScope, $state, $scope) {
    $scope.uiRouterState = $state;
}]);

app.filter('trailsFilter', function () {
    return function (trails, data) {
        if (trails === undefined) return trails;

        locationFilter = function (trail) {
            if (!data.filterLocation || data.filterLocation.length === 0) {
                return false;
            } else if (data.filterLocation.length === 8) {
                return true;
            } else {
                var trailLocation = trail.location.toLowerCase();
                for (var i = 0; i < data.filterLocation.length; i++) {
                    var singleFilterLocationKeywords = data.filterLocation[i].value;
                    for (var j = 0; j < singleFilterLocationKeywords.length; j++) {
                        var indexOf = trailLocation.indexOf(singleFilterLocationKeywords[j].toLowerCase());
                        if (indexOf > -1) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };

        timeFilter = function (trail) {
            return trail.time >= data.filterTimeMin && trail.time <= data.filterTimeMax;
        };

        distanceFilter = function (trail) {
            return trail.distance >= data.filterDistanceMin && trail.distance <= data.filterDistanceMax;
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

        transitFilter = function (trail) {
            return data.filterTransit === undefined || !data.filterTransit || trail.transit;
        };

        inSeasonFilter = function (trail) {
            if (data.filterInSeason === undefined || !data.filterInSeason)
                return true;
            var currentMonth = new Date().getMonth() + 1;
            var parts = trail.season.split('-', 2);
            var from = parseInt(parts[0]);
            var to = parseInt(parts[1]);
            return ((from <= currentMonth && to >= currentMonth) ||
            (to < from  && (currentMonth >= from || currentMonth <= to)));
        };


        return trails.filter(function (trail) {
            return locationFilter(trail) &&
                timeFilter(trail) &&
                distanceFilter(trail) &&
                difficultyFilter(trail) &&
                transitFilter(trail) &&
                inSeasonFilter(trail);
        });
    };
});