angular.module('app.controllers', [])

.controller('NuevoFavoritoCtrl',  function($scope, $http,$ionicLoading,$window, SeleccionInterna){
   $scope.informacion = SeleccionInterna.getUser();
   $scope.lugar = SeleccionInterna.getLugarSeleccionado();

 //$scope.formSite = {};
  $scope.save = function(){
        $http({
        method : 'post',
        url : 'https://cultural-api.herokuapp.com/api/Favoritos',
        //headers: headers,
        data :{
            id_user:$scope.informacion.uid,
            id_lugar:$scope.lugar._id,
            title:$scope.lugar.title,
            image:$scope.lugar.image
           }
        }).success(function(data) {
            console.log(data);
        });


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
    console.log("El id favorito es:",favorito._id)
  };

}])


.controller('lugaresCtrl', ['$scope','lugaresService','SeleccionInterna','$timeout','$state', '$ionicLoading',function($scope,lugaresService,SeleccionInterna,$timeout, $ionicLoading , $state ) {
	$scope.show = function() {
     $ionicLoading.show({
       template: 'Loading...'
		/*	 content: 'Loading',
			 animation: 'fade-in',
			 showBackdrop: true,
			 maxWidth: 200,
			 showDelay: 100*/
     });
   };


	$scope.lugares = [];
 $scope.informacion = SeleccionInterna.getUser();

	var lugar= 'Lugares';

  lugaresService.getAll(lugar).then(function(response){

    console.info(response.data);
    console.log(response.data);
    $scope.lugares = response.data;
  });
	$scope.hide = function(){
		$ionicLoading.hide();
	};
	$scope.selectLugar=function(lugar){
    SeleccionInterna.setLugarSeleccionado(lugar);
		console.log("El id es:",lugar._id)
  };

}])

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

.controller('detallesFavoritoCtrl', ['$scope','DetalleService','$state','SeleccionInterna',function($scope,DetalleService,$state,SeleccionInterna) {
  console.log("entreeeee");
  $scope.lugar = SeleccionInterna.getLugarSeleccionado();

  var identificador = $scope.lugar.id_lugar;
  console.log("id",identificador);
  $scope.detalle = [];
  DetalleService.getAll(identificador).then(function(response){
    console.info(response.data);
    console.log(response.data);
    $scope.detalle = response.data;
  });
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
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var hh =today.getHours();
		var Mm=today.getMinutes();
		var Ss=today.getSeconds();
		if(dd<10){
				dd='0'+dd
		}
		if(mm<10){
				mm='0'+mm
		}
		if(Mm<10){
			Mm='0'+Mm
		}
		if(Ss<10){
				Ss='0'+Ss
			}
		var today = dd+'/'+mm+'/'+yyyy+' '+hh+':'+Mm+':'+Ss;
    //id que nos da firebase}
	//  ref.push({uid:authData.uid});
    var authData = ref.getAuth();
		SeleccionInterna.setUsuarioSeleccionado(authData);
		$scope.google_data = authData;
		var childRef= ref.child(authData.uid);
		ref.child(authData.uid).once('value', function(snapshot) {
     var exists = (snapshot.val() !== null);
     if(!exists){
			 console.log('No existe');
			 childRef.set({
			 name: authData.google.displayName,
			 provider: authData.provider,
			 image : authData.google.profileImageURL,
			 creacion: today
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
      ref.unauth()
      hideSheet();

      return alertCallback();
    }
  });
}
function alertCallback(){
  var alertPopup = $ionicPopup.alert({
      title: 'Logging Out',
      template: 'Thanks for using CulturalAPP'
    });
    alertPopup.then(function(res) {
    $state.go('app.login');
  });
};
}]).$inject = ['Auth', '$state'];;
