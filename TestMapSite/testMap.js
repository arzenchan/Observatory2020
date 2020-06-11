
//Arzen Chan
//June 5, 2020
var mainMap = L.map('mainMap').setView([45.556205, -73.711284], 11);

//URLS
var geojson_Food_Offenders = "https://arzenchan.github.io/Observatory2020/TestMapSite/data/FoodOffenders.geojson";
var geojson_Water_Fountain = "https://arzenchan.github.io/Observatory2020/TestMapSite/data/FontEau.geojson"

//Base tileset using MapBox
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXJ6ZW5jaGFuIiwiYSI6ImNqc2V5eDRnczBud3Y0YXFuZThhdDlucjgifQ.2wvGQ9Ok5wAZSVg5FRP06w'
}).addTo(mainMap);

//HIDDING/SHOWING LAYERS
function layerToggle(toToggle, toToggleStyle, divID){
  if(toToggleStyle['shown']){
    mainMap.removeLayer(toToggle);
    document.getElementById(divID).style.backgroundColor = toToggleStyle['hideColour'];
    toToggleStyle['shown']=false;
  }
  else{
    toToggle.addTo(mainMap);
    document.getElementById(divID).style.backgroundColor = toToggleStyle['showColour'];
    toToggleStyle['shown']=true;
  }
}

//LAYER STYLES
var FoodOffenStyle = {
    radius: 3,
    fillColor: "#d92929",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
    
    //custom variables
    showColour: "#d92929",//colour of the dot and the legend
    hideColour: "#d68d8d",//colour of the legend when hidden
    shown: true
};
var FontEauStyle = {
    radius: 3,
    fillColor: "#3975c4",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
    
    //custom variables
    showColour: "#3975c4",
    hideColour: "#abc1de",
    shown: true
};

//ADDING LAYERS START
//Adding Food Offenders Layer
var foodOffenLayer = L.geoJson.ajax(geojson_Food_Offenders,{
  pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, FoodOffenStyle);
  },
  onEachFeature: onEachFeature_FoodOffen
});
function onEachFeature_FoodOffen(feature, layer) {
    if (feature.properties && feature.properties.description) {
        layer.bindPopup(
        'Établissement: '+feature.properties.etablissement+
        '<br>Propriétaire: '+feature.properties.proprietaire+
        '<br>Adresse: '+feature.properties.adresse+
        '<br>Catégorie: '+feature.properties.categorie+
        '<br>Description: '+feature.properties.description);
    }
}

foodOffenLayer.addTo(mainMap);

//Adding Water Fountain Layer
var fontEauLayer = L.geoJson.ajax(geojson_Water_Fountain,{
  pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, FontEauStyle);
  },
  onEachFeature: onEachFeature_FontEau
});
function onEachFeature_FontEau(feature, layer) {
    if (feature.properties && feature.properties.Nom_parc_lieu) {
        layer.bindPopup(feature.properties.Nom_parc_lieu);
    }
}

fontEauLayer.addTo(mainMap);

//ADDING LAYERS END

//Visibility Options
var overlays = {
  "Food Offenders" : foodOffenLayer,
  "Water Fountains" : fontEauLayer
}

//L.control.layers("",overlays).addTo(mainMap)
//This is the standard and built in version to show/hide layers








