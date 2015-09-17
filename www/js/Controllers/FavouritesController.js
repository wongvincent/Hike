var app = angular.module('controllers');

app.controller('FavouritesController', ['$scope', function($scope) {

    $scope.getFavouriteTrailsData = function() {
        $scope.favourites = [];
        angular.forEach($scope.favouriteIds, function (trailId) {
            var trailIndex = getIndexOfTrail(trailId);
            $scope.favourites.push($scope.trails[trailIndex]);
        });
    };

    function getIndexOfTrail(trailId){
        for(var i = 0; i < $scope.trails.length; i++){
            var trail = $scope.trails[i];
            if(trailId == trail.id){
                return i;
            }
        }
        throw "Index of trail not found";
    }
}]);