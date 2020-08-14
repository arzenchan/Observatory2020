/*
Arzen Chan

This file generates the legend from the layers that are on the map. 
//NOTE: all layers should be placed in a parent layer. No layers should be added directly to the map. 
*/

function generateLegend(){
    console.log("Generating legend");
    allLayers.eachLayer(function (layerGroup) { 
        console.log("Parent Layer: "+layerGroup.name);
        $("#layersOptions").append(""+legendButtonGen(layerGroup));

        layerGroup.eachLayer(function (layer){
            console.log("Layer: "+layerGroup.name+" - "+layer.name);
            $("#layersOptions").append(""+legendButtonGen(layer));
        });
    });
}

function legendButtonGen(layer){
    var layout; 
    
    if (layer.parent == true){
        layout =
        "<div class = \"option\" "+
        "id = \""+layer.legName+"Legend\" "+
        "style = \"background-color: "+layer.showColour+"\">"+
        "<a href=\"javascript:void(0)\" onclick=\"layerToggle("+layer.varName+", '"+layer.legName+"Legend')\">"+
            layer.legName+
        "</a></div>";
    }
    else{
        layout =
        "<div class = \"option\" "+
        "id = \""+layer.legName+"Legend\" "+
        "style = \"background-color: "+layer.showColour+"; width: 80%\">"+
        "<a href=\"javascript:void(0)\" onclick=\"layerToggle("+layer.varName+", '"+layer.legName+"Legend')\">"+
            layer.legName+
        "</a></div>";
    }
    return layout
}

/*
Old HTML for the buttons. This is useful as a template

<div class = "option" id = "foodOffLeg" style="background-color: #d92929">
<a href="javascript:void(0)" onclick="layerToggle(foodOffenLayer, 'foodOffLeg')">
    Food Offences
</a>
</div>
<div class = "option" id = "fontEauLeg" style="background-color: #3975c4">
<a href="javascript:void(0)" onclick="layerToggle(fontEauLayer, 'fontEauLeg')">
    Water Fountains
</a>
</div>
<div class = "option" id = "211Leg" style="background-color: #3abf37">
<a href="javascript:void(0)"> 
    211 Listed Services
</a>
</div>
<div class = "option" id = "parcLeg" style="background-color: #3abf37">
<a href="javascript:void(0)" onclick="layerToggle(parkLayer, 'parcLeg')">
    Parks and Greenspaces
</a>
</div>


<p>-->
*/