angular.module('app')


.controller('loginController', loginController);

loginController.$inject = ['$scope', '$state', '$ionicActionSheet',
    '$ionicPopup', 'seleccionInterna', '$firebaseAuth'
];

function loginController($scope, $state, $ionicActionSheet, $ionicPopup, seleccionInterna, $firebaseAuth) {

    var vm = this;
    //var ref = new Firebase("https://APICULTURAL.firebaseio.com");
    vm.usuarioGoogle = {};
    vm.google_data = {};
    vm.logIn = logIn;
    vm.logOut = logOut;




    function logIn() {
        /*
                    ref.authWithOAuthPopup("google", function(error, authData) {
                        if (error) {
                            console.log("Login Failed!", error);
                        } else {
                            console.log("Authenticated successfully with payload:", authData);

                            var authData = ref.getAuth();
                            seleccionInterna.setUsuarioSeleccionado(authData);
                            console.log("getUser:", seleccionInterna.getUser());
                            $scope.google_data = authData;
                            var today = seleccionInterna.fechaExacta();
                            var childRef = ref.child(authData.uid);
                            ref.child(authData.uid).once('value', function(snapshot) {
                                var exists = (snapshot.val() !== null);
                                if (!exists) {
                                    console.log('No existe');
                                    childRef.set({
                                        name: authData.google.displayName,
                                        provider: authData.provider,
                                        image: authData.google.profileImageURL,
                                        creacion: today
                                    });
                                } else {
                                    console.log('existe');
                                    var dateRef = ref.child(authData.uid + '/' + 'creacion');
                                    dateRef.remove();
                                    childRef.update({
                                        lastLogin: today
                                    });


                                }
                            });

                            $state.go('app.tab.lugares');
                        }
                    }, {
                        remember: "sessionOnly",
                        scope: "email"
                    });*/

        var auth = $firebaseAuth();
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');
        // login with Facebook
        auth.$signInWithPopup(provider).then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser);
            seleccionInterna.setUsuarioSeleccionado(firebaseUser.user);
            $state.go('app.tab.lugares');
        }).catch(function(error) {
            console.log("Authentication failed:", error);
        });
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
        var auth = $firebaseAuth();

        $scope.$on("$ionicView.afterLeave", function() {
            $ionicHistory.clearCache();
        });

        console.log("Saliendo de la app");
        var alertPopup = $ionicPopup.alert({
            title: 'Logging Out',
            template: 'Thanks for using CulturalAPP'
        });
        alertPopup.then(function(res) {
          auth.$signOut();
            /*firebase.auth().signOut().then(function() {
                // Sign-out successful.
            }, function(error) {
                // An error happened.
            });*/
            $state.go('app.login');
        });
    };
}
