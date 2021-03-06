
function load211(_callback){
    console.log("Adding 211 Layers");
    //Loading the json data. It's being loaded into a preexisting layer using hte geojson.ajax. It could be loaded just using ajax but this allows for a layer to already to built
    var serv211Layer = L.geoJson.ajax(geojson_211,{
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, pointDataStyle);
        },
        onEachFeature: sort211Layers
    });

    //This function takes the layer that's in the geoJson and puts it in the appropriate grouplayer
    function sort211Layers(feature, layer){
        foodSecLayer.eachLayer(function (layerGroup) { 
            popup211(feature, layer, layerGroup);
        });
    }

    serv211Layer.on('data:loaded', function() {
        foodSecLayer.eachLayer(function (layer) { 
            console.log("Setting Color of "+layer.name);
            layer.setStyle({fillColor: layer.showColour});
        });
        _callback();
    })
    //This can perhaps be adapted into being more reusable for other geoJsons that have multiple subdatas in them
}

//function for loading a standard geojson point data file. 
//NOTE: all layers should be placed in a parent layer. No layers should be added directly to the map.
function loadPointGeoJSON(layerLoad, layerParent, popupFunc, _callback){
    //Adding Food Offenders Layer
    console.log("Adding "+layerLoad.name);
    
    layerLoad.addUrl(layerLoad.url);
    
    layerLoad.on('data:loaded', function() {
        if (layerParent == "None"){
            allLayers.addLayer(layerLoad)
        }
        else{
            layerParent.addLayer(layerLoad);
        }

        layerLoad.eachLayer(function (layer) { 
            popupFunc(layer.feature, layer);
        });

        layerLoad.setStyle({fillColor: layerLoad.showColour});

        _callback(layerLoad);
    });
}




