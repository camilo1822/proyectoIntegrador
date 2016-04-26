angular.module('app.controllers', [])
  


.controller('lugaresCtrl', ['$scope','lugaresService','SeleccionInterna',function($scope,lugaresService,SeleccionInterna ) {

  $scope.lugares = [];  
  $scope.informacion = SeleccionInterna.getUser();
  var lugar= 'Lugares';
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
  $scope.lugar = SeleccionInterna.getLugarSeleccionado();
  var identificador = $scope.lugar._id;
  $scope.detalle = [];

  DetalleService.getAll(identificador).then(function(response){
    console.info(response.data);
    console.log(response.data);
    $scope.detalle = response.data; 
  });
 
}])


.controller('NuevoFavoritoCtrl',  function($scope, $http,$ionicLoading,$window, SeleccionInterna){

 //$scope.formSite = {};
  $scope.save = function(){
        $http({
        method : 'post',
        url : 'https://cultural-api.herokuapp.com/api/Favoritos',
        //headers: headers,
        data :{
            /*id:$scope.formSite._id,
            title:$scope.formSite.title,
            sites:$scope.formSite.direccion*/
            id_user:"123",
            title:"juaco",
            sites:"poncio"
           }
        }).success(function(data) {
            console.log(data);
        });
              
    
  };

})




.controller('LoginCtrl',['$scope','Auth','$state','SeleccionInterna',function($scope,Auth,$state,SeleccionInterna){
  
  $scope.usuarioGoogle = {};
  $scope.google_data = {};

  $scope.logiar = function(){
  var ref = new Firebase("https://APICULTURAL.firebaseio.com");
 ref.authWithOAuthPopup("google", function(error, authData) {
  SeleccionInterna.setUsuarioSeleccionado(authData);
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);

    //id que nos da firebase
    var authData = ref.getAuth();
    $scope.google_data = authData;
    ref.push({uid:authData.uid,provider:authData.provider,nombre:authData.google.displayName});

    $state.go('lugares');
  }
});

};
}]).$inject = ['Auth','$state'];