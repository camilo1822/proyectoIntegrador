angular.module('app')

.controller('detallesController', detallesController);

detallesController.$inject = ['$scope', 'detalleService', 'comentarioService',
    '$state', 'seleccionInterna', '$location', '$stateParams','$ionicPopup','$http'
];

function detallesController($scope, detalleService, comentarioService,
    $state, seleccionInterna, $location, $stateParams,$ionicPopup,$http) {
    var vm = this;
    var identificador = $stateParams.aId;
    vm.detalle = [];
    vm.comentarios = [];
    vm.go = go;
    vm.map=map;
    vm.informacion = seleccionInterna.getUser();
    vm.lugar = seleccionInterna.getLugarSeleccionado();
    vm.estrella = 'ion-ios-star-outline';
    vm.comentario = '';
    vm.setRating = setRating;


    detalleService.getAll(identificador).then(function(response) {
        vm.detalle = response.data;
    });


    comentarioService.getAll().then(function(response) {
        vm.comentarios = response.data.reverse();
    });


    function go(path) {
        $location.path(path);
    };

    function map() {
        $state.go('app.tab.mapa');
    }
///




    function setRating() {
        if ($scope.estrella == 'ion-ios-star-outline') {
            $scope.estrella = 'ion-ios-star';

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
                url: 'https://cultural-api.herokuapp.com/api/Comentarios',
                data: {
                    id_lugar: vm.lugar._id,
                    foto: vm.informacion.photoURL,
                    nombre: vm.informacion.displayName,
                    comentario: vm.comentario
                }
            }).success(function(data) {

                var alertPopup = $ionicPopup.alert({
                    title: 'Hecho',
                    template: 'Comentario agregado exitosamente'
                });

                console.log("refrescando ando");

                vm.comentarios = [];


                comentarioService.getAll().then(function(response) {
                        vm.comentarios = response.data.reverse();
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
