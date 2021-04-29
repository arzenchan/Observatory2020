/*
Arzen Chan

This file generates the legend from the layers that are on the map. 
//NOTE: all layers should be placed in a parent layer. No layers should be added directly to the map. 
*/

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

        //For sortable lists: https://jqueryui.com/sortable/
        $( function() {
            $("#"+layerGroup.varName+"SubLegend").sortable({
                stop: function(event, ui) {
                    //Here we can change the value
                    //ui.item.index(); returns the value of the item that was just dragged. 
                }
            });
            $("#"+layerGroup.varName+"SubLegend").disableSelection();
        } );

        layerGroup.eachLayer(function (layer){
            console.log("Layer: "+layerGroup.name+" - "+layer.name);
            $("#"+layerGroup.varName+"SubLegend").append(""+legendButtonGen(layer));
        });
    });
    jscolor.install();
}

function legendButtonGen(layer){
    var layout; 
    
    if (layer.parent == true){
        layout =
        "<div class = \"option\" "+
        "id = \""+layer.varName+"Legend\" "+
        "style = \"background-color: "+layer.showColour+"\">"+
        "<input type=\"checkbox\" id=\""+layer.varName+"Box\" checked=\"checked\" onclick=\"layerToggle("+layer.varName+", '"+layer.varName+"Legend', true)\"></input>"+
        "<span class \"legend_name\"><span id='"+layer.varName+"Collapse' onclick = \"collapseSubLegend("+layer.varName+")\"><img src = \"img/arrow.png\" height=\"15px\"> </span>"+
            layer.legName+
        "</span><span class = \"legend_icons\">   <img src = \"img/colour_reset.png\" height=\"15px\" onclick = \"resetGroupColour("+layer.varName+")\">   "+
        "<img src = \"img/colour_tool.png\" id=\""+layer.varName+"ColBut\" height=\"18px\" data-jscolor=\"{"+
                "onInput:'changeGroupColour("+layer.varName+")', "+
                "valueElement:'#"+layer.varName+"ColIn'"+
                "}\"></img>"+
            "<input id=\""+layer.varName+"ColIn\" value=\""+layer.showColour+"\" name=\"colour"+layer.varName+"\" type=\"hidden\"></input>"+
            "</img></span></div>"+
        "<ul id=\""+layer.varName+"SubLegend\"></ul>";
        
    }
    else{
        layout =
        "<li class = \"option\" "+
        "id = \""+layer.varName+"Legend\" "+
        "style = \"background-color: "+layer.showColour+"; width: 80%\">"+//The 80% width indents. It's on the wrong side right now though
        "<input type=\"checkbox\" id=\""+layer.varName+"Box\" checked=\"checked\" onclick=\"layerToggle("+layer.varName+", '"+layer.varName+"Legend')\"></input>"+
        "<span class \"legend_name\">"+
            layer.legName+
            "</span><span class = \"legend_icons\">"+
            "<img src = \"img/colour_tool.png\" id=\""+layer.varName+"ColBut\" height=\"18px\" data-jscolor=\"{"+
                "onInput:'recolourLegend("+layer.varName+")', "+
                "onChange:'recolourLayer("+layer.varName+")', "+
                "valueElement:'#"+layer.varName+"ColIn'"+
                "}\"></img>"+
            "<input id=\""+layer.varName+"ColIn\" value=\""+layer.showColour+"\" name=\"colour"+layer.varName+"\" type=\"hidden\"></input>"+
            "</span></li>";
            //"</span><span class = \"legend_icons\"> <img src = \"img/colour_tool.png\" height=\"18px\" value = \"2CAFFE\" data-jscolor=\"{position:'right'}\"></img></span></div>";
    }
    return layout
}

/*
Old HTML for the legend buttons. This is useful as a template

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