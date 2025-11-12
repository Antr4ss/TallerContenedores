const API_AULAS = process.env.REACT_APP_API_AULAS || "http://localhost:8081";
const API_PRESTAMOS = process.env.REACT_APP_API_PRESTAMOS || "http://localhost:8080";
const API_REPORTES = process.env.REACT_APP_API_REPORTES || "http://localhost:8082";

export async function getAulas() {
  const res = await fetch(`${API_AULAS}/aulas`);
  return res.json();
}

export async function solicitarPrestamo(data) {
  const res = await fetch(`${API_PRESTAMOS}/prestamos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getReporteFrecuencia() {
  const res = await fetch(`${API_REPORTES}/reportes/frecuencia`);
  return res.json();
}

export async function getReporteFrecuenciaAulas() {
  const res = await fetch(`${API_REPORTES}/reportes/frecuencia-aulas`);
  return res.json();
}

export async function getReporteFrecuenciaSemana() {
  const res = await fetch(`${API_REPORTES}/reportes/frecuencia-semana`);
  return res.json();
}

export async function getReporteFrecuenciaMes() {
  const res = await fetch(`${API_REPORTES}/reportes/frecuencia-mes`);
  return res.json();
}

export async function getReporteHorarioFrecuente() {
  const res = await fetch(`${API_REPORTES}/reportes/horario-frecuente`);
  return res.json();
}

export async function crearAula(aula) {
  const res = await fetch(`${API_AULAS}/aulas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aula),
  });
  return res.json();
}

export async function editarAula(id, aula) {
  const res = await fetch(`${API_AULAS}/aulas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aula),
  });
  return res.json();
}

export async function eliminarAula(id) {
  const res = await fetch(`${API_AULAS}/aulas/${id}`, { method: "DELETE" });
  return res.ok;
}

export async function getPrestamos() {
  const res = await fetch(`${API_PRESTAMOS}/prestamos`);
  return res.json();
}

export async function editarPrestamo(id, prestamo) {
  const res = await fetch(`${API_PRESTAMOS}/prestamos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prestamo),
  });
  return res.json();
}

export async function eliminarPrestamo(id) {
  await fetch(`${API_PRESTAMOS}/prestamos/${id}`, { method: "DELETE" });
}

export async function getAulasConOcupaciones() {
  const aulas = await getAulas();
  const prestamos = await getPrestamos(); 

  return aulas.map(aula => ({
    ...aula,
    ocupaciones: prestamos
      .filter(p => p.aulaId === aula.id)
      .map(p => ({
        id: p.id,
        inicio: p.inicio,
        fin: p.fin,
        estudiante: p.estudiante,
        programa: p.programa
      }))
  }));
}

