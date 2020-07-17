var layerList = [
    foodOffenLayer,
    fontEauLayer,
    serv211Layer,
    incomeLayer
  ];

mainMap.createPane('tools');
mainMap.getPane('tools').style.zIndex = 250 

var tool = "select";//Default tool is "select" which is used to select layers

function toolSelect(toolIn){//used to toggle which tool is being selected
  if (tool != "select"){
    tool = "select";//change back to select when the button is clicked again
    for (var i = 0; i< layerList.length; i++){
      if (mainMap.hasLayer(layerList[i])){
          layerList[i].setInteractive(true);
      }
    }
  }
  else{
    for (var i = 0; i< layerList.length; i++){
      if (mainMap.hasLayer(layerList[i])){
          layerList[i].setInteractive(false);
      }
    }
    tool = toolIn;
  }
  console.log("Changed Tool: " + tool);
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