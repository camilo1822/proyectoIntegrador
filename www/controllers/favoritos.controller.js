angular.module('app')

.controller('favoritosController', favoritosController);

favoritosController.$inject=['$scope', 'favoritoService', 'seleccionInterna', '$timeout', 
'$state', '$ionicLoading'];

function favoritosController($scope, favoritoService, seleccionInterna, $timeout, $state, $ionicLoading) {
    var vm= this;
    vm.favoritos = [];
    vm.informacion = seleccionInterna.getUser();

    vm.selectFavorito=selectFavorito;
    $scope.$on('$ionicView.enter', function() {
        favoritoService.getAll().then(function(response) {
            vm.favoritos = response.data;
        });
    });

    function selectFavorito(favorito) {
        seleccionInterna.setLugarSeleccionado(favorito);
    };

}
