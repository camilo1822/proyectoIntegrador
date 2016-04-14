angular.module('app.controllers', [])
  


.controller('lugaresCtrl', ['$scope','lugaresService','SeleccionInterna',function($scope,lugaresService,SeleccionInterna ) {

	$scope.lugares = [];

	
	var lugar= 'listaDeLugares';
  //var lugar = '.json';

  lugaresService.getAll(lugar).then(function(response){

    console.info(response.data);
    console.log(response.data);
    $scope.lugares = response.data;
  });

  //seleccion de lugar
  $scope.selectLugar=function(lugar){
    SeleccionInterna.setLugarSeleccionado(lugar);
  };

 
}])

//obtener lugar
.controller('detallesCtrl', ['$scope','DetalleService','$state','SeleccionInterna',function($scope,DetalleService,$state,SeleccionInterna) {
  //$scope.mostrar = function(){
  $scope.lugar = SeleccionInterna.getLugarSeleccionado();
  console.log("lalalla",$scope.lugar);
  //$scope.whichproducto=$state.lugar.id;
  //var ensayo='5706fab948fc7df9ea5fa90c';
  var ensayo = $scope.lugar._id;
  console.log("ensayo",ensayo);
  $scope.detalle = [];
  //DetalleService.getAll($scope.whichproducto).then(function(response){
  DetalleService.getAll(ensayo).then(function(response){
    console.info(response.data);
    console.log(response.data);
    $scope.detalle = response.data; 
  });
   //$state.go('detalles');
//}
}])



.controller('LoginCtrl',['$scope','Auth','$state',function($scope,Auth,$state){
  $scope.usuario;
  $scope.logiar = function(){
  var ref = new Firebase("https://APICULTURAL.firebaseio.com");
ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);

    //id que nos da firebase
    var authData = ref.getAuth();
    var data = ref.getAuth();
    $scope.usuario=data.google.displayName;
    //$scope.nombre=authData.google.displayName;
    console.log("el nombre es ",$scope.usuario);

    ref.push({uid:authData.uid,provider:authData.provider,nombre:authData.google.displayName});

    $state.go('lugares');
  }
});

};
}]).$inject = ['Auth', '$state'];;









