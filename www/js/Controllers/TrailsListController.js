var app = angular.module('controllers');

app.controller('TrailsListController', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.$on('$ionicView.enter', function () {
        $rootScope.lastMainState = 'trails.list';
        $scope.showSearchBar = function() {
            $scope.searchBarActive = true;
            setTimeout(function() {
                document.getElementById('input-search').focus(); //TODO: use directive
            }, 0);
        };
    });
}]);