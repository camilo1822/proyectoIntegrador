angular.module('app.controllers', [])
  


.controller('lugaresCtrl', ['$scope','lugaresService',function($scope,lugaresService ) {

	$scope.lugares = [];

	
	var lugar= 'listaDeLugares';

  lugaresService.getAll(lugar).then(function(response){

    console.info(response.data);
    console.log(response.data);
    $scope.lugares = response.data;
  });
 
}])

.controller('LoginCtrl',['$scope','Auth','$state',function($scope,Auth,$state){
  $scope.logiar = function(){
  var ref = new Firebase("https://APICULTURAL.firebaseio.com");
ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);

    //id que nos da firebase
    var authData = ref.getAuth();
    ref.push({uid:authData.uid});

    $state.go('lugares');
  }
});

};
}]).$inject = ['Auth', '$state'];;









