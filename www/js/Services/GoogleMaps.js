var app = angular.module('services');

app.factory('GoogleMaps', ['$cordovaGeolocation', '$ionicLoading', '$rootScope', '$cordovaNetwork', 'ConnectivityMonitor', '$filter', function($cordovaGeolocation, $ionicLoading, $rootScope, $cordovaNetwork, ConnectivityMonitor, $filter) {

  var apiKey = false;
  var map = null;

  var trails = [];
  var elemId = '';

  function initMap() {
    var latLong = new google.maps.LatLng(49.2827, -123.1207); //Lat long of Downtown Vancouver
    var zoom = 12;

    if (trails.length == 1) {
      latLong = new google.maps.LatLng(trails[0].lat, trails[0].long);
    }

    var mapOptions = {
      center: latLong,
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    map = new google.maps.Map(document.getElementById(elemId), mapOptions);

    //Wait until the map is loaded
    google.maps.event.addListenerOnce(map, 'idle', function() {
      if (trails && trails.length) {
        loadMarkers();
      }
    });
  }

  function disabledMapToast() {
    window.plugins.toast.showLongBottom('Failed to load map. Check internet connection.');
  }

  function loadGoogleMaps() {
    //This function will be called once the SDK has been loaded
    window.mapInit = function() {
      initMap();
    };

    //Create a script element to insert Google JS Maps API into the page
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'googleMaps';

    if (apiKey) {
      script.src = 'https://maps.google.com/maps/api/js?key=' + apiKey + '&sensor=true&callback=mapInit';
    }
    else {
      script.src = 'https://maps.google.com/maps/api/js?sensor=true&callback=mapInit';
    }

    document.body.appendChild(script);
  }

  function checkLoaded() {
    if (typeof google == 'undefined' || typeof google.maps == 'undefined') {
      loadGoogleMaps();
    }
  }

  function loadMarkers() {
    var oms = new OverlappingMarkerSpiderfier(map);
    var bounds = new google.maps.LatLngBounds();

    var iw = new google.maps.InfoWindow();
    oms.addListener('click', function(marker){
      iw.setContent(marker.desc);
      iw.open(map, marker);
    });

    oms.addListener('spiderfy', function(){
      iw.close();
    });

    var humanizeDifficultyFilter = $filter('HumanizeDifficulty');
    var convertDistanceCategoryToStringFilter = $filter('ConvertDistanceCategoryToString');
    var processElevationToStringFilter = $filter('ProcessElevationToString');

    for (var i = 0; i < trails.length; i++) {
      var trail = trails[i];
      var markerPos = new google.maps.LatLng(trail.lat, trail.long);

      var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: markerPos,
      });

      var description = '<a class="trail-link" href=\'#/trail/' + trail.href + '/list\'>' + trail.name + '</a>' + '<br />';
      description += 'Difficulty: ' + humanizeDifficultyFilter(trail.difficulty) + '<br />';
      description += 'Time: ' + trail.time + ' hours' + '<br />';
      description += convertDistanceCategoryToStringFilter(trail.distanceCategory) + ': ' + trail.distance + 'km' + '<br />';
      description += 'Elevation Gain: ' + processElevationToStringFilter(trail.elevation);

      if (trail.favourite) {
        var yellowPin = new google.maps.MarkerImage('img/pin-yellow-dot.png', null, null, null, new google.maps.Size(48,40));
        description = '<div class=\'pin-info-description\'>' + description + '</div>';
        marker.setIcon(yellowPin);
      }

      marker.desc = description;

      oms.addMarker(marker);

      bounds.extend(marker.position);
    }

    if (trails.length > 1) {
      map.fitBounds(bounds);
    } else {
      // trail-map isn't rendering after first time, rerender it
      google.maps.event.trigger(map, 'resize');
      // recenter the map
      var centerLatLng = new google.maps.LatLng(trails[0].lat, trails[0].long);
      map.setCenter(centerLatLng);
    }
  }


  function addConnectivityListeners() {
    if (ionic.Platform.isWebView()) {
      //Check if the map is already loaded when user comes online, if not, load it
      $rootScope.$on('$cordovaNetwork:online', function() {
        checkLoaded();
      });

      //Disable the map when the user goes offline
      $rootScope.$on('$cordovaNetwork:offline', function() {
        disabledMapToast();
      });
    }
    else {
      window.addEventListener('online', function() {
        checkLoaded();
      }, false);

      window.addEventListener('offline', function() {
        disabledMapToast();
      }, false);
    }
  }

  return {
    init: function(arrayOfMarkers, elementId) {
      trails = arrayOfMarkers;
      apiKey = $rootScope.credentials.googleApiKey || '';
      elemId = elementId;

      if (typeof google == 'undefined' || typeof google.maps == 'undefined') {
        console.warn('Google Maps SDK needs to be loaded'); // eslint-disable-line no-console

        disabledMapToast();

        if (ConnectivityMonitor.isOnline()) {
          loadGoogleMaps();
        }
      }
      else {
        if (ConnectivityMonitor.isOnline()) {
          initMap();
        }
        else {
          disabledMapToast();
        }
      }

      addConnectivityListeners();
    },
  };
}]);