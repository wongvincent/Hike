var app = angular.module('controllers');

app.controller('FavouritesController', ['$scope', function($scope) {

    $scope.getFavouriteTrailsData = function() {
        sortAlphabetically($scope.favourites);
    };

    function sortAlphabetically(array) {
        function compare(a,b) {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        }

        array.sort(compare);
    }
}]);