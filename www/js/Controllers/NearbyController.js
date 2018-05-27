var app = angular.module('controllers');

app.controller('NearbyController', ['$rootScope', '$scope', '$ionicLoading', '$ionicPopup', function($rootScope, $scope, $ionicLoading, $ionicPopup) {
  $scope.$on('$ionicView.enter', function() {
    $rootScope.lastMainState = 'nearby';
    $scope.locationFailed = false;
    if (analytics) analytics.trackView('Nearby');
    $scope.refreshNearbyTrails();
  });

  $scope.refreshNearbyTrails = function(manualRefresh) {
    if (manualRefresh && analytics) {
      analytics.trackEvent('Nearby', 'Manual Refresh');
    }
    isLocationAuthorized().then(function(isAppLocationPermissionEnabled) {
      if (isAppLocationPermissionEnabled) {
        handleDeviceLocationCheck(manualRefresh);
      } else {
        requestLocationAuthorization().then(function(permissionsGranted) {
          if (permissionsGranted !== 'DENIED' && permissionsGranted !== 'DENIED_ALWAYS') {
            handleDeviceLocationCheck(manualRefresh);
          } else {
            $scope.$apply(function() {
              $scope.locationFailed = true;
            });
            window.plugins.toast.showLongBottom('FAILED! App location permissions required');
          }
        });
      }
    });
  };

  var handleDeviceLocationCheck = function(manualRefresh) {
    checkIfLocationIsOn().then(function(isDeviceLocationEnabled) {
      if (isDeviceLocationEnabled) {
        acquireLocation(manualRefresh);
      } else {
        showTurnOnLocationPopup().then(function(tryTurningOn) {
          if (tryTurningOn) {
            cordova.plugins.diagnostic.switchToLocationSettings();
            setTimeout(function() {
              refreshLocationPopup(manualRefresh);
            }, 1500);
          } else {
            $scope.$apply(function() {
              $scope.locationFailed = true;
            });
            window.plugins.toast.showLongBottom('FAILED! Device location settings are off');
          }
        });
      }
    });
  };

  var isLocationAuthorized = function() {
    return new Promise(function(resolve) {
      cordova.plugins.diagnostic.isLocationAuthorized(function(enabled) {
        resolve(enabled);
      });
    });
  };

  var requestLocationAuthorization = function() {
    return new Promise(function(resolve) {
      cordova.plugins.diagnostic.requestLocationAuthorization(function(status) {
        resolve(status);
      });
    });
  };

  var checkIfLocationIsOn = function() {
    return new Promise(function(resolve) {
      cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
        resolve(enabled);
      });
    });
  };

  var showTurnOnLocationPopup = function() {
    var turnLocationOnPopup = $ionicPopup.confirm({
      template: 'GPS is required - would you like to turn it ON?',
      cancelText: 'LEAVE OFF',
      cancelType: 'button-light',
      okText: 'TURN ON',
      okType: 'button-light',
    });
    return new Promise(function(resolve) {
      turnLocationOnPopup.then(function(res) {
        resolve(res);
      });
    });
  };

  var refreshLocationPopup = function(manualRefresh) {
    var refreshPopup = $ionicPopup.alert({
      template: 'Detect location...',
      okText: 'REFRESH LOCATION',
      okType: 'button-light',
    });
    refreshPopup.then(function() {
      checkIfLocationIsOn().then(function(deviceLocationIsOn) {
        if (deviceLocationIsOn) {
          acquireLocation(manualRefresh);
        } else {
          $scope.$apply(function() {
            $scope.locationFailed = true;
          });
          window.plugins.toast.showLongBottom('FAILED! App location permissions required');
        }
      });
    });
  };

  var acquireLocation = function(manualRefresh) {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!',
    });
    var maximumAge = manualRefresh ? 0 : 300000;
    var geolocationOptions = {
      maximumAge: maximumAge, //milliseconds
      timeout: 5000,
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOptions);
  };

  var geolocationError = function() {
    $scope.$apply(function() {
      $scope.locationFailed = true;
    });
    $ionicLoading.hide();
    window.plugins.toast.showLongBottom('FAILED! Could not detect location');
  };

  var geolocationSuccess = function(position) {
    function distanceFromPos(trail, posLat, posLong) {
      if (!trail.lat || !trail.long) return Number.MAX_SAFE_INTEGER;

      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(trail.lat - posLat);  // deg2rad below
      var dLon = deg2rad(trail.long - posLong);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(posLat)) * Math.cos(deg2rad(trail.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    $scope.nearby = [];

    angular.forEach($scope.trails, function(value) {
      value.distanceFromPos = distanceFromPos(value, lat, long);
      $scope.nearby.push(value);
    });
    $scope.nearby.sort(function(a, b) {
      return a.distanceFromPos - b.distanceFromPos;
    });

    $scope.$apply(function() {
      $scope.locationFailed = false;
    });
    $ionicLoading.hide();
  };
}]);