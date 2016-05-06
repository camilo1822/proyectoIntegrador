angular.module('app.controllers', [])

.controller('NuevoFavoritoCtrl', function($scope, $http,$ionicLoading,$window, SeleccionInterna,$ionicPopup,$state){
   $scope.informacion = SeleccionInterna.getUser();
   $scope.lugar = SeleccionInterna.getLugarSeleccionado();
    $scope.ratingArr=[{
    value:1,
    icon:'ion-ios-star-outline'
  }];
  //$scope.setRating = function(val) {
      //var rtgs = $scope.ratingArr;
        //if (rtgs==1) {
          //rtgs[1].icon = 'ion-ios-star-outline';
          //$scope.ratingArr.value=2;
        $scope.save = function(){
        $http({
        method : 'post',
        url : 'https://cultural-api.herokuapp.com/api/Favoritos',
        data :{
            id_user:$scope.informacion.uid,
            id_lugar:$scope.lugar._id,
            title:$scope.lugar.title,
            image:$scope.lugar.image
           }
        }).success(function(data) {
            console.log(data);
            var alertPopup = $ionicPopup.alert({
              title: 'Hecho',
              template: 'Añadido a favoritos'
            });
        });



  }
        /*}*//*else {
          //rtgs[1].icon= 'ion-ios-star';
          $scope.delete = function(){
        $http({
        method : 'delete',
        url : 'https://cultural-api.herokuapp.com/api/Favoritos/'+$scope.lugar._id,
        }).success(function(data) {
            console.log(data);
        });
  };
        };*/

    //}

   $scope.comentario='';

  $scope.guardar = function(){
    if($scope.comentario){
        $http({
        method : 'post',
        url : 'https://cultural-api.herokuapp.com/api/Comentarios',
        data :{
            id_lugar:$scope.lugar._id,
            foto:$scope.informacion.google.profileImageURL,
            nombre:$scope.informacion.google.displayName,
            comentario:$scope.comentario
           }
        }).success(function(data) {

          var alertPopup = $ionicPopup.alert({
            title: 'Hecho',
            template: 'Comentario agregado exitosamente'
          });

          alertPopup.then(function(res) {
            $scope.comentario='';
          });
        });
      }else {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Comentario vacio'
        });
      }
  };

})



.controller('favoritosCtrl', ['$scope','FavoritoService','SeleccionInterna','$timeout','$state', '$ionicLoading',function($scope,FavoritoService,SeleccionInterna,$timeout, $ionicLoading , $state ) {
  $scope.favoritos = [];
  $scope.informacion = SeleccionInterna.getUser();

  FavoritoService.getAll().then(function(response){
    $scope.favoritos = response.data;
  });

  $scope.selectFavorito=function(favorito){
    SeleccionInterna.setLugarSeleccionado(favorito);
  };

}])


.controller('lugaresCtrl', ['$scope','lugaresService','SeleccionInterna','$timeout','$state', '$ionicLoading','$ionicModal',function($scope,lugaresService,SeleccionInterna,$timeout, $ionicLoading , $state,$ionicModal ) {

//Modal para datos personales
  $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
    //Inicializando lugares
$scope.lugares = [];
 $scope.$on('$ionicView.enter', function() {
var user= SeleccionInterna.getUser();
 $scope.foto=user.google.profileImageURL;
 $scope.nombre=user.google.displayName;
 $scope.email=user.google.email;

   });
	var lugar= 'Lugares';

  lugaresService.getAll(lugar).then(function(response){

    console.info(response.data);
    console.log(response.data);
    $scope.lugares = response.data;
  });

	$scope.selectLugar=function(lugar){
    SeleccionInterna.setLugarSeleccionado(lugar);
  };

}])

