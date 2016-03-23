angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl as ctrl'
})

.state('app.lugares', {
    url: '/lista_lugares',
    	views: {
    	'menuContent': {
          templateUrl: 'templates/lugares.html',
          controller: 'lugaresCtrl'
        }
      }
      
});


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});