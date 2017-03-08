//TODO: Social sharing
angular.module('app').controller('detallesController', detallesController);

detallesController.$inject = [
  '$scope',
  'detalleService',
  'comentarioService',
  '$state',
  'seleccionInterna',
  '$location',
  '$stateParams',
  '$ionicPopup',
  '$http',
  '$cordovaSocialSharing'
];

function detallesController($scope, detalleService, comentarioService, $state, seleccionInterna, $location, $stateParams, $ionicPopup, $http, $cordovaSocialSharing) {
  var vm = this;
  var identificador = $stateParams.aId;
  vm.detalle = [];
  vm.comentarios = [];
  vm.go = go;
  vm.map = map;
  vm.share = share;
  vm.informacion = seleccionInterna.getUser();
  vm.lugar = seleccionInterna.getLugarSeleccionado();
  vm.estrella = 'ion-ios-star-outline';
  vm.comentario = '';
  vm.setRating = setRating;

  detalleService.getAll(identificador).then(function(response) {
    vm.detalle = response.data;
  });

  comentarioService.getAll().then(function(response) {
    vm.comentarios = response.data;
  });

  function go(path) {
    $location.path(path);
  };

  function map() {
    $state.go('app.tab.mapa');
  }

  function share() {
    var options = {
      message: vm.detalle.title,
      subject: 'Estuve aquí y me encanto',
      files: vm.detalle.image,
      url: vm.detalle.image,
      chooserTitle: 'Escoge una aplicación'
    };
    console.log(options);
    /*$cordovaSocialSharing.share(vm.detalle.title,vm.detalle.image,'www.google.com').then(function(result) {
      console.log(result);
      $ionicPopup.alert({title: 'Excelente!', template: 'Este lugar se compartió'});
    }, function(err) {
      console.log(err);
    });*/
    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
    var onSuccess = function(result) {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    }

    var onError = function(msg) {
      console.log("Sharing failed with message: " + msg);
    }
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

        var alertPopup = $ionicPopup.alert({title: 'Hecho', template: 'Comentario agregado exitosamente'});

        console.log("refrescando ando");

        vm.comentarios = [];

        comentarioService.getAll().then(function(response) {
          vm.comentarios = response.data;
        }). finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
        alertPopup.then(function(res) {
          vm.comentario = '';
        });
      });
    } else {
      var alertPopup = $ionicPopup.alert({title: 'Error', template: 'Comentario vacio'});
    }
  };
}
