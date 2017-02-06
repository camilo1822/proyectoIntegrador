angular.module('app')


.controller('loginController', loginController);

loginController.$inject = ['$scope', '$state', '$ionicActionSheet',
    '$ionicPopup', 'seleccionInterna', 'Firebase', '$cordovaDialogs',
    '$cordovaActionSheet', '$ionicPlatform','$ionicHistory'
];

function loginController($scope, $state, $ionicActionSheet,
    $ionicPopup, seleccionInterna, Firebase, $cordovaDialogs,
    $cordovaActionSheet, $ionicPlatform,$ionicHistory) {

    var vm = this;
    //var ref = new Firebase("https://APICULTURAL.firebaseio.com");
    vm.usuarioGoogle = {};
    vm.google_data = {};
    vm.logIn = logIn;
    vm.logOut = logOut;



    function logIn() {

            if (!firebase.auth().currentUser) {
                // [START createprovider]
                var provider = new firebase.auth.GoogleAuthProvider();
                // [END createprovider]
                // [START addscopes]
                provider.addScope('https://www.googleapis.com/auth/plus.login');
                // [END addscopes]
                // [START signin]
                firebase.auth().signInWithRedirect(provider).then(function(result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                   // var token = result.credential.accessToken;
                    // The signed-in user info.
                   console.log("Resultado",result);
                   //seleccionInterna.setUsuarioSeleccionado(result.user);
                    // [START_EXCLUDE]
                    // [END_EXCLUDE]
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // [START_EXCLUDE]
                    if (errorCode === 'auth/account-exists-with-different-credential') {
                        alert('You have already signed up with a different auth provider for that email.');
                        // If you are using multiple auth providers on your app you should handle linking
                        // the user's accounts here.
                    } else {
                        console.error(error);
                    }
                    // [END_EXCLUDE]
                });
                // [END signin]
            } else {
                // [START signout]
                //firebase.auth().signOut();
                // [END signout]
            }
            // [START_EXCLUDE]
            $state.go('app.tab.lugares');
            // [END_EXCLUDE]

    }
    //LogOut
    function logOut() {

        var hideSheet = $ionicActionSheet.show({
            titleText: 'Estás seguro?',
            destructiveText: 'Log out',
            cancelText: 'Cancel',
            cancel: function() {},
            destructiveButtonClicked: function() {
                hideSheet();

                return alertCallback();
            }
        });
    }

    function alertCallback() {
        // ref.unauth();ç

        $scope.$on("$ionicView.afterLeave", function() {
            $ionicHistory.clearCache();
        });

        console.log("Saliendo de la app");
        var alertPopup = $ionicPopup.alert({
            title: 'Logging Out',
            template: 'Thanks for using CulturalAPP'
        });
        alertPopup.then(function(res) {
            firebase.auth().signOut();
            /*firebase.auth().signOut().then(function() {
                // Sign-out successful.
            }, function(error) {
                // An error happened.
            });*/
            $state.go('app.login');
        });
    };

    vm.showDialog = function() {
        $cordovaDialogs.alert('message', 'title', 'button name')
            .then(function() {});
    }
}
