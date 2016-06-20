var app = angular.module('controllers');

app.controller('TrailMapController', ['$scope', 'GoogleMaps', function ($scope, GoogleMaps) {
    $scope.$on('trailDataLoaded', function(e) {
        var mapElement = angular.element(document.querySelector("#trail-map"));
        mapElement.empty();
        GoogleMaps.init([$scope.trail], "trail-map");
        google.maps.event.trigger(map, 'resize');
    });

    $scope.openInMapsApp = function(lat, long) {
        if(ionic.Platform.isIOS()){
            window.open("http://maps.apple.com/?q="+lat+","+long, '_system');
        } else {
            window.open("http://maps.google.com/maps?daddr="+lat+","+long, '_system');
        }
    };
}]);