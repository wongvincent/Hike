var app = angular.module('controllers');

app.controller('FavouritesController', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.$on('$ionicView.enter', function(){
        $rootScope.lastMainState = 'favourites';
        if (analytics) analytics.trackView('Favourites');
        $scope.favouriteTrails = getFavouriteTrails();
    });

    function getFavouriteTrails() {
        const favouriteTrails = [];
        $scope.favouriteIds.forEach(function(favouriteId) {
            const indexOfTrail = $scope.trailsIndex[favouriteId];
            favouriteTrails.push($scope.trails[indexOfTrail]);
        });
        return favouriteTrails;
    }
}]);