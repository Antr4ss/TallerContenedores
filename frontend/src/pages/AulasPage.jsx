// src/pages/Aulas.jsx
import React, { useEffect, useState } from "react";
import { getAulasConOcupaciones, crearAula, eliminarPrestamo, eliminarAula } from "../services/api";
import AulaList from "../components/AulaList";
import AulaForm from "../components/AulaForm";

export default function AulasPage() {
  const [aulas, setAulas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const fetchData = () => {
    getAulasConOcupaciones()
      .then(setAulas)
      .catch(() => setMensaje("No se pudieron cargar las aulas"));
  };

  useEffect(() => { fetchData(); }, []);

  const handleCrearAula = async (datos) => {
    try {
      await crearAula(datos);
      setMensaje("¡Aula creada exitosamente!");
      fetchData();
    } catch {
      setMensaje("No se pudo crear el aula");
    }
    setTimeout(() => setMensaje(""), 3200);
  };

  const handleBorrarOcupacion = (ocup) => {
    if (window.confirm("¿Seguro que deseas eliminar este préstamo/ocupación?")) {
      eliminarPrestamo(ocup.id).then(fetchData);
    }
  };

  const handleEliminarAula = async (aula) => {
    if (!window.confirm(`¿Eliminar el aula "${aula.nombre}"? Esta acción es permanente.`)) return;
    // borrado optimista
    const prev = aulas;
    setAulas((curr) => curr.filter((x) => x.id !== aula.id));
    try {
      await eliminarAula(aula.id);
      setMensaje("Aula eliminada");
    } catch {
      setAulas(prev); // rollback si falla
      setMensaje("No se pudo eliminar el aula");
    }
    setTimeout(() => setMensaje(""), 3000);
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
        }}>Registrar Nueva Aula</h2>
        <AulaForm onSubmit={handleCrearAula} />
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
        <AulaList
          aulas={aulas}
          onBorrarOcupacion={handleBorrarOcupacion}
          onEliminarAula={handleEliminarAula}
        />
      </div>
    </section>
  );
}
