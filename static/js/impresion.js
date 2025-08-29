document.getElementById('btnPrint').addEventListener('click', function () {
    // Crear un marcador temporal para el indicador de norte (solo para impresión)
    var northIcon = L.icon({
        iconUrl: 'static/img/norte.jpg', // Ruta del icono del norte
        iconSize: [30, 30], // Tamaño del icono
        iconAnchor: [15, 15], // Punto de anclaje
    });

    // Asegúrate de que el mapa y el contenido estén listos
    map.once('load', function () {
        // Crear un marcador y colocarlo en una posición fija, por ejemplo, en la esquina superior izquierda
        var northMarker = L.marker([map.getCenter().lat + 0.05, map.getCenter().lng], {
            icon: northIcon
        }).addTo(map);

        // Usar leaflet-image para generar una imagen del mapa
        leafletImage(map, function(err, canvas) {
            if (err) {
                console.error('Error al generar la imagen del mapa:', err);
                return;
            }

            // Convertir el canvas a un formato de imagen
            var mapImage = canvas.toDataURL();

            // Recoger las capas activas y generar la leyenda correspondiente
            var legendContent = '';
            overlaysTree.forEach(function(node) {
                if (map.hasLayer(node.layer)) {
                    legendContent += ` 
                        <div class="legend-block">
                            <h3>${node.label}</h3>
                        </div>
                    `;
                }
            });

            // Crear el documento PDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Añadir la imagen del mapa al PDF
            doc.addImage(mapImage, 'PNG', 10, 10, 180, 120); // X, Y, width, height
            doc.text('Visor de Información Geoespacial', 10, 150);

            // Añadir la leyenda al PDF
            doc.text('Leyenda:', 10, 160);
            let legendY = 170;
            overlaysTree.forEach(function(node) {
                if (map.hasLayer(node.layer)) {
                    doc.text(`${node.label}`, 10, legendY);
                    legendY += 10;
                }
            });

            // Guardar el PDF
            doc.save('mapa.pdf');

            // Remover el marcador del norte después de la impresión
            map.removeLayer(northMarker);
        });
    });
});
