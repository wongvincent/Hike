var app = angular.module('controllers');

app.controller('TrailListController', ['$scope', '$state', '$stateParams', '$filter', '$ionicLoading', '$ionicSideMenuDelegate', '$cordovaGoogleAnalytics', function ($scope, $state, $stateParams, $filter, $ionicLoading, $ionicSideMenuDelegate, $cordovaGoogleAnalytics) {
    $scope.favouriteStatus = $scope.trail.favourite;

    $scope.$on('$ionicView.enter', function() {
        console.log('Trail - List');
        $cordovaGoogleAnalytics.trackView('Trail - List');
    });
}]);