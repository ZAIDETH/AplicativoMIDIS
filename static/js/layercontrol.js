var baseMaps = {
    "TOPO": layer_topo,
    "OpenStreetMap": layer_OpenStreetMap_0,
    "ESRI World Imagery": layer_EsriImagery
    
};

var overlayMaps = {
    "Distritos": layer_Distritos_Lima_1,
    "Pobreza en Mzs INEI": layer_PobrezaenMzINEI_2,
    "Riesgo Bajas temperaturas": layer_RiesgoBajasTemperaturas_3,
    "Mapa de Calor PGH 2024 Brechas": layer_MCHogaresPGH2024BrechasSJL_4,
    "Mapa de Calor Brechas de Atención PE": layer_MCBrechasPESJL_5,
    "Mapa de Calor Contigo PE": layer_MCContigoPESJL_6,
    "Mapa de Calor Juntos PE": layer_MCJuntosPESJL_7,
    "Mapa de Calor Pensión 65 PE": layer_MCPension65PESJL_8,
    "Mapa de Calor Hogares PGH PE": layer_MCPGHPESJL_9,
    "Escenario Pobreza Lima": layer_EscenarioPobrezaLima_D_10,
    "Hogares PGH 2024 - Brechas de Atención": layer_HogaresPGH2024BrechasAtencionSJL_11,
    "Hogares Juntos PE": layer_Juntos_SJL_12,
    "Hogares Contigo PE": layer_Contigo_SJL_13,
    "Hogares Brechas de Atención PE": layer_Brechas_SJL_14,
    "Hogares Pensión 65 PE": layer_HogaresconPension65PESJL_15,
    "Hogares PGH PE": layer_HogaresPGHPESJL_16,
};


var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);


map.on('overlayadd', function (eventLayer) {
    console.log(eventLayer);
});



// L.Control.CustomButtons = L.Control.Layers.extend({
//     // onAdd: function (map) {
//     //     this.initialize();
//     //     this._addMarker();
//     //     this._removeMarker();
//     //     this._update();
//     //     return this._container;
//     // },
//     // _addMarker: function () {
//     //     this.createButton("add", "add-button");
//     // },
//     // _removeMarker: function () {
//     //     this.createButton("remove", "remove-button");
//     // },
//     // createButton: function (type, className) {
//     //     const elements = this._container.getElementsByClassName(
//     //         "leaflet-control-layers-list"
//     //     );
//     //     const button = L.DomUtil.create(
//     //         "button",
//     //         `btn-markers ${className}`,
//     //         elements[0]
//     //     );
//     //     button.textContent = `${type} markers`;

//     //     L.DomEvent.on(button, "click", function (e) {
//     //         const checkbox = document.querySelectorAll(
//     //             ".leaflet-control-layers-overlays input[type=checkbox]"
//     //         );

//     //         // Remove/add all layer from map when click on button
//     //         [].slice.call(checkbox).map((el) => {
//     //             el.checked = type === "add" ? false : true;
//     //             el.click();
//     //         });
//     //     });
//     // },
// });

// Crear una instancia del control pero no añadirla al mapa
// const customControl = new L.Control.CustomButtons(null, overlayMaps, { collapsed: false });
// customControl.addTo(map);
// customControl.getContainer().style.display = 'none';

// Agregar el control al div existente
// document.getElementById('layer-control-container').appendChild(customControl.onAdd(map));