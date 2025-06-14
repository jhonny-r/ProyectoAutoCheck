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
import RecuperacionContra from './Componente/RecuperacionContra.jsx';
import NuevaEntradaForo from './Componente/NuevaEntradaForo.jsx';


function App() {

const [usuarios, setUsuarios] = useState([
  { nombre: 'Jhonny', alias: 'jhonny', telefono: '0956369896',direccion:'Centro', email: 'jhonny.ruiz@epn.edu.ec', contraseña: '123456' },
  { nombre: 'Gustavo', alias: 'gustavo', telefono: '0987654321',direccion:'Norte', email: 'gustavo.herrera@epn.edu.ec', contraseña: '123456' }
]);

const [vehiculos, setVehiculos] = useState([
  { fecha: '2023-10-01', tipo: 'Auto', placa: 'ABC123', marca: 'Chevrolet', modelo: 'Sonic', color: 'Rojo', barrio: 'Solanda' },
  { fecha: '2023-10-02', tipo: 'Moto', placa: 'XYZ789', marca: 'Kawasaki', modelo: 'Ninja', color: 'Verde', barrio: 'Chillogallo' }
]);

console.log(vehiculos);

const [BarriosPeligrosos, setBarriosPeligrosos] = useState([
  { barrio: 'La floresta', peligrosidad: '3' },
  { barrio: 'Marta Bucaran', peligrosidad: '2' },
  { barrio: 'La marin', peligrosidad: '1' },
  { barrio: 'El condado', peligrosidad: '3' },
  { barrio: 'La pradera', peligrosidad: '2' },
  { barrio: 'El bosque', peligrosidad: '3' }
]);

const [usuarioActivo, setUsuarioActivo] = useState(
  JSON.parse(localStorage.getItem('usuarioActivo')) || null
);
const [consultas, setConsultas] = useState(
  JSON.parse(localStorage.getItem('consultas')) || []
);


const agregarUsuario = (nuevoUsuario) => {
  setUsuarios([...usuarios, nuevoUsuario]);
};

const agregarVehiculo = (nuevoVehiculo) => {
  setVehiculos([...vehiculos, nuevoVehiculo]);
};

const eliminarConsulta = (placa)=>{
  const nuevasConsultas = consultas.filter(c=>c.placa !== placa);
  setConsultas(nuevasConsultas);
  localStorage.setItem("consultas",JSON.stringify(nuevasConsultas));

};

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          {/* Login es la ruta por defecto */}
          <Route path="/" element={<Login usuarios={usuarios} setUsuarioActivo={setUsuarioActivo} />} />

          <Route path="/Inicio" element={<Inicio usuario={usuarioActivo}/>} />
          <Route path="/Registro" element={<Registro agregarUsuario={agregarUsuario} />} />
          <Route path="/MiAutoCheck" element={<MiAutoCheck usuario={usuarioActivo} consultas={consultas} eliminarConsulta={eliminarConsulta} setUsuarioActivo={setUsuarioActivo} setConsultas={setConsultas}/>} />
          <Route path="/EditarPerfil" element={<EditarPerfil />} />
          <Route path="/ForoVecinal" element={<ForoVecinal />} />
          <Route path="/ReporteVehiculo" element={<ReporteVehiculo agregarVehiculo={agregarVehiculo} />} />
          <Route path="/MapaReportes" element={<MapaReportes BarriosPeligrosos={BarriosPeligrosos} />} />
          <Route path="/ReporteVehiculo" element={<ReporteVehiculo />} />
          <Route path="/VerificarVehiculo" element={<VerificarVehiculo vehiculos={vehiculos} consultas={consultas} setConsultas={setConsultas} />} />
          <Route path="/Configuracion" element={<Configuracion />} />
          <Route path="/MiZona" element={<MiZona />} />
          <Route path="/RecuperacionContra" element={<RecuperacionContra usuarios={usuarios} />} />
          <Route path="/NuevaEntradaForo" element={<NuevaEntradaForo />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
