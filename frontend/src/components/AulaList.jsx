import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaCalendarAlt } from 'react-icons/fa';

const estadoStyles = {
  disponible: { color: "#2ecc40", icon: <FaCheckCircle style={{ marginRight: 5 }}/> },
  ocupada: { color: "#e74c3c", icon: <FaTimesCircle style={{ marginRight: 5 }}/> },
};

export default function AulaList({ aulas, tipo }) {
  const filtrar = tipo ? a => a.estado === tipo : () => true;

  return (
    <div style={{ width: '100%', maxWidth: 780, margin: "auto" }}>
      <h2 style={{
        marginBottom: "16px",
        color: "#1976d2",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        {tipo ? (tipo === "disponible" ? "Aulas Disponibles" : "Aulas Ocupadas") : "Listado de Aulas"}
      </h2>
      <div style={{ overflowX: "auto", borderRadius: "16px", background: "#fff", boxShadow: "0 2px 12px #0002" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "1em",
          borderRadius: "16px",
          overflow: "hidden"
        }}>
          <thead>
            <tr style={{ background: "#e3f2fd" }}>
              <th style={{ padding: "14px 10px", fontWeight: 700, color: "#1565c0", textAlign: "left" }}>Aula</th>
              <th style={{ padding: "14px 10px", fontWeight: 700, color: "#1565c0", textAlign: "center" }}>Estado</th>
              <th style={{ padding: "14px 10px", fontWeight: 700, color: "#1565c0", textAlign: "left" }}>Próximas ocupaciones</th>
            </tr>
          </thead>
          <tbody>
            {aulas.filter(filtrar).map(aula => (
              <tr key={aula.id} style={{
                background: "transparent",
                borderBottom: "1.5px solid #e3f2fd"
              }}>
                <td style={{ padding: "12px 10px", fontWeight: 500, fontSize: "1.05em" }}>
                  <FaCalendarAlt style={{ marginRight: 6, color: "#3498db" }}/>
                  {aula.nombre}
                </td>
                <td style={{ textAlign: "center", padding: "12px 10px", fontWeight: "bold" }}>
                  <span style={{ color: estadoStyles[aula.estado].color }}>
                    {estadoStyles[aula.estado].icon}
                    {aula.estado.charAt(0).toUpperCase() + aula.estado.slice(1)}
                  </span>
                </td>
                <td style={{ padding: "12px 10px" }}>
                  {aula.ocupaciones.length === 0 ? (
                    <span style={{
                      color: "#11bd60",
                      background: "#e9f7ef",
                      padding: "5px 12px",
                      borderRadius: "8px",
                      fontWeight: 500
                    }}>Libre</span>
                  ) : (
                    aula.ocupaciones.map((slot, idx) => (
                      <div key={slot + idx} style={{
                        display: "inline-block",
                        background: "#f5fcff",
                        color: "#1565c0",
                        margin: "2px 6px 2px 0",
                        padding: "7px 18px",
                        borderRadius: "9px",
                        fontSize: "0.98em",
                        fontWeight: 500,
                        boxShadow: "0 1px 4px #a5c8ef32"
                      }}>{slot}</div>
                    ))
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: "0.97em", color: "#888", textAlign: "left", margin: "16px 0 0 0" }}>
        <FaCheckCircle style={{ color: "#2ecc40" }}/> Disponible &nbsp;&nbsp;
        <FaTimesCircle style={{ color: "#e74c3c" }}/> Ocupada
      </div>
    </div>
  );
}
