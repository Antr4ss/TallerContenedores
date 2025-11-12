import React, { useState, useEffect } from "react";
import {
  getReporteFrecuencia, getReporteFrecuenciaAulas, getReporteFrecuenciaMes,
  getReporteFrecuenciaSemana, getReporteHorarioFrecuente
} from "../services/api";
import ReporteView from "../components/ReporteView";

const opciones = [
  { label: "Por Programa", fn: getReporteFrecuencia },
  { label: "Por Aula", fn: getReporteFrecuenciaAulas },
  { label: "Por Mes", fn: getReporteFrecuenciaMes },
  { label: "Por Semana", fn: getReporteFrecuenciaSemana },
  { label: "Horario Frecuente", fn: getReporteHorarioFrecuente }
];

export default function Reportes() {
  const [tipo, setTipo] = useState(0);
  const [reportes, setReportes] = useState(null);

  useEffect(() => {
    opciones[tipo].fn().then(data => {
      setReportes(data);
    });
  }, [tipo]);

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
        maxWidth: "720px",
        width: "100%"
      }}>
        <h2 style={{
          color: "#1976d2",
          fontWeight: 700,
          textAlign: "center"
        }}>Panel de Estadísticas</h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "14px",
          margin: "20px 0 18px 0"
        }}>
          {opciones.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setTipo(idx)}
              style={{
                margin: 7,
                padding: '8px 18px',
                background: tipo === idx ? "#3498db" : "#e0eafe",
                color: tipo === idx ? "#fff" : "#1976d2",
                fontWeight: "bold",
                borderRadius: 9,
                border: "none",
                cursor: "pointer"
              }}>
              {opt.label}
            </button>
          ))}
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center"
        }}>
          
<ReporteView reportes={reportes ?? {}} tipo={opciones[tipo].label.includes("Aula") ? "aula" : ""} />

        </div>
      </div>
    </section>
  );
}
