var app = angular.module('trail', []);

app.controller('TrailController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
        $scope.state = $state.current;
        $scope.params = $stateParams;
}]);