var app = angular.module('services');

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
                        var single = Database.single(result);
                        var output = single;

                        if (output.images !== null && output.images !== '')
                            output.images = JSON.parse(output.images)["key"];
                        if (output.instructions !== null && output.instructions !== '')
                            output.instructions = JSON.parse(output.instructions);
                        if (output.info !== null && output.info !== '')
                            output.info = JSON.parse(output.info);
                        return output;
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

 