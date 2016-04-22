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

.service("SeleccionInterna",function () {
    var LugarSeleccionado = {};
    this.setLugarSeleccionado =function (lugar) {
        LugarSeleccionado = lugar;
        };


    this.getLugarSeleccionado = function () {
        return LugarSeleccionado;

    };

})
//
//
;
