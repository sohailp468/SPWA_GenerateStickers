(function () {
  'use strict';

  angular
      .module('app.main')
      .controller('searchCtrl', searchCtrl);

  searchCtrl.$inject = [
      '$ionicPlatform',
      '$scope',
      '$timeout',
      '$state'
      ];


  function searchCtrl(
      $ionicPlatform,
      $scope,
      $timeout,
      $state
  ) {
      var vm = angular.extend(this, {

      });

      vm.hardwareBackButton = $ionicPlatform.registerBackButtonAction(function() {
          //called when hardware back button pressed
          //vm.cancel();
      }, 100);
      $scope.$on('$destroy', vm.hardwareBackButton);

      //Controller below
      
      //$scope.myItems = ['Banana', 'Bicycle', 'Random stuff', 'Book', 'Music', 'GIT'];
      $scope.myItems = [];
      
      // Storing current element:
      $scope.currentItem = '';
      
      vm.myAwesomeList = [""];
      vm.myElement = "";

      vm.hello = function(searchTerm){
        // pretend to grab some suggestions using the search term
        $timeout(function(){$scope.myItems = ['Banana', 'Bicycle', 'Random stuff', 'Book', 'Music', 'GIT', 'stuart']},1500);
      }

      vm.goMap = function() {
        $state.go('main')
      }
      vm.getLocation = function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } 
      }
      function showPosition(position) {
        window.alert("Latitude: " + position.coords.latitude + 
        " Longitude: " + position.coords.longitude); 
    }
      
    }
})();
