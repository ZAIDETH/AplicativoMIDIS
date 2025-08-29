function imprimirMapa() {
    // Crear ventana de impresión
    var printWindow = window.open('', '', 'width=800,height=600');

    // Asegúrate de que el mapa y el contenido estén listos
    setTimeout(function() {
        // Obtener la imagen del mapa (esto debe estar listo en el momento adecuado)
        var mapImage = document.getElementById('map').toDataURL();

        // Recoger las capas activas y generar la leyenda correspondiente
        var legendContent = '';
        overlaysTree.forEach(function(node) {
            // Verificar si la capa está activa en el mapa
            if (map.hasLayer(node.layer)) {
                // Si está activa, agregar la leyenda correspondiente
                legendContent += `
                    <div class="legend-block">
                        <h3>${node.label}</h3>
                    </div>
                `;
            }
        });

        // Crear contenido para la ventana de impresión
        var content = `
            <html>
                <head>
                    <title>Imprimir Mapa</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .map-container { width: 100%; height: 80%; border: 1px solid #ddd; margin-bottom: 20px; }
                        .legend-container { font-size: 12px; }
                    </style>
                </head>
                <body>
                    <h2>Visor de Información Geoespacial</h2> <!-- Título ajustado -->
                    <div class="map-container">
                        <img src="${mapImage}" alt="Mapa" style="width: 100%; height: auto;">
                    </div>
                    <div class="legend-container">
                        <h3>Leyenda</h3>
                        ${legendContent}
                    </div>
                </body>
            </html>
        `;

        // Escribir el contenido en la ventana de impresión
        printWindow.document.open();
        printWindow.document.write(content);
        printWindow.document.close();
        
        // Iniciar la impresión
        printWindow.print();
    }, 500); // Asegúrate de que el contenido esté listo antes de intentar obtener la imagen
}

// Llamar la función de impresión cuando el botón de impresión sea presionado
document.getElementById('btnPrint').addEventListener('click', imprimirMapa);
