
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
  var geojson_Food_Offenders = "https://arzenchan.github.io/Observatory2020/TestMapSite/FoodOffenders.geojson";
  map.addSource('Food_Offenders', { type: 'geojson', data: geojson_Food_Offenders});
  console.log("Loaded file from: "+geojson_Food_Offenders);
  
  //---Food Offenders Layer---//
    map.addLayer({
      'id': 'Food_Offenders',
      'type': 'circle',
      'source': 'Food_Offenders',
      'layout': {},
      'paint': {
        'circle-radius': 5,
        'circle-color': '#3887be'
      }
    });
    
    //https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/

    //Food Offenders Click
    map.on('click', 'Food_Offenders', function(e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;
       
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
       
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });
    
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'Food_Offenders', function() {
      map.getCanvas().style.cursor = 'pointer';
    });
     
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'Food_Offenders', function() {
      map.getCanvas().style.cursor = '';
    });
  //--Food Offenders Layer End---//
  
  
});