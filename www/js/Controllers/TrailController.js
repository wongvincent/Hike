var app = angular.module('controllers');

app.controller('TrailController', ['$scope', '$state', '$stateParams', '$ionicPopup', 'TrailsService', function ($scope, $state, $stateParams, $ionicPopup, TrailsService) {
        $scope.state = $state.current;
        $scope.params = $stateParams;

        var hrefSelected = $scope.params.name;

        if (hrefSelected === undefined) {
            var failedPopup = $ionicPopup.alert({
                title: 'An unexpected error occurred'
                //template: 
            });
            failedPopup.then(function (res) {
                $state.go('trails.list');
            });
        }
        else {
            // Get data of trail selected (based on href name param)
            var promise = TrailsService.getSingle(hrefSelected);
            promise.then(function (res) {
                $scope.trail = res;
            });
        }
    }]);