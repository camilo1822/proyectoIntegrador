angular.module('app').service('lugaresService', lugaresService).service('detalleService', detalleService).service('comentarioService', comentarioService).service('favoritoService', favoritoService).service('seleccionInterna', seleccionInterna);

lugaresService.$inject = ['$http'];
detalleService.$inject = ['$http'];
comentarioService.$inject = ['$http'];
favoritoService.$inject = ['$http'];
seleccionInterna.$inject = ['$state'];

function lugaresService($http) {
  var base = 'https://cultural-api.herokuapp.com/';

  this.getAll = function(lugar) {
    return $http.get(base + 'api/' + lugar);
  };
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
