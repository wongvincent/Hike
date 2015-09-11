var app = angular.module('controllers');

app.controller('FaouritesController', ['$scope', 'TrailsService', 'FavouritesService', function($scope, TrailsService, FavouritesService) {
$scope.favourites = [];
}]);