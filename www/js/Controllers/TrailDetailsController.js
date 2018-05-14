var app = angular.module('controllers');

app.controller('TrailDetailsController', ['$scope', '$state', '$stateParams', '$filter', '$ionicLoading', '$ionicSideMenuDelegate', function ($scope, $state, $stateParams, $filter, $ionicLoading, $ionicSideMenuDelegate) {
    $scope.favouriteStatus = $scope.trail.favourite;

    $scope.$on('$ionicView.enter', function() {
        if (analytics) analytics.trackView('Trail - Details');
    });
}]);