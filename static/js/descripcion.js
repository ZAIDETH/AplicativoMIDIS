function agregarCuadroEstratificacion() {
    // Verificar si el sidebar ya existe
    if (!document.getElementById('infoSidebar')) {
        // Crear el contenedor de la barra lateral
        var sidebar = document.createElement('div');
        sidebar.id = 'infoSidebar';
        
        // Crear el botón de cierre de la barra lateral
        var closeButton = document.createElement('button');
        closeButton.classList.add('close-btn');
        closeButton.textContent = '×';
        closeButton.style.float = 'right';  // Alinear el botón a la derecha
        // closeButton.style.backgroundColor = '#f1f1f1';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '20px';
        closeButton.onclick = function() {
            toggleSidebar(); // Alternar para abrir/cerrar la barra lateral
        };

        // Crear el título de la barra lateral
        var title = document.createElement('h2');
        title.textContent = 'Estratificación de las Tipologías Territoriales de las Prestaciones Sociales';
        title.style.textAlign = 'center';  // Centrar el título
        title.style.fontSize = '12px';

        // Crear la tabla para los niveles
        var table = document.createElement('table');
        table.style.width = '100%';
        table.style.border = '1px solid #ddd';
        table.style.textAlign = 'justify';  // Alinear el texto a la izquierda
        table.style.overflowY = 'auto'; // Permitir scroll si el contenido es largo

        // Crear el encabezado de la tabla
        var thead = document.createElement('thead');
        var headerRow = document.createElement('tr');
        var headerCell1 = document.createElement('th');
        
        headerCell1.textContent = 'Tipo';
        headerCell1.style.backgroundColor = '#2a7bf4'; // Color de fondo del encabezado
        headerCell1.style.color = '#ffffff'; // Color del texto del encabezado
        headerCell1.style.textAlign = 'center'; // Centrar el texto del encabezado
        headerCell1.style.fontWeight = 'normal'; // Eliminar la negrita
        headerCell1.style.fontSize = '12px'; // Ajustar el tamaño de la fuente
        headerCell1.style.fontWeight = 'bold'; // Negrita para destacar el encabezado
        headerCell1.style.padding = '6px'; // Espaciado interno
        
        var headerCell2 = document.createElement('th');
        headerCell2.textContent = 'Descripción';
        headerCell2.style.backgroundColor = '#2a7bf4'; // Color de fondo del encabezado
        headerCell2.style.color = '#ffffff'; // Color del texto del encabezado
        headerCell2.style.textAlign = 'center'; // Centrar el texto del encabezado
        headerCell2.style.fontWeight = 'normal'; // Eliminar la negrita
        headerCell2.style.fontSize = '12px'; // Ajustar el tamaño de la fuente
        headerCell2.style.fontWeight = 'bold'; // Negrita para destacar el encabezado
        headerCell2.style.padding = '6px'; // Espaciado interno
        // Agregar las celdas del encabezado a la fila del encabezado
        headerRow.appendChild(headerCell1);
        headerRow.appendChild(headerCell2);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Crear el cuerpo de la tabla con las filas de los niveles
        var tbody = document.createElement('tbody');
        var levels = [
            { nivel: 'Tipología Territorial 1', descripcion: 'Concentración Muy Alta de Programas y densidad de usuarios. Mas de 500 personas con PE, concentración de 5 a más centros educativos, de 500 m de distancia al acceso vial. Pendientes de 25° a más o llanos, susceptibilidad muy alta a inundaciones, temperaturas mínimas históricas de -17 a -9°C.',color: 'rgba(230,0,0,1.0)' },
            { nivel: 'Tipología Territorial 2', descripcion: 'Concentración Alta de Programas y densidad de usuarios. De 50 a 500 personas con PE, concentración de 3 a 5 centros educativos, de 500 a 1 km de distancia al acceso vial. Pendientes menores a 1.5°, susceptibilidad alta a inundaciones, temperaturas mínimas históricas de -9 a 1°C.', color: 'rgba(255,170,0,1.0)' },
            { nivel: 'Tipología Territorial 3', descripcion: 'Concentración Media de Programas y densidad de usuarios. De 10 a 50 personas con PE, concentración de 2 a 3 centros educativos, de 1 a 2 km de distancia al acceso vial. Pendientes de 15 a 25°, susceptibilidad media a inundaciones, temperaturas mínimas históricas de 1 a 13°C.', color: 'rgba(122,182,245,1.0)' },
            { nivel: 'Tipología Territorial 4', descripcion: 'Concentración Baja de Programas y densidad de usuarios. Menos de 10 personas con PE, concentración de 2 centros educativos, de 2 a 3 km de distancia al acceso vial. Pendientes de 5 a 15°, susceptibilidad baja a inundaciones, temperaturas mínimas históricas de 13 a 15°C.', color:'rgba(250,250,138,1.0)' },
            { nivel: 'Tipología Territorial 5', descripcion: 'Concentración Muy Baja de Programas y densidad de usuarios. Personas dispersas con PE, centros educativos dispersos, de 3 a más de distancia al acceso vial. Pendientes de 1.5° a 5°, susceptibilidad muy baja a inundaciones, temperaturas mínimas históricas de 15°C a más.', color:'rgba(211,255,190,1.0)' },
        ];

        levels.forEach(function(level) {
            var row = document.createElement('tr');
            var cell1 = document.createElement('td');
            cell1.textContent = level.nivel;
            cell1.style.backgroundColor = level.color; // Color de fondo de la celda según la tipología
            cell1.style.color = '#000000ff'; // Color del texto para mejor contraste
            cell1.style.fontWeight = 'bold'; // Negrita para destacar
            cell1.style.textAlign = 'center';
            cell1.style.padding = '6px'; // Espaciado interno
            var cell2 = document.createElement('td');   
            cell2.textContent = level.descripcion;
            cell2.style.color = '#403f3fff'; // Color del texto para mejor contraste
            cell2.style.padding = '6px'; // Espaciado interno
            cell2.style.fontSize = '9px'; // Ajustar el tamaño de la fuente
            cell2.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; // Fondo blanco con opacidad
            row.appendChild(cell1);
            row.appendChild(cell2);
            tbody.appendChild(row);
        });

        // Agregar el cuerpo de la tabla al elemento de la tabla
        table.appendChild(tbody);

        // Agregar todos los elementos al sidebar
        sidebar.appendChild(closeButton);
        sidebar.appendChild(title);
        sidebar.appendChild(table);

        // Añadir el sidebar al cuerpo de la página
        document.body.appendChild(sidebar);

        // Crear y aplicar los estilos sin usar innerHTML
        var style = document.createElement('style');
        document.head.appendChild(style);

        style.textContent = `
            #infoSidebar {
                width: 350px;
                height: 100%;
                position: absolute;
                bottom: 0;
                left: -300px;  /* Oculto inicialmente */
                background-color: rgba(255, 255, 255, 0.9);
                padding: 10px;
                z-index: 999;
                box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
                transition: left 0.3s ease-in-out;
                overflow-y: auto; /* Agregar scroll si el contenido es largo */
            }
            #infoSidebar h2 {
                margin-top: 0;
                font-size: 10px;
                font-weight: bold;
            }
            #infoSidebar .close-btn {
                background-color: #f1f1f1;
                padding: 5px;
                border: none;
                font-size: 18px;
                cursor: pointer;
                text-align: right;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
                #descripcionCollapseContent {
                display: none;
                padding: 8px;
                font-size: 10px;
                transition: background-color 0.3s ease; /* Transición para suavizar el cambio de color */
                background-color: rgba(255, 255, 255, 0); /* Transparente por defecto */
            }

            #descripcionCollapseContent.open {
                display: block;
                background-color: #ffffff; /* Fondo blanco cuando está abierto */
            }
             /* Estilo responsivo */
            @media (max-width: 650px) {
                #infoSidebar {
                    width: 80%;  /* Más grande en pantallas pequeñas */
                }
            }   
        `;
    }



// Crear el botón para mostrar/ocultar el sidebar
    var sidebarToggleButton = document.createElement('button');
    // sidebarToggleButton.textContent = 'Estratificación';
    sidebarToggleButton.style.position = 'absolute';
    sidebarToggleButton.style.top = '10px';
    sidebarToggleButton.style.left = '10px';
    sidebarToggleButton.style.padding = '6px';
    sidebarToggleButton.style.backgroundColor = 'rgba(0, 123, 255, 0)';
    sidebarToggleButton.style.color = '#fff';
    sidebarToggleButton.style.border = 'none';
    sidebarToggleButton.style.fontSize = '14px';
    sidebarToggleButton.style.cursor = 'pointer';
    sidebarToggleButton.onclick = function() {
        toggleSidebar();  // Alterna la visibilidad del sidebar
    };

    // Añadir el botón al cuerpo de la página
    document.body.appendChild(sidebarToggleButton);
}

