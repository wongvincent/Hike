var app = angular.module('directives', ['rzModule']);

app.directive('trailsSubheader', ['$rootScope', '$ionicPopup', '$ionicModal', 'ClosePopupService', 'FilterTrailsService', function ($rootScope, $ionicPopup, $ionicModal, ClosePopupService, FilterTrailsService) {
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

            $scope.data = FilterTrailsService.getData();
	        $scope.tempData = FilterTrailsService.getData();
	        $scope.filteredTrails = FilterTrailsService.getFilteredTrails();
	        $scope.numberOfFiltersApplied = FilterTrailsService.getNumberOfFiltersApplied();
	        $scope.Math = Math;

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
                FilterTrailsService.setFilteredTrails($scope.filteredTrails);
            };

            $scope.evaluateTemporaryFilters = function() {
                $scope.filtersEvaluate = angular.copy($scope.tempData);
                $scope.filtersEvaluate.filterLocation = getSelectedFilterLocations();
                $scope.tempFilteredTrails = $scope.$eval("trails | trailsFilter:filtersEvaluate | filter:{ name: filtersEvaluate.searchText } | orderBy:filtersEvaluate.sortSelected");
            };

            $scope.evaluateSortFilter = function() {
                $scope.filteredTrailsWithoutNameFilter = $scope.$eval("filteredTrailsWithoutNameFilter | orderBy:data.sortSelected");
                $scope.filteredTrails = $scope.$eval("filteredTrails | orderBy:data.sortSelected");
	            FilterTrailsService.setFilteredTrails($scope.filteredTrails);
            };

            $scope.evaluateNameFilter = function() {
                $scope.filteredTrails = $scope.$eval("filteredTrailsWithoutNameFilter | filter:{ name: data.searchText }");
	            FilterTrailsService.setFilteredTrails($scope.filteredTrails);
            };

	        $scope.$watch('trails', function() {
	            $scope.evaluateFilters();
	         });

	        $scope.$watch("data.sortSelected", function() {
		        FilterTrailsService.setData($scope.data);
		        $scope.evaluateSortFilter();
	        });

	        $scope.$watch("data.searchText", function() {
		        FilterTrailsService.setData($scope.data);
		        $scope.evaluateNameFilter();
	        });

	        $scope.$watchGroup(["tempData.filterTimeMin", "tempData.filterTimeMax",
		        "tempData.filterDistanceMin", "tempData.filterDistanceMax", "tempData.filterDifficultyEasy",
		        "tempData.filterDifficultyModerate", "tempData.filterDifficultyHard",
		        "tempData.filterTransit", "tempData.filterInSeason"], function() {
		        $scope.evaluateTemporaryFilters();
	        });


            $scope.resetFilters = function () {
                var copyDefaultFilters = FilterTrailsService.getDefaultFilters();
                copyDefaultFilters.sortSelected = FilterTrailsService.getData().sortSelected;
                $scope.data = angular.copy(copyDefaultFilters);
	            FilterTrailsService.setData($scope.data);
                $scope.tempData = angular.copy(copyDefaultFilters);
                $scope.evaluateFilters();
	            $scope.numberOfFiltersApplied = FilterTrailsService.getNumberOfFiltersApplied();
                $scope.tempFilteredTrails = FilterTrailsService.getFilteredTrails();
                window.plugins.toast.showShortBottom(
                    "Filters Reset"
                );
	            $rootScope.$broadcast('new-filters-applied', {});
            };

            $scope.applyFilters = function() {
	            FilterTrailsService.setData($scope.tempData);
                $scope.data = angular.copy($scope.tempData);
                $scope.evaluateFilters();
	            $scope.numberOfFiltersApplied = FilterTrailsService.getNumberOfFiltersApplied();
                $scope.closeFilterModal();
	            $rootScope.$broadcast('new-filters-applied', {});
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
                $scope.tempData = FilterTrailsService.getData();
                $scope.tempFilteredTrails = FilterTrailsService.getFilteredTrails();
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
        }]
    };
}]);