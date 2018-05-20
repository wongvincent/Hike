var app = angular.module('controllers');

app.controller('TrailMapController', ['$rootScope', '$scope', 'GoogleMaps', '$sce', function($rootScope, $scope, GoogleMaps, $sce) {
  $scope.embedMapSrc = $rootScope.credentials.googleApiKey && $scope.trail.placeId ?
    $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?key=' + $rootScope.credentials.googleApiKey + '&q=place_id:' + $scope.trail.placeId)
    : '';

  $scope.initJsMap = function() {
    var mapElement = angular.element(document.querySelector('#trail-map-js'));
    mapElement.empty();
    GoogleMaps.init([$scope.trail], 'trail-map-js');
  };

  $scope.openInMapsApp = function(lat, long) {
    if (analytics) analytics.trackEvent('Trail', 'Open in Google Maps', $scope.trail.id);
    if(ionic.Platform.isIOS()){
      window.open('http://maps.apple.com/?q='+lat+','+long, '_system');
    } else {
      window.open('http://maps.google.com/maps?daddr='+lat+','+long, '_system');
    }
  };
}]);