angular
  .module('app')
  .service('beaconService', beaconService);

beaconService.$inject = ['$ionicPlatform', '$rootScope', '$cordovaBeacon', 'lugaresService', '$cordovaLocalNotification'];

function beaconService($ionicPlatform, $rootScope, $cordovaBeacon, lugaresService, $cordovaLocalNotification) {
  var service = this;
  var brIdentifier = 'ranged region';
  var brUuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
  var brMajor = 4579;
  var brMinor = 30200;
  var brNotifyEntryStateOnDisplay = true;
  service.firstTime = true;
  service.beaconPlaces = [];
  service.timer = 50;

  service.getArray = getArray;

  function getArray() {
    return service.beaconPlaces;
  }


  $ionicPlatform.ready(function () {
    lugaresService._initializeLugares();

    // =========/ Events
    $cordovaBeacon.requestAlwaysAuthorization();

    $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function (event, pluginResult) {

      if (service.timer == 50) {
        for (var i = 0; i < pluginResult.beacons.length; i++) {
          console.log(pluginResult.beacons[i]);
          var uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;

          if (typeof lugaresService._searchByBeaconId(uniqueBeaconKey) != 'undefined') {
            if (typeof service.beaconPlaces.find(function (lugar) {
                return lugar.beaconId === uniqueBeaconKey

              }) == 'undefined') {
              var lugar = lugaresService._searchByBeaconId(uniqueBeaconKey);
              switch (pluginResult.beacons[i].proximity) {
                case 'ProximityImmediate':
                  lugar.proximidad = 'MUY cerca';
                  break;
                case 'ProximityNear':
                  lugar.proximidad = 'cerca';
                  break;
                case 'ProximityFar':
                  lugar.proximidad = 'algo lejos';
                  break;
                default:
                  lugar.proximidad = 'a una distancia desconocida';
                  break;
              }
              service.beaconPlaces.push(lugar);

              $cordovaLocalNotification.schedule({
                id: 1,
                title: 'Estás '.concat(lugar.proximidad).concat(' de ').concat(lugar.title),
                text: 'Toca aquí para ver más detalles',
                data: {
                  customProperty: 'custom value'
                },
                icon: "file://img/moai-statues-pascua-island.png",
                sound: "file://img/soundnot.mp3"
              }).then(function (result) {
                console.log('Nice notificacion bro!');
              });

            } else {

            }
          }
        }
        service.timer = 0;


      } else {
        service.timer++;
      }


    });
    $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(brIdentifier, brUuid));
  });


}
