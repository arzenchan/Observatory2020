

mainMap.createPane('tools');
mainMap.getPane('tools').style.zIndex = 300 

var tool = "";//Default tool is "select" which is used to select layers
toolSelect("select");

var clickLatLng;

function test(){
  $("ul").removeClass("ui-sortable");
  $("li").removeClass("ui-sortable-handle");
}

//===LAYER DERIVED TOOLS===
//Hiding/showing layers
function layerToggle(toToggle, divID, parent){//for standard marker layers
  if(mainMap.hasLayer(toToggle)){
    mainMap.removeLayer(toToggle);
    if (parent){//if the layer being toggled is a parent, then also affect the checkboxes of its children
      toToggle.eachLayer(function (layer){
        $("#"+layer.varName+"Box").prop("checked", false);
        $("#"+layer.varName+"Legend").css("opacity", ".5");
      });
    }
    //document.getElementById(divID).style.backgroundColor = toToggleStyle['hideColour'];
    //document.getElementById(divID).style.background = "repeating-linear-gradient(45deg, "+toToggle.showColour+","+toToggle.showColour+" 10px,"+toToggle.hideColour+" 10px, "+toToggle.hideColour+" 20px)";
    $("#"+divID).css("opacity", ".5");
  }
  else{
    toToggle.addTo(mainMap);
    //document.getElementById(divID).style.background = "initial";
    //document.getElementById(divID).style.backgroundColor = toToggle.showColour;
    if (parent){//if the layer being toggled is a parent, then also affect the checkboxes of its children
      toToggle.eachLayer(function (layer){
        $("#"+layer.varName+"Box").prop("checked", true);
        $("#"+layer.varName+"Legend").css("opacity", "1");
      });
    }
    $("#"+divID).css("opacity", "1");
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

//Collapsing in the legend
function collapseSubLegend(layer){
  console.log(layer.varName+"SubLegend");
  $("#"+layer.varName+"SubLegend").slideToggle();
}

//Recolouring
function recolourLegend(layerIn, parentCol){
  if (parentCol===undefined){//no parent colour, reset based on independant colour
    $("#"+layerIn.varName+"Legend").css('background-color', $("#"+layerIn.varName+"ColIn").val());
    recolourLayer(layerIn);
  }
  else{//change layer to parent colour
    $("#"+layerIn.varName+"Legend").css('background-color', parentCol);
    //no need to call the recolouring of the layer as the sub layers will already be recoloured
  }
}
function recolourLayer(layerIn){
  layerIn.setStyle({fillColor: $("#"+layerIn.varName+"ColIn").val()});
}
function changeGroupColour(parentLayer){
  recolourLegend(parentLayer);

  parentCol = $("#"+parentLayer.varName+"ColIn").val();
  parentLayer.eachLayer(function (layer){
    recolourLegend(layer, parentCol);
    $("#"+layer.varName+"ColBut").css("background-image", "none");
  });
}

function resetGroupColour(parentLayer){
  //This function resets the colours of the sublayers to their original defaults
  parentLayer.eachLayer(function (layer){
    $("#"+layer.varName+"ColIn").val(layer.showColour);
    recolourLegend(layer);

    //This is a work around. The better solution would be to have jscolor not change the background image of the paintbucket
    //Alternately, I'm thinking of removing the paintbucket and replacing it with a circle of the colour and use that as the recolout button. See what happens. 
    $("#"+layer.varName+"ColBut").css("background-image", "none");
  });
}

//===INDEPENDANT TOOLS===
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

