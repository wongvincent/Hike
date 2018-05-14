var app = angular.module('controllers');

app.controller('TrailDetailsController', ['$scope', '$state', '$stateParams', '$filter', '$ionicLoading', '$ionicSideMenuDelegate', '$cordovaGoogleAnalytics', function ($scope, $state, $stateParams, $filter, $ionicLoading, $ionicSideMenuDelegate, $cordovaGoogleAnalytics) {
    $scope.favouriteStatus = $scope.trail.favourite;

    $scope.$on('$ionicView.enter', function() {
        $cordovaGoogleAnalytics.trackView('Trail - Details');
    });
}]);