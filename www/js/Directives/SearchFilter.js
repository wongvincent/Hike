var app = angular.module('directives');

app.directive('searchFilter', ['$ionicPopup', '$ionicModal', function ($ionicPopup, $ionicModal) {
        return {
            templateUrl: 'trails/searchfilter.html',
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
                            templateUrl: 'trails/sortby.html',
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
                        {text: "Vancouver", filterval: ["vancouver"]},
                        {text: "Whistler", filterval: ["whistler"]},
                        {text: "Delta", filterval: ["delta"]},
                        {text: "Howe Sound", filterval: ["howe sound"]}
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

                    $ionicModal.fromTemplateUrl('trails/filterby.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function (modal) {
                        $scope.modal = modal;
                    });

                    $scope.openFilterModal = function () {
                        $scope.modal.show();
                    };
                    $scope.closeFilterModal = function () {
                        $scope.modal.hide();
                        $scope.scrollToTop();
                    };
                    //Cleanup the modal when we're done with it!
                    $scope.$on('$destroy', function () {
                        $scope.modal.remove();
                    });
                }]
        };
    }]);