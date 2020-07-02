
//Arzen Chan
//June 5, 2020
var mainMap = L.map('mainMap').setView([45.556205, -73.711284], 11);

//URLS
var geojson_Food_Offenders   = "https://arzenchan.github.io/Observatory2020/TestMapSite/data/FoodOffenders.geojson";
var geojson_Water_Fountain   = "https://arzenchan.github.io/Observatory2020/TestMapSite/data/FontEau.geojson"
var geojson_Income           = "https://arzenchan.github.io/Observatory2020/TestMapSite/data/Income.geojson"

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
function layerToggle(toToggle, toToggleStyle, divID){//for standard marker layers
  if(toToggleStyle['shown']){
    mainMap.removeLayer(toToggle);
    document.getElementById(divID).style.backgroundColor = toToggleStyle['hideColour'];
    //document.getElementById(divID).style.background = toToggleStyle['hideColour'];
    document.getElementById(divID).style.textDecoration = "line-through";
    toToggleStyle['shown']=false;
  }
  else{
    toToggle.addTo(mainMap);
    document.getElementById(divID).style.backgroundColor = toToggleStyle['showColour'];
    document.getElementById(divID).style.textDecoration = "none";
    toToggleStyle['shown']=true;
  }
}

function chloroToggle(toToggle, toToggleStyle, divID, legend){//for chloropleth layers
  if(toToggleStyle['shown']){
    mainMap.removeLayer(toToggle);
    document.getElementById(divID).style.backgroundColor = toToggleStyle['hideColour'];
    document.getElementById(divID).style.textDecoration = "line-through";
    document.getElementById(legend).style.display = "none";
    toToggleStyle['shown']=false;
    
  }
  else{
    toToggle.addTo(mainMap);
    document.getElementById(divID).style.backgroundColor = toToggleStyle['showColour'];
    document.getElementById(divID).style.textDecoration = "none";
    document.getElementById(legend).style.display = "block";
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
    fillOpacity: 1,
    
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
    fillOpacity: 1,
    
    //custom variables
    showColour: "#3975c4",
    hideColour: "#abc1de",
    shown: true
};

var IncomeTogStyle = {
    showColour: "#666666",
    hideColour: "#aaaaaa",
    shown: true
}

function incomeStyle(feature){
  var colour = getIncomeColour(feature.properties["Incomev2.csv.Med_Total_Inc"]);
  if (colour == 'NoData'){
    return {
      fillColor: "#000",
      color: "#000",
      weight: 1,
      fillOpacity: 0,
      opacity: 0
    };
  }
  else{
    return {
      fillColor: colour,
      color: "#000",
      weight: 1,
      fillOpacity: .85,
      opacity: 1
    };
  }
}

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


//Adding Income Layer
var incomeLayer = L.geoJson.ajax(geojson_Income,{
  style: incomeStyle,
  onEachFeature: onEachFeature_Income,
  pane: 'census'
  
});
function onEachFeature_Income(feature, layer) {
  if (feature.properties && feature.properties["Incomev2.csv.Med_Total_Inc"]) {
    layer.bindPopup("Median Income: $"+feature.properties["Incomev2.csv.Med_Total_Inc"]);
  }
  else{
    layer.bindPopup("Median Income: No Information");
  }
}

function getIncomeColour(input){
  if (input == null){//nodata
    return 'NoData'
  }
  else{
    i = parseInt((input/90000)*6);
    //https://colorbrewer2.org/
    return  i == 0 ? '#ffffff'://0-15k
            i == 1 ? '#cccccc'://15k-30k
            i == 2 ? '#999999'://30k-45k
            i == 3 ? '#666666'://45k-60k
            i == 4 ? '#333333'://60k-75k
                     '#000000';//>75k
    
    /*
    return  i == 0 ? '#a50026':
            i == 1 ? '#d73027':
            i == 2 ? '#f46d43':
            i == 3 ? '#fdae61':
            i == 4 ? '#fee090':
            i == 5 ? '#e0f3f8':
            i == 6 ? '#abd9e9':
            i == 7 ? '#74add1':
            i == 8 ? '#4575b4':
                     '#313695';
    */
  }
}

//creating pane for cesnsus information in order to ensure the census information is below the point data. 
mainMap.createPane('census');
mainMap.getPane('census').style.zIndex = 300 //point data is at 400
incomeLayer.addTo(mainMap);

//ADDING LAYERS END

//Visibility Options
var overlays = {
  "Food Offenders" : foodOffenLayer,
  "Water Fountains" : fontEauLayer,
  "Income": incomeLayer
}

//L.control.layers("",overlays).addTo(mainMap)
//This is the standard and built in version to show/hide layers








