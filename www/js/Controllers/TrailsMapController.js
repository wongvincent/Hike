var app = angular.module('controllers');

app.controller('TrailsMapController', ['$scope', 'GoogleMaps', '$ionicSideMenuDelegate', function ($scope, GoogleMaps, $ionicSideMenuDelegate) {
    $scope.$on("$ionicView.enter", function () {
        $ionicSideMenuDelegate.canDragContent(false);
        var mapElement = angular.element(document.querySelector("#trails-map"));
        mapElement.empty();
        GoogleMaps.init($scope.filteredTrails, "trails-map");
    });

    $scope.$on("$ionicView.leave", function () {
        $ionicSideMenuDelegate.canDragContent(true);
    });
}]);

