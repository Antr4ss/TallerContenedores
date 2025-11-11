import React, { useState, useEffect } from "react";
import PrestamoForm from "../components/PrestamoForm";
import AulaList from "../components/AulaList";
import { getAulas, solicitarPrestamo } from "../services/api";

export default function Prestamos() {
  const [mensaje, setMensaje] = useState("");
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    getAulas()
      .then(setAulas)
      .catch(() => setAulas([]));
  }, []);

  const handleSolicitarPrestamo = async (datos) => {
    try {
      await solicitarPrestamo(datos);
      setMensaje("¡Solicitud enviada exitosamente!");
    } catch (e) {
      setMensaje("Error al solicitar el préstamo.");
    }
    setTimeout(() => setMensaje(""), 3200);
  };

  return (
    <section style={{ minHeight: '100vh', padding: '0 0 60px 0', background: 'linear-gradient(120deg, #e0eafe 0%, #b6e1ff 100%)' }}>
      <div style={{ margin: '40px auto', maxWidth: '500px', background: '#fff', borderRadius: '20px', boxShadow: "0 4px 24px #0002", padding: "32px 24px" }}>
        <h2 style={{
          textAlign: 'center',
          color: '#3498db',
          fontWeight: 'bold',
          marginBottom: '14px'
        }}>Solicitar Préstamo</h2>
        <PrestamoForm onSubmit={handleSolicitarPrestamo} />
        {mensaje && (<div style={{ color: "#27ae60", textAlign: "center", marginTop: "16px" }}>{mensaje}</div>)}
      </div>
      <div style={{
        margin: "30px auto",
        maxWidth: 900,
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 1px 10px #bbb2",
        padding: "24px"
      }}>
        <AulaList aulas={aulas} />
      </div>
    </section>
  );
}
