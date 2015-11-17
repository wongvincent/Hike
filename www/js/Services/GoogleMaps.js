var app = angular.module('services');

app.factory('GoogleMaps', ['$cordovaGeolocation', '$ionicLoading', '$rootScope', '$cordovaNetwork', 'ConnectivityMonitor', function ($cordovaGeolocation, $ionicLoading, $rootScope, $cordovaNetwork, ConnectivityMonitor) {

    var apiKey = false;
    var map = null;

    var trails = [];
    var markers = [];
    var elemId = "";

    function initMap() {
        var latLong = new google.maps.LatLng(49.2827, -123.1207); //Lat long of Downtown Vancouver
        var zoom = 12;

        if (trails.length == 1) {
            latLong = new google.maps.LatLng(trails[0].lat, trails[0].long);
        }

        var mapOptions = {
            center: latLong,
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById(elemId), mapOptions);

        //Wait until the map is loaded
        google.maps.event.addListenerOnce(map, 'idle', function () {
            enableMap();
            if(!trails || trails.length < 1) {
                return;
            }
            else {
                loadMarkers();
            }
        });
    }

    function enableMap() {
        $ionicLoading.hide();
    }

    function disableMap() {
        $ionicLoading.show({
            template: "You must be connected to the Internet to view this map."
        })
    }

    function loadGoogleMaps() {
        $ionicLoading.show({
            template: 'Loading Google Maps...'
        });

        //This function will be called once the SDK has been loaded
        window.mapInit = function () {
            initMap();
        };

        //Create a script element to insert Google JS Maps API into the page
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "googleMaps";

        if (apiKey) {
            script.src = 'https://maps.google.com/maps/api/js?key=' + apiKey + '&sensor=true&callback=mapInit';
        }
        else {
            script.src = 'https://maps.google.com/maps/api/js?sensor=true&callback=mapInit';
        }

        document.body.appendChild(script);
    }

    function checkLoaded() {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
            loadGoogleMaps();
        }
        else {
            enableMap();
        }
    }

    function clearMarkers(){
        for(var i = 0; i < markers.length; i++){
            markers[i].setMap(null);
        }
        markers.length = 0;
    }

    function loadMarkers() {
        clearMarkers();
        var bounds = new google.maps.LatLngBounds();

        for (var i = 0; i < trails.length; i++) {
            var trail = trails[i];
            var markerPos = new google.maps.LatLng(trail.lat, trail.long);

            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: markerPos
            });

            var infoWindowContent = "<h4>" + trail.name + "</h4>";
            addInfoWindow(marker, infoWindowContent, trail);

            bounds.extend(marker.position);
        }

        if(trails.length > 1){
            map.fitBounds(bounds);
        }
    }

    function addInfoWindow(marker, message, trail) {
        var infoWindow = new google.maps.InfoWindow({
            content: message
        });

        markers.push(marker);
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
        });
    }

    function addConnectivityListeners() {
        if (ionic.Platform.isWebView()) {
            //Check if the map is already loaded when user comes online, if not, load it
            $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                checkLoaded();
            });

            //Disable the map when the user goes offline
            $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                disableMap();
            });
        }
        else {
            window.addEventListener("online", function (e) {
                checkLoaded();
            }, false);

            window.addEventListener("offline", function (e) {
                disableMap();
            }, false);
        }
    }

    return {
        init: function (arrayOfMarkers, elementId) {
            trails = arrayOfMarkers;
            apiKey = "AIzaSyClUi3fHwITYAL8qhel240O3r3scblMG8g";
            elemId = elementId;

            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.warn("Google Maps SDK needs to be loaded");

                disableMap();

                if (ConnectivityMonitor.isOnline()) {
                    loadGoogleMaps();
                }
            }
            else {
                if (ConnectivityMonitor.isOnline()) {
                    initMap();
                    enableMap();
                }
                else {
                    disableMap();
                }
            }

            addConnectivityListeners();
        }
    }
}]);