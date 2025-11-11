const API_AULAS = process.env.REACT_APP_API_AULAS || "http://localhost:8080";
const API_PRESTAMOS = process.env.REACT_APP_API_PRESTAMOS || "http://localhost:8082";
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

export async function getReportes() {
  const res = await fetch(`${API_REPORTES}/reportes`);
  return res.json();
}
