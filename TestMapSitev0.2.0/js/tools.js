var layerList = [
    foodOffenLayer,
    fontEauLayer,
    serv211Layer,
    incomeLayer
  ];

mainMap.createPane('tools');
mainMap.getPane('tools').style.zIndex = 250 

var tool = "";//Default tool is "select" which is used to select layers
toolSelect("select");

function toolSelect(toolIn){//used to toggle which tool is being selected
  if (tool != "select" || toolIn == "select"){
    tool = "select";//change back to select when the button is clicked again
    for (var i = 0; i< layerList.length; i++){
      if (mainMap.hasLayer(layerList[i])){
          layerList[i].setInteractive(true);
      }
    }
    
    toolBorderClear();
    document.getElementById("selectTool").style.border = "solid";
  }
  else{
    for (var i = 0; i< layerList.length; i++){
      if (mainMap.hasLayer(layerList[i])){
          layerList[i].setInteractive(false);
      }
    }
    tool = toolIn;
    toolBorderClear();
    if (toolIn == "radDist"){
      document.getElementById("distanceTool").style.border = "solid";
    }
  }
  console.log("Changed Tool: " + tool);
}

function toolBorderClear(){
  var toolDomList = document.getElementsByClassName("tool");
  for (var i = 0; i < toolDomList.length; i++) {
    toolDomList[i].style.border = "none";
  }
}

/*current tools:
select
radDist
*/

//Getting location of a click
//Helpful source: https://gis.stackexchange.com/questions/39055/getting-lat-long-of-clicked-location-using-leaflet-api

mainMap.on('click', function(e) {
  console.log("Clicked at: " + e.latlng.lat + ", " + e.latlng.lng)
  var clickLatLng = L.latLng(e.latlng.lat, e.latlng.lng);//new latLng object that is at the click point. 

  activeLayer = foodOffenLayer;//For testing we'll work with the foodOffenLayer. 

  if(tool == "radDist"){
    radDist(clickLatLng, activeLayer);
  }

  //==more clicky tools go here==

});