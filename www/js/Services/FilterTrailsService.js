var app = angular.module('services');

app.factory('FilterTrailsService', ['$rootScope', function ($rootScope) {
	var self = this;

	var filteredTrails = [];

	var filterLocation =
	{
		key: "filterLocation",
		name: "Location",
		items: [
			{ name: "North Shore", value: ["north van", "west van"], isChecked: true},
			{ name: "Fraser Valley", value: ["fraser valley"], isChecked: true},
			{ name: "Howe Sound", value: ["howe sound"], isChecked: true},
			{ name: "Ridge Meadows", value: ["ridge meadows"], isChecked: true},
			{ name: "South of Fraser (Delta, Langley)", value: ["south of fraser"], isChecked: true},
			{ name: "Tri-Cities", value: ["tri-cities"], isChecked: true},
			{ name: "Vancouver", value: ["vancouver"], isChecked: true},
			{ name: "Whistler", value: ["whistler"], isChecked: true}
		]
	};

	var filterTimeMin =
	{
		key: "filterTimeMin",
		name: "Time - Minimum",
		items: [
			{ name: "No Minimum", value: 0 },
			{ name: "2 hours", value: 2 },
			{ name: "4 hours", value: 4 },
			{ name: "8 hours", value: 8 }
		]
	};

	var filterTimeMax =
	{
		key: "filterTimeMax",
		name: "Time - Maximum",
		items: [
			{ name: "2 hours", value: 2 },
			{ name: "4 hours", value: 4 },
			{ name: "8 hours", value: 8 },
			{ name: "No Maximum", value: 999 }
		]
	};

	var defaultFilters = {
		searchText: "",
		sortSelected: "name",
		filterLocation: filterLocation.items,
		filterTimeMin: 0,
		filterTimeMax: 12,
		filterDistanceMin: 0,
		filterDistanceMax: 30,
		filterDifficultyEasy: true,
		filterDifficultyModerate: true,
		filterDifficultyHard: true,
		filterDogFriendly: false,
		filterTransit: false,
		filterInSeason: false
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
	};

	// Data are the currently applied filters
	self.getData = function() {
		return angular.copy(data);
	};

	self.setData = function(newData) {
		data = 	angular.copy(newData);
	};

	$rootScope.$on('event:add-favourite', function(event, args) {
		for (var i=0; i < filteredTrails.length; i++) {
			if (filteredTrails[i].id === args.id) {
				filteredTrails[i].favourite = true;
				break;
			}
		}
	});

	$rootScope.$on('event:remove-favourite', function(event, args) {
		for (var i=0; i < filteredTrails.length; i++) {
			if (filteredTrails[i].id === args.id) {
				filteredTrails[i].favourite = false;
				break;
			}
		}
	});

	return self;
}]);