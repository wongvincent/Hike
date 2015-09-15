var app = angular.module('controllers');

app.controller('TrailsController', ['$scope', 'TrailsService', '$ionicPlatform', '$ionicLoading', '$cordovaSQLite', function ($scope) {

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

        /*
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
         */
    };
});