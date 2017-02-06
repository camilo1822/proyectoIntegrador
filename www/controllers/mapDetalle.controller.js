angular.module('app')

.controller('mapDetalleController', mapDetalleController);

mapDetalleController.$inject = ['$scope', '$ionicLoading', 'seleccionInterna', '$state', '$stateParams', '$compile'];

function mapDetalleController($scope, $ionicLoading, seleccionInterna, $state, $stateParams, $compile) {
    var vm = this;
    vm.lugar = seleccionInterna.getLugarSeleccionado();
    console.log(vm.lugar);
    vm.centerOnMe=centerOnMe;
    vm.clickTest=clickTest;


    google.maps.event.addDomListener(window, 'load', initialize());

    function initialize() {
        console.log("Initialize");
        var mapOptions = {
            // the Teide ;-)
            center: { lat: vm.lugar.latitud, lng: vm.lugar.longitud },
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            mapTypeControlOptions: {
                mapTypeIds: []
            },
            panControl: false,
            streetViewControl: false,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            }
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var contentString = "<div><a ng-click='clickTest()'>" + vm.lugar.title + "</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });


        var marker = new google.maps.Marker({
            position: mapOptions.center,
            title: vm.lugar.nombre,
            icon: "img/moai-statues-pascua-island.png"
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
        marker.setMap(map);
        $scope.map = map;

    }

    function centerOnMe() {
        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $scope.loading.hide();
            var marker2 = new google.maps.Marker({
                position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
                title: "Estás aqui",
            });
            marker2.setMap($scope.map);
            //$scope.map = map;
        }, function(error) {
            alert('Unable to get location: ' + error.message);
        });
    };


    function clickTest() {
        alert(vm.lugar.description);
    };

}
