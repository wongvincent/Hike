var app = angular.module('trails');

app.directive('searchFilter', ['$ionicPopup', '$ionicModal', function ($ionicPopup, $ionicModal) {
        return {
            templateUrl: '/trails/searchfilter.html',
            controller: ['$scope', function ($scope) {

                    $scope.sortOptions = [
                        "Name (A-Z)",
                        "Time: Lo to Hi",
                        "Time: Hi to Lo",
                        "Distance: Lo to Hi",
                        "Distance: Hi to Lo"
                    ];

                    $scope.data = {
                        sortoption: "1",
                        filterTimeMin: "0",
                        filterTimeMax: "999",
                        filterDistanceMin: "0",
                        filterDistanceMax: "999"
                    };

                    $scope.sortby = function () {

                        var sortByPopup = $ionicPopup.show({
                            title: 'Sort trails',
                            templateUrl: '/trails/sortby.html',
                            scope: $scope,
                            buttons: [
                                {
                                    text: '', //Sort button
                                    type: 'button-clear button-small disabled',
                                    onTap: function (e) {
                                        if (!$scope.data.sortoption) {
                                            e.preventDefault();
                                        } else {
                                            return $scope.data.sortoption;
                                        }
                                    }
                                },
                                {
                                    text: '', //Cancel button
                                    type: 'button-clear button-small disabled'
                                }
                            ]
                        });
                        sortByPopup.then(function (res) {
                            if (res) {
                                console.log($scope.data.sortoption);
                            }
                        });
                    };
                    
                    

                    $scope.filterby = function () {
                        console.log('filter');
                        //for the checkboxes: undefined = unchecked
                        console.log($scope.data.sortoption);
                        console.log($scope.data.filterTimeMin);
                        console.log($scope.data.filterTimeMax);
                        console.log($scope.data.filterDistanceMin);
                        console.log($scope.data.filterDistanceMax);
                        console.log($scope.data.filterDifficultyEasy);
                        console.log($scope.data.filterDifficultyModerate);
                        console.log($scope.data.filterDifficultyHard);
                        console.log($scope.data.filterDogFriendly);
                        console.log($scope.data.filterTransit);
                        
                        $scope.closeFilterModal();
                    };
                    $ionicModal.fromTemplateUrl('/trails/filterby.html', {
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
                    };
                    //Cleanup the modal when we're done with it!
                    $scope.$on('$destroy', function () {
                        $scope.modal.remove();
                    });
                }]
        };
    }]);