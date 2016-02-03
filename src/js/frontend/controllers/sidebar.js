/**
 * @fileOverview SidebarCtrl angular controller
 */
'use strict';

define(['./module', 'darkwallet', 'frontend/port'],
function (controllers, DarkWallet, Port) {
  controllers.controller('SidebarCtrl', ['$scope', '$history', '$tabs', '$location', '$routeParams', '$route', 'watch', 'modals', 'notify', '_Filter',
      function($scope, $history, $tabs, $location, $routeParams, $route, watch, modals, notify, _) {

  // Scope variables
  $scope.pocket = $history.getCurrentPocket();
  $scope.forms.selectedPocket = $history.selectedPocket;

  $scope.forms.overviewPocket = false;

  // Link tabs from service
  $scope.tabs = $tabs;

  $history.watch('selectedPocket', function(value) {
      $scope.forms.selectedPocket = value;
      $scope.pocket = $history.getCurrentPocket();
  });

  /**
   * Identity Loading
   */
  var identityLoaded = function(identity) {
      identity = identity || DarkWallet.getIdentity();
      if ($history.previousIdentity != identity.name) {
          // prevents loading the first time...

          // Update tabs
          //$scope.tabs.updateTabs($scope.pocket.type, $scope.pocket.tasks);

          if (!$scope.$$phase) {
              $scope.$apply();
          }
      }
  }

  var identity = DarkWallet.getIdentity();
  if (identity) {
      identityLoaded(identity);
  }



  /**
   * Select fund as current pocket
   */
  $scope.selectFund = function(fund, rowIndex) {
      $scope.forms.overviewPocket = false;
      $scope.forms.selectedPocket = 'multisig:'+rowIndex;
      $tabs.open('multisig', rowIndex);
  };

  /**
   * Select the wallet overview
   */
  $scope.selectOverview = function() {
      if ($scope.forms.selectedPocket !== 'pocket:all') {
          $scope.forms.overviewPocket = false;
          $scope.forms.selectedPocket = false;
          $tabs.open();
      }
  }

  /**
   * Select an hd pocket
   */
  $scope.selectPocket = function(pocketName, rowIndex) {
      if (pocketName === undefined) {
          $scope.selectOverview();
      } else {
          $scope.forms.overviewPocket = false;
          $scope.forms.selectedPocket = false;
          $tabs.open(undefined, rowIndex);
      }
  };

  $scope.selectReadOnly = function(pocket, rowIndex) {
      $scope.forms.overviewPocket = false;
      $scope.forms.selectedPocket = false,
      $tabs.open('readonly', rowIndex);
  };

  /**
   * Start creating a new multisig
   */
  $scope.newMultiSig = function() {
      $location.path("/new_fund");
  };

  /**
   * Start creating a new pocket
   */
  $scope.newPocket = function() {
      $location.path("/new_pocket");
  };

}]);
});
