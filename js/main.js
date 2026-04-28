// Create the Leaflet map and center it on Boston
var map = L.map('map').setView([42.36, -71.06], 12);

// Add an OpenStreetMap basemap
var osmBasemap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Add the basemap to the map
osmBasemap.addTo(map);

// Add a scale bar to the lower-left corner
L.control.scale({
  imperial: true,
  metric: true
}).addTo(map);

// Create layer groups to organize datasets
var parksLayer = L.layerGroup().addTo(map);
var bikeLayer = L.layerGroup().addTo(map);
var neighborhoodsLayer = L.layerGroup().addTo(map);

// Load park point features
fetch('data/boston_park_features_points.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

    // Convert GeoJSON into Leaflet layer
    L.geoJSON(data, {

      // Style points as circle markers
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 5,
          color: '#264653',
          fillColor: '#2A9D8F',
          fillOpacity: 0.8,
          weight: 1
        });
      },

      // Add popup using attribute data
      onEachFeature: function(feature, layer) {
        layer.bindPopup(
          '<strong>Park Feature</strong><br>' +
          (feature.properties.Park_Name || 'Unnamed')
        );
      }

    }).addTo(parksLayer);

  });