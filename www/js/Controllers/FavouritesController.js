var app = angular.module('controllers');

app.controller('FavouritesController', ['$scope', 'TrailsService', 'FavouritesService', function($scope, FavouritesService) {
    $scope.favourites = [];

    angular.forEach($scope.favouriteIds, function(trailId){
        for(var i=0; i < $scope.trails.length; i++) {
            var trail = $scope.trails[i];
            if(trailId == trail.id){
                $scope.favourites.push(trail);
                break;
            }
        }
    });
}]);