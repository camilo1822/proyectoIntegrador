angular.module('app')

.controller('nuevoFavoritoController', nuevoFavoritoController);

nuevoFavoritoController.$inject=['$scope', 'comentarioService', '$http', '$ionicLoading', 
'$window', ' seleccionInterna', '$ionicPopup', '$state'];


function nuevoFavoritoController($scope, comentarioService, $http, $ionicLoading, 
  $window, seleccionInterna, $ionicPopup, $state) {
    var vm = this;
    vm.informacion = seleccionInterna.getUser();
    vm.lugar = seleccionInterna.getLugarSeleccionado();
    vm.estrella = 'ion-ios-star-outline';
    vm.comentario = '';
    vm.setRating = setRating;
    vm.comentarios = [];

    function setRating() {
        if (vm.estrella == 'ion-ios-star-outline') {
            vm.estrella = 'ion-ios-star';

            console.log("entre a la save");
            $http({
                method: 'post',
                url: 'https://cultural-api.herokuapp.com/api/Favoritos',
                data: {
                    id_user: vm.informacion.uid,
                    id_lugar: vm.lugar._id,
                    title: vm.lugar.title,
                    image: vm.lugar.image
                }
            }).success(function(data) {
                console.log(data);
            });
        } else {
            vm.estrella = 'ion-ios-star-outline';

            //$scope.delete = function(){
            console.log("entre a la delete");
            console.log("borre", vm.lugar._id);
            var base = 'https://cultural-api.herokuapp.com/api/Favoritos/';
            $http({
                method: 'delete',
                url: base + vm.lugar._id
            }).success(function(data) {
                console.log(data);
            });
            //}
        };

    }



    vm.guardar = function() {
        if (vm.comentario) {
            $http({
                method: 'post',
                url: 'https://cultural-api.herokuapp.com/api/comentarios',
                data: {
                    id_lugar: vm.lugar._id,
                    foto: vm.informacion.google.profileImageURL,
                    nombre: vm.informacion.google.displayName,
                    comentario: vm.comentario
                }
            }).success(function(data) {

                var alertPopup = $ionicPopup.alert({
                    title: 'Hecho',
                    template: 'Comentario agregado exitosamente'
                });

                console.log("refrescando ando");

       


                comentarioService.getAll().then(function(response) {
                        vm.comentarios = response.data.reverse();
                        console.log(vm.comentarios);
                    })
                    .finally(function() {
                        // Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                alertPopup.then(function(res) {
                    vm.comentario = '';
                });
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Comentario vacio'
            });
        }
    };

}
