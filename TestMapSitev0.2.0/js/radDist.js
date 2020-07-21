//Distance Tool
var radDistLayer = L.layerGroup({pane: 'tools'});
var radDistCirc = L.circle({pane: 'tools'});

var radDistSlider = document.getElementById("distToolSlider");
var radDistDisplay = document.getElementById("distToolRad");
radDistDisplay.innerHTML = radDistSlider.value; // Display the default slider value

//Creating menu for selecting different layers
layerSelectGen("distDropDown", "distLayerChange(this.value)");

function distDropDown() {
    document.getElementById("distDropDown").classList.toggle("show");
}

//Initialize Defaults
document.getElementById("distDropBtn").value = layerList[0].name;//set the drop buttons to hold the value of the first layer. 
distLayerChange(layerList[0].name);

//function called when the active layer needs to be changed
function distLayerChange(layerName){
    var layer = layerSearchName(layerName);
    button = document.getElementById("distDropBtn");
    button.innerHTML = layer.name;
    button.value = layer.name;
    button.style.backgroundColor = layer.showColour;

    if (mainMap.hasLayer(radDistLayer)){//only change the values if the map has the layer on it. This prevents it from locking up if the slider is changed without a click
        radDist(clickLatLng, radDistSlider.value);
    }
}

// Update the current slider value (each time you drag the slider handle)
radDistSlider.oninput = function() {
    radDistDisplay.innerHTML = this.value;
    if (mainMap.hasLayer(radDistLayer)){//only change the values if the map has the layer on it. This prevents it from locking up if the slider is changed without a click
        radDist(clickLatLng, radDistSlider.value);
    }
}

function radDist(latLngIn, range = 1000){
    var inRadius = [];
    layerIn = layerSearchName(document.getElementById("distDropBtn").value);

    layerIn.eachLayer(function (layer){
        var dist = layer.getLatLng().distanceTo(latLngIn)
        if (dist <= range){
            inRadius.push({
                layer: layer, 
                distance: dist
            });
        }
    });

    //Reset Layers first
    radDistReset();

    //Adding circle
    radDistCirc = L.circle(latLngIn, {
        pane: 'tools',
        radius: range,
        color: 'red',
        fillColor: 'white',
        fillOpacity: 0.4
    }).addTo(mainMap);

    //Adding lines to different points
    for (var i=0; i<inRadius.length; i++){
        var line = L.polyline(
            [inRadius[i].layer.getLatLng(), latLngIn], 
            {
                pane: 'tools',
                color: 'hsl('+reverseNumber((inRadius[i].distance/range)*120, 0, 120)+', 90%, 60%)',
                opacity: 80
            });
        radDistLayer.addLayer(line);
    }
    radDistLayer.addTo(mainMap);
}

//function to clear all the lines drawn by this tool
function radDistReset(){
    radDistLayer.clearLayers();
    mainMap.removeLayer(radDistLayer)
    mainMap.removeLayer(radDistCirc)
}