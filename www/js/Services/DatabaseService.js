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