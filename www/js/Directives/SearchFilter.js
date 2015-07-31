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
                        sortoption: "1"
                    };

                    $scope.sortby = function () {

                        var sortByPopup = $ionicPopup.show({
                            title: 'Sort Trails',
                            templateUrl: '/trails/sortby.html',
                            scope: $scope,
                            buttons: [
                                {
                                    text: '',
                                    type: 'button-clear disabled',
                                    onTap: function (e) {
                                        if (!$scope.data.sortoption) {
                                            e.preventDefault();
                                        } else {
                                            return $scope.data.sortoption;
                                        }
                                    }
                                },
                                {text: 'Cancel'}
                            ]
                        });
                        sortByPopup.then(function (res) {
                            if (res) {
                                console.log($scope.data.sortoption);
                            }
                        });
                    };

                    $scope.filterby = function () {
                        //do some filtering stuff
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