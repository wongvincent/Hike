var app = angular.module('controllers');

app.controller('FavouritesController', ['$scope', 'TrailsService', 'FavouritesService', function($scope, TrailsService, FavouritesService) {
$scope.favourites = [];
}]);