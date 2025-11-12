import React, { useState } from "react";

export default function PrestamoForm({ onSubmit, aulas = [] }) {
  const [aulaId, setAulaId] = useState("");
  const [estudiante, setEstudiante] = useState("");
  const [programa, setPrograma] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aulaId || !estudiante || !programa || !inicio || !fin) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (new Date(fin) <= new Date(inicio)) {
      setError("La fecha/hora final debe ser posterior al inicio");
      return;
    }
    // Restricción días: solo lunes-viernes
    const ini = new Date(inicio), finD = new Date(fin);
    if ([0,6].includes(ini.getDay()) || [0,6].includes(finD.getDay())) {
      setError("Solo se permiten préstamos de lunes a viernes");
      return;
    }
    // Restricción horario: solo de 8am a 10pm
    if (
      ini.getHours() < 8 || ini.getHours() >= 22 ||
      finD.getHours() < 8 || finD.getHours() > 22
    ) {
      setError("Solo se permiten horarios entre 8:00 AM y 10:00 PM");
      return;
    }

    setError("");
    onSubmit({ aulaId, estudiante, programa, inicio, fin });
    setAulaId(""); setEstudiante(""); setPrograma(""); setInicio(""); setFin("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        background: "#f9fbff",
        borderRadius: 14,
        padding: 24,
        boxShadow: "0 1px 8px #1976d222",
        maxWidth: 360,
        margin: "auto"
      }}
    >
      {error && <div style={{ color: "red", marginBottom: 7, textAlign: "center" }}>{error}</div>}

      {/* ...Inputs igual que ya tienes... */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontWeight: 600, color: "#1976d2", marginBottom: 3 }}>Aula:</label>
        <select
          value={aulaId}
          onChange={e => setAulaId(e.target.value)}
          style={{
            border: "1px solid #bbdefb",
            borderRadius: 6,
            padding: "7px 12px",
            fontSize: "1em",
            background: "#fff"
          }}
        >
          <option value="">Seleccione aula</option>
          {(aulas || []).map(a =>
            <option key={a.id} value={a.id}>{a.nombre}</option>
          )}
        </select>
      </div>

      {/* ...resto igual que tu código... */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontWeight: 600, color: "#1976d2", marginBottom: 3 }}>Estudiante:</label>
        <input
          value={estudiante}
          onChange={e => setEstudiante(e.target.value)}
          placeholder="Nombre estudiante"
          style={{
            border: "1px solid #bbdefb",
            borderRadius: 6,
            padding: "7px 12px",
            fontSize: "1em"
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontWeight: 600, color: "#1976d2", marginBottom: 3 }}>Programa:</label>
        <input
          value={programa}
          onChange={e => setPrograma(e.target.value)}
          placeholder="Programa académico"
          style={{
            border: "1px solid #bbdefb",
            borderRadius: 6,
            padding: "7px 12px",
            fontSize: "1em"
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontWeight: 600, color: "#1976d2", marginBottom: 3 }}>Inicio:</label>
        <input
          type="datetime-local"
          value={inicio}
          onChange={e => setInicio(e.target.value)}
          style={{
            border: "1px solid #bbdefb",
            borderRadius: 6,
            padding: "7px 12px",
            fontSize: "1em"
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontWeight: 600, color: "#1976d2", marginBottom: 3 }}>Fin:</label>
        <input
          type="datetime-local"
          value={fin}
          onChange={e => setFin(e.target.value)}
          style={{
            border: "1px solid #bbdefb",
            borderRadius: 6,
            padding: "7px 12px",
            fontSize: "1em"
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          marginTop: 6,
          background: "#1976d2",
          color: "#fff",
          padding: "12px 0",
          borderRadius: 6,
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "1.08em",
          letterSpacing: 1,
          transition: "background 0.2s"
        }}
      >
        Solicitar Préstamo
      </button>
    </form>
  );
}
