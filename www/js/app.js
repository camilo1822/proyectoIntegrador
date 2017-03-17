angular.module('app', ['ionic', 'ngCordova','app.authService','ngCordovaBeacon'])

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
.config(['$ionicConfigProvider', function ($ionicConfigProvider) {

        $ionicConfigProvider.backButton.previousTitleText(false).text('');
        $ionicConfigProvider.navBar.alignTitle('platform');
    }]);
;
