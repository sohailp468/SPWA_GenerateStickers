(function () {
  'use strict';

  angular
      .module('app.main')
      .controller('mainCtrl', mainCtrl);

  mainCtrl.$inject = [
      '$ionicPlatform',
      '$scope',
      '$timeout',
      'locationsSrvc',
      '$state'
      ];


  function mainCtrl(
      $ionicPlatform,
      $scope,
      $timeout,
      locationsSrvc,
      $state
  ) {
      var vm = angular.extend(this, {

      });

      vm.hardwareBackButton = $ionicPlatform.registerBackButtonAction(function() {
          //called when hardware back button pressed
          //vm.cancel();
      }, 100);
      $scope.$on('$destroy', vm.hardwareBackButton);

      
      
//generate QRstickers
      vm.generateStickers=function()
      {

      }


      
      
      
      
    }
})();
