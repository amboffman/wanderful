/* eslint-disable no-unused-vars */
// Create the script tag, set the appropriate attributes
var script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyANGfz6tIVubimQkl95WE1Po7V1VvCBR-E&callback=initMap&libraries=places";
script.defer = true;
script.async = true;
// Attach your callback function to the `window` object
window.initMap = function() {
  // JS API is loaded and available
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

$("#search").on("click", function(event) {
  // preventing default behavior
  event.preventDefault();
  // store the user's search value as a variable
  var userInput = $(".uk-search-input")
    .val()
    .trim();
  findDestination(userInput);
});

function initMap() {
  var sydney = new google.maps.LatLng(-33.867, 151.195);

  map = new google.maps.Map(document.getElementById("map"), {
    center: sydney,
    zoom: 15
  });
}

function findDestination(search) {
  var request = {
    query: search,
    fields: ["name", "geometry", "place_id"]
  };
  var service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      getSearchDetails(results[0]);
    }
  });
}
function getSearchDetails(searchResults) {
  console.log(searchResults);
  const searchPlaceID = searchResults.place_id;
  var request = {
    placeId: searchPlaceID,
    fields: ["name", "formatted_address", "place_id", "geometry", "photos"]
  };

  service = new google.maps.places.PlacesService(map);
  service.getDetails(request, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var photos = place.photos;
      if (!photos) {
        return;
      }
      var photoURL = photos[0].getUrl({ maxWidth: 300, maxHeight: 300 });
      // pass(place, photoURL);
      console.log(place);
    }
  });
}
