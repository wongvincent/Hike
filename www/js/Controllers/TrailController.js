var app = angular.module('controllers');

app.controller('TrailController', ['$scope', '$state', '$stateParams', '$filter', '$ionicLoading', '$ionicSideMenuDelegate', function ($scope, $state, $stateParams, $filter, $ionicLoading, $ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.canDragContent(true);
    
    $scope.params = $stateParams;
    var hrefSelected = $scope.params.name;

    if (hrefSelected === undefined) {
        $scope.failedPopup();
    } else {
        $ionicLoading.show({template: '<ion-spinner icon="bubbles"></ion-spinner><br/>'});

        $scope.trail = $scope.trails.find(function(trail) {
            return trail.href === hrefSelected;
        });

        $ionicLoading.hide();
    }

    $scope.shareTrail = function() {
        var trail = $scope.trail;

        var humanizeDifficultyFilter = $filter('HumanizeDifficulty');
        var convertDistanceCategoryToStringFilter = $filter('ConvertDistanceCategoryToString');
        var processElevationToStringFilter = $filter('ProcessElevationToString');
        var humanizeSeasonFilter = $filter('HumanizeSeason');

        var message =
            trail.name + "\n" +
            "Location: " + trail.cityName + " (" + trail.regionName + ")" +"\n" +
            "Difficulty: " + humanizeDifficultyFilter(trail.difficulty) + "\n" +
            "Time: " + trail.time + " hours" + "\n" +
            convertDistanceCategoryToStringFilter(trail.distanceCategory) + ": " + trail.distance + "km" + "\n" +
            "Elevation Gain: " + processElevationToStringFilter(trail.elevation) + "\n" +
            "Season: " + humanizeSeasonFilter(trail.season) + "\n";
        // message, subject, file, url, [successCallback], [errorCallback]
        window.plugins.socialsharing.share(
            message,
            trail.name,
            null,
            "http://maps.google.com/maps?daddr=" + trail.lat + "," + trail.long,
            null,
            function (err) {
                window.plugins.toast.showShortBottom(
                    "Failed to Share"
                );
            }
        );
    };
}]);