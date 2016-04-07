angular.module('app.controllers', [])



.controller('lugaresCtrl', ['$scope','lugaresService',function($scope,lugaresService ) {

	$scope.lugares = [];


	var lugar= 'listaDeLugares';

  lugaresService.getAll(lugar).then(function(response){

    console.info(response.data);
    console.log(response.data);
    $scope.lugares = response.data;
  });

}])

.controller('LoginCtrl',['$scope','Auth','$state','$ionicActionSheet','$ionicPopup',function($scope,Auth,$state,$ionicActionSheet,$ionicPopup){
  var ref = new Firebase("https://APICULTURAL.firebaseio.com");
  $scope.logiar = function(){
ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);

    //id que nos da firebase
    var authData = ref.getAuth();
    ref.push({uid:authData.uid});

    $state.go('app.tab.lugares');
  }
});

}
//LogOut
$scope.logout = function() {
 var hideSheet = $ionicActionSheet.show({
    titleText: 'Estás seguro?',
    destructiveText: 'Log out',
    cancelText: 'Cancel',
    cancel: function() {
       },
    destructiveButtonClicked: function() {
      ref.unauth()
      hideSheet();

      return alertCallback();
    }
  });
}
function alertCallback(){
  var alertPopup = $ionicPopup.alert({
      title: 'Logging Out',
      template: 'Thanks for using CulturalAPP'
    });
    alertPopup.then(function(res) {
    $state.go('app.login');
  });
};
}]).$inject = ['Auth', '$state'];;
