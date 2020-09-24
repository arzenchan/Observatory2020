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
    if (feature.properties && feature.properties.Nom_parc_lieu) {
        layer.bindPopup(
          '<h2>Urban Agriculture</h2>'+
          'Responses are listed as multiple choiceanswers to questions. <br>'+
          'These need to be labelled.'
        );
    }
}
