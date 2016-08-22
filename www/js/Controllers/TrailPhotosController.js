var app = angular.module('controllers');

app.controller('TrailPhotosController', ['$scope', 'GooglePlacesService', '$ionicLoading', 'ConnectivityMonitor', function ($scope, GooglePlacesService, $ionicLoading, ConnectivityMonitor) {
    if (ConnectivityMonitor.isOnline()) {
        $ionicLoading.show();

        var getPhotosPromise = GooglePlacesService.getPhotos($scope.trail);
        getPhotosPromise.then(function (photos) {
            if (photos && photos.length) {
                for (var i = 0; i < photos.length; i++) {
                    photos[i].src = GooglePlacesService.getPhotoURL(photos[i].photo_reference);
                }
                $scope.trail.photos = photos;
            } else {
                window.plugins.toast.showLongBottom(
                    "No Photos Found"
                );
            }
        }).catch(function() {
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