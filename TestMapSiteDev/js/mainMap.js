
//Arzen Chan
//June 5, 2020

//LOADING LAYERS
load211(function(){
  console.log("211 Data Loaded Successfully");
  
  //Last load in this cascade should call the generateLegend function
  loadPointGeoJSON(foodOffenLayer, foodSecLayer, foodOffendersPopup, function(layer){
    console.log(layer.name + " Data Loaded Successfully");
    loadPointGeoJSON(fontEauLayer, greenSpaceLayer, fontEauPopup, function(layer){
      console.log(layer.name + " Data Loaded Successfully")
      loadPointGeoJSON(urbanAgriLayer, foodSecLayer, urbanAgriPopup, function(layer){
        console.log(layer.name + " Data Loaded Successfully")
        generateLegend();
      });
    });
  });
});

//HIDDING/SHOWING LAYERS
function layerToggle(toToggle, divID){//for standard marker layers
  if(mainMap.hasLayer(toToggle)){
    mainMap.removeLayer(toToggle);
    //document.getElementById(divID).style.backgroundColor = toToggleStyle['hideColour'];
    //document.getElementById(divID).style.background = "repeating-linear-gradient(45deg, "+toToggle.showColour+","+toToggle.showColour+" 10px,"+toToggle.hideColour+" 10px, "+toToggle.hideColour+" 20px)";
    document.getElementById(divID).style.opacity = ".5";
  }
  else{
    toToggle.addTo(mainMap);
    //document.getElementById(divID).style.background = "initial";
    //document.getElementById(divID).style.backgroundColor = toToggle.showColour;
    document.getElementById(divID).style.opacity = "1";
  }
}

function choroToggle(toToggle, divID, legendID){//for chloropleth layers
  if(mainMap.hasLayer(toToggle)){
    mainMap.removeLayer(toToggle);
    //document.getElementById(divID).style.backgroundColor = toToggleStyle['hideColour'];
    //document.getElementById(divID).style.background = "repeating-linear-gradient(45deg, "+toToggle.showColour+","+toToggle.showColour+" 10px,"+toToggle.hideColour+" 10px, "+toToggle.hideColour+" 20px)";
    document.getElementById(divID).style.opacity = ".5";
    document.getElementById(legendID).style.display = "none";
  }
  else{
    toToggle.addTo(mainMap);
    //document.getElementById(divID).style.background = "initial";
    document.getElementById(divID).style.backgroundColor = toToggle.showColour;
    document.getElementById(divID).style.opacity = "1";
    document.getElementById(legendID).style.display = "block";
  }
}

//COLLAPSING IN THE LEGEND
function collapseSubLegend(layer){
  console.log(layer.varName+"SubLegend");
  $("#"+layer.varName+"SubLegend").slideToggle();
}

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
var serv211Layer;

//Adding Park Layer
//THIS NEEDS TO BE MOVED.
console.log("Adding Park Layer");
var parkLayer = L.geoJson.ajax(geojson_Parks,{
  style: parkStyle,
  onEachFeature: onEachFeature_Park, 
  pane: 'park'
});

parkLayer.name = 'Parks and Greenspace';
parkLayer.legName = 'Parks & Greenspaces';
parkLayer.varName = 'parkLayer';
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
greenSpaceLayer.addLayer(parkLayer);//TEMP

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
incomeLayer.type = "choro";
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
/*
var layerList = [
  foodOffenLayer,
  fontEauLayer,
  serv211Layer,
  parkLayer,
  incomeLayer
];
*/
//L.control.layers("",overlays).addTo(mainMap)
//This is the standard and built in version to show/hide layers








