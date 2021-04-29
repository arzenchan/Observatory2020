//Creating menu for selecting different layers
layerSelectGen("heatDropDown", "heatLayerChange(this.value)");

function heatDropDown() {
    document.getElementById("heatDropDown").classList.toggle("show");
}

//Initialize Defaults
//For reasons that I don't understand the layerIn.eachLayer in the heatmapGen function does not get properly called when running this default. But it works once the user clicks an option. 
//Have no idea why. But for that I'm leaving it as a default to force the user to pick an option. 
//document.getElementById("heatDropBtn").value = layerList[0].name;//set the drop buttons to hold the value of the first layer. 
//heatLayerChange(layerList[0].name);

var heatLayer;

function heatLayerChange(layerName){
    var reinstate = false;
    if (mainMap.hasLayer(heatLayer)){
        mainMap.removeLayer(heatLayer);
        reinstate = true;
    }
    var layer = layerSearchName(layerName);
    button = document.getElementById("heatDropBtn");
    button.innerHTML = layer.name;
    button.value = layer.name;
    button.style.backgroundColor = layer.showColour;

    heatmapGen(layer);
    if (reinstate){
        heatLayer.addTo(mainMap);
    }
}

function heatmapGen(layerIn){
    //Generating the array of points from the selected layer
    var pointArray = [];
    layerIn.eachLayer(function (layer){
        pointArray.push(layer.getLatLng());
    });
    //Making the layer
    heatLayer = L.heatLayer(pointArray, {radius: 25});
}

function heatmapShow(){
    if (mainMap.hasLayer(heatLayer)){
        mainMap.removeLayer(heatLayer);
    }
    heatLayer.addTo(mainMap);
}

function heatmapHide(){
    if (mainMap.hasLayer(heatLayer)){
        mainMap.removeLayer(heatLayer);
    }
}