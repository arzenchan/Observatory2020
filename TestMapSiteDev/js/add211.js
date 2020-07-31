

//Whole 211 Layer Adding. I have eliminted this because this needs to be divided up. 
//Adding 211 Layer
/*
console.log("Adding 211 Layer");
var serv211Layer = L.geoJson.ajax(geojson_211,{
  pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, Serv211Style);
  },
  onEachFeature: onEachFeature_211
});

serv211Layer.name = '211 Listed Services';
serv211Layer.toolable = true;
serv211Layer.showColour = "#3abf37";
serv211Layer.hideColour = "#8dd68e";

function onEachFeature_211(feature, layer) {
    if (feature.properties && feature.properties.description) {
        layer.bindPopup(
          '<h2>211 Listed Service</h2>'+
          'Name: '            +feature.properties.name+
          '<br>More Infomation to be added'   +
          '<br>Website: '     +feature.properties.description.AllFields.WebsiteAddress+
          '<br>Phone Number: '+feature.properties.description.AllFields.Phone1Number+
          '<br>Hours: '       +feature.properties.description.AllFields.HoursOfOperation+
          '<br>Eligibility: ' +feature.properties.description.AllFields.Eligibility
        );
    }
}
serv211Layer.addTo(mainMap);
*/