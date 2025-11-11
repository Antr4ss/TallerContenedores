import React, { useState } from 'react';

export default function PrestamoForm({ onSubmit }) {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ fecha, hora });
    setFecha("");
    setHora("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Sin select de aula todavía */}
      <label style={{ fontWeight: 'bold', color: '#1976d2' }}>
        Fecha:
        <input 
          type="date" 
          value={fecha} 
          onChange={e => setFecha(e.target.value)}
          style={{
            marginLeft: "10px",
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid #b5d5fe",
            background: "#f0f6ff"
          }}
          required 
        />
      </label>
      <label style={{ fontWeight: 'bold', color: '#1976d2' }}>
        Hora:
        <input 
          type="time" 
          value={hora} 
          onChange={e => setHora(e.target.value)}
          style={{
            marginLeft: "10px",
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid #b5d5fe",
            background: "#f0f6ff"
          }}
          required 
        />
      </label>
      <button 
        type="submit" 
        style={{
          background: "linear-gradient(90deg, #1976d2, #4fc3f7)",
          color: "#fff",
          padding: "10px 0",
          fontWeight: "bold",
          fontSize: "1em",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "12px"
        }}>
        Solicitar Préstamo
      </button>
    </form>
  );
}
