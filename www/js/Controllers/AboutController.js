var app = angular.module('controllers');

app.controller('AboutController', ['$rootScope', '$scope', function($rootScope, $scope) {
  $scope.$on('$ionicView.enter', function() {
    $rootScope.lastMainState = 'about';
    if (analytics) analytics.trackView('About');
  });
}]);