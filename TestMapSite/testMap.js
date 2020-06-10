
//Arzen Chan
//June 8, 2020
var mainMap = L.map('mainMap').setView([45.556205, -73.711284], 11);

var geojson_Food_Offenders = "https://arzenchan.github.io/Observatory2020/TestMapSite/FoodOffenders.geojson";

//base tileset using MapBox
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXJ6ZW5jaGFuIiwiYSI6ImNqc2V5eDRnczBud3Y0YXFuZThhdDlucjgifQ.2wvGQ9Ok5wAZSVg5FRP06w'
}).addTo(mainMap);

var foodOffendersLayer = L.geoJson.ajax(geojson_Food_Offenders,{
  onEachFeature: onEachFeature
});
foodOffendersLayer.addTo(mainMap);

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.description) {
        layer.bindPopup(feature.properties.description);
    }
}