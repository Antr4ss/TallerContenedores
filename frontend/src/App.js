import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Prestamos from './pages/Prestamos';
import Reportes from './pages/Reportes';
import AulasPage from './pages/AulasPage'; // ¡Importa tu componente de gestión de aulas!

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prestamos" element={<Prestamos />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/aulas" element={<AulasPage />} />  {/* <--- ESTA ES LA RUTA NUEVA */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
