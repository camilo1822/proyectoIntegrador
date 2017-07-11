// TODO: Native map
angular.module('app').controller('cameraController', cameraController);

cameraController.$inject = [
  '$scope',
  'beaconService'
];

function cameraController($scope,beaconService) {

  var vm = this;
  vm.selectLugar= selectLugar;
  $scope.beacons = beaconService.beaconPlaces;


  function selectLugar(lugar) {
    seleccionInterna.setLugarSeleccionado(lugar);
  };

}
