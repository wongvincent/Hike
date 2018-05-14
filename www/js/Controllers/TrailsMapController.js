var app = angular.module('controllers');

app.controller('TrailsMapController', ['$rootScope', '$scope', 'GoogleMaps', '$ionicSideMenuDelegate', 'FilterTrailsService', '$cordovaGoogleAnalytics', function ($rootScope, $scope, GoogleMaps, $ionicSideMenuDelegate, FilterTrailsService, $cordovaGoogleAnalytics) {
	var mapUpdatedTime;

    $scope.$on("$ionicView.enter", function () {
		$rootScope.lastMainState = 'trails.map';
		$cordovaGoogleAnalytics.trackView('Trails - Map');
        $ionicSideMenuDelegate.canDragContent(false);
	    if (!mapUpdatedTime || mapUpdatedTime < FilterTrailsService.getLastFilteredTime()) {
		    $scope.filteredTrails = FilterTrailsService.getFilteredTrails();
		    $scope.numberOfFiltersApplied = FilterTrailsService.getNumberOfFiltersApplied();
		    reloadMap();
	    }
    });

    $scope.$on("$ionicView.leave", function () {
        $ionicSideMenuDelegate.canDragContent(true);
    });

	$scope.$on('new-filters-applied', function(event, args) {
		reloadMap();
	});

	function reloadMap() {
		var mapElement = angular.element(document.querySelector("#trails-map"));
		mapElement.empty();
		GoogleMaps.init($scope.filteredTrails, "trails-map");

		mapUpdatedTime = Date.now();
	}
}]);

