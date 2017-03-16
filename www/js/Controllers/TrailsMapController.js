var app = angular.module('controllers');

app.controller('TrailsMapController', ['$rootScope', '$scope', 'GoogleMaps', '$ionicSideMenuDelegate', 'FilterTrailsService', function ($rootScope, $scope, GoogleMaps, $ionicSideMenuDelegate, FilterTrailsService) {
    $scope.$on("$ionicView.enter", function () {
	    $scope.filteredTrails = FilterTrailsService.getFilteredTrails();
        $rootScope.lastMainState = 'trails.map';
        $ionicSideMenuDelegate.canDragContent(false);
        var mapElement = angular.element(document.querySelector("#trails-map"));
        mapElement.empty();
        GoogleMaps.init($scope.filteredTrails, "trails-map");
    });

    $scope.$on("$ionicView.leave", function () {
        $ionicSideMenuDelegate.canDragContent(true);
    });
}]);

