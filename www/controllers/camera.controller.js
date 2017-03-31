// TODO: Native map
angular.module('app').controller('cameraController', cameraController);

cameraController.$inject = [
  '$scope',
  '$cordovaBarcodeScanner',
  '$state',
  '$cordovaBeacon',
  '$ionicPlatform',
  '$rootScope',
  'lugaresService'
];

function cameraController($scope, $cordovaBarcodeScanner, $state, $cordovaBeacon, $ionicPlatform, $rootScope, lugaresService) {

  var vm = this;
  vm.beacons = {};
  var brIdentifier = 'ranged region';
  var brUuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
  var brMajor = 4579;
  var brMinor = 30200;
  var brNotifyEntryStateOnDisplay = true;
  vm.date = '';
  vm.firstTime = true;
  vm.lugar = {};
  $scope.$watch(angular.bind(this, function() {
    return this.lugar;
  }), function(newVal) {
    console.log('Lugar changed to ', newVal);
  });
  $scope.$watch(angular.bind(this, function() {
    return this.firstTime;
  }), function(newVal) {
    console.log('FirstTime changed to ', newVal);
  });

  $ionicPlatform.ready(function() {
    lugaresService._initializeLugares();

    // =========/ Events
    $cordovaBeacon.requestAlwaysAuthorization();

    $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {

      var uniqueBeaconKey;

      for (var i = 0; i < pluginResult.beacons.length; i++) {
        uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
        if (vm.firstTime) {
          lugaresService._searchByBeaconId(uniqueBeaconKey).then(function(lugar) {
            console.log("Lugar en beacon",lugar);
            vm.lugar = lugar;
            $scope.$apply();
            vm.firstTime= false;
          }),
          function(err) {
            console.log('err ', err);
          };
        } else {
          
        }
      }

    });

    $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(brIdentifier, brUuid));
  });

}
