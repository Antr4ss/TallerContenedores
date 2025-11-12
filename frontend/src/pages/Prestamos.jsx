import React, { useState, useEffect } from "react";
import PrestamoForm from "../components/PrestamoForm";
import AulaList from "../components/AulaList";
import { getAulasConOcupaciones, solicitarPrestamo } from "../services/api";

export default function Prestamos() {
  const [mensaje, setMensaje] = useState("");
  const [aulas, setAulas] = useState([]);

useEffect(() => {
  getAulasConOcupaciones()
    .then(setAulas)
    .catch(() => setAulas([]));
}, []);

  const handleSolicitarPrestamo = async (datos) => {
  try {
    await solicitarPrestamo(datos);
    setMensaje("¡Solicitud enviada exitosamente!");
const updated = await getAulasConOcupaciones();
setAulas(updated);
  } catch (e) {
    setMensaje("Error al solicitar el préstamo.");
  }
  setTimeout(() => setMensaje(""), 3200);
};


  return (
    <section
      style={{
        minHeight: '100vh',
        padding: '0 0 60px 0',
        background: 'linear-gradient(120deg, #e0eafe 0%, #b6e1ff 100%)',
        display: 'flex',
        flexDirection: "column",
        alignItems: "center"
      }}>
      <div style={{
        margin: '40px auto 16px auto',
        width: "100%",
        maxWidth: '480px',
        background: '#fff',
        borderRadius: '20px',
        boxShadow: "0 4px 24px #0002",
        padding: "32px 24px 30px 24px"
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#3498db',
          fontWeight: 'bold',
          marginBottom: '14px',
          fontSize: "1.35em"
        }}>Solicitar Préstamo</h2>
        <PrestamoForm onSubmit={handleSolicitarPrestamo} aulas={aulas} />
        {mensaje && (
          <div style={{
            color: mensaje.startsWith("¡") ? "#27ae60" : "#e74c3c",
            textAlign: "center",
            marginTop: "18px",
            fontWeight: 600
          }}>{mensaje}</div>
        )}
      </div>
      <div style={{
        margin: "28px auto 0 auto",
        width: "100%",
        maxWidth: 900,
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 1px 10px #bbb2",
        padding: "28px 26px"
      }}>
        <AulaList aulas={aulas} />
      </div>
    </section>
  );
}
