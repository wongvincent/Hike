var app = angular.module('controllers');

app.controller('TrailMapController', ['$scope', 'GoogleMaps', function ($scope, GoogleMaps) {

    var trail = $scope.trail;

    var markers = [trail];
    GoogleMaps.init(markers);

    $scope.openInMapsApp = function(lat, long) {
        if(ionic.Platform.isIOS()){
            window.open("http://maps.apple.com/?q="+lat+","+long, '_system');
        }
        else{
            window.open("http://maps.google.com/maps?daddr="+lat+","+long, '_system');
        }
    }

}]);