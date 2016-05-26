(function(){

  var app=angular.module('app', ['ionic', 'app.controllers', 'app.routes','app.services','app.service', 'firebase','ngCordova'])
  .constant('FirebaseUrl', 'https://ionicle.firebaseio.com/')
  .service('rootRef', ['FirebaseUrl', Firebase])


  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {


      if (window.cordova 
              ) {
            console.log('Plugin available');
          }
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })



}());
