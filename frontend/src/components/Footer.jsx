import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      background: "linear-gradient(90deg, #1976d2 40%, #4fc3f7 100%)",
      color: "#fff",
      padding: "18px 0",
      textAlign: "center",
      borderTopLeftRadius: "18px",
      borderTopRightRadius: "18px",
      boxShadow: "0 -2px 20px #0002",
      fontSize: "1em",
      zIndex: 99
    }}>
      <span>
        © {new Date().getFullYear()} DTIC - Sistema de Préstamo de Aulas | Diseño: Taller Distribuidos
      </span>
    </footer>
  );
}
