
//Arzen Chan
//June 5, 2020
var mainMap = L.map('mainMap').setView([45.556205, -73.711284], 11);

//URLS
var geojson_Food_Offenders   = "https://arzenchan.github.io/Observatory2020/TestMapSitev0.2.0/data/FoodOffenders.geojson";
var geojson_Water_Fountain   = "https://arzenchan.github.io/Observatory2020/TestMapSitev0.2.0/data/FontEau.geojson";
var geojson_Income           = "https://arzenchan.github.io/Observatory2020/TestMapSitev0.2.0/data/Income.geojson";
var geojson_211              = "https://arzenchan.github.io/Observatory2020/TestMapSitev0.2.0/data/211.geojson";
var geojson_Parks              = "https://arzenchan.github.io/Observatory2020/TestMapSitev0.2.0/data/GreenSpace.geojson";

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
function layerToggle(toToggle, divID){//for standard marker layers
  if(mainMap.hasLayer(toToggle)){
    mainMap.removeLayer(toToggle);
    //document.getElementById(divID).style.backgroundColor = toToggleStyle['hideColour'];
    document.getElementById(divID).style.background = "repeating-linear-gradient(45deg, "+toToggle.showColour+","+toToggle.showColour+" 10px,"+toToggle.hideColour+" 10px, "+toToggle.hideColour+" 20px)";
  }
  else{
    toToggle.addTo(mainMap);
    document.getElementById(divID).style.background = "initial";
    document.getElementById(divID).style.backgroundColor = toToggle.showColour;
  }
}

function choroToggle(toToggle, divID, legendID){//for chloropleth layers
  if(mainMap.hasLayer(toToggle)){
    mainMap.removeLayer(toToggle);
    //document.getElementById(divID).style.backgroundColor = toToggleStyle['hideColour'];
    document.getElementById(divID).style.background = "repeating-linear-gradient(45deg, "+toToggle.showColour+","+toToggle.showColour+" 10px,"+toToggle.hideColour+" 10px, "+toToggle.hideColour+" 20px)";
    document.getElementById(legendID).style.display = "none";
  }
  else{
    toToggle.addTo(mainMap);
    document.getElementById(divID).style.background = "initial";
    document.getElementById(divID).style.backgroundColor = toToggle.showColour;
    document.getElementById(legendID).style.display = "block";
  }
}

//LAYER STYLES
var FoodOffenStyle = {
  radius: 3,
  fillColor: "#d92929",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: .8,
};
var FontEauStyle = {
  radius: 3,
  fillColor: "#3975c4",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: .8,
};

var Serv211Style = {
  radius: 3,
  fillColor: "#3abf37",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: .8,
};

var parkStyle = {
  radius: 3,
  fillColor: "#339966",
  color: "#339966",
  weight: 1,
  opacity: .8,
  fillOpacity: .5,
}

var IncomeTogStyle = {
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
console.log("Adding Food Offender Layer");
var foodOffenLayer = L.geoJson.ajax(geojson_Food_Offenders,{
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, FoodOffenStyle);
  },
  onEachFeature: onEachFeature_FoodOffen
});

//adding custom keys
foodOffenLayer.name = 'Food Offenders';
foodOffenLayer.toolable = true;//for if this layer should be added to tool menus
foodOffenLayer.showColour= "#d92929";//colour of the dot and the legend
foodOffenLayer.hideColour= "#d68d8d";//colour of the legend when hidden

function onEachFeature_FoodOffen(feature, layer) {
    if (feature.properties && feature.properties.description) {
        layer.bindPopup(
        '<h2>Food Inspection Violation</h2>'+
        'Établissement: '+feature.properties.etablissement+
        '<br>Propriétaire: '+feature.properties.proprietaire+
        '<br>Adresse: '+feature.properties.adresse+
        '<br>Catégorie: '+feature.properties.categorie+
        '<br>Description: '+feature.properties.description);
    }
}

