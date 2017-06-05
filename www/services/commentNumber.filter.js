angular
  .module('app').filter('commentNumber', commentNumber);
   commentNumber.$inject = [];

function commentNumber() {
  return function (array, id) {

    return array.filter(function (comment) {
      return comment.id_lugar == id;
    })
  };

}
