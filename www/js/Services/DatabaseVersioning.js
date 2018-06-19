var app = angular.module('services');

app.factory('DatabaseVersioning', ['Database', function(Database) {
  return {
    update: async function() {
      return new Promise(function(resolve) {
        resolve();
      });
    },
    deferredUpdate: async function() {
      // Create 'config' table if it doesn't exist
      await Database.query('CREATE TABLE IF NOT EXISTS config (name TEXT NOT NULL UNIQUE, value TEXT, PRIMARY KEY (name))');

      const dbVersionPromise = Database.query('SELECT value FROM config WHERE name = "dbVersion"');
      const appOpenedCountPromise = Database.query('SELECT value FROM config WHERE name = "appOpenedCount"');
      const appVersionPromise = cordova.getAppVersion.getVersionNumber();

      Promise.all([dbVersionPromise, appOpenedCountPromise, appVersionPromise]).then(res => {
        let [dbVersion, appOpenedCount, appVersion] = res;
        dbVersion = dbVersion.rows.length > 0 ? dbVersion.rows.item(0).value : '2.2.0';
        appOpenedCount = appOpenedCount.rows.length > 0 ? parseInt(appOpenedCount.rows.item(0).value) : 0;

        let trailsToAdd = [];

        const [major, minor, patch] = dbVersion.split('.');
        if (major <= 2) {
          if (minor <= 4) {
            trailsToAdd.push([129, 'Helm Lake', 'helmlake', 22, 3, 2, 9.0, 26.0, '7-10', 50.042258, -122.989196, 1, 920, 0, null, 'ChIJ3e7BQpIeh1QRPmCI3ET1LNs']);
            trailsToAdd.push([130, 'Whistler Train Wreck', 'whistlertrainwreck', 22, null, 0, 1.0, 2.0, '5-11', 50.08087, -123.045262, 1, 0, 0, 'https://www.whistler.ca/culture-recreation/parks-trails/train-wreck-bridge', 'ChIJ2bAtIAIYh1QR_EE2w-lu3rM']);
          }
        }

        trailsToAdd.forEach(function(trailToAdd) {
          Database.query('INSERT OR IGNORE INTO trails (id, name, href, cityId, parkId, difficulty, time, distance, season, lat, long, distanceCategory, elevation, transit, link, placeId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', trailToAdd);
        });

        //Increment appOpenedCount
        Database.query('INSERT OR REPLACE INTO config (name, value) VALUES ("appOpenedCount", (?))', [appOpenedCount + 1]);

        // Set dbVersion to current app version
        Database.query('INSERT OR REPLACE INTO config (name, value) VALUES ("dbVersion", ?)', [appVersion]);
      });
    },
  };
}]);
