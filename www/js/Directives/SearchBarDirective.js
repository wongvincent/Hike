var app = angular.module('directives');

app.directive('searchBar', ['$ionicPopup', '$ionicModal', function ($ionicPopup, $ionicModal) {
    return {
        templateUrl: 'views/trails/searchBar.html',
        controller: ['$scope', function ($scope) {
            $scope.hideSearchBar = function() {
                $scope.data.searchText = '';
                $scope.searchBarActive = false;
            };
            $scope.clearSearchBar = function() {
                $scope.data.searchText = '';
            };
        }]
    };
}]);