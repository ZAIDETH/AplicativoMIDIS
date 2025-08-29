document.addEventListener('DOMContentLoaded', () => {
  // Toma la capa (intenta varias rutas por si ya existe global)
  const layer =
    window.layerProgramas ||
    window.layer_Programassociales_2 ||
    (typeof layer_Programassociales_2 !== 'undefined' ? layer_Programassociales_2 : null);

  if (!layer) {
    console.error("No encuentro la capa Programassociales_2. Expónla con window.layerProgramas = layer_Programassociales_2;");
    return;
  }

  // Inputs/datalist existentes (solo estos 3)
  const inputDepartamento = document.getElementById('filtroDepartamento');
  const inputProvincia    = document.getElementById('filtroProvincia');
  const inputDistrito     = document.getElementById('filtroDistrito');

  const listDepartamentos = document.getElementById('departamentosList');
  const listProvincias    = document.getElementById('provinciasList');
  const listDistritos     = document.getElementById('distritosList');

  const resultsContainer  = document.getElementById('queryResultsContainer');
  const resultsTableBody  = document.querySelector('#queryResultsTable tbody');

  // Obtener valores únicos respetando mayúsculas de tus campos
  function getUniqueValues(field) {
    const values = new Set();
    layer.eachLayer(l => {
      const val = l.feature?.properties?.[field];
      if (val !== undefined && val !== null && String(val).trim() !== '') {
        values.add(String(val));
      }
    });
    return Array.from(values).sort((a,b) => a.localeCompare(b, 'es', {sensitivity:'base'}));
  }

  function fillDatalists() {
    listDepartamentos.innerHTML = getUniqueValues('DEPARTAMENTO').map(v => `<option value="${v}">`).join('');
    listProvincias.innerHTML    = getUniqueValues('PROVINCIA').map(v => `<option value="${v}">`).join('');
    listDistritos.innerHTML     = getUniqueValues('DISTRITO').map(v => `<option value="${v}">`).join('');
  }
  fillDatalists();

  // Helpers de estilo (tu capa es poligonal con stroke:false → resaltar con fill)
  function clearStyles() {
    layer.eachLayer(l => {
      if (l.setStyle) l.setStyle({ fillColor: null, fillOpacity: 1, color: null, weight: 1 });
    });
  }
  function highlight(l) {
    if (l.bringToFront) l.bringToFront();
    if (l.setStyle) l.setStyle({ fillColor: '#ff0000', fillOpacity: 0.7 });
  }

  function executeQuery() {
    const depVal  = inputDepartamento.value.trim().toLowerCase();
    const provVal = inputProvincia.value.trim().toLowerCase();
    const distVal = inputDistrito.value.trim().toLowerCase();

    const results = [];

    layer.eachLayer(l => {
      const p = l.feature?.properties;
      if (!p) return;

      const matchDep  = !depVal  || (p.DEPARTAMENTO || '').toString().toLowerCase().includes(depVal);
      const matchProv = !provVal || (p.PROVINCIA    || '').toString().toLowerCase().includes(provVal);
      const matchDist = !distVal || (p.DISTRITO     || '').toString().toLowerCase().includes(distVal);

      if (matchDep && matchProv && matchDist) results.push(l);
    });

    // Limpiar tabla y estilos
    resultsTableBody.innerHTML = '';
    clearStyles();

    if (results.length === 0) {
      alert('No se encontraron resultados.');
      resultsContainer.style.display = 'none';
      return;
    }

    // Rellenar tabla (solo 3 columnas)
    results.forEach(l => {
      const p = l.feature.properties;
      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.innerHTML = `
        <td style="padding:6px; border-bottom:1px solid #eee;">${p.DEPARTAMENTO || ''}</td>
        <td style="padding:6px; border-bottom:1px solid #eee;">${p.PROVINCIA || ''}</td>
        <td style="padding:6px; border-bottom:1px solid #eee;">${p.DISTRITO || ''}</td>
      `;
      tr.addEventListener('click', () => {
        map.fitBounds(l.getBounds(), { padding: [20,20] });
        clearStyles();
        highlight(l);
        const txt = `<b>${p.DEPARTAMENTO || ''}</b><br>${p.PROVINCIA || ''} – ${p.DISTRITO || ''}`;
        if (l.bindPopup) l.bindPopup(txt).openPopup();
      });
      resultsTableBody.appendChild(tr);
    });

    resultsContainer.style.display = 'block';

    // Ir al primero
    const first = results[0];
    map.fitBounds(first.getBounds(), { padding: [20,20] });
    highlight(first);
    const pf = first.feature.properties;
    if (first.bindPopup) {
      first.bindPopup(`<b>${pf.DEPARTAMENTO || ''}</b><br>${pf.PROVINCIA || ''} – ${pf.DISTRITO || ''}`).openPopup();
    }
  }

  // Botones
  const btnExec = document.getElementById('btnQueryExecute');
  if (btnExec) btnExec.addEventListener('click', executeQuery);

  const btnClose = document.getElementById('closeQueryResults');
  if (btnClose) btnClose.addEventListener('click', () => {
    document.getElementById('queryPanel').style.display = 'none';
    resultsContainer.style.display = 'none';
    clearStyles();
  });
});
