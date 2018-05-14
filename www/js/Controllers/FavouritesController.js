var app = angular.module('controllers');

app.controller('FavouritesController', ['$rootScope', '$scope', '$cordovaGoogleAnalytics', function($rootScope, $scope, $cordovaGoogleAnalytics) {
    $scope.$on('$ionicView.enter', function(){
        $rootScope.lastMainState = 'favourites';
        $cordovaGoogleAnalytics.trackView('Favourites');
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