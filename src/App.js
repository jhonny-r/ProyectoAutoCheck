import './App.css';
import React, { useEffect, useState } from 'react';
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
import PanelAdmin from './Componente/PanelAdmin.jsx';
import axios from 'axios';
import GestionZonas from './Componente/GestionZonas.jsx';
import ListaUsuarios from './Componente/ListaUsuarios.jsx';
import ListaVehiculos from './Componente/ListaVehiculos.jsx';

function App() {

  useEffect(() => {
    axios.get('http://localhost:3001/usuarios')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {

        console.error('Error al obtener los usuarios:', error);
      })

  }, []);

  useEffect(()=>{
    axios.get("http://localhost:3001/vehiculos")
    .then(res =>{
      setVehiculos(res.data);
    })
    .catch(error =>{
      console.error("Error al obtener los vehiculos",error);
    })

  },[]);

  const [usuarios, setUsuarios] = useState([]);

  const [vehiculos, setVehiculos] = useState([]);

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


  const agregarUsuario = (nuevo) => {

    axios.post('http://localhost:3001/usuarios', nuevo)
      .then(response => {
        setUsuarios(prev => [...prev, response.data]);
      })
      .catch(error => {
        console.error('Error al agregar el usuario:', error);
      });

  };

  const eliminarUsuario = (id) => {
    axios.delete(`http://localhost:3001/usuarios/${id}`)
      .then(() => {
        setUsuarios(prev => prev.filter(usuario => usuario.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  const editarUsuario = (id, datosActualizados) => {
    axios.put(`http://localhost:3001/usuarios/${id}`, datosActualizados)
      .then(response => {
        setUsuarios(prev =>
          prev.map(usuario =>
            usuario.id === id ? response.data : usuario
          )
        );
      })
      .catch(error => {
        console.error('Error al editar el usuario:', error);
      });
  };


const agregarVehiculo = (nuevoVehiculo) => {
  axios.post("http://localhost:3001/vehiculos",nuevoVehiculo)
  .then((res)=>setVehiculos(prev =>[...prev,res.data]))
  .catch((error)=>console.error("Error al agregar el vehiculo:",error));
};

const eliminarVehiculo = (id)=>{
  axios.delete("http://localhost:3001/vehiculos/" + id)
  .then(()=>setVehiculos(prev=>prev.filter(rest=>rest.id !== id)))
  .catch((error)=>console.error("Error al eliminar un vehiculo",error));
};

const editarVehiculo = (id,vehiculoActualizado)=>{
  return axios.put("http://localhost:3001/vehiculos/" + id,vehiculoActualizado)
  .then((res)=>setVehiculos(prev=>prev.map(rest=> rest.id == id ? res.data:rest)))
  .catch((error)=>console.error("Error al actualizar el vehiculo",error))
};

  const eliminarConsulta = (placa) => {
    const nuevasConsultas = consultas.filter(c => c.placa !== placa);
    setConsultas(nuevasConsultas);
    localStorage.setItem("consultas", JSON.stringify(nuevasConsultas));

  };

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          {/* Login es la ruta por defecto */}
          <Route path="/" element={<Login usuarios={usuarios} setUsuarioActivo={setUsuarioActivo} />} />

          <Route path="/Inicio" element={<Inicio usuario={usuarioActivo} />} />
          <Route path="/Registro" element={<Registro agregarUsuario={agregarUsuario} usuarios={usuarios} />} />
          <Route path="/MiAutoCheck" element={<MiAutoCheck usuario={usuarioActivo} consultas={consultas} eliminarConsulta={eliminarConsulta} setUsuarioActivo={setUsuarioActivo} setConsultas={setConsultas} />} />
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
          <Route path="/PanelAdmin" element={<PanelAdmin />} />
          <Route path="/GestionZonas" element={<GestionZonas />} />
          <Route path="/ListaUsuarios" element={<ListaUsuarios usuarios={usuarios} eliminarUsuario={eliminarUsuario} editarUsuario={editarUsuario}  agregarUsuario={agregarUsuario}/>} />
          <Route path="/ListaVehiculos" element={<ListaVehiculos vehiculos={vehiculos} eliminarVehiculo={eliminarVehiculo} editarVehiculo={editarVehiculo} />}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
