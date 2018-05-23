var app = angular.module('directives', ['rzModule']);

app.directive('trailsSubheader', ['$rootScope', '$ionicPopup', '$ionicModal', 'ClosePopupService', 'FilterTrailsService', function($rootScope, $ionicPopup, $ionicModal, ClosePopupService, FilterTrailsService) {
  return {
    templateUrl: 'views/trails/trailsSubheader.html',
    controller: ['$scope', function($scope) {

      $scope.sortOptions = [
        {text: 'Name (A-Z)', sortby: 'name'},
        {text: 'Time (Low - High)', sortby: 'time'},
        {text: 'Time (High - Low)', sortby: '-time'},
        {text: 'Distance (Low - High)', sortby: 'distance'},
        {text: 'Distance (High - Low)', sortby: '-distance'},
      ];

      $scope.sortby = function() {
        if (analytics) analytics.trackEvent('Sort', 'Open');
        var sortByPopup = $ionicPopup.show({
          title: 'Sort by',
          cssClass: 'sort-trails-popup',
          templateUrl: 'views/trails/sortby.html',
          scope: $scope,
          buttons: [
            {
              text: '', //Sort button
              type: 'button-clear button-small disabled',
              onTap: function() {
                if (analytics) analytics.trackEvent('Sort', 'Select', $scope.data.sortSelected);
                $scope.scrollToTop();
              },
            },
            {
              text: '', //Cancel button
              type: 'button-clear button-small disabled',
            },
          ],
        });
        ClosePopupService.register(sortByPopup);
        sortByPopup.then(function() {
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
          return selectedFilterLocations.length + ' selected';
        }
      };

      $scope.evaluateFilters = function() {
        $scope.filtersEvaluate = angular.copy($scope.data);
        $scope.filtersEvaluate.filterLocation = getSelectedFilterLocations();
        $scope.filteredTrailsWithoutNameFilter = $scope.$eval('trails | trailsFilter:filtersEvaluate | orderBy:filtersEvaluate.sortSelected');
        $scope.filteredTrails = $scope.$eval('filteredTrailsWithoutNameFilter | filter:{ name: filtersEvaluate.searchText }');
        FilterTrailsService.setFilteredTrails($scope.filteredTrails);
      };

      $scope.evaluateSortFilter = function() {
        $scope.filteredTrailsWithoutNameFilter = $scope.$eval('filteredTrailsWithoutNameFilter | orderBy:data.sortSelected');
        $scope.filteredTrails = $scope.$eval('filteredTrails | orderBy:data.sortSelected');
        FilterTrailsService.setFilteredTrails($scope.filteredTrails);
      };

      $scope.evaluateNameFilter = function() {
        $scope.filteredTrails = $scope.$eval('filteredTrailsWithoutNameFilter | filter:{ name: data.searchText }');
        FilterTrailsService.setFilteredTrails($scope.filteredTrails);
      };

      $scope.$watch('trails', function() {
        $scope.evaluateFilters();
      });

      $scope.$watch('data.sortSelected', function() {
        FilterTrailsService.setData($scope.data);
        $scope.evaluateSortFilter();
      });

      $scope.$watch('data.searchText', function() {
        FilterTrailsService.setData($scope.data);
        $scope.evaluateNameFilter();
      });


      $scope.resetFilters = function() {
        var copyDefaultFilters = FilterTrailsService.getDefaultFilters();
        copyDefaultFilters.sortSelected = FilterTrailsService.getData().sortSelected;
        $scope.data = angular.copy(copyDefaultFilters);
        FilterTrailsService.setData($scope.data);
        $scope.tempData = angular.copy(copyDefaultFilters);
        $scope.evaluateFilters();
        $scope.numberOfFiltersApplied = FilterTrailsService.getNumberOfFiltersApplied();
        window.plugins.toast.showShortBottom('Filters Reset');
        $rootScope.$broadcast('new-filters-applied', {});
        if (analytics) analytics.trackEvent('Filters', 'Reset');
      };

      $scope.applyFilters = function() {
        FilterTrailsService.setData($scope.tempData);
        $scope.data = angular.copy($scope.tempData);
        $scope.evaluateFilters();
        $scope.numberOfFiltersApplied = FilterTrailsService.getNumberOfFiltersApplied();
        $scope.closeFilterModal();
        $rootScope.$broadcast('new-filters-applied', {});
        if (analytics) analytics.trackEvent('Filters', 'Apply');
      };

      $scope.filterTimeSlider = {
        options: {
          ceil: 12,
          step: 1,
          translate: function(value) {
            return value + ' hours';
          },
          onChange: function(sliderId, modelValue, highValue, pointerType) {
            if (pointerType === 'min') {
              $scope.tempData.filterTimeMin = modelValue;
            } else {
              $scope.tempData.filterTimeMax = highValue;
            }
          },
        },
      };

      $scope.filterDistanceSlider = {
        options: {
          ceil: 30,
          step: 5,
          translate: function(value) {
            return value + 'km';
          },
          onChange: function(sliderId, modelValue, highValue, pointerType) {
            if (pointerType === 'min') {
              $scope.tempData.filterDistanceMin = modelValue;
            } else {
              $scope.tempData.filterDistanceMax = highValue;
            }
          },
        },
      };

      $ionicModal.fromTemplateUrl('views/trails/filterby.html', {
        scope: $scope,
        animation: 'slide-in-up',
      }).then(function(modal) {
        $scope.filterModal = modal;
      });

      $scope.openFilterModal = function() {
        $scope.tempData = FilterTrailsService.getData();
        $scope.filterModal.show();
        if (analytics) analytics.trackEvent('Filters', 'Open');

        // Remove click-block, otherwise when filter closes,
        // Trails list items and sort and filter button click events are blocked
        const clickBlockElements = angular.element(document.getElementsByClassName('click-block'));
        if (clickBlockElements.length > 0) {
          clickBlockElements[0].parentNode.removeChild(clickBlockElements[0]);
        }
      };

      $scope.closeFilterModal = function() {
        $scope.filterModal.hide();
        $scope.scrollToTop();
      };

      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
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
    }],
  };
}]);