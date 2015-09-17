var app = angular.module('controllers');

app.controller('TrailController', ['$scope', '$state', '$stateParams', 'TrailsService', 'FavouritesService', function ($scope, $state, $stateParams, TrailsService, FavouritesService) {
    $scope.state = $state.current;
    $scope.params = $stateParams;

    var hrefSelected = $scope.params.name;

    if (hrefSelected === undefined) {
        $scope.failedPopup();
    }
    else {
        // Get data of trail selected (based on href name param)
        var promise = TrailsService.getSingle(hrefSelected);
        promise.then(function (res) {
            $scope.trail = res;

            var promise = FavouritesService.isFavouriteTrail(res.id);
            promise.then(function (status) {
                $scope.favouriteStatus = status;
            });
        });
    }

}]);