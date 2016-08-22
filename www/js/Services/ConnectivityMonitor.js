var app = angular.module('services');

app.factory('ConnectivityMonitor', function ($rootScope, $cordovaNetwork) {
    return {
        isOnline: function () {

            if (ionic.Platform.isWebView()) {
                return $cordovaNetwork.isOnline();
            } else {
                return navigator.onLine;
            }
        }
    }
});