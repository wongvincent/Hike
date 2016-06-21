var app = angular.module('controllers');

app.controller('NearbyController', ['$rootScope', '$scope', '$ionicLoading', '$ionicPopup', function($rootScope, $scope, $ionicLoading, $ionicPopup) {
    $scope.$on('$ionicView.enter', function(){
        $rootScope.lastMainState = 'nearby';
        checkIfLocationIsOn();
    });

    var showTurnOnLocationPopup = function() {
        var turnLocationOnPopup = $ionicPopup.confirm({
            title: "Your GPS is off - would you like to turn it ON?",
            cancelText: "NO",
            cancelType: "button-dark",
            okText: "YES",
            okType: "button-balanced"
        });
        turnLocationOnPopup.then(function (res) {
            if (res) {
                var tryAgainPopup = $ionicPopup.alert({
                    okText: "Refresh location",
                    okType: "button-balanced"
                });
                tryAgainPopup.then(function(res) {
                    checkIfLocationIsOn();
                });
                cordova.plugins.diagnostic.switchToLocationSettings();
            }
        });
    };

    function checkIfLocationIsOn() {
        cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
                if (!enabled) {
                    showTurnOnLocationPopup();
                } else {
                    $ionicLoading.show({
                        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
                    });
                    var geolocationOptions = {
                        maximumAge: 300000, //milliseconds
                        timeout: 10000,
                        enableHighAccuracy: true
                    };
                    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOptions);
                }
            }, function(error) {
                geolocationError();
            }
        );
    }

    var geolocationError = function(err) {
        $ionicLoading.hide();
        var geolocationErrorPopup = $ionicPopup.confirm({
            title: "Failed to acquire location",
            cancelText: "Cancel",
            cancelType: "button-dark",
            okText: "Try Again",
            okType: "button-balanced"
        });
        geolocationErrorPopup.then(function (res) {
            if (res) {
                checkIfLocationIsOn();
            } else {
                $scope.goState('trails.list');
            }
        });
    };

    function geolocationSuccess(position) {
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

        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        $scope.nearby = [];

        angular.forEach($scope.trails, function (value, key) {
            value.distanceFromPos = distanceFromPos(value, lat, long);
            $scope.nearby.push(value);

        });
        $scope.nearby.sort(function (a, b) {
            return a.distanceFromPos - b.distanceFromPos;
        });

        $ionicLoading.hide();
    }
}]);