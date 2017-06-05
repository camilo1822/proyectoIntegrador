angular.module('app')

.controller('agendaDetailController',agendaDetailController);

agendaDetailController.$inject=['$scope','detalleService','agendaService','$state','seleccionInterna','$stateParams'];

 function agendaDetailController($scope,detalleService,agendaService,$state,seleccionInterna,$stateParams) {
  var vm= this;
  vm.lugar = seleccionInterna.getLugarSeleccionado();
  console.log(vm.lugar);
  vm.detalle = [];
  vm.agendas = [];
  var identificador = vm.lugar.id_lugar;

  detalleService.getAll($stateParams.aId).then(function(response){
    console.log("detalle",response);
    vm.detalle = response.data;
  });

  agendaService.getAll().then(function(response){
    console.log("agenda",response);
    vm.agendas = response.data;
  });
}
