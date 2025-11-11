import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navStyle = {
    display: "flex",
    justifyContent: "center",
    background: "linear-gradient(90deg, #1976d2 40%, #4fc3f7 100%)",
    padding: "16px 0",
    marginBottom: "0px"
  };
  const linkStyle = (active) => ({
    color: active ? "#fff" : "#d3eaff",
    textDecoration: "none",
    fontWeight: active ? "bold" : "normal",
    fontSize: "1.1em",
    padding: "10px 24px",
    borderRadius: "10px",
    background: active ? "#1565c0" : "transparent",
    transition: "0.2s"
  });

  return (
    <nav style={navStyle}>
      <Link style={linkStyle(location.pathname === "/")} to="/">Inicio</Link>
      <Link style={linkStyle(location.pathname === "/prestamos")} to="/prestamos">Préstamos</Link>
      <Link style={linkStyle(location.pathname === "/reportes")} to="/reportes">Reportes</Link>
    </nav>
  );
}
