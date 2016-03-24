angular.module('app.service', [])
.service('lugaresService', ['$http',function($http){
	//var base = 'https://cultural-api.herokuapp.com/';
    var base = '/data/Lugares';
    

    this.getAll=function (lugar) {
            return $http.get(base +  lugar);

            //return $http.get(base + 'api/' + lugar);

        };
}]);