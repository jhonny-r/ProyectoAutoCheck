import './App.css';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Inicio from './Componente/Inicio.jsx';
import Login from './Componente/Login.jsx';
import Registro from './Componente/Registro.jsx';
import MiAutoCheck from './Componente/MiAutoCheck.jsx';
import EditarPerfil from './Componente/EditarPerfil.jsx';
import ForoVecinal from './Componente/ForoVecinal.jsx';
import MapaReportes from './Componente/MapaReportes.jsx';
import ReporteVehiculo from './Componente/ReporteVehiculo.jsx';
import VerificarVehiculo from './Componente/VerificarVehiculo.jsx';
import Configuracion from './Componente/Configuracion.jsx';
import MiZona from './Componente/MiZona.jsx';


function App() {

const [usuarios, setUsuarios] = useState([
  { nombre: 'Jhonny', email: 'jhonny.ruiz@epn.edu.ec', contraseña: '123456' },
  { nombre: 'Gustavo', email: 'gustavo.herrera@epn.edu.ec', contraseña: '123456' }
]);

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          {/* Login es la ruta por defecto */}
          <Route path="/" element={<Login usuarios={usuarios} />} />

          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/MiAutoCheck" element={<MiAutoCheck />} />
          <Route path="/EditarPerfil" element={<EditarPerfil />} />
          <Route path="/ForoVecinal" element={<ForoVecinal />} />
          <Route path="/MapaReportes" element={<MapaReportes />} />
          <Route path="/ReporteVehiculo" element={<ReporteVehiculo />} />
          <Route path="/VerificarVehiculo" element={<VerificarVehiculo />} />
          <Route path="/Configuracion" element={<Configuracion />} />
          <Route path="/MiZona" element={<MiZona />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
