// static/js/consulta.js
document.addEventListener('DOMContentLoaded', () => {
  const layer =
    window.layerProgramas ||
    window.layer_Programassociales_2 ||
    (typeof layer_Programassociales_2 !== 'undefined' ? layer_Programassociales_2 : null);

  if (!layer) {
    console.error("No encuentro la capa Programassociales_2. Expónla con: window.layerProgramas = layer_Programassociales_2;");
    return;
  }

  const inputDepartamento = document.getElementById('filtroDepartamento');
  const inputProvincia    = document.getElementById('filtroProvincia');
  const inputDistrito     = document.getElementById('filtroDistrito');

  const listDepartamentos = document.getElementById('departamentosList');
  const listProvincias    = document.getElementById('provinciasList');
  const listDistritos     = document.getElementById('distritosList');

  const resultsContainer  = document.getElementById('queryResultsContainer');
  const resultsTableBody  = document.querySelector('#queryResultsTable tbody');

  const btnExec  = document.getElementById('btnQueryExecute');
  const btnClose = document.getElementById('closeQueryResults');

  // ========= helpers ==========
  function getUniqueValues(field) {
    const values = new Set();
    layer.eachLayer(l => {
      const v = l.feature?.properties?.[field];
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        values.add(String(v));
      }
    });
    return Array.from(values).sort((a,b) => a.localeCompare(b,'es',{sensitivity:'base'}));
  }

  function getUniqueProvinciasByDep(dep) {
    const values = new Set();
    layer.eachLayer(l => {
      const p = l.feature?.properties;
      if (!p) return;
      if (!dep || p.DEPARTAMENTO === dep) {
        if (p.PROVINCIA) values.add(String(p.PROVINCIA));
      }
    });
    return Array.from(values).sort((a,b)=>a.localeCompare(b,'es',{sensitivity:'base'}));
  }

  function getUniqueDistritos(dep, prov) {
    const values = new Set();
    layer.eachLayer(l => {
      const p = l.feature?.properties;
      if (!p) return;
      const okDep  = !dep  || p.DEPARTAMENTO === dep;
      const okProv = !prov || prov === 'Todas' || p.PROVINCIA === prov;
      if (okDep && okProv) {
        if (p.DISTRITO) values.add(String(p.DISTRITO));
      }
    });
    return Array.from(values).sort((a,b)=>a.localeCompare(b,'es',{sensitivity:'base'}));
  }

  function fillDatalistsInicial() {
    const deps = getUniqueValues('DEPARTAMENTO');
    listDepartamentos.innerHTML = deps.map(v => `<option value="${v}">`).join('');
    const provsAll = getUniqueProvinciasByDep('');
    listProvincias.innerHTML = ['Todas', ...provsAll].map(v => `<option value="${v}">`).join('');
    inputProvincia.value = 'Todas';
    const distsAll = getUniqueDistritos('', 'Todas');
    listDistritos.innerHTML = ['Todos', ...distsAll].map(v => `<option value="${v}">`).join('');
    inputDistrito.value = 'Todos';
  }
  fillDatalistsInicial();

  function clearStyles() {
    if (typeof layer.resetStyle === 'function') {
      layer.eachLayer(l => layer.resetStyle(l));
    } else {
      layer.eachLayer(l => {
        if (l.setStyle) l.setStyle({ fillColor: null, fillOpacity: 1, color: null, weight: 1 });
      });
    }
  }

  function highlight(l) {
    if (l.bringToFront) l.bringToFront();
    if (l.setStyle) l.setStyle({ fillColor: '#ff0000', fillOpacity: 0.65 });
  }

  // cascadas
  inputDepartamento.addEventListener('change', () => {
    const dep = inputDepartamento.value.trim();
    const provincias = getUniqueProvinciasByDep(dep);
    listProvincias.innerHTML = ['Todas', ...provincias].map(v => `<option value="${v}">`).join('');
    inputProvincia.value = 'Todas';
    const distritos = getUniqueDistritos(dep, 'Todas');
    listDistritos.innerHTML = ['Todos', ...distritos].map(v => `<option value="${v}">`).join('');
    inputDistrito.value = 'Todos';
  });

  inputProvincia.addEventListener('change', () => {
    const dep  = inputDepartamento.value.trim();
    const prov = inputProvincia.value.trim() || 'Todas';
    const distritos = getUniqueDistritos(dep, prov);
    listDistritos.innerHTML = ['Todos', ...distritos].map(v => `<option value="${v}">`).join('');
    inputDistrito.value = 'Todos';
  });

  // ejecutar consulta
  function executeQuery() {
    const depVal  = (inputDepartamento.value || '').trim().toLowerCase();
    const provVal = (inputProvincia.value || '').trim();
    const distVal = (inputDistrito.value  || '').trim();

    let results = [];

    layer.eachLayer(l => {
      const p = l.feature?.properties;
      if (!p) return;

      const dep  = (p.DEPARTAMENTO || '').toString();
      const prov = (p.PROVINCIA    || '').toString();
      const dist = (p.DISTRITO     || '').toString();

      const matchDep  = !depVal || dep.toLowerCase().includes(depVal);
      const matchProv = !provVal || provVal === 'Todas' || prov.toLowerCase().includes(provVal.toLowerCase());
      const matchDist = !distVal || distVal === 'Todos' || dist.toLowerCase().includes(distVal.toLowerCase());

      if (matchDep && matchProv && matchDist) results.push(l);
    });

    resultsTableBody.innerHTML = '';
    clearStyles();

    if (results.length === 0) {
      alert('No se encontraron resultados.');
      resultsContainer.style.display = 'none';
      return;
    }

    // ordenar por Programas descendente
    results.sort((a,b) => {
      const va = parseInt(a.feature?.properties?.Programas) || 0;
      const vb = parseInt(b.feature?.properties?.Programas) || 0;
      return vb - va;
    });

    results.forEach(l => {
      const p = l.feature.properties;
      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.innerHTML = `
        <td style="padding:6px; border-bottom:1px solid #eee;">${p.DEPARTAMENTO || ''}</td>
        <td style="padding:6px; border-bottom:1px solid #eee;">${p.PROVINCIA || ''}</td>
        <td style="padding:6px; border-bottom:1px solid #eee;">${p.DISTRITO || ''}</td>
        <td style="padding:6px; border-bottom:1px solid #eee; text-align:center;">${p.Programas || ''}</td>
      `;
      tr.addEventListener('click', () => {
        map.fitBounds(l.getBounds(), { padding: [20,20] });
        clearStyles();
        highlight(l);
        if (l.openPopup) l.openPopup(); // popup original
      });
      resultsTableBody.appendChild(tr);
    });

    resultsContainer.style.display = 'block';

    const group = L.featureGroup(results);
    const bounds = group.getBounds();
    if (bounds && bounds.isValid && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20,20] });
    }
    const first = results[0];
    highlight(first);
    if (first.openPopup) first.openPopup();
  }

  btnExec.addEventListener('click', executeQuery);

  btnClose.addEventListener('click', () => {
    document.getElementById('queryPanel').style.display = 'none';
    resultsContainer.style.display = 'none';
    clearStyles();
  });

  [inputDepartamento, inputProvincia, inputDistrito].forEach(inp => {
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeQuery();
      }
    });
  });
});

