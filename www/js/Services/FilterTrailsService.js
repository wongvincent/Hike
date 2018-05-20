var app = angular.module('services');

app.factory('FilterTrailsService', ['$rootScope', function($rootScope) {
  var self = this;

  var filteredTrails = [];
  var lastFilteredTime = new Date();

  var filterLocation = {
    key: 'filterLocation',
    name: 'Location',
    items: [
      { id: 1, name: 'Fraser Valley', isChecked: true},
      { id: 2, name: 'Howe Sound', isChecked: true},
      { id: 3, name: 'North Shore', isChecked: true},
      { id: 4, name: 'Ridge Meadows', isChecked: true},
      { id: 5, name: 'South of Fraser', isChecked: true},
      { id: 9, name: 'Sunshine Coast', isChecked: true},
      { id: 6, name: 'Tri-Cities', isChecked: true},
      { id: 7, name: 'Vancouver', isChecked: true},
      { id: 8, name: 'Whistler', isChecked: true},
    ],
  };

  var defaultFilters = {
    searchText: '',
    sortSelected: 'name',
    filterLocation: filterLocation.items,
    filterTimeMin: 0,
    filterTimeMax: 12,
    filterDistanceMin: 0,
    filterDistanceMax: 30,
    filterDifficultyEasy: true,
    filterDifficultyModerate: true,
    filterDifficultyHard: true,
    filterTransit: false,
    filterInSeason: false,
  };

  var data = angular.copy(defaultFilters);

  self.getDefaultFilters = function() {
    return angular.copy(defaultFilters);
  };

  self.getFilteredTrails = function() {
    return angular.copy(filteredTrails);
  };

  self.setFilteredTrails = function(trails) {
    filteredTrails = angular.copy(trails);
    _updateLastFilteredTime();
  };

  // Data are the currently applied filters
  self.getData = function() {
    return angular.copy(data);
  };

  self.setData = function(newData) {
    data = angular.copy(newData);
  };

  self.getLastFilteredTime = function() {
    return lastFilteredTime;
  };

  self.getNumberOfFiltersApplied = function() {
    var hasLocationsFilterApplied = function() {
      return data.filterLocation.some(function(location) {
        return !location.isChecked;
      });
    };

    var numberOfFiltersApplied = hasLocationsFilterApplied() +
			(defaultFilters.filterTimeMin !== data.filterTimeMin
			|| defaultFilters.filterTimeMax !== data.filterTimeMax) +
			(defaultFilters.filterDistanceMin !== data.filterDistanceMin
			|| defaultFilters.filterDistanceMax !== data.filterDistanceMax) +
			(defaultFilters.filterDifficultyEasy !== data.filterDifficultyEasy
			|| defaultFilters.filterDifficultyModerate !== data.filterDifficultyModerate
			|| defaultFilters.filterDifficultyHard !== data.filterDifficultyHard) +
			(defaultFilters.filterTransit !== data.filterTransit) +
			(defaultFilters.filterInSeason !== data.filterInSeason);

    return numberOfFiltersApplied;
  };

  $rootScope.$on('event:add-favourite', function(event, args) {
    for (var i=0; i < filteredTrails.length; i++) {
      if (filteredTrails[i].id === args.id) {
        filteredTrails[i].favourite = true;
        break;
      }
    }
    _updateLastFilteredTime();
  });

  $rootScope.$on('event:remove-favourite', function(event, args) {
    for (var i=0; i < filteredTrails.length; i++) {
      if (filteredTrails[i].id === args.id) {
        filteredTrails[i].favourite = false;
        break;
      }
    }
    _updateLastFilteredTime();
  });

  var _updateLastFilteredTime = function() {
    lastFilteredTime = Date.now();
  };

  return self;
}]);