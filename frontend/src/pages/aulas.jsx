import React, { useEffect, useState } from "react";
import { getAulas } from "../services/api";
import AulaList from "../components/AulaList";

export default function AulasPage() {
  const [aulas, setAulas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAulas()
      .then(setAulas)
      .catch(() => setError("No se pudieron cargar las aulas"));
  }, []);

  return (
    <section>
      {error && <div style={{color:"red"}}>{error}</div>}
      <AulaList aulas={aulas}/>
    </section>
  );
}
