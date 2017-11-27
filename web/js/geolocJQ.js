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
    
    var bounds = new google.maps.LatLngBounds(location);
    map.fitBounds(bounds);

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

// ---------------------- 
function obtenirLatEtLong(position) {
    // --- Latitude 
    var latitude = position.coords.latitude;
    // --- Longitude 
    var longitude = position.coords.longitude;
    // La Map 
//    afficherCarte(latitude, longitude);
    initMap(latitude, longitude);
} /// obtenirLatEtLong 

// ----------- 
function echec(erreur) {
    switch (erreur.code) {
        case erreur.TIMEOUT:
            navigator.geolocation.getCurrentPosition(obtenirLatEtLong, echec);
            break;
        case erreur.POSITION_UNAVAILABLE:
            $('#lblMessage').html("Position indisponible");
            break;
        case erreur.PERMISSION_DENIED:
            $('#lblMessage').html("Permission refusée");
            break;
        case erreur.UNKNOWN_ERROR:
            $('#lblMessage').html("Erreur inconnue");
            break;
        default:
            $('#lblMessage').html("Echec de l'obtention de coordonnées");
            break;
    }
} /// echec 

/**
 * 
 * @param {type} latitude
 * @param {type} longitude
 * @returns {undefined}
 */
function initMap(latitude, longitude) {
//    var m2iFormationParis = {lat: latitude, lng: longitude};
    var m2iFormationParis = new google.maps.LatLng(latitude, longitude);
    
    map = new google.maps.Map(document.getElementById('divMap'), {
        zoom: 17,
        center: m2iFormationParis,
//          mapTypeId: 'terrain',
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    addMarker(m2iFormationParis);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function handleInHover(e) {
    console.log(e);

    var lat = $(this).find('td:nth-child(2)').text();
    var long = $(this).find('td:nth-child(3)').text();
}

function handleOutHover() {
//    console.log($(this).text());    
}

$(document).ready(function () {
    // --- GEOLOCALISATION HTML5 
    if (navigator.geolocation) {
        // --- Demande de la position 
        // --- Cette methode prend en parametre 
        // --- une fonction de callback qu'elle va appeler 
        // --- en lui fournissant le parametre position contenant les coordonnees. 
        navigator.geolocation.getCurrentPosition(obtenirLatEtLong, echec);
    } else {
        $('#lblMessage').html("Votre navigateur ne gère pas la géolocalisation");
    }

    $('tbody tr').hover(handleInHover, handleOutHover);
});
