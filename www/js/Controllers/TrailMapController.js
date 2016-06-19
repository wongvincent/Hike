var app = angular.module('controllers');

app.controller('TrailMapController', ['$scope', 'GoogleMaps', function ($scope, GoogleMaps) {
    $scope.$on("$ionicView.enter", function () {
        var mapElement = angular.element(document.querySelector("#trail-map"));
        mapElement.empty();
        GoogleMaps.init([$scope.trail], "trail-map");
    });

    $scope.openInMapsApp = function(lat, long) {
        if(ionic.Platform.isIOS()){
            window.open("http://maps.apple.com/?q="+lat+","+long, '_system');
        } else {
            window.open("http://maps.google.com/maps?daddr="+lat+","+long, '_system');
        }
    };
}]);