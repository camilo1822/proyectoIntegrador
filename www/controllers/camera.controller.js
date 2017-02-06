angular.module('app')

.controller('cameraController',cameraController);


cameraController.$inject=['$scope','$cordovaBarcodeScanner','$state'];

    
   function cameraController($scope,$cordovaBarcodeScanner,$state) {

    var vm = this;

    vm.scan=function(){

    cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
          $state.go('app.tab.lugares-detalle', { aId:result.text});
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          "preferFrontCamera" : true, // iOS and Android
          "showFlipCameraButton" : true, // iOS and Android
          "prompt" : "Place a barcode inside the scan area", // supported on Android only
          "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
      }
   );

    } 

}