var app = angular.module('controllers');

app.controller('TrailsListController', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.$on('$ionicView.enter', function () {
        $rootScope.lastMainState = 'trails.list';
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