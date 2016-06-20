var app = angular.module('directives');

app.directive('searchFilter', ['$ionicPopup', '$ionicModal', function ($ionicPopup, $ionicModal) {
        return {
            templateUrl: 'views/trails/searchfilter.html',
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
                                        $scope.data.sortSelected = $scope.sortOptions[$scope.data.sortSelectedIndex].sortby;
                                        return $scope.data.sortSelectedIndex;
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




                    $scope.filterLocations = [
                        {text: "North Shore", filterval: ["north van", "west van"]},
                        {text: "Howe Sound", filterval: ["howe sound"]},
                        {text: "Whistler", filterval: ["whistler"]},
                        {text: "Vancouver", filterval: ["vancouver"]},
                        {text: "Fraser Valley", filterval: ["fraser valley"]},
                        {text: "Ridge Meadows", filterval: ["ridge meadows"]},
                        {text: "South of Fraser", filterval: ["south of fraser"]},
                        {text: "Tri-Cities", filterval: ["tri-cities"]}
                    ];

                    $scope.filterby = function () {
                        $scope.closeFilterModal();
                    };

                    $scope.resetFilters = function () {
                        $scope.data = {
                            sortSelected: "name",
                            sortSelectedIndex: "0",
                            filterLocation: "",
                            filterTimeMin: "0",
                            filterTimeMax: "999",
                            filterDistanceMin: "0",
                            filterDistanceMax: "999",
                            filterDifficultyEasy: true,
                            filterDifficultyModerate: true,
                            filterDifficultyHard: true,
                            filterDogFriendly: false,
                            filterTransit: false,
                            filterInSeason: false
                        };

                        $scope.searchText = '';
                    };

                    $ionicModal.fromTemplateUrl('views/trails/filterby.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function (modal) {
                        $scope.filterModal = modal;
                    });

                    $scope.openFilterModal = function () {
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

                    $scope.Math = Math;
                }]
        };
    }]);