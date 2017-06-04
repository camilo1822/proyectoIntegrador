angular.module('app', ['ionic', 'ngCordova','app.authService','ngCordovaBeacon'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

        if (window.cordova) {
            console.log('Plugin available');
        }
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
.config(['$ionicConfigProvider', function ($ionicConfigProvider) {

        $ionicConfigProvider.backButton.previousTitleText(false).text('');
        $ionicConfigProvider.navBar.alignTitle('platform');
    }]);
;

angular.module('app')

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            views: {
                '': {
                    template: '<ion-nav-view name="app"></ion-nav-view>'
                }
            }
        })
        .state('app.login', {
            url: '/login',
            views: {
                'app': {
                    templateUrl: 'templates/login.html',
                    controller: 'loginController',
                    controllerAs:'vm'
                }
            }
        })

    .state('app.tab', {
        url: '/tab',
        abstract: true,
        resolve: {
            'requireAuth': function() {
                return true;
            }
        },
        views: {
            'app': {
                templateUrl: 'templates/tabs.html'
            }
        }
    })


    .state('app.tab.lugares', {
            url: '/lugares',
            views: {
                'tab-lugares': {
                    templateUrl: 'templates/lugares.html',
                    controller: 'lugaresController',
                    controllerAs:'vm'
                }
            }
        })
        .state('app.tab.about', {
            url: '/about',
            views: {
                'tab-about': {
                    templateUrl: 'templates/map.html',
                    controller: 'mapController',
                    controllerAs:'vm'
                }
            }
        })
        .state('app.tab.settings', {
            url: '/settings',
            views: {
                'tab-settings': {
                    templateUrl: 'templates/settings.html',
                    controller: 'loginController',
                    controllerAs:'vm'
                }
            }
        })
        .state('app.tab.lugares-detalle', {
            url: '/lugares/:aId',
            views: {
                'tab-lugares': {
                    templateUrl: 'templates/detalle.html',
                    controller: 'detallesController',
                    controllerAs:'vm'
                }
            }
        })

    .state('app.tab.favoritos', {
            url: '/favoritos',
            views: {
                'tab-favoritos': {
                    templateUrl: 'templates/favoritos.html',
                    controller: 'favoritosController',
                    controllerAs:'vm'
                }
            }
        })
        .state('app.tab.camara', {
            url: '/camara',
            views: {
                'tab-camara': {
                    templateUrl: 'templates/camara.html',
                    controller: 'cameraController',
                    controllerAs:'vm'
                }
            }
        })

    .state('app.tab.favoritos-detalle', {
            url: '/favoritos/:aId',
            views: {
                'tab-favoritos': {
                    templateUrl: 'templates/detalle.html',
                    controller: 'detallesFavoritoController',
                    controllerAs:'vm'
                }
            }
        })
        .state('app.tab.mapa', {
            url: '/lugares/:aId/mapa',
            views: {
                'tab-lugares': {
                    templateUrl: 'templates/map.html',
                    controller: 'mapDetalleController',
                    controllerAs:'vm'
                }
            }
        });

    $urlRouterProvider.otherwise('/app/login');

});

angular.module('app.authService',[])

/***************************************************************************************
 * FACTORY
 **************************************************************************************/

   /* .factory("Auth", ["$firebaseAuth",
        function($firebaseAuth) {
            return $firebaseAuth();
        }
    ])*/

    // TODO: Native authentication

  /*  .factory('Firebase', function() {
        var config = {
            apiKey: "AIzaSyDuIRfagLRoWtW9wtmpcGeAZvd18v7VxWA",
            authDomain: "culturalapp-ee59b.firebaseapp.com",
            databaseURL: "https://culturalapp-ee59b.firebaseio.com",
            storageBucket: "culturalapp-ee59b.appspot.com",
            messagingSenderId: "134005070152"
        };
        return{
            init: firebase.initializeApp(config)
        }

    });*/

angular
  .module('app')
  .service('beaconService', beaconService);

beaconService.$inject = ['$ionicPlatform', '$rootScope', '$cordovaBeacon', 'lugaresService', '$cordovaLocalNotification'];

