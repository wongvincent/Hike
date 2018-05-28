var app = angular.module('services');

app.factory('DatabaseVersioning', ['Database', function(Database) {
  return {
    update: async function() {
      // Create 'config' table if it doesn't exist
      await Database.query('CREATE TABLE IF NOT EXISTS config (name TEXT NOT NULL UNIQUE, value TEXT, PRIMARY KEY (name))');

      //Query for 'dbVersion', otherwise insert default '2.2.0'
      let dbVersion = '2.2.0';
      let result = await Database.query('SELECT value FROM config WHERE name = "dbVersion"');
      if (result.rows.length > 0) {
        dbVersion = result.rows.item(0).value;
      } else {
        await Database.query('INSERT OR REPLACE INTO config (name, value) VALUES ("dbVersion", ?)', [dbVersion]);
      }
      const [major, minor, patch] = dbVersion.split('.');

      if (major <= 2) {
        if (minor < 3) {
          await Database.query('INSERT OR REPLACE INTO config (name, value) VALUES ("appOpenedCount", "0")');
          await Database.query('UPDATE config SET value = (?) WHERE name = "dbVersion"', ['2.3.0']);
        }
      }

      //Increment appOpenedCount
      result = await Database.query('SELECT value FROM config WHERE name = "appOpenedCount"');
      const newOpenedCount = parseInt(result.rows.item(0).value) + 1;
      await Database.query('UPDATE config SET value = (?) WHERE name = "appOpenedCount"', [newOpenedCount]);

      // Set dbVersion to current app version
      const appVersion = await cordova.getAppVersion.getVersionNumber();
      await Database.query('UPDATE config SET value = (?) WHERE name = "dbVersion"', [appVersion]);

      return new Promise(function(resolve) {
        resolve();
      });
    },
  };
}]);
