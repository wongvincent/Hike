var app = angular.module('controllers');

app.controller('FavouritesController', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.$on('$ionicView.enter', function(){
        $rootScope.lastMainState = 'favourites';
    });
}]);