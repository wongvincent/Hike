var app = angular.module('directives');

app.directive('favouriteStar', ['FavouritesService', function(FavouritesService) {
  return {
    templateUrl: 'views/trail/favouritestar.html',
    restrict: 'E',
    scope: true,
    controller: ['$scope', function($scope) {
      $scope.addFavourite = function(id) {
        FavouritesService.addFavourite(id);
        if (analytics) analytics.trackEvent('Star', 'Favourite', id);
        $scope.favouriteStatus = true;
      };

      $scope.removeFavourite = function(id) {
        FavouritesService.removeFavourite(id);
        if (analytics) analytics.trackEvent('Star', 'Unfavourite', id);
        $scope.favouriteStatus = false;
      };

    }],
  };
}]);