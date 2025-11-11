// Aquí se definirán los métodos para integrar con el backend (Java/Spring Boot)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export async function getAulas() {
  const res = await fetch(`${API_BASE_URL}/aulas`);
  return res.json();
}

export async function solicitarPrestamo(data) {
  const res = await fetch(`${API_BASE_URL}/prestamos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getReportes() {
  const res = await fetch(`${API_BASE_URL}/reportes`);
  return res.json();
}
