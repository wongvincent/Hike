var app = angular.module('services');

app.factory('Database', ['$cordovaSQLite', '$q', '$ionicPlatform', function ($cordovaSQLite, $q, $ionicPlatform) {
        var self = this;

        //Handle query's and potential errors
        self.query = function (query, parameters) {
            parameters = parameters || [];
            var q = $q.defer();

            $ionicPlatform.ready(function () {
                $cordovaSQLite.execute(db, query, parameters)
                        .then(function (result) {
                            q.resolve(result);
                        }, function (error) {
                            console.warn('Database access error');
                            console.warn(error);
                            q.reject(error);
                        });
            });
            return q.promise;
        };

        // Process a set of results
        self.All = function (result) {
            var output = [];

            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }
            return output;
        };

        //Process a single (first) result
        self.single = function (result) {
            var output = null;
            output = angular.copy(result.rows.item(0));
            return output;
        };

        return self;
    }]);

app.factory('TrailsService', ['Database', function (Database) {
        var self = this;

        self.getAllTrails = function () {

            var queryString = "SELECT * FROM trails";
            return Database.query(queryString)
                    .then(function (result) {
                        return Database.All(result);
                    });
        };

        self.getSingle = function (href) {
            var parameters = [href];
            return Database.query("SELECT * FROM trails WHERE href = (?)", parameters)
                    .then(function (result) {
                        return Database.single(result);
                    });
        };

        /*
         self.add = function(trail){
         var parameters = [trail.name, trail.href, .....];
         return Database.query("INSERT INTO trails (name, href .....) VALUES (?,?,....)", parameters);
         }
         
         self.remove = function(trail){;
         var parameters = [member.href];
         return Database.query("DELETE FROM trail WHERE href = (?)", parameters);
         }
         
         self.update = function(oldTrail, newTrail){
         var parameters = [...];
         return Database.query("UPDATE trails SET name = (?), href = (?) WHERE name = (?)", parameters);
         }
         */

        return self;
    }]);

 