function beaconService($ionicPlatform, $rootScope, $cordovaBeacon, lugaresService, $cordovaLocalNotification) {
  var service = this;
  var brIdentifier = 'ranged region';
  var brUuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
  var brMajor = 4579;
  var brMinor = 30200;
  var brNotifyEntryStateOnDisplay = true;
  service.firstTime = true;
  service.beaconPlaces = [];
  service.timer = 50;

  service.getArray = getArray;

  function getArray() {
    return service.beaconPlaces;
  }


  $ionicPlatform.ready(function () {
    lugaresService._initializeLugares();

    // =========/ Events
    $cordovaBeacon.requestAlwaysAuthorization();

    $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function (event, pluginResult) {

      if (service.timer == 50) {
        for (var i = 0; i < pluginResult.beacons.length; i++) {
          console.log(pluginResult.beacons[i]);
          var uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;

          if (typeof lugaresService._searchByBeaconId(uniqueBeaconKey) != 'undefined') {
            if (typeof service.beaconPlaces.find(function (lugar) {
                return lugar.beaconId === uniqueBeaconKey

              }) == 'undefined') {
              var lugar = lugaresService._searchByBeaconId(uniqueBeaconKey);
              switch (pluginResult.beacons[i].proximity) {
                case 'ProximityImmediate':
                  lugar.proximidad = 'MUY cerca';
                  break;
                case 'ProximityNear':
                  lugar.proximidad = 'cerca';
                  break;
                case 'ProximityFar':
                  lugar.proximidad = 'algo lejos';
                  break;
                default:
                  lugar.proximidad = 'a una distancia desconocida';
                  break;
              }
              service.beaconPlaces.push(lugar);

              $cordovaLocalNotification.schedule({
                id: 1,
                title: 'Estás '.concat(lugar.proximidad).concat(' de ').concat(lugar.title),
                text: 'Toca aquí para ver más detalles',
                data: {
                  customProperty: 'custom value'
                },
                icon: "file://img/moai-statues-pascua-island.png",
                sound: "file://img/soundnot.mp3"
              }).then(function (result) {
                console.log('Nice notificacion bro!');
              });

            } else {

            }
          }
        }
        service.timer = 0;


      } else {
        service.timer++;
      }


    });
    $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(brIdentifier, brUuid));
  });


}

angular.module('app').service('lugaresService', lugaresService).service('detalleService', detalleService).service('comentarioService', comentarioService).service('favoritoService', favoritoService).service('seleccionInterna', seleccionInterna);

lugaresService.$inject = ['$http','$q'];
detalleService.$inject = ['$http'];
comentarioService.$inject = ['$http'];
favoritoService.$inject = ['$http'];
seleccionInterna.$inject = ['$state'];

function lugaresService($http,$q) {
  var service=this;
  var base = 'https://cultural-api.herokuapp.com/';
  service.lugares=[];
  this.getAll = function(lugar) {
    return $http.get(base + 'api/' + lugar);
  };
  this._initializeLugares=function(){
      $http.get(base + 'api/lugares')
      .then(function(response){
        service.lugares=response.data;
      },function(err){
        console.log(err);
      });
  }
/*  this._searchByBeaconId= function(beaconId){
    var defer= $q.defer();
    if(service.lugares){
      service.lugares.forEach(function (lugar) {
        if(lugar.beaconId==beaconId){
          defer.resolve(lugar);
        }
      });
    }else{
      defer.reject('No se pudo cargar el lugar');
    }
    return defer.promise;
  }*/

this._searchByBeaconId= function (beaconId) {
  return service.lugares.find(function (lugar) {
    return lugar.beaconId=beaconId
  })

}
}


//obtener lugar por medio de id
function detalleService($http) {
  var base = 'https://cultural-api.herokuapp.com/api/Lugares/';
  this.getAll = function(idMovimiento) {

    return $http.get(base + idMovimiento);

  };

}

function comentarioService($http) {
  var base = 'https://cultural-api.herokuapp.com/api/Comentarios';
  this.getAll = function() {

    return $http.get(base);

  };

}

function favoritoService($http) {
  var base = 'https://cultural-api.herokuapp.com/api/favoritos';
  this.getAll = function() {

    return $http.get(base);

  };

}

