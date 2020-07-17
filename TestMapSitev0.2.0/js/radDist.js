//Distance Tool
var radDistLayer = L.layerGroup({pane: 'tools'});
var radDistCirc = L.circle({pane: 'tools'});

function radDist(latLngIn, layerIn, range = 1000){
    var inRadius = [];
    layerIn.eachLayer(function (layer){
        if (layer.getLatLng().distanceTo(latLngIn) <= range){
            inRadius.push(layer);
        }
    });

    //Reset Layers first
    radDistReset();

    //Adding circle
    radDistCirc = L.circle(latLngIn, {
        pane: 'tools',
        radius: range,
        color: 'black',
        fillColor: 'white',
        fillOpacity: 0.4
    }).addTo(mainMap);

    //Adding lines to different points
    for (var i=0; i<inRadius.length; i++){
        var line = L.polyline(
            [inRadius[i].getLatLng(), latLngIn], 
            {
                pane: 'tools',
                color: 'black'
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