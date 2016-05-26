angular.module('app.controllers', ['ngCordova'])


.controller("camCtrl",['$scope','$ionicPlatform',
   function($scope,$ionicPlatform,$cordovaBarcodeScanner) {
     $scope.scanBarcode = function(){
   window.cordova.plugins.barcodeScanner.scan().then(function(barcodeData) {
     // Success! Barcode data is here
     alert('barcode scanned:' +  barcodeData.text);
   }, function(error) {
     alert('Error')
     console.log(error);
     // An error occurred
   });
 };
      }

])

.controller('NuevoFavoritoCtrl', function($scope,ComentarioService,$http,$ionicLoading,$window, SeleccionInterna,$ionicPopup,$state){
   $scope.informacion = SeleccionInterna.getUser();
   $scope.lugar = SeleccionInterna.getLugarSeleccionado();
    $scope.estrella='ion-ios-star-outline';

//de aca
$scope.setRating = function() {
        if ($scope.estrella=='ion-ios-star-outline') {
         $scope.estrella = 'ion-ios-star';

       // $scope.save = function(){
          console.log("entre a la save");
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
        });
  //}
      }else {
          $scope.estrella = 'ion-ios-star-outline';

          //$scope.delete = function(){
            console.log("entre a la delete");
            console.log("borre",$scope.lugar._id);
            var base='https://cultural-api.herokuapp.com/api/Favoritos/';
        $http({
        method : 'delete',
        url : base+$scope.lugar._id
        }).success(function(data) {
            console.log(data);
        });
  //}
        };

    }
//aca


        /*$scope.save = function(){
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
        });
}*/


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

          console.log("refrescando ando");
    
        $scope.comentarios = [];
   

          ComentarioService.getAll().then(function(response){
            $scope.comentarios = response.data;
          })
             .finally(function() {
               // Stop the ion-refresher from spinning
               $scope.$broadcast('scroll.refreshComplete');
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



.controller('favoritosCtrl', ['$scope','FavoritoService','SeleccionInterna','$timeout','$state', '$ionicLoading',function($scope,FavoritoService,SeleccionInterna,$timeout, $state,$ionicLoading ) {
  $scope.favoritos = [];
  $scope.informacion = SeleccionInterna.getUser();
$scope.$on('$ionicView.enter', function() {
  FavoritoService.getAll().then(function(response){
    $scope.favoritos = response.data;
  });
});

  $scope.selectFavorito=function(favorito){
    SeleccionInterna.setLugarSeleccionado(favorito);
  };

}])


.controller('lugaresCtrl', ['$scope','lugaresService','SeleccionInterna','$timeout','$state', '$ionicLoading','$ionicModal',function($scope,lugaresService,SeleccionInterna,$timeout, $state,$ionicLoading ,$ionicModal )  {
//Modal para datos personales
$scope.show = function() {
  $ionicLoading.show({
    template: '<p>Cargando...</p><ion-spinner></ion-spinner>'
  });
};

$scope.hide = function(){
      $ionicLoading.hide();
};
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
 $scope.$on('$ionicView.loaded', function() {
   $scope.show($ionicLoading);
  lugaresService.getAll(lugar).then(function(response){

    console.info(response.data);
    console.log(response.data);
    $scope.lugares = response.data;

  }).finally(function($ionicLoading) {
      // On both cases hide the loading
      $scope.hide($ionicLoading);
    });

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

.controller('mapCtrl',['$scope','$ionicLoading','lugaresService','$compile',function($scope,$ionicLoading,lugaresService,$compile){
 var lugaresMap = [];
 var lugar= 'Lugares';

  lugaresService.getAll(lugar).then(function(response){
    lugaresMap = response.data;
    console.info(lugaresMap);
      google.maps.event.addDomListener(window, 'load', initialize(lugaresMap));
  });
  function initialize(data) {
    console.log("Initialize");
    var mapOptions = {
      // the Teide ;-)
      center: {lat: 6.267132, lng: -75.568573},
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.HYBRID,
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
    setMarkers(map,data);
    $scope.map = map;

  }

  $scope.centerOnMe = function() {
      if (!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.loading.hide();
        var marker2 = new google.maps.Marker({
        position: {lat: pos.coords.latitude, lng: pos.coords.longitude},
        title:"Estás aqui",
        });
        marker2.setMap($scope.map);
        //$scope.map = map;
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    };
        function setMarkers(map,data) {
          // Adds markers to the map.

          // Marker sizes are expressed as a Size of X,Y where the origin of the image
          // (0,0) is located in the top left of the image.

          // Origins, anchor positions and coordinates of the marker increase in the X
          // direction to the right and in the Y direction down.
          var image = {
            url: "img/moai-statues-pascua-island.png",
            // This marker is 20 pixels wide by 32 pixels high.
            //size: new google.maps.Size(20, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            //anchor: new google.maps.Point(0, 32)
          };
          // Shapes define the clickable region of the icon. The type defines an HTML
          // <area> element 'poly' which traces out a polygon as a series of X,Y points.
          // The final coordinate closes the poly by connecting to the first coordinate.
          var shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly'
          };
          var infowindows = new Array(data.length);
          var markers= new Array(data.length);
          for (var i = 0; i < data.length; i++) {
              var place = data[i];

              var html="<p>"+place.title +"</p><br>"+place.direccion+"</br>";
              infowindows[i] = new google.maps.InfoWindow({
                 content:html
              });

              console.log("place",place);
              markers[i] = new google.maps.Marker({
              position: {lat: place.latitud, lng: place.longitud},
              icon: image,
              map: map,
              shape: shape,
              title: place.title
            });
            google.maps.event.addListener(markers[i], 'click', (function(marker, i) {
              return function() {
                infowindows[i].open(map, marker);
              }
            })(markers[i], i));
          }
        }

}])


.controller('mapCtrlDetail',['$scope','$ionicLoading','SeleccionInterna','$state','$stateParams','$compile',function($scope,$ionicLoading,SeleccionInterna,$state,$stateParams,$compile){
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
      mapTypeId: google.maps.MapTypeId.HYBRID,
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
    var contentString = "<div><a ng-click='clickTest()'>"+lugar.title+"</a></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
              content: compiled[0]
            });


    var marker = new google.maps.Marker({
    position: mapOptions.center,
    title:lugar.nombre,
    icon: "img/moai-statues-pascua-island.png"
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });
    marker.setMap(map);
    $scope.map = map;

  }
  $scope.centerOnMe = function() {
      if (!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.loading.hide();
        var marker2 = new google.maps.Marker({
        position: {lat: pos.coords.latitude, lng: pos.coords.longitude},
        title:"Estás aqui",
        });
        marker2.setMap($scope.map);
        //$scope.map = map;
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    };


  $scope.clickTest = function() {
          alert('Un lugar muy hermoso')
        };

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
