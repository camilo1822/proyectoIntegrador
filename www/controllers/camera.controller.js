// TODO: Native map
angular.module('app').controller('cameraController', cameraController);

cameraController.$inject = [
  '$scope',
  '$cordovaBarcodeScanner',
  '$state',
  '$cordovaBeacon',
  '$ionicPlatform',
  '$rootScope'
];

function cameraController($scope, $cordovaBarcodeScanner, $state, $cordovaBeacon, $ionicPlatform, $rootScope) {

  var vm = this;
  vm.beacons = {};
  var brIdentifier = 'ranged region';
  var brUuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
  var brMajor = 4579;
  var brMinor = 30200;
  var brNotifyEntryStateOnDisplay = true;
  vm.date='';

  $ionicPlatform.ready(function() {

  /*  vm.didStartMonitoringForRegionLog = '';
    vm.didDetermineStateForRegionLog = '';
    vm.didRangeBeaconsInRegionLog = '';

    vm.requestAlwaysAuthorization = function() {
        $cordovaBeacon.requestWhenInUseAuthorization();
    };

    vm.startMonitoringForRegion = function() {
      $cordovaBeacon.startMonitoringForRegion($cordovaBeacon.createBeaconRegion(brIdentifier, brUuid, brMajor, brMinor, brNotifyEntryStateOnDisplay));
    };
    vm.startRangingBeaconsInRegion = function() {
      //$cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(brIdentifier, brUuid, brMajor, brMinor, brNotifyEntryStateOnDisplay));
      $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(brIdentifier, brUuid));
    };

    vm.stopMonitoringForRegion = function() {
      $cordovaBeacon.stopMonitoringForRegion($cordovaBeacon.createBeaconRegion(brIdentifier, brUuid, brMajor, brMinor, brNotifyEntryStateOnDisplay));
    };
    vm.stopRangingBeaconsInRegion = function() {
      $cordovaBeacon.stopRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(brIdentifier, brUuid, brMajor, brMinor, brNotifyEntryStateOnDisplay));
    };

    vm.clearLogs = function() {
      vm.didStartMonitoringForRegionLog = '';
      vm.didDetermineStateForRegionLog = '';
      vm.didRangeBeaconsInRegionLog = '';
    };
    vm.requestAlwaysAuthorization()
    vm.play = function() {
      //vm.startMonitoringForRegion();
      vm.startRangingBeaconsInRegion();
    }
    vm.stop = function() {
      //vm.stopMonitoringForRegion();
      vm.stopRangingBeaconsInRegion();
    }

    // ========== Events

    $rootScope.$on("$cordovaBeacon:didStartMonitoringForRegion", function(event, pluginResult) {
      //vm.didStartMonitoringForRegionLog += '-----' + '\n';
      //vm.didStartMonitoringForRegionLog += JSON.stringify(pluginResult) + '\n';
      console.log('pluginResult: ', pluginResult);
    });

    $rootScope.$on("$cordovaBeacon:didDetermineStateForRegion", function(event, pluginResult) {
      vm.didDetermineStateForRegionLog += '-----' + '\n';
      vm.didDetermineStateForRegionLog += JSON.stringify(pluginResult) + '\n';
    });

    $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
      vm.didRangeBeaconsInRegionLog += '-----' + '\n';
      vm.didRangeBeaconsInRegionLog += JSON.stringify(pluginResult) + '\n';
      /*var uniqueBeaconKey;
      for (var i = 0; i < pluginResult.beacons.length; i++) {
        uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
        vm.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
      }
      $scope.$apply();
      console.log('pluginResult: ', pluginResult);
    });*/

    // =========/ Events
    $cordovaBeacon.requestAlwaysAuthorization();

        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {

          var uniqueBeaconKey;
          for (var i = 0; i < pluginResult.beacons.length; i++) {
            //uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
            vm.beacons[i] = pluginResult.beacons[i];
            vm.date= (new Date()).toString();
          }
          $scope.$apply();


        });

        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(brIdentifier, brUuid));
  });

}
