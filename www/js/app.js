angular.module('app', ['ionic','firebase', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

        if (window.cordova) {
            console.log('Plugin available');
        }
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