// Función para alternar la visibilidad del sidebar (toggle)
function toggleSidebar() {
    const sidebar = document.getElementById('infoSidebar');
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-350px'; // Ocultar el sidebar
    } else {
        sidebar.style.left = '0'; // Mostrar el sidebar
    }
}

// Llamar a la función para agregar el cuadro de estratificación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    agregarCuadroEstratificacion(); // Agrega el cuadro al cargar la página
});


/**
 * Crea un contenedor colapsable para la descripción, similar a "Lista de capas".
 */
function crearContenedorDescripcion() {
    // Verifica si ya existe el contenedor
    if (document.getElementById('descripcionCollapseContainer')) return;

    // Crear el contenedor principal
    var container = document.createElement('div');
    container.id = 'descripcionCollapseContainer';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.position = 'fixed';
    container.style.top = '35%';
    container.style.left = '0.5%';
    container.style.width = '320px';
    // container.style.background= 'rgba(255, 255, 255, 0.9)'; // Fondo blanco con opacidad
    // container.style.boxShadow = '2px 2px 8px rgba(0,0,0,0.2)';
    container.style.borderRadius = '6px 6px 0 0'; // Bordes redondeados en la parte superior
    container.style.zIndex = 1000;
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.transition = 'height 0.3s ease';  // Para animar el tamaño cuando se colapsa o expande
    container.style.maxHeight = '100%';
    container.style.overflowY = 'auto';
    

    // Crear el encabezado colapsable       
    var header = container.firstChild;
    var header = document.createElement('div');
    // header.style.background = '#2a7bf4';
    header.style.color = '#fff';
    header.style.padding = '10px 6px';
    header.style.cursor = 'pointer';
    header.style.fontWeight = 'bold';
    // header.textContent = 'Tipologías Territoriales';

    // Crear el contenido colapsable
    var content = document.createElement('div');
    content.id = 'descripcionCollapseContent';
    content.style.display = 'none';
    content.style.padding = '8px';
    content.style.fontSize = '10px';
    content.style.transition = 'background-color 0.3s ease';  // Suaviza el cambio de color
    content.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';  // Transparente por defecto
    content.style.borderRadius = '6px 6px 6px 6px'; // Bordes redondeados en la parte inferior
    content.style.maxHeight = '100%'; // Ajusta según lo que necesites
    content.style.overflowY = 'auto'; // Permitir scroll si el contenido es largo

    // Alternar visibilidad al hacer clic en el encabezado
    header.onclick = function() {
        content.classList.toggle('open'); // Agrega o quita la clase 'open'
    };

    // Agregar elementos al contenedor
    container.appendChild(header);
    container.appendChild(content);

    // Agregar el contenedor al body
    document.body.appendChild(container);
}

