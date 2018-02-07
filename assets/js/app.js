$( document ).ready(function(){
  $(".button-collapse").sideNav();
});

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCu0SoOKk3WkR5d0j30P6lYaAbLdIB9N7k",
    authDomain: "easy-vreco-e87c4.firebaseapp.com",
    databaseURL: "https://easy-vreco-e87c4.firebaseio.com",
    projectId: "easy-vreco-e87c4",
    storageBucket: "easy-vreco-e87c4.appspot.com",
    messagingSenderId: "375916979963"
  };
  firebase.initializeApp(config);

// INICIALIZA MAPA:
function initMap() {
  var santiagoCL = {lat: -33.4718999, lng: -70.9100231};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: santiagoCL
  });

  // Geolocation:
  var findMe = document.getElementById('findMe');
  findMe.onclick = function buscar() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito, function() {
        funcionError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      funcionError(false, infoWindow, map.getCenter());
    }
  }

  var funcionExito = function(position) {
    // Obtiene la posición (lat, long):
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    
    // Ventana de información, asociada a la posición:
    //infoWindow.setPosition(pos);
    //infoWindow.setContent('Te encontré!');
    //map.setCenter(pos);
  
    // Agrega marcador:
    var myPosition = new google.maps.Marker({
      position: pos,
      animation: google.maps.Animation.DROP,
      map: map,
      //title: 'Aquí estás tú!'
    });

    // Configura zoom y centrado del map:
    map.setZoom(17);
    map.setCenter(pos);
  }

  function funcionError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Error: El servicio de geolocalización falló' : 'Error: Tu navegador no soporta geolocalización.');
  }

  // Autocomplete:
  var start = document.getElementById('start');
  var finish = document.getElementById('finish');
  var start2 = document.getElementById('start2');
  var finish2 = document.getElementById('finish2');

  new google.maps.places.Autocomplete(start);
  new google.maps.places.Autocomplete(finish);
  new google.maps.places.Autocomplete(start2);
  new google.maps.places.Autocomplete(finish2);

  // Trazar ruta:
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: start.value,
      destination: finish.value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('No encontramos una ruta.');
      }
    });
  }
  directionsDisplay.setMap(map);

  var traceRoute = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  document.getElementById('traceRoute').addEventListener('click', traceRoute);
  document.getElementById('traceRoute2').addEventListener('click', traceRoute);



}