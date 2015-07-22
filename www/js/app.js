var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/trails')

  $stateProvider.state('trails', {
    url: 'trails',
    templateUrl: 'Trails/trails.html'
  })

$stateProvider.state('log', {
  url: '/log',
  templateUrl: 'logitems.html'
    })

$stateProvider.state('stopwatch', {
  url: '/stopwatch',
  templateUrl: 'stopwatch.html'
    })

});


app.controller('StartController', function($scope, $ionicModal, $ionicSideMenuDelegate) {

  $scope.togglePancake = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

});