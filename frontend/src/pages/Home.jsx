import React from 'react';
import { FaUniversity, FaUsers, FaCalendarCheck } from 'react-icons/fa';

export default function Home() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #4fc3f7 0%, #1976d2 70%, #81d4fa 100%)',
      paddingTop: 32,
      paddingBottom: 24
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.93)',
        padding: '40px 60px 32px 60px',
        borderRadius: '28px',
        boxShadow: '0 8px 32px #0001',
        maxWidth: '520px',
        marginTop: 50,
        marginBottom: 20,
        textAlign: "center"
      }}>
        <FaUniversity style={{ fontSize: "3em", color: "#1565c0", marginBottom: 14 }}/>
        <h1 style={{
          color: "#3498db",
          letterSpacing: "2px",
          fontWeight: "900",
          fontSize: "2.3em",
          marginBottom: "8px",
          textAlign: "center"
        }}>Sistema DTIC de Préstamo de Aulas</h1>
        <p style={{
          color: "#1976d2",
          fontSize: "1.10em",
          marginBottom: "20px",
          textAlign: "center"
        }}>Gestiona los préstamos de salas, consulta tus reportes académicos y descubre la disponibilidad y ocupación de espacios en tiempo real.</p>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "34px",
          marginTop: "16px"
        }}>
          <div style={{
            background: "#e3f2fd",
            borderRadius: "20px",
            padding: "18px 14px",
            width: "120px",
            boxShadow: "0 1px 5px #3498db22"
          }}>
            <FaUsers style={{ color: "#1565c0", fontSize: "1.5em" }}/>
            <div style={{ fontWeight: 700, color: "#1565c0", marginTop: 8, fontSize: 18 }}>Usuarios</div>
            <div style={{ color: "#666", fontSize: 14 }}>Solicita tu aula</div>
          </div>
          <div style={{
            background: "#e8f5e9",
            borderRadius: "20px",
            padding: "18px 14px",
            width: "125px",
            boxShadow: "0 1px 5px #27ae6022"
          }}>
            <FaCalendarCheck style={{ color: "#27ae60", fontSize: "1.5em" }}/>
            <div style={{ fontWeight: 700, color: "#27ae60", marginTop: 8, fontSize: 18 }}>Reportes</div>
            <div style={{ color: "#666", fontSize: 14 }}>Consulta actividad</div>
          </div>
        </div>
      </div>
    </section>
  );
}
