var app = angular.module('directives');

app.directive('trailMap', [ function(){
    return {
        templateUrl: 'views/trail/map.html',
        restrict: "E",
        scope: true
    }
}]);