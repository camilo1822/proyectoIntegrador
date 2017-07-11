angular
  .module('app').filter('favoritoFilter', favoritoFilter);
favoritoFilter.$inject = [];

function favoritoFilter() {
  return function (array, id) {

    return array.filter(function (place) {
      return place.id_user == id;
    })
  };

}

