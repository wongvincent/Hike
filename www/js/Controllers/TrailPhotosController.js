var app = angular.module('controllers');

app.controller('TrailPhotosController', ['$scope', 'GooglePlacesService', '$ionicLoading', 'ConnectivityMonitor', function ($scope, GooglePlacesService, $ionicLoading, ConnectivityMonitor) {
    if (ConnectivityMonitor.isOnline()) {
        $ionicLoading.show();

        var getPhotosPromise = GooglePlacesService.getPhotos($scope.trail);
        getPhotosPromise.then(function (photos) {
            if (photos && photos.length) {
                // Limit to x photos
                var limit = 5;
                photos = photos.slice(0, limit);
                for (var i = 0; i < Math.min(photos.length, limit); i++) {
                    photos[i].src = GooglePlacesService.getPhotoURL(photos[i].photo_reference);
                }
                $scope.trail.photos = photos;
            } else {
                $scope.trail.photos = [];
                window.plugins.toast.showLongBottom(
                    "No Photos Found"
                );
            }
        }).catch(function() {
            $scope.trail.photos = [];
            window.plugins.toast.showLongBottom(
                "Failed to retrieve photos"
            );
        }).finally(function() {
            $ionicLoading.hide();
        });
    } else {
        $scope.noConnectionAlert("An internet connection is required to load trail photos.");
    }
}]);