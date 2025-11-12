import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const current = (ruta) => location.pathname.startsWith(ruta);

  const linkStyle = (isActive) => ({
    color: isActive ? "#1976d2" : "#fff",
    background: isActive ? "#fff" : "transparent",
    borderRadius: 8,
    fontWeight: 600,
    padding: "7px 16px",
    margin: "0 6px",
    textDecoration: "none",
    transition: "0.3s",
  });

  return (
    <nav
      style={{
        width: "100%",
        background: "linear-gradient(90deg, #1976d2 0%, #4fc3f7 100%)",
        boxShadow: "0 2px 15px #348cc140",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          padding: "0 20px",
        }}
      >
        {/* LOGO + TÍTULO */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaUniversity
            style={{ color: "#fff", fontSize: "1.8em", marginRight: 10 }}
          />
          <span
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.15em",
              letterSpacing: "1.2px",
            }}
          >
            DTIC Aulas
          </span>
        </div>

        {/* ENLACES CENTRADOS */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            to="/"
            style={linkStyle(
              current("/") &&
                !current("/aulas") &&
                !current("/prestamos") &&
                !current("/reportes")
            )}
          >
            Inicio
          </Link>
          <Link to="/aulas" style={linkStyle(current("/aulas"))}>
            Aulas
          </Link>
          <Link to="/prestamos" style={linkStyle(current("/prestamos"))}>
            Préstamos
          </Link>
          <Link to="/reportes" style={linkStyle(current("/reportes"))}>
            Reportes
          </Link>
        </div>
      </div>
    </nav>
  );
}
