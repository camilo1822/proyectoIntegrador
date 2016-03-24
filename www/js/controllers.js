angular.module('app.controllers', [])
  


.controller('lugaresCtrl', ['$scope','lugaresService',function($scope,lugaresService ) {

	$scope.lugares = [];

	
	//var lugar= 'listaDeLugares';
  var lugar= '.json';

  lugaresService.getAll(lugar).then(function(response){

    console.info(response.data);
    $scope.lugares = response.data;
    
  });




 
}])

.controller('LoginCtrl', LoginCtrl);

function LoginCtrl(Auth, $state) {

var ref = new Firebase("https://APICULTURAL.firebaseio.com");
ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    $state.go('lugares');
  }
});
}
LoginCtrl.$inject = ['Auth', '$state'];


  /*this.loginWithGoogle = function loginWithGoogle() {
    Auth.$authWithOAuthPopup('google')
      .then(function(authData) {
        $state.go('app.lugares');
      });
  };
}
LoginCtrl.$inject = ['Auth', '$state'];*/






