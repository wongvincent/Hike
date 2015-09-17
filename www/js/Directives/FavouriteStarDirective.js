var app = angular.module('directives');

app.directive('favouriteStar', ['FavouritesService', 'TrailsService', function(FavouritesService, TrailsService){
    return {
        templateUrl: 'trail/favouritestar.html',
        restrict: "E",
        scope: true,
        controller: ['$scope', function ($scope) {
            $scope.addFavourite = function (id) {
                var promise = FavouritesService.addFavourite(id);

                $scope.favouriteStatus = true;

                promise.then(function () {
                    $scope.favouriteIds.push(id);
                });
            };

            $scope.removeFavourite = function (id) {
                var promise = FavouritesService.removeFavourite(id);

                $scope.favouriteStatus = false;

                promise.then(function () {

                    // remove from favouriteIds
                    for (var i = 0; i < $scope.favouriteIds.length; i++) {
                        if ($scope.favouriteIds[i] == id) {
                            $scope.favouriteIds.splice(i, 1);
                            break;
                        }
                    }
                });
            };

        }]
    }
}]);