// Llama a la función al cargar el DOM
document.addEventListener('DOMContentLoaded', crearContenedorDescripcion);
/**
 * Mueve el contenido de agregarCuadroEstratificacion al contenedor colapsable de descripción.
 */
function moverContenidoEstratificacionADescripcion() {
    // Esperar a que ambos contenedores existan
    var descripcionContent = document.getElementById('descripcionCollapseContent');
    var sidebar = document.getElementById('infoSidebar');
    var header = document.getElementById('descripcionCollapseHeader'); // Agregar referencia al header
    if (!descripcionContent || !sidebar) return;

    // Limpiar el contenido anterior
    descripcionContent.innerHTML = '';

    // Verificar si ya se ha movido el contenido
    if (descripcionContent.hasChildNodes()) return; // No mover si ya tiene nodos

    // Mover el contenido relevante del sidebar al contenedor de descripción
    // Excluye el botón de cerrar y el propio sidebar
    Array.from(sidebar.childNodes).forEach(function(node) {
        if (!(node.classList && node.classList.contains('close-btn'))) {
            descripcionContent.appendChild(node.cloneNode(true));
        }
    });

    // Oculta el sidebar y el botón de toggle
    sidebar.style.display = 'none';
    var toggleBtn = Array.from(document.body.querySelectorAll('button')).find(btn => btn.textContent === 'Estratificación');
    if (toggleBtn) toggleBtn.style.display = 'none';
    // Ocultar el encabezado cuando el contenedor esté colapsado
    if (header) {
        header.style.display = 'block';
    }
// Asegúrate de que el contenido esté visible por defecto (expandido)
    if (descripcionContent.style.display === 'none') {
        descripcionContent.style.display = 'block';
    }
}



