

mainMap.createPane('tools');
mainMap.getPane('tools').style.zIndex = 300 

var tool = "";//Default tool is "select" which is used to select layers
toolSelect("select");

var clickLatLng;

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
    //more tools here
  }
  console.log("Changed Tool: " + tool);
}

function toolBorderClear(){
  var toolDomList = document.getElementsByClassName("tool");
  for (var i = 0; i < toolDomList.length; i++) {
    toolDomList[i].style.borderColor = "#efe9e1";
  }
}

//DROP DOWN MENU FOR LAYER SELECTION IN TOOLS
//based upon https://www.w3schools.com/howto/howto_js_dropdown.asp
function layerSelectGen(dropDownID, functionCall){//function for generating the dropdown for selecting the layer a tool is applied to. Source: https://stackoverflow.com/questions/8674618/adding-options-to-select-with-javascript
  var dropdown = document.getElementById(dropDownID);

  for (var i = 0; i<layerList.length; i++){
    if(layerList[i].toolable){
      var option = document.createElement('a');

      option.value = layerList[i].name;
      option.innerHTML = layerList[i].name;
      option.href = "javascript:void(0)";
      option.setAttribute( "onClick", functionCall);
      option.style.backgroundColor = layerList[i].showColour;
      dropdown.appendChild(option);
    }
  }
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//function for swapping the numbers in a range. This is to change which direction colours change towards
function reverseNumber(num, min, max) {
  return (max + min) - num;
}

//Function for finding a layer by the name of the layer. This was first created to be used when a layer is selected for a tool. 
function layerSearchName(nameIn){
  for (var i = 0; i< layerList.length; i++){
    if (layerList[i].name == nameIn){
      return layerList[i];
    }
  }
  console.log("Error: Could not find layer with the name: "+ nameIn)
}

//Getting location of a click
//Helpful source: https://gis.stackexchange.com/questions/39055/getting-lat-long-of-clicked-location-using-leaflet-api
mainMap.on('click', function(e) {
  console.log("Clicked at: " + e.latlng.lat + ", " + e.latlng.lng)
  clickLatLng = L.latLng(e.latlng.lat, e.latlng.lng);//new latLng object that is at the click point. 

  if(tool == "radDist"){
    radDist(clickLatLng, radDistSlider.value);
  }

  //==more clicky tools go here==

});