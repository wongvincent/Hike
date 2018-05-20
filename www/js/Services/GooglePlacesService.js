var app = angular.module('services');

app.service('GooglePlacesService', ['$rootScope', '$http', function($rootScope, $http) {
  var that = this;
  var googleApiKey = $rootScope.credentials.googleApiKey || '';

  that.getPhotos = function(trail) {
    if (!trail.placeId) return Promise.resolve(null);
    return that.getPlaceDetails(trail.placeId.trim()).then(function(placeDetails) {
      // will contain maximum 10 photos
      return placeDetails && placeDetails.result && placeDetails.result.photos ? placeDetails.result.photos : [];
    }).catch(function(error) {
      console.log(error); // eslint-disable-line no-console
    });
  };

  /*** Unused ***
    that.getPlaceId = function(trailName, latitude, longitude) {
        var absoluteURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

        var locationString = latitude.toString() + "," + longitude.toString();
        return $http.get(absoluteURL, {
            params : {
                key : googleApiKey,
                location : locationString,
                radius : 5000,
                keyword : trailName
            }
        }).then(function successCallback(response) {
            var res = null;

            var responseData = response && response.data;
            var firstResult = responseData && responseData.results && responseData.results.length && responseData.results[0];
            if (firstResult) {
                res = firstResult.place_id;
            }
            return res;
        }, function errorCallback(response) {

        });
    }; */

  that.getPlaceDetails = function(placeId) {
    var absoluteURL = 'https://maps.googleapis.com/maps/api/place/details/json';

    return $http.get(absoluteURL, {
      params: {
        key: googleApiKey,
        placeid: placeId,
      },
    }).then(function successCallback(response) {
      return response.data;
    }, function errorCallback() {
    });
  };

  that.getPhotoURL = function(photoReference) {
    var absoluteURL = 'https://maps.googleapis.com/maps/api/place/photo?';
    absoluteURL += 'key=' + googleApiKey + '&';
    absoluteURL += 'maxwidth=480&';
    absoluteURL += 'photoreference=' + photoReference;
    return absoluteURL;
  };

  return that;
}]);