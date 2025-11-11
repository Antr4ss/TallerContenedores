import React from 'react';

const reportesEjemplo = [
  { titulo: "Préstamos esta semana", valor: 19 },
  { titulo: "Aula más usada", valor: "Bloque 1 12" },
  { titulo: "Promedio préstamos diarios", valor: 3 },
  { titulo: "Día con más actividad", valor: "Jueves" },
  { titulo: "Porcentaje ocupación", valor: "75%" },
  { titulo: "Total préstamos este mes", valor: 41 },
];

export default function Reportes() {
  return (
    <section style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "linear-gradient(120deg,#e0eafe 0%,#b6e1ff 100%)"
    }}>
      <div style={{
        marginTop: 40,
        background: "#fff",
        padding: "32px 24px",
        borderRadius: "20px",
        boxShadow: "0 4px 24px #0002",
        maxWidth: "600px",
        width: "100%",
      }}>
        <h2 style={{
          color: "#1976d2",
          fontWeight: 700,
          textAlign: "center"
        }}>Panel de Reportes</h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          marginTop: "28px"
        }}>
          {reportesEjemplo.map((r, idx) => (
            <div key={idx} style={{
              background: "#f5fcff",
              padding: "16px 24px",
              borderRadius: "14px",
              boxShadow: "0 1px 8px #3498db33",
              minWidth: "160px",
              textAlign: "center"
            }}>
              <div style={{
                color: "#3498db",
                fontSize: "1.1em",
                fontWeight: 600
              }}>{r.titulo}</div>
              <div style={{
                color: "#1976d2",
                fontSize: "1.8em",
                fontWeight: "bold",
                marginTop: "8px"
              }}>{r.valor}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