// Ejecutar después de cargar el DOM y los elementos
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(moverContenidoEstratificacionADescripcion, 100);
});

// Crear un botón flotante alineado a los controles (como el HomeButton)
function crearBotonEstratificacionControl() {
    // Evita duplicados
    if (document.getElementById('estratificacionControlBtn')) return;

    var btn = document.createElement('button');
    btn.id = 'estratificacionControlBtn';
    btn.title = 'Mostrar Tipologías Territoriales';
    btn.classList.add('btns-control');  // Aplicar la clase CSS personalizada
    btn.style.position = 'absolute';
    btn.style.top = '32%'; // Ajusta según la posición de tus controles
    // btn.style.left = '10px';
    // btn.style.zIndex = 1001;
    // btn.style.background = '#2a7bf4';
    // btn.stle.color = '#fff';
    // btn.style.border = 'none';
    btn.style.borderRadius = '4px 4px 0 0'; // Bordes redondeados en la parte superior
    btn.style.padding = '4px 4px';
    // btn.style.cursor = 'pointer';
    // btn.style.boxShadow = '1px 1px 6px rgba(0,0,0,0.15)';
    btn.style.fontSize = '13px';
    btn.style.width = '130px'; // Ancho del botón
    btn.style.display = 'inline-flex';
    btn.style.alignItems = 'left';// Alineación vertical del icono y texto
    btn.style.fontWeight =' bold'; // Negrita para destacar el texto
    btn.style.justifyContent = 'flex-start'; // Alineación horizontal del icono y texto
    btn.style.textAlign = 'left'; // Alineación del texto a la izquierda
    // btn.style.whiteSpace = 'nowrap'; // Evita que el texto se divida en varias líneas
    btn.innerHTML = '<span style="font-size:18px;vertical-align:middle;margin-right:6px;">&#128202;</span>Tipologías Territoriales';  // Ícono de gráfico de barras + texto

    btn.onclick = function() {
        var container = document.getElementById('descripcionCollapseContainer');
        var content = document.getElementById('descripcionCollapseContent');
        if (container && content) {
            // Si está oculto, mostrar y expandir
            content.style.display = (content.style.display === 'none') ? 'block' : 'none';
        }
    };

    document.body.appendChild(btn);
}

// Llama al crear el DOM
document.addEventListener('DOMContentLoaded', crearBotonEstratificacionControl);

L.Control.EstratificacionButton = L.Control.extend({
     onAdd: function() {
         var btn = L.DomUtil.create('button', 'leaflet-bar btns-control');  // Clase personalizada para el botón
         btn.innerHTML = '<span>Estratificación</span>';  // Nombre del botón
         btn.title = 'Mostrar Estratificación';
      
         // Estilo personalizado
        //  btn.style.padding = '10px';
        //  btn.style.backgroundColor = 'rgba(0, 123, 255, 0)';  // Color de fondo
        //  btn.style.color = '#ffffff';  // Color de texto
         btn.style.border = 'none';
         btn.style.borderRadius = '5px 5px 0 0'; // Bordes redondeados
         btn.style.cursor = 'pointer';
      
         // Acción al hacer clic
         btn.onclick = function() {
             var container = document.getElementById('descripcionCollapseContainer');
             var content = document.getElementById('descripcionCollapseContent');
             if (container && content) {
                 // Si está oculto, mostrar y expandir
                 content.style.display = (content.style.display === 'none') ? 'block' : 'none';
             }
         };

        return btn;
     },
     onRemove: function() {}
 });

// Añadir el control al mapa (en la parte superior izquierda, pero puedes ajustarlo a 'topleft', 'bottomleft', etc.)
map.addControl(new L.Control.EstratificacionButton({ position: 'topleft' }));
