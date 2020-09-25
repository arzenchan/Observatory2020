/*
Arzen Chan

This file contains all the functions that generate the popups for the various layers.
In it's current state they need to be manually coded because of formatting and relevant information
*/

function foodOffendersPopup(feature, layer){
    if (feature.properties && feature.properties.description) {
        layer.bindPopup(
        '<h2>Food Inspection Violation</h2>'+
        'Établissement: '+feature.properties.etablissement+
        '<br>Propriétaire: '+feature.properties.proprietaire+
        '<br>Adresse: '+feature.properties.adresse+
        '<br>Catégorie: '+feature.properties.categorie+
        '<br>Description: '+feature.properties.description);
    }
}

function fontEauPopup(feature, layer) {
    if (feature.properties && feature.properties.Nom_parc_lieu) {
        layer.bindPopup(
          '<h2>Water Fountain</h2>'+
          'Park: '+feature.properties.Nom_parc_lieu
        );
    }
}

function urbanAgriPopup(feature, layer) {
    if (feature.properties) {
        layer.bindPopup(
          '<h2>Urban Agriculture</h2>'+
          'Responses are listed as multiple choice answers to questions. <br>'+
          'These need to be labelled.'
        );
    }
}

function popup211(feature, layer, layerGroup) {
    if(feature.properties.field8.includes(layerGroup.code)){
        layer.bindPopup(
            '<h2>'+layerGroup.name+'</h2>'+
            'Name: '            +feature.properties.name+
            '<br>Eligibility: '     +feature.properties.description.AllFields.Eligibility+
            '<br>Hours: '           +feature.properties.description.AllFields.HoursOfOperation+
            '<br>Phone:'            +feature.properties.description.AllFields.Phone1Number+
            '<br>Website: '         +feature.properties.description.AllFields.WebsiteAddress+
            '<br>Taxonomy Codes: '  +feature.properties.field8+' <a href="https://211taxonomy.org/">What\'s this?</a>'
            );
        layerGroup.addLayer(layer);
    }
}
