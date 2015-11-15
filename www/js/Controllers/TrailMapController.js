var app = angular.module('controllers');

app.controller('TrailMapController', ['$scope', function ($scope) {

    var trail = $scope.trail;

    var latLng = new google.maps.LatLng(trail.lat, trail.long);

    var mapOptions = {
        center: latLng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("trailmap"), mapOptions);

    google.maps.event.addListenerOnce($scope.map, 'idle', function () {
        var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
        /*
         var infoWindow = new google.maps.InfoWindow({
         content: "Here I am!"
         });

         google.maps.event.addListener(marker, 'click', function(){
         infoWindow.open($scope.map, marker);
         });
         */
    });

}]);