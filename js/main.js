// Create the Leaflet map and center it on Boston
var map = L.map('map').setView([42.32, -71.06], 12);

// Add an OpenStreetMap basemap
var osmBasemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  subdomains: 'abcd',
  maxZoom: 20
}).addTo(map);

// Add a scale bar to the lower-left corner
L.control.scale({
  imperial: true,
  metric: true
}).addTo(map);

// Create layer groups to organize datasets
var neighborhoodsLayer = L.layerGroup().addTo(map);
var bikeLayer = L.layerGroup().addTo(map);
var parksLayer = L.layerGroup().addTo(map);


  // Load neighborhood polygon features
fetch('data/boston_neighborhoods_polygons.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

    L.geoJSON(data, {

      style: function(feature) {
        return {
          color: '#C9A227',
          weight: 1.5,
          opacity: 0.7,
          fillColor: '#E9C46A',
          fillOpacity: 0.12
        };
      },

      onEachFeature: function(feature, layer) {
        layer.bindPopup(
          '<strong>Neighborhood</strong><br>' +
          '<strong>Name:</strong> ' + (feature.properties.name || 'Unnamed') + '<br>' +
          '<strong>Area:</strong> ' + (feature.properties.sqmiles || 'N/A') + ' sq mi'
        );
      }

    }).addTo(neighborhoodsLayer);

  });


    // Load bike network line features
fetch('data/boston_bike_network_lines.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

    L.geoJSON(data, {

      style: function(feature) {
        return {
          color: '#264653',
          weight: 2.5,
          opacity: 0.9
        };
      },

      onEachFeature: function(feature, layer) {
        layer.bindPopup(
          '<strong>Bike segment</strong><br>' +
          '<strong>Street:</strong> ' + (feature.properties.STREET_NAM || 'Unnamed') + '<br>' +
          '<strong>Facility:</strong> ' + (feature.properties.ExisFacil || 'N/A') + '<br>' +
          '<strong>Installed:</strong> ' + (feature.properties.InstallDat || 'N/A')
        );
      }

    }).addTo(bikeLayer);

    bikeLayer.bringToFront();

  });


  // Load park point features
fetch('data/boston_park_features_points.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

    L.geoJSON(data, {

      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 5,
          color: '#005F56',
          fillColor: '#2A9D8F',
          fillOpacity: 0.9,
          weight: 1
        });
      },

      onEachFeature: function(feature, layer) {
        layer.bindPopup(
          '<strong>Park name</strong><br>' +
          (feature.properties.Park_Name || 'Unnamed')
        );
      }

    }).addTo(parksLayer).bringToFront();

  });


  // Create a simple legend control
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'legend');

  div.innerHTML =
    '<div><span class="legend-box neighborhoods"></span> Neighborhood boundaries</div>' +
    '<div><span class="legend-line bike"></span> Bike network</div>' +
    '<div><span class="legend-circle parks"></span> Park features</div>';

  return div;
};

// Add legend to the map
legend.addTo(map);


// Layer controls
var overlayMaps = {
  'Neighborhood boundaries': neighborhoodsLayer,
  'Bike network': bikeLayer,
  'Park features': parksLayer
};

L.control.layers(null, overlayMaps, {
  collapsed: true,
  position: 'topleft'
}).addTo(map);