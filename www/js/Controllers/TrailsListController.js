var app = angular.module('controllers');

app.controller('TrailsListController', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.$on('$ionicView.enter', function () {
        $rootScope.lastMainState = 'trails.list';
    });
}]);