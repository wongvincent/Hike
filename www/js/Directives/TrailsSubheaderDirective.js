var app = angular.module('directives', ['rzModule']);

app.directive('trailsSubheader', ['$ionicPopup', '$ionicModal', function ($ionicPopup, $ionicModal) {
    return {
        templateUrl: 'views/trails/trailsSubheader.html',
        controller: ['$scope', function ($scope) {

            $scope.sortOptions = [
                {text: "Name (A-Z)", sortby: "name"},
                {text: "Time: Lo to Hi", sortby: "time"},
                {text: "Time: Hi to Lo", sortby: "-time"},
                {text: "Distance: Lo to Hi", sortby: "distance"},
                {text: "Distance: Hi to Lo", sortby: "-distance"}
            ];

            $scope.sortby = function () {
                var sortByPopup = $ionicPopup.show({
                    title: 'Sort trails',
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
                sortByPopup.then(function (res) {
                });
            };

            var filterLocation =
                {
                    key: "filterLocation",
                    name: "Location",
                    items: [
                        { name: "Any", value: []},
                        { name: "North Shore", value: ["north van", "west van"]},
                        { name: "Fraser Valley", value: ["fraser valley"]},
                        { name: "Howe Sound", value: ["howe sound"]},
                        { name: "Ridge Meadows", value: ["ridge meadows"]},
                        { name: "South of Fraser (Delta, Langley)", value: ["south of fraser"]},
                        { name: "Tri-Cities", value: ["tri-cities"]},
                        { name: "Vancouver", value: ["vancouver"]},
                        { name: "Whistler", value: ["whistler"]}
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

            $scope.filterGroups = [
                filterLocation
            ];

            $scope.saveFilterValue = function(groupKey, item) {
                $scope.tempData[groupKey] = item;
            };

            var defaultFilters = {
                searchText: "",
                sortSelected: "name",
                filterLocation: { name: "Any", value: []},
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

            var reEvalTrails = function() {
                $scope.filteredTrails = $scope.$eval("trails | filter:data.searchText | trailsFilter:data | orderBy:data.sortSelected");
            };

            $scope.$watch('trails', function() {
                reEvalTrails();
            });
            $scope.$watchGroup(["data.searchText", "data.sortSelected"], function() {
                reEvalTrails();
            });

            $scope.$watchGroup(["tempData.filterLocation", "tempData.filterTimeMin", "tempData.filterTimeMax",
                "tempData.filterDistanceMin", "tempData.filterDistanceMax", "tempData.filterDifficultyEasy",
                "tempData.filterDifficultyModerate", "tempData.filterDifficultyHard", "tempData.filterDogFriendly",
                "tempData.filterTransit", "tempData.filterInSeason"], function() {
                $scope.tempFilteredTrails = $scope.$eval("trails | filter:tempData.searchText | trailsFilter:tempData | orderBy:tempData.sortSelected");
            });

            $scope.resetFilters = function () {
                var copyDefaultFilters = {};
                angular.copy(defaultFilters, copyDefaultFilters);
                copyDefaultFilters.sortSelected = $scope.data.sortSelected;
                angular.copy(copyDefaultFilters, $scope.data);
                angular.copy(copyDefaultFilters, $scope.tempData);
                reEvalTrails();
                window.plugins.toast.showShortBottom(
                    "Filters Reset"
                );
            };

            $scope.applyFilters = function() {
                $scope.data = angular.copy($scope.tempData);
                $scope.filteredTrails = $scope.tempFilteredTrails;
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

            $scope.Math = Math;
        }]
    };
}]);