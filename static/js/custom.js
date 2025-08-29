// static/js/custom.js
window.addEventListener('load', function () {
    // Inject custom CSS for sidebar header color
    const customStyle = document.createElement('style');
    customStyle.innerHTML = `
        .sidebar-header, .leaflet-sidebar-header {
            background-color: #d32f2f !important; /* Rojo MIDIS */
            color: #fff !important;
        }
    `;
    document.head.appendChild(customStyle);

    const header = document.getElementById('visor-header');
    if (header && !header.querySelector('.vh-inner')) {
        header.innerHTML = `
            <div class="vh-inner" style="
                width: 100%; margin: 0; 
                display: flex; align-items: center; gap: 12px; 
                padding: 6px 12px; justify-content: flex-start;">
                <img src="static/img/LogoOficialMIDIS.jpg" alt="Logo del MIDIS"
                         style="height: 36px; flex: 0 0 auto; margin-right: 20px;">
                <div style="font-size:16px; font-weight:700; line-height:1.2;">
                    Visor MIDIS - Dirección General de Calidad de las Prestaciones Sociales
                </div>

                <div class="vh-actions" style="margin-left:auto; padding-right: 10px;">
                    <button class="vh-icon" data-pane="legend" title="Leyenda"><i class="fa fa-list"></i></button>
                    <button class="vh-icon" data-pane="layers" title="Capas"><i class="fa fa-layer-group"></i></button>
                    <button class="vh-icon" data-pane="basemaps" title="Mapas base"><i class="fa fa-map"></i></button>
                </div>
            </div>
        `;
    }

    // Ajusta altura del mapa en función del header
    const mapEl = document.getElementById('map');
    // Ajusta altura del mapa SOLO en load y resize de ventana
function resizeMap() {
    if (!mapEl || !header) return;
    const h = header.offsetHeight || 50;
    mapEl.style.height = `calc(100% - ${h}px)`;
    // Solo invalida el tamaño si map ya existe
    if (window.map && !window.sidebarRef?.isOpen) {
        setTimeout(() => map.invalidateSize(), 50);
    }
}
resizeMap();
window.addEventListener('resize', resizeMap);


    // Estado para saber qué pane está abierto
    let currentPane = null;

    // Click en los botones del header => abrir/cerrar panes del sidebar
    header?.addEventListener('click', (e) => {
        const btn = e.target.closest('.vh-icon');
        if (!btn) return;
        const pane = btn.dataset.pane; // legend | layers | basemaps
        if (window.sidebarRef && typeof window.sidebarRef.open === 'function' && typeof window.sidebarRef.close === 'function') {
            if (currentPane === pane && window.sidebarRef.isOpen) {
                window.sidebarRef.close();
                currentPane = null;
                btn.classList.remove('active');
            } else {
                window.sidebarRef.open(pane);
                // Quitar clase activa de todos los botones
                header.querySelectorAll('.vh-icon').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentPane = pane;
            }
        }
    });

    // Escuchar cuando el sidebar se cierra desde otro lugar para actualizar el icono
    if (window.sidebarRef && typeof window.sidebarRef.onClose === 'function') {
        window.sidebarRef.onClose(() => {
            header.querySelectorAll('.vh-icon').forEach(b => b.classList.remove('active'));
            currentPane = null;
        });
    }
    // Agregar escala
L.control
    .scale({
        imperial: false,
    })
    .addTo(map);
    map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a> &middot; <a href="https://github.com/zaideth">Zaideth Rios</a>');
var autolinker = new Autolinker({truncate: {length: 30, location: 'end'}});
});