.controller('detallesCtrl', ['$scope','DetalleService','ComentarioService','$state','SeleccionInterna','$location',function($scope,DetalleService,ComentarioService,$state,SeleccionInterna,$location) {
  $scope.lugar = SeleccionInterna.getLugarSeleccionado();

  var identificador = $scope.lugar._id;
  $scope.detalle = [];
  DetalleService.getAll(identificador).then(function(response){
    console.info(response.data);
    console.log(response.data);
    $scope.detalle = response.data;
  });
  $scope.comentarios = [];

  ComentarioService.getAll().then(function(response){
    $scope.comentarios = response.data;
  });
  $scope.go = function ( path ) {
  $location.path( path );
};
$scope.map=function(){
  $state.go('app.tab.mapa');
}

}])

.controller('detallesFavoritoCtrl', ['$scope','DetalleService','ComentarioService','$state','SeleccionInterna',function($scope,DetalleService,ComentarioService,$state,SeleccionInterna) {
  $scope.lugar = SeleccionInterna.getLugarSeleccionado();

  var identificador = $scope.lugar.id_lugar;
  console.log("id",identificador);
  $scope.detalle = [];
  DetalleService.getAll(identificador).then(function(response){
    console.info(response.data);
    console.log(response.data);
    $scope.detalle = response.data;
  });
  $scope.comentarios = [];

  ComentarioService.getAll().then(function(response){
    $scope.comentarios = response.data;
  });
}])

.controller('mapCtrl',['$scope','$ionicLoading','SeleccionInterna','$state','$stateParams',function($scope,$ionicLoading,SeleccionInterna,$state,$stateParams){
  var lugar = SeleccionInterna.getLugarSeleccionado();
 console.log('Idparam:' ,$stateParams.aId,'idlugar:',lugar._id);
  console.log('Latitud: ',lugar.latitud,'longitud: ',lugar.longitud);

  console.log("Not initialize");
  google.maps.event.addDomListener(window, 'load', initialize());

  function initialize() {
    console.log("Initialize");
    var mapOptions = {
      // the Teide ;-)
      center: {lat: lugar.latitud, lng: lugar.longitud},
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
        mapTypeIds: []
      },
      panControl: false,
      streetViewControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      }
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $scope.map = map;
  }



}])

.controller('LoginCtrl',['$scope','Auth','$state','$ionicActionSheet','$ionicPopup','SeleccionInterna',function($scope,Auth,$state,$ionicActionSheet,$ionicPopup,SeleccionInterna){
	var ref = new Firebase("https://APICULTURAL.firebaseio.com");
	$scope.usuarioGoogle = {};
 $scope.google_data = {};
  $scope.logiar = function(){
  ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);

    var authData = ref.getAuth();
		SeleccionInterna.setUsuarioSeleccionado(authData);
    console.log("getUser:",SeleccionInterna.getUser());
		$scope.google_data = authData;
    var today=SeleccionInterna.fechaExacta();
		var childRef= ref.child(authData.uid);
		ref.child(authData.uid).once('value', function(snapshot) {
     var exists = (snapshot.val() !== null);
     if(!exists){
			 console.log('No existe');
			 childRef.set({
			 name: authData.google.displayName,
			 provider: authData.provider,
			 image : authData.google.profileImageURL,
			 creacion:today
			 });
		 }else{
			 console.log('existe');
			 var dateRef=ref.child(authData.uid+'/'+'creacion');
			 dateRef.remove();
			 childRef.update({
			 	lastLogin :today
			 });


		 }
   });

    $state.go('app.tab.lugares');
  }
}, {
remember: "sessionOnly",
scope: "email"
});

}
//LogOut
$scope.logout = function() {
 var hideSheet = $ionicActionSheet.show({
    titleText: 'Estás seguro?',
    destructiveText: 'Log out',
    cancelText: 'Cancel',
    cancel: function() {
       },
    destructiveButtonClicked: function() {
      hideSheet();

      return alertCallback();
    }
  });
}
function alertCallback(){
    ref.unauth();

    $scope.$on("$ionicView.afterLeave", function () {
            $ionicHistory.clearCache();
    });

    console.log("Saliendo de la app");
  var alertPopup = $ionicPopup.alert({
      title: 'Logging Out',
      template: 'Thanks for using CulturalAPP'
    });
    alertPopup.then(function(res) {
    $state.go('app.login');
  });
};
}]).$inject = ['Auth', '$state'];;
