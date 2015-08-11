var app = angular.module('controllers');

app.controller('TrailsController', ['$scope', 'TrailsService', function ($scope, TrailsService) {

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
        
        $scope.trails = TrailsService.trails;
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
                var lowercaseDifficulty = trail.difficulty.toLowerCase();
                if (lowercaseDifficulty.indexOf("easy") === -1)
                    temp2.push(trail);
            });
            temp1 = temp2;
            temp2 = [];
        }

        if (data.filterDifficultyModerate === undefined || !data.filterDifficultyModerate) { //Moderate is not checked
            angular.forEach(temp1, function (trail) {
                var lowercaseDifficulty = trail.difficulty.toLowerCase();
                if (lowercaseDifficulty.indexOf("moderate") === -1)
                    temp2.push(trail);
            });
            temp1 = temp2;
            temp2 = [];
        }

        if (data.filterDifficultyHard === undefined || !data.filterDifficultyHard) { //Hard is not checked
            angular.forEach(temp1, function (trail) {
                var lowercaseDifficulty = trail.difficulty.toLowerCase();
                if (lowercaseDifficulty.indexOf("hard") === -1)
                    temp2.push(trail);
            });
            temp1 = temp2;
            temp2 = [];
        }



        //Dog Accessible
        /* if (data.filterDogFriendly !== undefined && data.filterDogFriendly) {
         angular.forEach(temp1, function (trail) {
         if (trail.dogFriendly !== undefined && trail.dogFriendly)
         temp2.push(trail);
         });
         temp1 = temp2;
         temp2 = [];
         }
         */

        //Transit Friendly
        /*
         if (data.filterTransit !== undefined && data.filterTransit) {
         angular.forEach(temp1, function (trail) {
         if (trail.transit !== undefined && trail.transit)
         temp2.push(trail);
         });
         temp1 = temp2;
         temp2 = [];
         }
         */

        return temp1;
    };
});