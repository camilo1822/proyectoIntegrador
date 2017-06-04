angular.module('app')

.controller('agendaDetailController',detallesFavoritoController);

agendaDetailController.$inject=['$scope','DetalleService','AgendaService','$state','seleccionInterna'];

 function agendaDetailController($scope,detalleService,agendaService,$state,seleccionInterna) {
  var vm= this;
  vm.lugar = seleccionInterna.getLugarSeleccionado();
  vm.detalle = [];
  vm.agendas = [];
  var identificador = vm.lugar.id_lugar;

  detalleService.getAll(identificador).then(function(response){
    vm.detalle = response.data;
  });

  agendaService.getAll().then(function(response){
  vm.agendas = response.data;
  });
}