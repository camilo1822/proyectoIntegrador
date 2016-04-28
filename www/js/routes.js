angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

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
        views:{
        'app':{
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl as ctrl'}}
    })

    .state('app.tab', {
      url: '/tab',
      abstract: true,
      resolve: {
        'requireAuth': function(){
          return true;
        }
      },
      views:{
        'app':{
      templateUrl: 'templates/tabs.html'
    }}})


.state('app.tab.lugares', {
url: '/lugares',
views: {
'tab-lugares': {
templateUrl: 'templates/lugares.html',
controller: 'lugaresCtrl'
}
}
})
.state('app.tab.about', {
    url: '/about',
    views:{
    'tab-about':{
    templateUrl: 'templates/about.html'
}
}
})
.state('app.tab.settings', {
    url: '/settings',
    views:{
    'tab-settings':{
    templateUrl: 'templates/settings.html',
    controller:'LoginCtrl as ctrl'
}
}
})
.state('app.tab.lugares-detalle',{
    url: '/lugares/:aId',
    views:{
    'tab-lugares':{
    templateUrl:'templates/detalle.html',
    controller:'detallesCtrl'
  }
}
})

.state('app.tab.favoritos',{
    url: '/favoritos',
    views:{
    'tab-favoritos':{
    templateUrl:'templates/favoritos.html',
    controller:'favoritosCtrl'
  }
}
})

.state('app.tab.favoritos-detalle',{
    url: '/favoritos/:aId',
    views:{
    'tab-favoritos':{
    templateUrl:'templates/detalle.html',
    controller:'detallesFavoritoCtrl'
  }
}
})
;

  $urlRouterProvider.otherwise('/app/login');

});