function seleccionInterna($state) {
  var LugarSeleccionado = {};
  var usuarioSeleccionado = {
    displayName: null,
    email: null,
    photoURL: null
  };
  this.setLugarSeleccionado = function(lugar) {
    LugarSeleccionado = lugar;
  };

  this.setUsuarioSeleccionado = function(usuario) {
    facebookConnectPlugin.api('/me?fields=name,email,picture.type(large)', [
      "email", "public_profile"
    ], function(data) {
      console.log("User info: ", data);
      usuarioSeleccionado.displayName = data.name;
      usuarioSeleccionado.email = data.email;
      usuarioSeleccionado.photoURL = data.picture.data.url;
      $state.go('app.tab.lugares');
    }, function(data) {
      console.log("ERROR");
    });
  };

  this.getLugarSeleccionado = function() {
    return LugarSeleccionado;

  };

  this.getUser = function() {
    return usuarioSeleccionado;
  };

  this.fechaExacta = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var Mm = today.getMinutes();
    var Ss = today.getSeconds();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    if (Mm < 10) {
      Mm = '0' + Mm
    }
    if (Ss < 10) {
      Ss = '0' + Ss
    }
    var today = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + Mm + ':' + Ss;
    return today;
  }

}

// TODO: Native map
angular.module('app').controller('cameraController', cameraController);

cameraController.$inject = [
  '$scope',
  'beaconService'
];

function cameraController($scope,beaconService) {

  var vm = this;
  $scope.beacons = beaconService.beaconPlaces;
}

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

angular.module('app')

.controller('detallesFavoritoController',detallesFavoritoController);

detallesFavoritoController.$inject=['$scope','DetalleService','ComentarioService','$state','seleccionInterna'];

 function detallesFavoritoController($scope,detalleService,comentarioService,$state,seleccionInterna) {
  var vm= this;
  vm.lugar = seleccionInterna.getLugarSeleccionado();
  vm.detalle = [];
    vm.comentarios = [];
  var identificador = vm.lugar.id_lugar;

  detalleService.getAll(identificador).then(function(response){
    vm.detalle = response.data;
  });

  comentarioService.getAll().then(function(response){
  vm.comentarios = response.data;
  });
}
angular.module('app')

.controller('favoritosController', favoritosController);

favoritosController.$inject=['$scope', 'favoritoService', 'seleccionInterna', '$timeout', 
'$state', '$ionicLoading'];

function favoritosController($scope, favoritoService, seleccionInterna, $timeout, $state, $ionicLoading) {
    var vm= this;
    vm.favoritos = [];
    vm.informacion = seleccionInterna.getUser();

    vm.selectFavorito=selectFavorito;
    $scope.$on('$ionicView.enter', function() {
        favoritoService.getAll().then(function(response) {
            vm.favoritos = response.data;
        });
    });

    function selectFavorito(favorito) {
        seleccionInterna.setLugarSeleccionado(favorito);
    };

}

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

angular.module('app')

.controller('lugaresController', lugaresController);

lugaresController.$inject=['$scope', 'lugaresService', 'seleccionInterna', '$timeout',
    '$state', '$ionicLoading', '$ionicModal', '$ionicSlideBoxDelegate'];

