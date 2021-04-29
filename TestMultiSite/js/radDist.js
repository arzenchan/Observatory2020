//Distance Tool
var radDistLayer = L.layerGroup({pane: 'tools'});
var radDistCirc = L.circle({pane: 'tools'});

var radDistSlider = document.getElementById("distToolSlider");
var radDistDisplay = document.getElementById("distToolRad");
radDistDisplay.innerHTML = radDistSlider.value + " m"; // Display the default slider value

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

    if (this.value <1000){
        radDistDisplay.innerHTML = this.value+" m";
    }
    else{
        radDistDisplay.innerHTML = (this.value/1000)+" km";
    }
    
    if (mainMap.hasLayer(radDistLayer)){//only change the values if the map has the layer on it. This prevents it from locking up if the slider is changed without a click
        radDist(clickLatLng, radDistSlider.value);
    }
}

function radDist(latLngIn, range = 1000){
    var inRadius = [];
    var totalPoints = 0;
    var totalDistance = 0;//Divide by totalPoints to get average distance
    var minDistance = range;

    layerIn = layerSearchName(document.getElementById("distDropBtn").value);

    //Getting points that are in the range specified
    layerIn.eachLayer(function (layer){
        var dist = layer.getLatLng().distanceTo(latLngIn)
        //testing if the point is in the range
        if (dist <= range){
            totalPoints++;
            totalDistance = totalDistance + dist;
            if (dist<minDistance){minDistance=dist;}
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

    //updating values in the info section
    document.getElementById("distNumber").innerHTML = totalPoints;
    if (totalPoints != 0){
        document.getElementById("distAvgDist").innerHTML = Math.round((totalDistance/totalPoints) * 100) / 100 + " m";
        document.getElementById("distNearDist").innerHTML = Math.round((minDistance) * 100) / 100 + " m";
    }
    else{
        document.getElementById("distAvgDist").innerHTML = "--";
        document.getElementById("distNearDist").innerHTML = "--";
    }
}

//function to clear all the lines drawn by this tool
function radDistReset(){
    radDistLayer.clearLayers();
    mainMap.removeLayer(radDistLayer)
    mainMap.removeLayer(radDistCirc)
}