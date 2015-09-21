var app = angular.module('controllers');

app.controller('FavouritesController', ['$scope', function($scope) {

    $scope.getFavouriteTrailsData = function() {
        $scope.favourites = [];
        angular.forEach($scope.favouriteIds, function (trailId) {
            var trailIndex = getIndexOfTrail(trailId);
            $scope.trails[trailIndex].favourite = true; //set favourite = true tag on trail in trails
            $scope.favourites.push($scope.trails[trailIndex]); //get trail from $scope.trails and add to favourites
        });
        sortAlphabetically($scope.favourites);
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

    function sortAlphabetically(array) {
        function compare(a,b) {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        }

        array.sort(compare);
    }
}]);