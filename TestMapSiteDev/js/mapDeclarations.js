/*
Arzen Chan

This file is primarily to declare all the properties of the different layers and allow them to be used freely by all the scripts that follow
Also, this creates a uniform place for future layers to be declared
Layers are NOT POPULATED in this file. That is done in layerLoading.js
*/

//NOTE: all layers should be placed in a parent layer. No layers should be added directly to the map.

//MAP
var mainMap = L.map('mainMap').setView([45.556205, -73.711284], 11);
//Base tileset using MapBox
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXJ6ZW5jaGFuIiwiYSI6ImNqc2V5eDRnczBud3Y0YXFuZThhdDlucjgifQ.2wvGQ9Ok5wAZSVg5FRP06w'
}).addTo(mainMap);

//URLS
var geojson_Food_Offenders   = "https://arzenchan.github.io/Observatory2020/TestMapSitev0.2.0/data/FoodOffenders.geojson";
var geojson_Water_Fountain   = "https://arzenchan.github.io/Observatory2020/TestMapSitev0.2.0/data/FontEau.geojson";
var geojson_Income           = "https://arzenchan.github.io/Observatory2020/TestMapSitev0.2.0/data/Income.geojson";
var geojson_211              = "https://arzenchan.github.io/Observatory2020/data/211.geojson";
var geojson_Parks            = "https://arzenchan.github.io/Observatory2020/TestMapSitev0.2.0/data/GreenSpace.geojson";
var geojson_Urban_Agri       = "https://arzenchan.github.io/Observatory2020/data/UrbanAgri.geojson";

//LAYER STYLES
var pointDataStyle = {
    radius: 3,
    fillColor: "black",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: .8,
  }

const allLayers = L.featureGroup({});//layer group that holds the ALL LAYERS ON THE MAP. This acts as a container for all the sub layers
allLayers.addTo(mainMap);

//-------------
//PARENT LAYERS
//-------------
var foodSecLayer = L.featureGroup({});//layer group that holds the food security layers
foodSecLayer.name = 'Food Security';
foodSecLayer.legName = foodSecLayer.name;
foodSecLayer.varName = 'foodSecLayer';
foodSecLayer.showColour = "#a23f3f";
foodSecLayer.hideColour = "#c27575";
foodSecLayer.parent = true;
allLayers.addLayer(foodSecLayer);

var greenSpaceLayer = L.featureGroup({});//layer group that holds the green space layers
greenSpaceLayer.name = 'Green Space';
greenSpaceLayer.legName = greenSpaceLayer.name;
greenSpaceLayer.varName = 'greenSpaceLayer';
greenSpaceLayer.showColour = "#338a36";
greenSpaceLayer.hideColour = "#55b958";
greenSpaceLayer.parent = true;
allLayers.addLayer(greenSpaceLayer);

//--------------------
//FOOD SECURITY LAYERS
//--------------------
//211 LAYERS - These layers are special as they have a .code key which is neccesary for them to be sorted
var foodEmerLayer = L.featureGroup({});
foodEmerLayer.code = "BD-1800";
foodEmerLayer.name = 'Food: Emergency Food';
foodEmerLayer.legName = 'Emergency Food';
foodEmerLayer.varName = 'foodEmerLayer';
foodEmerLayer.toolable = true;
foodEmerLayer.showColour = "#fba209";
foodEmerLayer.hideColour = "#f7ce87";
foodSecLayer.addLayer(foodEmerLayer);

var foodColcLayer = L.featureGroup({});
foodColcLayer.code = "BD-1875";
foodColcLayer.name = 'Food: Food Collection and Storage';
foodColcLayer.legName = 'Collection & Storage';
foodColcLayer.varName = 'foodColcLayer';
foodColcLayer.toolable = true;
foodColcLayer.showColour = "#fbfb13";
foodColcLayer.hideColour = "#fcfc9c";
foodSecLayer.addLayer(foodColcLayer);

var foodOutlLayer = L.featureGroup({});
foodOutlLayer.code = "BD-2400"
foodOutlLayer.name = 'Food: Food Outlets';
foodOutlLayer.legName = 'Food Outlets';
foodOutlLayer.varName = 'foodOutlLayer';
foodOutlLayer.toolable = true;
foodOutlLayer.showColour = "#c50277";
foodOutlLayer.hideColour = "#e392c2";
foodSecLayer.addLayer(foodOutlLayer);

var foodProdLayer = L.featureGroup({});
foodProdLayer.code = "BD-2600";
foodProdLayer.name = 'Food: Food Production';
foodProdLayer.legName = 'Food Production';
foodProdLayer.varName = 'foodProdLayer';
foodProdLayer.toolable = true;
foodProdLayer.showColour = "#8738f5";
foodProdLayer.hideColour = "#c1a1ed";
foodSecLayer.addLayer(foodProdLayer);

var foodMealLayer = L.featureGroup({});
foodMealLayer.code = "BD-5000";
foodMealLayer.name = 'Food: Meals';
foodMealLayer.legName = 'Meals';
foodMealLayer.varName = 'foodMealLayer';
foodMealLayer.toolable = true;
foodMealLayer.showColour = "#8e632e";
foodMealLayer.hideColour = "#b79771";
foodSecLayer.addLayer(foodMealLayer);

//Food offenders layer
//Individual addition
var foodOffenLayer = L.geoJson.ajax({
  pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, pointDataStyle);
  },
});
foodOffenLayer.name = 'Food Offenders';
foodOffenLayer.legName = foodOffenLayer.name;
foodOffenLayer.varName = 'foodOffenLayer';
foodOffenLayer.toolable = true;//for if this layer should be added to tool menus
foodOffenLayer.showColour= "#d92929";//colour of the dot and the legend
foodOffenLayer.hideColour= "#d68d8d";//colour of the legend when hidden
foodOffenLayer.url = geojson_Food_Offenders;

//Urban Agriculture layer
//Individual addition
var urbanAgriLayer = L.geoJson.ajax({
  pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, pointDataStyle);
  },
});
urbanAgriLayer.name = 'Urban Agriculture';
urbanAgriLayer.legName = urbanAgriLayer.name;
urbanAgriLayer.varName = 'urbanAgriLayer';
urbanAgriLayer.toolable = true;//for if this layer should be added to tool menus
urbanAgriLayer.showColour= "#a7d661";//colour of the dot and the legend
urbanAgriLayer.hideColour= "#dfedca";//colour of the legend when hidden
urbanAgriLayer.url = geojson_Urban_Agri;

//----------------
//GREESPACE LAYERS
//----------------

//Water Fountains layer
//Individual addition
var fontEauLayer = L.geoJson.ajax({
  pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, pointDataStyle);
  },
});
fontEauLayer.name = 'Water Fountains';
fontEauLayer.legName = fontEauLayer.name;
fontEauLayer.varName = 'fontEauLayer';
fontEauLayer.toolable = true;
fontEauLayer.showColour = "#3975c4";
fontEauLayer.hideColour = "#abc1de";
fontEauLayer.url = geojson_Water_Fountain;

//TO BE MOVED