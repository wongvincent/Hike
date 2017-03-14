var app = angular.module('directives', ['rzModule']);

app.directive('trailsSubheader', ['$ionicPopup', '$ionicModal', 'ClosePopupService', function ($ionicPopup, $ionicModal, ClosePopupService) {
    return {
        templateUrl: 'views/trails/trailsSubheader.html',
        controller: ['$scope', function ($scope) {

            $scope.sortOptions = [
                {text: "Name (A-Z)", sortby: "name"},
                {text: "Time (Low - High)", sortby: "time"},
                {text: "Time (High - Low)", sortby: "-time"},
                {text: "Distance (Low - High)", sortby: "distance"},
                {text: "Distance (High - Low)", sortby: "-distance"}
            ];

            $scope.sortby = function () {
                var sortByPopup = $ionicPopup.show({
                    title: 'Sort by',
                    cssClass: 'sort-trails-popup',
                    templateUrl: 'views/trails/sortby.html',
                    scope: $scope,
                    buttons: [
                        {
                            text: '', //Sort button
                            type: 'button-clear button-small disabled',
                            onTap: function (e) {
                                $scope.scrollToTop();
                            }
                        },
                        {
                            text: '', //Cancel button
                            type: 'button-clear button-small disabled'
                        }
                    ]
                });
                ClosePopupService.register(sortByPopup);
                sortByPopup.then(function (res) {
                });
            };

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

            $scope.updateLocationFilter = function() {
                var selectedFilterItems = [];
                angular.forEach($scope.filterLocation, function(item) {
                    if (item.isChecked) {
                        selectedFilterItems.push(item);
                    }
                });
                $scope.tempData.filterLocation = selectedFilterItems;
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

            $scope.data = angular.copy(defaultFilters);
            $scope.tempData = angular.copy(defaultFilters);


            var getSelectedFilterLocations = function() {
                var selectedFilterLocations = [];
                angular.forEach($scope.tempData.filterLocation, function(location) {
                    if (location.isChecked) {
                        selectedFilterLocations.push(location);
                    }
                });
                return selectedFilterLocations;
            };

            $scope.updateLocationsSelectedText = function() {
                var selectedFilterLocations = getSelectedFilterLocations();
                if (selectedFilterLocations.length === 1) {
                    return selectedFilterLocations[0].name;
                } else {
                    return selectedFilterLocations.length + " selected";
                }
            };

            $scope.evaluateFilters = function() {
                $scope.filtersEvaluate = angular.copy($scope.data);
                $scope.filtersEvaluate.filterLocation = getSelectedFilterLocations();
                $scope.filteredTrailsWithoutNameFilter = $scope.$eval("trails | trailsFilter:filtersEvaluate | orderBy:filtersEvaluate.sortSelected");
                $scope.filteredTrails = $scope.$eval("filteredTrailsWithoutNameFilter | filter:{ name: filtersEvaluate.searchText }");
            };

            $scope.evaluateTemporaryFilters = function() {
                $scope.filtersEvaluate = angular.copy($scope.tempData);
                $scope.filtersEvaluate.filterLocation = getSelectedFilterLocations();
                $scope.tempFilteredTrails = $scope.$eval("trails | trailsFilter:filtersEvaluate | filter:{ name: filtersEvaluate.searchText } | orderBy:filtersEvaluate.sortSelected");
            };

            $scope.evaluateSortFilter = function() {
                $scope.filteredTrailsWithoutNameFilter = $scope.$eval("filteredTrailsWithoutNameFilter | orderBy:data.sortSelected");
                $scope.filteredTrails = $scope.$eval("filteredTrails | orderBy:data.sortSelected");
            };

            $scope.evaluateNameFilter = function() {
                $scope.filteredTrails = $scope.$eval("filteredTrailsWithoutNameFilter | filter:{ name: data.searchText }")
            };

            $scope.$watch('trails', function() {
                $scope.evaluateFilters();
            });

            $scope.$watch("data.sortSelected", function() {
                $scope.evaluateSortFilter();
            });

            $scope.$watch("data.searchText", function() {
                $scope.evaluateNameFilter();
            });

            $scope.$watchGroup(["tempData.filterTimeMin", "tempData.filterTimeMax",
                "tempData.filterDistanceMin", "tempData.filterDistanceMax", "tempData.filterDifficultyEasy",
                "tempData.filterDifficultyModerate", "tempData.filterDifficultyHard", "tempData.filterDogFriendly",
                "tempData.filterTransit", "tempData.filterInSeason"], function() {
                $scope.evaluateTemporaryFilters();
            });

            $scope.resetFilters = function () {
                var copyDefaultFilters = {};
                angular.copy(defaultFilters, copyDefaultFilters);
                copyDefaultFilters.sortSelected = $scope.data.sortSelected;
                angular.copy(copyDefaultFilters, $scope.data);
                angular.copy(copyDefaultFilters, $scope.tempData);
                $scope.evaluateFilters();
                updateNumberOfFiltersApplied();
                $scope.tempFilteredTrails = angular.copy($scope.filteredTrails);
                window.plugins.toast.showShortBottom(
                    "Filters Reset"
                );
            };

            $scope.applyFilters = function() {
                $scope.data = angular.copy($scope.tempData);
                $scope.evaluateFilters();
                updateNumberOfFiltersApplied();
                $scope.closeFilterModal();
            };

            $scope.filterTimeSlider = {
                options: {
                    ceil: 12,
                    step: 2,
                    translate: function(value) {
                        return value + ' hours'
                    },
                    onChange: function(sliderId, modelValue, highValue, pointerType) {
                        if (pointerType === 'min') {
                            $scope.tempData.filterTimeMin = modelValue;
                        } else {
                            $scope.tempData.filterTimeMax = highValue;
                        }
                    }
                }
            };

            $scope.filterDistanceSlider = {
                options: {
                    ceil: 30,
                    step: 5,
                    translate: function(value) {
                        return value + 'km'
                    },
                    onChange: function(sliderId, modelValue, highValue, pointerType) {
                        if (pointerType === 'min') {
                            $scope.tempData.filterDistanceMin = modelValue;
                        } else {
                            $scope.tempData.filterDistanceMax = highValue;
                        }
                    }
                }
            };

            $ionicModal.fromTemplateUrl('views/trails/filterby.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.filterModal = modal;
            });

            $scope.openFilterModal = function () {
                $scope.tempData = angular.copy($scope.data);
                $scope.tempFilteredTrails = angular.copy($scope.filteredTrails);
                $scope.filterModal.show();
            };

            $scope.closeFilterModal = function () {
                $scope.filterModal.hide();
                $scope.scrollToTop();
            };

            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.filterModal.remove();
            });

            $scope.toggleGroup = function(group) {
                if ($scope.isGroupShown(group)) {
                    $scope.shownGroup = null;
                } else {
                    $scope.shownGroup = group;
                }
            };
            $scope.isGroupShown = function(group) {
                return $scope.shownGroup === group;
            };

            var updateNumberOfFiltersApplied = function() {
                var hasLocationsFilterApplied = function() {
                    for (var i = 0; i < $scope.data.filterLocation.length; i++) {
                        if (!$scope.data.filterLocation[i].isChecked) {
                            return true;
                        }
                    }
                    return false;
                };
                $scope.numberOfFiltersApplied = hasLocationsFilterApplied() +
                    (defaultFilters.filterTimeMin !== $scope.data.filterTimeMin
                        || defaultFilters.filterTimeMax !== $scope.data.filterTimeMax) +
                    (defaultFilters.filterDistanceMin !== $scope.data.filterDistanceMin
                        || defaultFilters.filterDistanceMax !== $scope.data.filterDistanceMax) +
                    (defaultFilters.filterDifficultyEasy !== $scope.data.filterDifficultyEasy
                        || defaultFilters.filterDifficultyModerate !== $scope.data.filterDifficultyModerate
                        || defaultFilters.filterDifficultyHard !== $scope.data.filterDifficultyHard) +
                    (defaultFilters.filterDogFriendly !== $scope.data.filterDogFriendly) +
                    (defaultFilters.filterTransit !== $scope.data.filterTransit) +
                    (defaultFilters.filterInSeason !== $scope.data.filterInSeason);
            };
            $scope.numberOfFiltersApplied = 0;

            $scope.Math = Math;
        }]
    };
}]);