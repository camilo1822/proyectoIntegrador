//la encerramos en function poruqe app seria global, para evitar problemas de memoria
//o sobreescrictura
(function(){
  var app=angular.module('starter', ['ionic'])

  //creamos los controladores
  app.controller('LugaresCtrl',function($scope,$http){
    $scope.lugares=[
      {title:'primer post',
      image:'http://i1030.photobucket.com/albums/y367/Juan_Camilo_Arboleda_Gutierrez/Lugares/vill_zpskxukfdqc.jpg',
      direccion:'primer post',
      latitud:'primer post',
      longitud:'primer post',
      descripcion:'primer post',
      tipo:'primer post',
      qr:'primer post'},
      {title:'segundo post',
      image:'segundo post',
      direccion:'segundo post',
      latitud:'segundo post',
      longitud:'segundo post',
      descripcion:'segundo post',
      tipo:'segundo post',
      qr:'segundo post'},
      {title:'tercero post',
      image:'tercero post',
      direccion:'tercero post',
      latitud:'tercero post',
      longitud:'tercero post',
      descripcion:'tercero post',
      tipo:'tercero post',
      qr:'tercero post'}
    ];
      });
  

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

}());
