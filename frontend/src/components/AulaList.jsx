import React, { useState } from "react";

// Componente para agregar un aula
export function AulaForm({ onSubmit }) {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !ubicacion || !capacidad) {
      setOk("");
      setError("Todos los campos son obligatorios");
      return;
    }
    if (isNaN(capacidad) || capacidad <= 0) {
      setOk("");
      setError("La capacidad debe ser un número positivo");
      return;
    }
    setError("");
    onSubmit({ nombre, ubicacion, capacidad: Number(capacidad) });
    setNombre("");
    setUbicacion("");
    setCapacidad("");
    setOk("¡Aula agregada exitosamente!");
    setTimeout(() => setOk(""), 3000);
  };

  const labelStyle = { fontWeight: 600, color: "#34495e", marginBottom: 6 };
  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #d0d7de",
    outline: "none",
    fontSize: "0.98em",
    transition: "box-shadow .2s ease, border-color .2s ease",
    background: "#f9fbff",
  };
  const inputFocusStyle = {
    boxShadow: "0 0 0 3px rgba(52,152,219,.20)",
    borderColor: "#3498db",
    background: "#fff",
  };
  const groupStyle = { display: "flex", flexDirection: "column", gap: 6 };
  const buttonStyle = {
    marginTop: 12,
    background: "#1976d2",
    color: "#fff",
    padding: "12px 0",
    borderRadius: 10,
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "1em",
    boxShadow: "0 2px 8px rgba(25,118,210,.35)",
    transition: "transform .06s ease, box-shadow .2s ease",
  };
  const msgErrorStyle = {
    color: "#e74c3c",
    textAlign: "center",
    fontWeight: 600,
    marginTop: 8,
  };
  const msgOkStyle = {
    color: "#27ae60",
    textAlign: "center",
    fontWeight: 600,
    marginTop: 8,
  };

  const [focus, setFocus] = useState({
    nombre: false,
    ubicacion: false,
    capacidad: false,
  });

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      <div style={groupStyle}>
        <label style={labelStyle}>Nombre</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onFocus={() => setFocus((f) => ({ ...f, nombre: true }))}
          onBlur={() => setFocus((f) => ({ ...f, nombre: false }))}
          style={{ ...inputStyle, ...(focus.nombre ? inputFocusStyle : null) }}
          placeholder="Ej: Aula 301"
        />
      </div>

      <div style={groupStyle}>
        <label style={labelStyle}>Ubicación</label>
        <input
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          onFocus={() => setFocus((f) => ({ ...f, ubicacion: true }))}
          onBlur={() => setFocus((f) => ({ ...f, ubicacion: false }))}
          style={{
            ...inputStyle,
            ...(focus.ubicacion ? inputFocusStyle : null),
          }}
          placeholder="Ej: Bloque B, piso 3"
        />
      </div>

      <div style={groupStyle}>
        <label style={labelStyle}>Capacidad</label>
        <input
          type="number"
          min={1}
          value={capacidad}
          onChange={(e) => setCapacidad(e.target.value)}
          onFocus={() => setFocus((f) => ({ ...f, capacidad: true }))}
          onBlur={() => setFocus((f) => ({ ...f, capacidad: false }))}
          style={{
            ...inputStyle,
            ...(focus.capacidad ? inputFocusStyle : null),
          }}
          placeholder="Ej: 40"
        />
      </div>

      <button
        type="submit"
        style={buttonStyle}
        onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow =
            "0 4px 14px rgba(25,118,210,.45)")
        }
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 2px 8px rgba(25,118,210,.35)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Agregar Aula
      </button>

      {error && <div style={msgErrorStyle}>{error}</div>}
      {ok && <div style={msgOkStyle}>{ok}</div>}
    </form>
  );
}

// Función para formatear fechas de ocupaciones
const formatDateRange = (inicio, fin) => {
  const opts = { day: "2-digit", month: "2-digit", year: "numeric" };
  return `${new Date(inicio).toLocaleDateString("es-CO", opts)} - ${new Date(
    fin
  ).toLocaleDateString("es-CO", opts)}`;
};

// Estilo del botón "Eliminar aula"
const btnEliminarAula = {
  background: "#fdecea",
  color: "#e74c3c",
  border: "none",
  borderRadius: 8,
  padding: "6px 10px",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "0.97em",
  marginLeft: 10,
  boxShadow: "0 1px 6px #e74c3c22",
  transition: "box-shadow .14s",
};

export default function AulaList({
  aulas = [],
  tipo,
  onEditarOcupacion,
  onBorrarOcupacion,
  onEliminarAula,
}) {
  const headerRow = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <div style={{ marginTop: 20 }}>
      {aulas.length === 0 ? (
        <p style={{ color: "#555", fontWeight: 500 }}>
          No hay aulas registradas
        </p>
      ) : (
        aulas.map((aula, index) => (
          <div
            key={aula.id ?? index}
            style={{
              border: "1px solid #e1e8ef",
              borderRadius: 10,
              padding: 16,
              marginBottom: 12,
              background: "#fdfdfd",
              boxShadow: "0 2px 10px #dde7f733",
            }}
          >
            <div style={headerRow}>
              <h4 style={{ margin: "0 0 6px 0", color: "#1976d2" }}>
                {aula.nombre} — {aula.ubicacion}
              </h4>
              {onEliminarAula && (
                <button
                  title="Eliminar aula"
                  style={btnEliminarAula}
                  onClick={() => onEliminarAula(aula)}
                >
                  🗑️ Eliminar aula
                </button>
              )}
            </div>

            <p style={{ margin: "4px 0 10px", color: "#555" }}>
              Capacidad: <b>{aula.capacidad}</b>
            </p>

            {aula.ocupaciones && aula.ocupaciones.length > 0 ? (
              aula.ocupaciones.map((ocup, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: "#f5fcff",
                    color: "#1976d2",
                    margin: "1.5px 0",
                    padding: "7px 20px",
                    borderRadius: "16px",
                    fontSize: "0.98em",
                    fontWeight: 700,
                    boxShadow: "0 1px 8px #b6e1ff44",
                  }}
                >
                  <span>{formatDateRange(ocup.inicio, ocup.fin)}</span>
                  <span
                    style={{
                      color: "#7ca4d1",
                      marginLeft: 10,
                      fontWeight: 500,
                      fontSize: 13,
                    }}
                  >
                    {ocup.estudiante}, {ocup.programa}
                  </span>

                  <button
                    onClick={() =>
                      onEditarOcupacion && onEditarOcupacion(ocup)
                    }
                    style={{
                      marginLeft: 12,
                      background: "#e3f2fd",
                      color: "#1565c0",
                      border: "none",
                      borderRadius: "6px",
                      padding: "2px 9px",
                      cursor: "pointer",
                      fontSize: "0.95em",
                    }}
                    title="Editar ocupación"
                  >
                    ✎
                  </button>

                  <button
                    onClick={() =>
                      onBorrarOcupacion && onBorrarOcupacion(ocup)
                    }
                    style={{
                      marginLeft: 6,
                      background: "#fdecea",
                      color: "#e74c3c",
                      border: "none",
                      borderRadius: "6px",
                      padding: "2px 8px",
                      cursor: "pointer",
                      fontSize: "0.95em",
                    }}
                    title="Eliminar ocupación"
                  >
                    🗑️
                  </button>
                </div>
              ))
            ) : (
              <p style={{ color: "#888" }}>Sin ocupaciones registradas</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
