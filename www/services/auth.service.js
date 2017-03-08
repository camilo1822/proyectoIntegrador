angular.module('app.authService',[])

/***************************************************************************************
 * FACTORY
 **************************************************************************************/

   /* .factory("Auth", ["$firebaseAuth",
        function($firebaseAuth) {
            return $firebaseAuth();
        }
    ])*/

    // TODO: Native authentication

    .factory('Firebase', function() {
        var config = {
            apiKey: "AIzaSyDuIRfagLRoWtW9wtmpcGeAZvd18v7VxWA",
            authDomain: "culturalapp-ee59b.firebaseapp.com",
            databaseURL: "https://culturalapp-ee59b.firebaseio.com",
            storageBucket: "culturalapp-ee59b.appspot.com",
            messagingSenderId: "134005070152"
        };
        return{
            init: firebase.initializeApp(config)
        }

    });
