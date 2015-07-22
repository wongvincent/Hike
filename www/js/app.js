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

  $stateProvider.state('trails', {
    url: '/trails',
    abstract: true,
    templateUrl: 'trails/trails-template.html'
  })
  .state('trails.list', {
    url: '/list',
    views: {
      'list-tab' : {
        templateUrl: 'trails/list.html'
      }
    }
  })
  .state('trails.map', {
    url: '/map',
    views: {
      'map-tab' : {
        templateUrl: 'trails/map.html'
      }
    }
  })

  .state('log', {
  url: '/log',
  templateUrl: 'logitems.html'
    })
.state('stopwatch', {
  url: '/stopwatch',
  templateUrl: 'stopwatch.html'
    });

  $urlRouterProvider.otherwise('/trails/list');

});


app.controller('StartController', function($scope, $ionicModal, $ionicSideMenuDelegate) {

  $scope.togglePancake = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

});