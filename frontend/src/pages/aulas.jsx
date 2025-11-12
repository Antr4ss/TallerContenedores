// En src/pages/Aulas.jsx (o similar)

import React, { useEffect, useState } from "react";
import { getAulas, crearAula, handleBorrarOcupacion } from "../services/api";
import AulaList from "../components/AulaList";
import AulaForm from "../components/AulaForm";

export default function AulasPage() {
  const [aulas, setAulas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAulas()
      .then(setAulas)
      .catch(() => setError("No se pudieron cargar las aulas"));
  }, []);

  const handleCrearAula = async (datos) => {
    try {
      const nueva = await crearAula(datos);
      setAulas(prev => [...prev, nueva]);
    } catch {
      setError("No se pudo crear el aula");
    }
  };

  return (
    <section>
      <h2 style={{
        textAlign: "center", fontWeight: "bold", margin: "18px 0 0 0", color: "#1976d2"
      }}>Gestionar Aulas</h2>
      <AulaForm onSubmit={handleCrearAula} />
      <div style={{ margin: "22px auto", maxWidth: 850 }}>
        {error && <div style={{color:"red", marginBottom: 8}}>{error}</div>}

        <AulaList aulas={aulas} onBorrarOcupacion={handleBorrarOcupacion} />


      </div>
    </section>
  );
}
