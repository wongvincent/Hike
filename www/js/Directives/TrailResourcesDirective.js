var app = angular.module('directives');

app.directive('trailResources', function() {
  return {
    templateUrl: 'views/trail/trailResources.html',
    restrict: 'E',
    scope: true,
    controller: ['$scope', function($scope) {
      const trail = $scope.trail;
      $scope.park = $scope.parks[trail.parkId] || {};

      $scope.openParkLink = function() {
        if (analytics) analytics.trackEvent('Trail', 'Park Link', trail.id);
        window.open($scope.park.url);
      };

      $scope.openOtherLink = function() {
        if (analytics) analytics.trackEvent('Trail', 'Other Link', trail.id);
        window.open($scope.trail.link);
      };
    }],
  };
});