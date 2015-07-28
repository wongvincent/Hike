var app = angular.module('Trails');

app.directive('searchFilter', function() {
   return {
       scope: {
           activities: '='
       },
       templateUrl: '/trails/searchfilter.html',
       controller: ['$scope', function($scope) {
               
       }]
   };
});