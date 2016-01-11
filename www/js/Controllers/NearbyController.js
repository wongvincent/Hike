var app = angular.module('controllers');

app.controller('NearbyController', ['$rootScope', '$scope', '$ionicLoading', '$cordovaGeolocation', function($rootScope, $scope, $ionicLoading, $cordovaGeolocation){

    $scope.$on('$ionicView.enter', function(){
        $rootScope.lastMainState = 'nearby';
    });

    $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
    });

    var posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 600000 //milliseconds
    };

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position){
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        $scope.nearby = [];

        angular.forEach($scope.trails, function(value, key){
            value.distanceFromPos = distanceFromPos(value, lat, long);
            $scope.nearby.push(value);

        });
        $scope.nearby.sort(function(a,b){
            return a.distanceFromPos - b.distanceFromPos;
        })

        $ionicLoading.hide();

    }, function(err){
        $ionicLoading.hide();
        $scope.failedPopupReload('Failed to acquire location');
    });


    function distanceFromPos(trail, posLat, posLong){
        if(!trail.lat || !trail.long) return Number.MAX_SAFE_INTEGER;

        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(trail.lat-posLat);  // deg2rad below
        var dLon = deg2rad(trail.long-posLong);
        var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(posLat)) * Math.cos(deg2rad(trail.lat)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg){
        return deg*(Math.PI/180);
    }

}]);