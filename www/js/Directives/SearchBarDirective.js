var app = angular.module('directives');

app.directive('searchBar', ['$ionicPopup', '$ionicModal', function ($ionicPopup, $ionicModal) {
    return {
        templateUrl: 'views/trails/searchBar.html',
        scope: false
    };
}]);