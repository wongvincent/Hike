var app = angular.module('directives');

app.directive('favouriteStar', ['FavouritesService', 'TrailsService', function(FavouritesService, TrailsService){
    return {
        templateUrl: 'views/trail/favouritestar.html',
        restrict: "E",
        scope: true,
        controller: ['$scope', function ($scope) {
            $scope.addFavourite = function (id) {
                var promise = FavouritesService.addFavourite(id);
                $scope.favouriteStatus = true;
            };

            $scope.removeFavourite = function (id) {
                var promise = FavouritesService.removeFavourite(id);
                $scope.favouriteStatus = false;
            };

        }]
    }
}]);