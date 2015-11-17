var app = angular.module('controllers');

app.controller('TrailsMapController', ['$scope', 'GoogleMaps', function ($scope, GoogleMaps) {
    $scope.$on("$ionicView.enter", function () {
        var mapElement = angular.element(document.querySelector("#trails-map"));
        mapElement.empty();
        GoogleMaps.init($scope.filteredTrails, "trails-map");
    });
}]);

