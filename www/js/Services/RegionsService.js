var app = angular.module('services');

//TODO: WRITE TESTS for these queries

app.service('RegionsService', ['$rootScope', 'Database', function($rootScope, Database){
  var self = this;

  self.getAll = function() {
    var queryString = 'SELECT * FROM regions';
    return Database.query(queryString)
      .then(function(result){
        return Database.All(result);
      });
  };

  return self;
}]);