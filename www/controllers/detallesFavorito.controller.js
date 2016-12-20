angular.module('app')

.controller('detallesFavoritoController',detallesFavoritoController);

detallesFavoritoController.$inject=['$scope','DetalleService','ComentarioService','$state','seleccionInterna'];

 function detallesFavoritoController($scope,detalleService,comentarioService,$state,seleccionInterna) {
  var vm= this;
  vm.lugar = seleccionInterna.getLugarSeleccionado();
  vm.detalle = [];
    vm.comentarios = [];
  var identificador = vm.lugar.id_lugar;

  detalleService.getAll(identificador).then(function(response){
    vm.detalle = response.data;
  });

  comentarioService.getAll().then(function(response){
  vm.comentarios = response.data;
  });
}