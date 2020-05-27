
//Arzen Chan
//May 25, 2020
//Applicable Documentation: https://docs.mapbox.com/mapbox-gl-js/example/data-driven-circle-colors/


mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ6ZW5jaGFuIiwiYSI6ImNqc2V5eDRnczBud3Y0YXFuZThhdDlucjgifQ.2wvGQ9Ok5wAZSVg5FRP06w';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 10,
  center: [-73.711284, 45.556205]
});

map.on('load', function(){
  var geojsonLocation = "FoodOffenders.geojson";
  map.addSource('source_id', { type: 'geojson', data: geojsonLocation});
  console.log("Loaded file from: "+geojsonLocation);
});