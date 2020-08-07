
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
            if(feature.properties.field8.includes(layerGroup.code)){
                layer.bindPopup(
                    '<h2>'+layerGroup.name+'</h2>'+
                    'Name: '            +feature.properties.name
                    );
                layerGroup.addLayer(layer);
            }
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
function loadPointGeoJSON(layerLoad, layerParent, popupFunc, _callback){
    //Adding Food Offenders Layer
    console.log("Adding "+layerLoad.name);
    console.log(layerLoad.url);

    var geoJsonLayer = L.geoJson.ajax(layerLoad.url,{
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, pointDataStyle);
        },
        onEachFeature: onEachFeature_Load
    });

    function onEachFeature_Load(feature, layer) {
        popupFunc(feature, layer);
    }
    console.log(geoJsonLayer);
    geoJsonLayer.on('data:loaded', function() {
        layerLoad = Object.assign(geoJsonLayer, layerLoad);
        layerLoad.setStyle({fillColor: layerLoad.showColour});
        if (layerParent == "None"){
            allLayers.addLayer(layerLoad)
        }
        else{
            layerParent.addLayer(layerLoad);
        }
        _callback(layerLoad);
    });
}



