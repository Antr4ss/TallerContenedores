import React from 'react';

export default function ReporteView({ reportes }) {
  return (
    <div>
      <h2>Reportes</h2>
      <ul>
        {reportes.map((reporte, idx) => (
          <li key={idx}>
            {reporte.descripcion} - {reporte.valor}
          </li>
        ))}
      </ul>
    </div>
  );
}
