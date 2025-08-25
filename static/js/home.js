var initialView = map.getCenter();  // Guarda las coordenadas del centro del mapa
var fixedZoom = 5;  // Ajusta el nivel de zoom para Home (puedes poner el valor que desees)

L.Control.HomeButton = L.Control.extend({
    onAdd: function(map) {
        var btn = L.DomUtil.create('button', 'leaflet-bar btns-control');  // Clase personalizada para el botón
        btn.innerHTML = '<i class="fa fa-home"></i>';  // Ícono FontAwesome
        btn.title = 'Volver a vista inicial';
        btn.onclick = function() {
            map.setView(initialView, fixedZoom);  // Vuelve a la vista inicial
        };
        return btn;
    },
    onRemove: function(map) {}
});

// Añadir el control al mapa
map.addControl(new L.Control.HomeButton({ position: 'topleft' }));