function lugaresController($scope, lugaresService, seleccionInterna, $timeout,
    $state, $ionicLoading, $ionicModal, $ionicSlideBoxDelegate) {
    //Modal para datos personales
    var vm = this;
    vm.user={};

    vm.lugares = [];



    vm.show = show;
    vm.hide = hide;
    vm.selectLugar = selectLugar;
    vm.openModal = openModal;
    vm.closeModal = closeModal;
    vm.goToSlide=goToSlide;

    function show() {
        $ionicLoading.show({
            template: '<p>Cargando...</p><ion-spinner></ion-spinner>'
        });
    };

    function hide() {
        $ionicLoading.hide();
    };


    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function(modal) {
        vm.modal1 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        vm.modal = modal;
    });

    //Inicializando lugares

    $scope.$on('$ionicView.afterEnter', function() {
        vm.user = seleccionInterna.getUser();
        console.log("Usuario completo",vm.user);
    });
    var lugar = 'Lugares';
    $scope.$on('$ionicView.loaded', function() {
        vm.show($ionicLoading);
        lugaresService.getAll(lugar).then(function(response) {
            vm.lugares = response.data;

        }).finally(function($ionicLoading) {
            // On both cases hide the loading
            vm.hide($ionicLoading);
        });

    });

    function selectLugar(lugar) {
        seleccionInterna.setLugarSeleccionado(lugar);
    };


    function openModal() {
        $ionicSlideBoxDelegate.slide(0);
        vm.modal.show();
    };

    function closeModal() {
        vm.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        vm.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
    $scope.$on('modal.shown', function() {
        console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    function goToSlide(index) {
        vm.modal.show();
        $ionicSlideBoxDelegate.slide(index);
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };


}

angular.module('app')

.controller('mapController', mapController);

mapController.$inject = ['$scope', '$ionicLoading', 'lugaresService', '$compile'];

function mapController($scope, $ionicLoading, lugaresService, $compile) {

    var vm = this;
    vm.lugaresMap = [];
    var lugar = 'Lugares';
    vm.centerOnMe=centerOnMe;

    lugaresService.getAll(lugar).then(function(response) {
        lugaresMap = response.data;
        google.maps.event.addDomListener(window, 'load', initialize(lugaresMap));
    });

    function initialize(data) {
        console.log("Initialize");
        var mapOptions = {
            // the Teide ;-)
            center: { lat: 6.267132, lng: -75.568573 },
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
        setMarkers(map, data);
        $scope.map = map;

    }

    function centerOnMe() {
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
                position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
                title: "Estás aqui",
            });
            marker2.setMap($scope.map);
            //$scope.map = map;
        }, function(error) {
            alert('Unable to get location: ' + error.message);
        });
    };

    function setMarkers(map, data) {
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
        var markers = new Array(data.length);
        for (var i = 0; i < data.length; i++) {
            var place = data[i];

            var html = "<p>" + place.title + "</p><br>" + place.direccion + "</br>";
            infowindows[i] = new google.maps.InfoWindow({
                content: html
            });

            console.log("place", place);
            markers[i] = new google.maps.Marker({
                position: { lat: place.latitud, lng: place.longitud },
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

}

angular.module('app')

.controller('mapDetalleController', mapDetalleController);

mapDetalleController.$inject = ['$scope', '$ionicLoading', 'seleccionInterna', '$state', '$stateParams', '$compile'];

function mapDetalleController($scope, $ionicLoading, seleccionInterna, $state, $stateParams, $compile) {
    var vm = this;
    vm.lugar = seleccionInterna.getLugarSeleccionado();
    console.log(vm.lugar);
    vm.centerOnMe=centerOnMe;
    vm.clickTest=clickTest;


    google.maps.event.addDomListener(window, 'load', initialize());

    function initialize() {
        console.log("Initialize");
        var mapOptions = {
            // the Teide ;-)
            center: { lat: vm.lugar.latitud, lng: vm.lugar.longitud },
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
        var contentString = "<div><a ng-click='clickTest()'>" + vm.lugar.title + "</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });


        var marker = new google.maps.Marker({
            position: mapOptions.center,
            title: vm.lugar.nombre,
            icon: "img/moai-statues-pascua-island.png"
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
        marker.setMap(map);
        $scope.map = map;

    }

    function centerOnMe() {
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
                position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
                title: "Estás aqui",
            });
            marker2.setMap($scope.map);
            //$scope.map = map;
        }, function(error) {
            alert('Unable to get location: ' + error.message);
        });
    };


    function clickTest() {
        alert(vm.lugar.description);
    };

}

angular.module('app')

.controller('nuevoFavoritoController', nuevoFavoritoController);

nuevoFavoritoController.$inject=['$scope', 'comentarioService', '$http', '$ionicLoading', 
'$window', ' seleccionInterna', '$ionicPopup', '$state'];


function nuevoFavoritoController($scope, comentarioService, $http, $ionicLoading, 
  $window, seleccionInterna, $ionicPopup, $state) {
    var vm = this;
    vm.informacion = seleccionInterna.getUser();
    vm.lugar = seleccionInterna.getLugarSeleccionado();
    vm.estrella = 'ion-ios-star-outline';
    vm.comentario = '';
    vm.setRating = setRating;
    vm.comentarios = [];

    function setRating() {
        if (vm.estrella == 'ion-ios-star-outline') {
            vm.estrella = 'ion-ios-star';

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
                url: 'https://cultural-api.herokuapp.com/api/comentarios',
                data: {
                    id_lugar: vm.lugar._id,
                    foto: vm.informacion.google.profileImageURL,
                    nombre: vm.informacion.google.displayName,
                    comentario: vm.comentario
                }
            }).success(function(data) {

                var alertPopup = $ionicPopup.alert({
                    title: 'Hecho',
                    template: 'Comentario agregado exitosamente'
                });

                console.log("refrescando ando");

       


                comentarioService.getAll().then(function(response) {
                        vm.comentarios = response.data.reverse();
                        console.log(vm.comentarios);
                    })
                    .finally(function() {
                        // Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                alertPopup.then(function(res) {
                    vm.comentario = '';
                });
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Error',
                template: 'Comentario vacio'
            });
        }
    };

}
