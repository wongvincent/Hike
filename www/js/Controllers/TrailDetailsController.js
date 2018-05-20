var app = angular.module('controllers');

app.controller('TrailDetailsController', ['$scope', function($scope) {
  $scope.favouriteStatus = $scope.trail.favourite;

  $scope.$on('$ionicView.enter', function() {
    if (analytics) analytics.trackView('Trail - Details');
  });
}]);