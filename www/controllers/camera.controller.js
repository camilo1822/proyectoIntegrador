// TODO: Native map
angular.module('app').controller('cameraController', cameraController);

cameraController.$inject = [
  '$scope',
  'beaconService'
];

function cameraController($scope,beaconService) {

  var vm = this;
  $scope.beacons = beaconService.beaconPlaces;
}
