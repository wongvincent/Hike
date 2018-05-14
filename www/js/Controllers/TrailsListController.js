var app = angular.module('controllers');

app.controller('TrailsListController', ['$rootScope', '$scope', 'FilterTrailsService', function ($rootScope, $scope, FilterTrailsService) {
	var listLastUpdated;

    $scope.$on('$ionicView.enter', function () {
		$rootScope.lastMainState = 'trails.list';
		if (analytics) analytics.trackView('Trails - List');
	    if (!listLastUpdated || listLastUpdated < FilterTrailsService.getLastFilteredTime()) {
		    $scope.filteredTrails = FilterTrailsService.getFilteredTrails();
		    $scope.numberOfFiltersApplied = FilterTrailsService.getNumberOfFiltersApplied();
	    }
    });

	$scope.$on('hide-search-bar-request', function(event, args) {
		$scope.$apply(function() {
			$scope.hideSearchBar();
		});
	});

	$scope.showSearchBar = function() {
		$rootScope.searchBarActive = true;
		setTimeout(function() {
			document.getElementById('input-search').focus(); //TODO: use directive
		}, 0);
	};

	$scope.hideSearchBar = function() {
		$scope.data.searchText = '';
		$rootScope.searchBarActive = false;
	};

	$scope.clearSearchBar = function() {
		$scope.data.searchText = '';
	};
}]);