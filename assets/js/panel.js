document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("panelTableBody");

  // URL del Web App desplegado desde Apps Script (asegúrate que sea el correcto y con permisos públicos)
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxv_Uauk82p7kgnejl-tPHuvt6X9qpIi_Ma36kyssMuRvZBTroNYb_57KRarU23eImW/exec';

  fetch(scriptURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      data.forEach(row => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${row.nombre}</td>
          <td>${row.codigo}</td>
          <td>${row.asiste}</td>
          <td>${row.numeroAcompanantes}</td>
          <td>${row.numeroAcompanantes > 0 ? 'Sí' : 'No'}</td>
          <td>${row.nombresAcompanantes}</td>
        `;

        tableBody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error("Error al obtener los datos:", error);
      tableBody.innerHTML = `<tr><td colspan="6">Error al cargar los datos.</td></tr>`;
    });
});