foodOffenLayer.addTo(mainMap);

//Adding Water Fountain Layer
console.log("Adding Water Fountain Layer");
var fontEauLayer = L.geoJson.ajax(geojson_Water_Fountain,{
  pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, FontEauStyle);
  },
  onEachFeature: onEachFeature_FontEau
});

fontEauLayer.name = 'Water Fountains';
fontEauLayer.toolable = true;
fontEauLayer.showColour = "#3975c4";
fontEauLayer.hideColour = "#abc1de";

function onEachFeature_FontEau(feature, layer) {
    if (feature.properties && feature.properties.Nom_parc_lieu) {
        layer.bindPopup(
          '<h2>Water Fountain</h2>'+
          'Park: '+feature.properties.Nom_parc_lieu
        );
    }
}
fontEauLayer.addTo(mainMap);

//Adding 211 Layer
console.log("Adding 211 Layer");
var serv211Layer = L.geoJson.ajax(geojson_211,{
  pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, Serv211Style);
  },
  onEachFeature: onEachFeature_211
});

serv211Layer.name = '211 Listed Services';
serv211Layer.toolable = true;
serv211Layer.showColour = "#3abf37";
serv211Layer.hideColour = "#8dd68e";

function onEachFeature_211(feature, layer) {
    if (feature.properties && feature.properties.description) {
        layer.bindPopup(
          '<h2>211 Listed Service</h2>'+
          'Name: '            +feature.properties.name+
          '<br>More Infomation to be added'   +
          '<br>Website: '     +feature.properties.description.AllFields.WebsiteAddress+
          '<br>Phone Number: '+feature.properties.description.AllFields.Phone1Number+
          '<br>Hours: '       +feature.properties.description.AllFields.HoursOfOperation+
          '<br>Eligibility: ' +feature.properties.description.AllFields.Eligibility
        );
    }
}
serv211Layer.addTo(mainMap);

//Adding Park Layer
console.log("Adding Park Layer");
var parkLayer = L.geoJson.ajax(geojson_Parks,{
  style: parkStyle,
  onEachFeature: onEachFeature_Park, 
  pane: 'park'
});

parkLayer.name = 'Parks and Greenspace';
parkLayer.toolable = false;
parkLayer.showColour = "#3abf37";
parkLayer.hideColour = "#8dd68e";

function onEachFeature_Park(feature, layer) {
  if (feature.properties) {
    layer.bindPopup(
      '<h2>Parks and Greenspaces</h2>'+
      'Name: '            +feature.properties.Nom
    );
  }
}
parkLayer.addTo(mainMap);

mainMap.createPane('park');
mainMap.getPane('park').style.zIndex = 295 //point data is at 400

//Adding Income Layer
console.log("Adding Income Layer");
var incomeLayer = L.geoJson.ajax(geojson_Income,{
  style: incomeStyle,
  onEachFeature: onEachFeature_Income,
  pane: 'census',
});

incomeLayer.name = 'Income';
incomeLayer.toolable = false;
incomeLayer.showColour = "#666666";
incomeLayer.hideColour = "#aaaaaa";

function onEachFeature_Income(feature, layer) {
  if (feature.properties && feature.properties["Incomev2.csv.Med_Total_Inc"]) {
    layer.bindPopup(
      '<h2>Income</h2>'+
      "Median Income: $"+feature.properties["Incomev2.csv.Med_Total_Inc"]
    );
  }
  else{
    layer.bindPopup(
      '<h2>Income</h2>'+
      "Median Income: No Information"
    );
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
mainMap.getPane('census').style.zIndex = 225 //point data is at 400
incomeLayer.addTo(mainMap);

//ADDING LAYERS END

//Lists of data

var layerList = [
  foodOffenLayer,
  fontEauLayer,
  serv211Layer,
  parkLayer,
  incomeLayer
];

//L.control.layers("",overlays).addTo(mainMap)
//This is the standard and built in version to show/hide layers








