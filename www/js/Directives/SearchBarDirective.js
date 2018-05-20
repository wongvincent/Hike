var app = angular.module('directives');

app.directive('searchBar', function() {
  return {
    templateUrl: 'views/trails/searchBar.html',
    scope: false,
  };
});