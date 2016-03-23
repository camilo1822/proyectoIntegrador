angular.module('app.controllers', [])
  


/*.controller('lugaresCtrl', ['$scope','lugaresService','SeleccionInterna',function($scope,lugaresService,SeleccionInterna ) {

	$scope.lugares = [];

	
	var lugar= 'listaDeLugares';

  lugaresService.getAll(lugar).then(function(response){

    console.info(response.data);
    $scope.lugares = response.data;
    console.log(lugares); 
    alert(lugares);
  });


  $scope.selectProducto=function(producto){
    SeleccionInterna.setProductoSeleccionado(producto);
  };


 
}])*/

.controller('LoginCtrl', LoginCtrl);

function LoginCtrl(Auth, $state) {

/*var ref = new Firebase("https://apiCultural.firebaseio.com");
ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    $state.go('tab.dash');
  }
});*/

  this.loginWithGoogle = function loginWithGoogle() {
    Auth.$authWithOAuthPopup('google')
      .then(function(authData) {
        $state.go('app.lugares');
      });
  };
}
LoginCtrl.$inject = ['Auth', '$state'];






