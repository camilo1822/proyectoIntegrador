angular.module('app')

.factory('Auth', Auth);

Auth.$inject = ['rootRef', '$firebaseAuth'];

function Auth(rootRef, $firebaseAuth) {
	
  return $firebaseAuth(rootRef);
}
