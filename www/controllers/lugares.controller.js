angular.module('app')

.controller('lugaresController', lugaresController);

lugaresController.$inject=['$scope', 'lugaresService', 'seleccionInterna', '$timeout',
    '$state', '$ionicLoading', '$ionicModal', '$ionicSlideBoxDelegate'];

function lugaresController($scope, lugaresService, seleccionInterna, $timeout,
    $state, $ionicLoading, $ionicModal, $ionicSlideBoxDelegate) {
    //Modal para datos personales
    var vm = this;


    vm.lugares = [];



    vm.show = show;
    vm.hide = hide;
    vm.selectLugar = selectLugar;
    vm.openModal = openModal;
    vm.closeModal = closeModal;
    vm.goToSlide=goToSlide;

    function show() {
        $ionicLoading.show({
            template: '<p>Cargando...</p><ion-spinner></ion-spinner>'
        });
    };

    function hide() {
        $ionicLoading.hide();
    };


    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function(modal) {
        vm.modal1 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        vm.modal = modal;
    });

    //Inicializando lugares

    $scope.$on('$ionicView.enter', function() {
        vm.user = seleccionInterna.getUser();
    });
    var lugar = 'Lugares';
    $scope.$on('$ionicView.loaded', function() {
        vm.show($ionicLoading);
        lugaresService.getAll(lugar).then(function(response) {
            vm.lugares = response.data;

        }).finally(function($ionicLoading) {
            // On both cases hide the loading
            vm.hide($ionicLoading);
        });

    });

    function selectLugar(lugar) {
        seleccionInterna.setLugarSeleccionado(lugar);
    };


    function openModal() {
        $ionicSlideBoxDelegate.slide(0);
        vm.modal.show();
    };

    function closeModal() {
        vm.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        vm.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
    $scope.$on('modal.shown', function() {
        console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    function goToSlide(index) {
        vm.modal.show();
        $ionicSlideBoxDelegate.slide(index);
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };


}
