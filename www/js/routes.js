angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    
      
        
.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl as ctrl'
})

.state('lugares', {
    url: '/lista_lugares',
    templateUrl: 'templates/lugares.html',
    controller: 'lugaresCtrl'
      
      
});

  $urlRouterProvider.otherwise('/login');

});