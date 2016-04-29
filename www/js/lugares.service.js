angular.module('app.service', [])
.service('lugaresService', ['$http',function($http){
	var base = 'https://cultural-api.herokuapp.com/';

    this.getAll=function (lugar) {
            return $http.get(base + 'api/' + lugar);
        };
}])
//obtener lugar por medio de id
.service('DetalleService', ['$http',function($http){
    var base = 'https://cultural-api.herokuapp.com/api/Lugares/';
    this.getAll=function (idMovimiento) {

            return $http.get(base+idMovimiento);

        };

}])

.service('ComentarioService', ['$http',function($http){
    var base = 'https://cultural-api.herokuapp.com/api/Comentarios';
    this.getAll=function () {

            return $http.get(base);

        };

}])

.service('FavoritoService', ['$http',function($http){
    var base = 'https://cultural-api.herokuapp.com/api/Favoritos';
    this.getAll=function () {

            return $http.get(base);

        };

}])

.service("SeleccionInterna",function () {
    var LugarSeleccionado = {};
    var usuarioSeleccionado = {};
    this.setLugarSeleccionado =function (lugar) {
        LugarSeleccionado = lugar;
        };

         this.setUsuarioSeleccionado = function(usuario) {
      usuarioSeleccionado = usuario;
    };


    this.getLugarSeleccionado = function () {
        return LugarSeleccionado;

    };

    this.getUser = function() {
      return usuarioSeleccionado;
    };

})
//
//
;
