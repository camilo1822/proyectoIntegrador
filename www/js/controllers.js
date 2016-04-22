angular.module('app.controllers', [])


.controller('lugaresCtrl', ['$scope','lugaresService','SeleccionInterna','$timeout', '$ionicLoading',function($scope,lugaresService,SeleccionInterna,$timeout, $ionicLoading ) {
	$scope.show = function() {
     $ionicLoading.show({
       template: 'Loading...'
		/*	 content: 'Loading',
			 animation: 'fade-in',
			 showBackdrop: true,
			 maxWidth: 200,
			 showDelay: 100*/
     });
   };


	$scope.lugares = [];


	var lugar= 'Lugares';

  lugaresService.getAll(lugar).then(function(response){

    console.info(response.data);
    console.log(response.data);
    $scope.lugares = response.data;
  });
	$scope.hide = function(){
		$ionicLoading.hide();
	};
	$scope.selectLugar=function(lugar){
    SeleccionInterna.setLugarSeleccionado(lugar);
  };

}])

.controller('detallesCtrl', ['$scope','DetalleService','$state','SeleccionInterna',function($scope,DetalleService,$state,SeleccionInterna) {
  //$scope.mostrar = function(){
  $scope.lugar = SeleccionInterna.getLugarSeleccionado();
  console.log("lalalla",$scope.lugar);
  //$scope.whichproducto=$state.lugar.id;
  //var ensayo='5706fab948fc7df9ea5fa90c';
  var ensayo = $scope.lugar._id;
  console.log("ensayo",ensayo);
  $scope.detalle = [];
  //DetalleService.getAll($scope.whichproducto).then(function(response){
  DetalleService.getAll(ensayo).then(function(response){
    console.info(response.data);
    console.log(response.data);
    $scope.detalle = response.data;
  });
   //$state.go('detalles');
//}
}])

.controller('LoginCtrl',['$scope','Auth','$state','$ionicActionSheet','$ionicPopup',function($scope,Auth,$state,$ionicActionSheet,$ionicPopup){
	var ref = new Firebase("https://APICULTURAL.firebaseio.com");

	//var usersRef = ref.child("apicultural");
  $scope.logiar = function(){
ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var hh =today.getHours();
		var Mm=today.getMinutes();
		var Ss=today.getSeconds();
		if(dd<10){
				dd='0'+dd
		}
		if(mm<10){
				mm='0'+mm
		}
		if(Mm<10){
			Mm='0'+Mm
		}
		if(Ss<10){
				Ss='0'+Ss
			}
		var today = dd+'/'+mm+'/'+yyyy+' '+hh+':'+Mm+':'+Ss;
    //id que nos da firebase}
	//  ref.push({uid:authData.uid});
    var authData = ref.getAuth();
		var childRef= ref.child(authData.uid);
		ref.child(authData.uid).once('value', function(snapshot) {
     var exists = (snapshot.val() !== null);
     if(!exists){
			 console.log('No existe');
			 childRef.set({
			 name: authData.google.displayName,
			 provider: authData.provider,
			 image : authData.google.profileImageURL,
			 creacion: today
			 });
		 }else{
			 console.log('existe');
			 var dateRef=ref.child(authData.uid+'/'+'creacion');
			 dateRef.remove();
			 childRef.update({
			 	lastLogin :today
			 });

		 }
   });

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
