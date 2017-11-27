/*
 * geolocalisationHTML5_console.js
 */

//function geolocGetCoords() {
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(function (position) {
//            console.log("Attention ! Ne fonctionne pas avec Chrome >= 50 sans https !");
//            console.log("position", position);
//
//            var latitude = position.coords.latitude;
//            var longitude = position.coords.longitude;
//
//            $("#inputLatitude").val(latitude);
//            $("#inputLongitude").val(longitude);
//
//            getCinemasList();
//        }
//        );
//    } else {
//        alert("Votre navigateur ne gère pas la géolocalisation");
//    }
//
//}
//function getCinemasList() {
//    $.ajax({
//        url: "/MongoDBWeb/getCinemas",
//        data: "",
//        type: 'GET'
//    }).done((data) => {
//        console.log(data);
//    });
//}
//$(document).ready(function () {
//    geolocGetCoords();
//});

var lblMessage;

// ---------- 
function init() {

    lblMessage = document.getElementById("lblMessage");

    // --- GEOLOCALISATION HTML5 
    if (navigator.geolocation) {
        // --- Demande de la position 
        // --- Cette methode prend en parametre 
        // --- une fonction de callback qu'elle va appeler 
        // --- en lui fournissant le parametre position contenant les coordonnees. 
        navigator.geolocation.getCurrentPosition(obtenirLatEtLong, echec);
    } else {
        lblMessage.innerHTML = "Votre navigateur ne gère pas la géolocalisation";
    }
    
} /// init 

// ---------------------- 
function obtenirLatEtLong(position) {
    // --- Latitude 
    var latitude = position.coords.latitude;
    // --- Longitude 
    var longitude = position.coords.longitude;
    // La Map 
    afficherCarte(latitude, longitude);
} /// obtenirLatEtLong 

// ----------- 
function echec(erreur) {
    switch (erreur.code) {
        case erreur.TIMEOUT:
            navigator.geolocation.getCurrentPosition(obtenirLatEtLong, echec);
            break;
        case erreur.POSITION_UNAVAILABLE:
            document.getElementById("lblMessage").innerHTML = "Position indisponible";
            break;
        case erreur.PERMISSION_DENIED:
            document.getElementById("lblMessage").innerHTML = "Permission refusée";
            break;
        case erreur.UNKNOWN_ERROR:
            document.getElementById("lblMessage").innerHTML = "Erreur inconnue";
            break;
        default:
            document.getElementById("lblMessage").innerHTML = "Echec de l'obtention de coordonnées";
            break;
    }
} /// echec 

var carte;
// ------------------- 
function afficherCarte(latitude, longitude) {
    // --- Affiche une carte a latitude, longitude, zoom (De 1 a 20) 
    var coordonnees = new google.maps.LatLng(latitude, longitude);

    // --- Les options 
    var options = {
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        center: coordonnees
    };

    // --- La carte 
    carte = new google.maps.Map(document.getElementById("divMap"), options);
map = carte;

//    showMarker(latitude, longitude);

// This event listener will call addMarker() when the map is clicked.
//        map.addListener('click', function(event) {
//          addMarker(event.latLng);
//        });

map.addListener('click', function(e) {
clearMarkers();
});
        // Adds a marker at the center of the map.
        addMarker(coordonnees);
} /// getMap 

//function showMarker(latitude, longitude) {
//    // --- Affiche une carte a latitude, longitude, zoom (De 1 a 20) 
//    var coordonnees = new google.maps.LatLng(latitude, longitude);
//    // --- Un marqueur 
//    var marqueur = new google.maps.Marker({
//        map: carte,
//        position: coordonnees
//    });
//}


var map;
var markers = [];
// Adds a marker to the map and push to the array.
function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
    
    console.log(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}




// --- Au chargement 
window.onload = init; 