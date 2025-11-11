import React, { useState } from "react";
import PrestamoForm from "../components/PrestamoForm";
import AulaList from "../components/AulaList";

const aulasEjemplo = [
  { id: 1, nombre: "AAA 2010", estado: "ocupada", ocupaciones: ["2025-11-12 08:00-10:00"] },
  { id: 2, nombre: "AAA 2020", estado: "disponible", ocupaciones: [] },
  { id: 3, nombre: "ALCANTUZ", estado: "disponible", ocupaciones: ["2025-11-12 14:00-16:00"] },
  { id: 4, nombre: "Bloque 1 12", estado: "ocupada", ocupaciones: ["2025-11-13 11:00-12:30", "2025-11-14 09:00-10:00"] },
  // ...más aulas
];

export default function Prestamos() {
  const [mensaje, setMensaje] = useState("");

  const handleSolicitarPrestamo = (datos) => {
    setMensaje("¡Solicitud enviada exitosamente! (demo)");
    setTimeout(() => setMensaje(""), 3200);
  };

  return (
    <section style={{ minHeight: '100vh', padding: '0 0 60px 0', background: 'linear-gradient(120deg, #e0eafe 0%, #b6e1ff 100%)' }}>
      <div style={{ margin: '40px auto', maxWidth: '500px', background: '#fff', borderRadius: '20px', boxShadow: "0 4px 24px #0002", padding: "32px 24px" }}>
        <h2 style={{ textAlign: 'center', color: '#3498db', fontWeight: 'bold', marginBottom: '14px' }}>Solicitar Préstamo</h2>
        <PrestamoForm onSubmit={handleSolicitarPrestamo} />
        {mensaje && (<div style={{ color: "#27ae60", textAlign: "center", marginTop: "16px" }}>{mensaje}</div>)}
      </div>
      <div style={{ margin: "30px auto", maxWidth: 900, background: "#fff", borderRadius: "16px", boxShadow: "0 1px 10px #bbb2", padding: "24px" }}>
        <AulaList aulas={aulasEjemplo} />
      </div>
    </section>
  );
}
