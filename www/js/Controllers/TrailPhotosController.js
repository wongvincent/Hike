var app = angular.module('controllers');

app.controller('TrailPhotosController', ['$rootScope', '$scope', 'GooglePlacesService', '$ionicLoading', 'ConnectivityMonitor', function($rootScope, $scope, GooglePlacesService, $ionicLoading, ConnectivityMonitor) {
  $scope.$on('$ionicView.enter', function() {
    if (analytics) analytics.trackView('Trail - Photos');
  });

  function fetchWrapper(url, options, timeout) {
    return new Promise((resolve, reject) => {
      fetch(url, options).then(resolve).catch(reject);

      if (timeout) {
        const e = new Error('Connection timed out');
        setTimeout(reject, timeout, e);
      }
    });
  }

  async function getAmazonS3Photos() {
    const amazonS3Base = $rootScope.credentials.amazonS3Base;
    const fetchResponse = await fetchWrapper(`${amazonS3Base}/?list-type=2&prefix=${$scope.trail.href}/`, null, 1500);

    if (fetchResponse.ok) {
      const body = await fetchResponse.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(body, 'text/xml');
      const json = xmlToJson(xml);
      const keyCount = (((json || {}).ListBucketResult || {}).KeyCount || {})['#text'] || 0;
      if (keyCount > 1) {
        let photos = [];
        for (let i = 1; i < keyCount; i++) {
          const photo = {};
          photo.src = `${amazonS3Base}/${$scope.trail.href}/${i}.jpg`;
          photo.html_attributions = ['HIKINGVANCOUVER'];
          photos.push(photo);
        }
        return new Promise(function(resolve) {
          resolve(photos);
        });
      }
    }

    return new Promise(function(resolve, reject) {
      reject();
    });

  }

  async function getGooglePlacesPhotos() {
    var getPhotosPromise = GooglePlacesService.getPhotos($scope.trail);
    getPhotosPromise.then(function(photos) {
      if (photos && photos.length) {
        $scope.photosFromGooglePlaces = true;
        // Limit to x photos
        var limit = 3;
        photos = photos.slice(0, limit);
        for (var i = 0; i < Math.min(photos.length, limit); i++) {
          photos[i].src = GooglePlacesService.getPhotoURL(photos[i].photo_reference);
        }
        $scope.trail.photos = photos;
      } else {
        $scope.trail.photos = [];
      }
    }).catch(function() {
      $scope.trail.photos = [];
    }).finally(function() {
      $ionicLoading.hide();
    });
  }

  if (ConnectivityMonitor.isOnline()) {
    $ionicLoading.show();
    $scope.photosFromGooglePlaces = false;

    getAmazonS3Photos().then(photos => {
      $scope.trail.photos = photos;
      $ionicLoading.hide();
    }).catch(function() {
      getGooglePlacesPhotos();
    });
  } else {
    $scope.trail.photos = [];
    $scope.noConnectionAlert('An internet connection is required to load trail photos.');
  }
}]);