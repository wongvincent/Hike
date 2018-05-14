var app = angular.module('directives');

app.directive('favouriteStar', ['FavouritesService', function(FavouritesService) {
    return {
        templateUrl: 'views/trail/favouritestar.html',
        restrict: "E",
        scope: true,
        controller: ['$scope', function ($scope) {
            $scope.addFavourite = function (id) {
                var promise = FavouritesService.addFavourite(id);
                if (analytics) analytics.trackEvent('Star', 'Favourite', id);
                $scope.favouriteStatus = true;
            };

            $scope.removeFavourite = function (id) {
                var promise = FavouritesService.removeFavourite(id);
                if (analytics) analytics.trackEvent('Star', 'Unfavourite', id);
                $scope.favouriteStatus = false;
            };

        }]
    }
}]);