var initialView = map.getCenter();
var initialZoom = map.getZoom();

// Pilas para vistas anteriores y siguientes
var backStack = [];
var forwardStack = [];

function onMapMoveEnd() {
    backStack.push({ center: map.getCenter(), zoom: map.getZoom() });
    forwardStack = [];  // Limpiar la pila de vistas siguientes
}

// Añadir el manejador de eventos para cambio de vista
map.on('moveend', onMapMoveEnd);

// Añadir los botones a la barra de control
L.Control.HomeButton = L.Control.extend({
    onAdd: function(map) {
        var btn = L.DomUtil.create('button', 'leaflet-bar btns-control');
        btn.innerHTML = '🏠';
        btn.onclick = function() {
            map.setView(initialView, initialZoom);
        };
        return btn;
    },
    onRemove: function(map) {}
});

L.Control.BackButton = L.Control.extend({
    onAdd: function(map) {
        var btn = L.DomUtil.create('button', 'leaflet-bar');
        btn.innerHTML = '↩';
        btn.onclick = function() {
            if (backStack.length > 1) {
                forwardStack.push(backStack.pop());
                var view = backStack[backStack.length - 1];
                map.setView(view.center, view.zoom);
            }
        };
        return btn;
    },
    onRemove: function(map) {}
});

L.Control.ForwardButton = L.Control.extend({
    onAdd: function(map) {
        var btn = L.DomUtil.create('a', 'leaflet-bar');
        btn.innerHTML = '↪';
        btn.onclick = function() {
            if (forwardStack.length > 0) {
                var view = forwardStack.pop();
                map.setView(view.center, view.zoom);
                backStack.push(view);
            }
        };
        return btn;
    },
    onRemove: function(map) {}
});

// Añadir los controles al mapa
map.addControl(new L.Control.HomeButton({ position: 'topleft' }));
// map.addControl(new L.Control.BackButton({ position: 'topleft' }));
// map.addControl(new L.Control.ForwardButton({ position: 'topleft' }));
