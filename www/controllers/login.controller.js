angular.module('app').controller('loginController', loginController);

loginController.$inject = [
  '$scope',
  '$state',
  '$ionicActionSheet',
  '$ionicPopup',
  'seleccionInterna',
  '$cordovaDialogs',
  '$cordovaActionSheet',
  '$ionicPlatform',
  '$ionicHistory',
  '$ionicModal'
];

function loginController($scope, $state, $ionicActionSheet, $ionicPopup, seleccionInterna, $cordovaDialogs, $cordovaActionSheet, $ionicPlatform, $ionicHistory,$ionicModal) {

  var vm = this;

  vm.google_data = {};
  vm.logOut = logOut;
  vm.showAddModal= showAddModal;


  $ionicModal.fromTemplateUrl('templates/modals/agregar-lugar.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.agregarModal = modal;
  });

  $ionicPlatform.ready(function() {

    vm.logIn = logIn;
  });

  function logIn() {
    var fbLoginSuccess = function(userData) {
      console.log("login: ", userData);
      seleccionInterna.setUsuarioSeleccionado(userData);
    }

    facebookConnectPlugin.login([
      "public_profile", "email"
    ], fbLoginSuccess, function loginError(error) {
      console.log(error);
      $cordovaDialogs.alert('No se pudo iniciar sesión', 'ERROR', 'Aceptar').then(function() {});
    });

  }
  //LogOut
  function logOut() {

    var hideSheet = $ionicActionSheet.show({
      titleText: 'Estás seguro?',
      destructiveText: 'Log out',
      cancelText: 'Cancel',
      cancel: function() {},
      destructiveButtonClicked: function() {
        hideSheet();

        return alertCallback();
      }
    });
  }

  function alertCallback() {
    // ref.unauth();ç

    $scope.$on("$ionicView.afterLeave", function() {
      $ionicHistory.clearCache();
    });

    console.log("Saliendo de la app");
    var alertPopup = $ionicPopup.alert({title: 'Saliendo de la aplicación', template: 'Gracias por usar CulturalAPP'});
    alertPopup.then(function(res) {
      //firebase.auth().signOut();
      /*firebase.auth().signOut().then(function() {
                // Sign-out successful.
            }, function(error) {
                // An error happened.
            });*/
      facebookConnectPlugin.logout(function() {
        $state.go('app.login');
      }, function() {
        $state.go('app.login');
      })

    });
  }

  vm.showDialog = function() {
    $cordovaDialogs.alert('message', 'title', 'button name').then(function() {});
  };
  function showAddModal(){
    $scope.agregarModal.show();
  }
  $scope.closeAddModal = function() {
    $scope.agregarModal.hide();
  };
}
