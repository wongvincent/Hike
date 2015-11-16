var app = angular.module('services');

app.factory('GoogleMaps', function(){
    var apiKey = false;
    var map = null;

    var latLong = new google.maps.LatLng(49.2827, -123.1207); //Lat long of Downtown Vancouver
    var zoom = 12;

    function initMap(trails){
        if(trails.length < 1) return;
        else if(trails.length == 1) {
            latLong = new google.maps.LatLng(trails[0].lat, trails[0].long);
        }
        else {
            console.log("More than 1 trail to mark");
            //do something to calculate latLng on middle and the zoom ratio
            return;
        }

        var mapOptions = {
            center: latLong,
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //Wait until the map is loaded
        google.maps.event.addListenerOnce(map, 'idle', function(){
            loadMarkers(trails);
        });
    }

    function loadMarkers(trails){
        for(var i = 0; i < trails.length; i++){
            var trail = trails[i];
            var markerPos = new google.maps.LatLng(trail.lat, trail.long);

            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: markerPos
            });

            var infoWindowContent = "<h4>" +  trail.name + "</h4>";
            addInfoWindow(marker, infoWindowContent, trail);
        }
    }

    function addInfoWindow(marker, message, trail){
        var infoWindow = new google.maps.InfoWindow({
            content: message
        });

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.open(map, marker);
        });
    }

    return{
        init: function(trails){
            initMap(trails);
        }
    }
});