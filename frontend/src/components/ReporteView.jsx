import React from "react";

export default function ReporteView({ reportes, tipo = "" }) {
  if (!reportes || (Array.isArray(reportes) && reportes.length === 0) || (typeof reportes === "object" && Object.keys(reportes).length === 0)) {
    return <div style={{ color: "#888", fontStyle: "italic" }}>No hay datos de reportes.</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: "18px", justifyContent: "center" }}>
      {Object.entries(reportes).map(([k, v], i) => (
        <div key={k} style={{
          minWidth: 150,
          borderRadius: 14,
          background: "#f5fcff",
          boxShadow: "0 1px 8px #3498db33",
          padding: "20px 28px",
          textAlign: "center",
        }}>
          <div style={{
            fontWeight: "bold",
            fontSize: "1.12em",
            color: "#3498db"
          }}>
            {(tipo === "aula" && !isNaN(Number(k))) ? `Aula ${k}` : k}
          </div>
          <div style={{
            color: "#1565c0",
            fontWeight: 700,
            fontSize: "2.1em",
            margin: "8px 0"
          }}>{v}</div>
        </div>
      ))}
    </div>
  );
}
