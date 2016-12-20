angular.module('app')

.controller('mapController', mapController);

mapController.$inject = ['$scope', '$ionicLoading', 'lugaresService', '$compile'];

function mapController($scope, $ionicLoading, lugaresService, $compile) {

    var vm = this;
    vm.lugaresMap = [];
    var lugar = 'Lugares';
    vm.centerOnMe=centerOnMe;

    lugaresService.getAll(lugar).then(function(response) {
        lugaresMap = response.data;
        google.maps.event.addDomListener(window, 'load', initialize(lugaresMap));
    });

    function initialize(data) {
        console.log("Initialize");
        var mapOptions = {
            // the Teide ;-)
            center: { lat: 6.267132, lng: -75.568573 },
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
        setMarkers(map, data);
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

    function setMarkers(map, data) {
        // Adds markers to the map.

        // Marker sizes are expressed as a Size of X,Y where the origin of the image
        // (0,0) is located in the top left of the image.

        // Origins, anchor positions and coordinates of the marker increase in the X
        // direction to the right and in the Y direction down.
        var image = {
            url: "img/moai-statues-pascua-island.png",
            // This marker is 20 pixels wide by 32 pixels high.
            //size: new google.maps.Size(20, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            //anchor: new google.maps.Point(0, 32)
        };
        // Shapes define the clickable region of the icon. The type defines an HTML
        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
        // The final coordinate closes the poly by connecting to the first coordinate.
        var shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly'
        };
        var infowindows = new Array(data.length);
        var markers = new Array(data.length);
        for (var i = 0; i < data.length; i++) {
            var place = data[i];

            var html = "<p>" + place.title + "</p><br>" + place.direccion + "</br>";
            infowindows[i] = new google.maps.InfoWindow({
                content: html
            });

            console.log("place", place);
            markers[i] = new google.maps.Marker({
                position: { lat: place.latitud, lng: place.longitud },
                icon: image,
                map: map,
                shape: shape,
                title: place.title
            });
            google.maps.event.addListener(markers[i], 'click', (function(marker, i) {
                return function() {
                    infowindows[i].open(map, marker);
                }
            })(markers[i], i));
        }
    }

}
