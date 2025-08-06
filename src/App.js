import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Inicio from './Componente/Inicio.jsx';
import Login from './Componente/Login.jsx';
import Registro from './Componente/Registro.jsx';
import MiAutoCheck from './Componente/MiAutoCheck.jsx';
import ForoVecinal from './Componente/ForoVecinal.jsx';
import MapaReportes from './Componente/MapaReportes.jsx';
import ReporteVehiculo from './Componente/ReporteVehiculo.jsx';
import VerificarVehiculo from './Componente/VerificarVehiculo.jsx';
import Configuracion from './Componente/Configuracion.jsx';
import MiZona from './Componente/MiZona.jsx';
import RecuperacionContra from './Componente/RecuperacionContra.jsx';
import PanelAdmin from './Componente/PanelAdmin.jsx';
import axios from 'axios';
import GestionZonas from './Componente/GestionZonas.jsx';
import ListaUsuarios from './Componente/ListaUsuarios.jsx';
import ListaVehiculos from './Componente/ListaVehiculos.jsx';

function App() {

  useEffect(() => {
    axios.get('http://localhost:8000/api/usuarios')
      .then(response => {
        setUsuarios(response.data);
        console.log('Usuarios obtenidos:', response.data);
      })
      .catch(error => {

        console.error('Error al obtener los usuarios:', error);
      })

  }, []);

  useEffect(()=>{
    axios.get("http://localhost:8000/api/vehiculos")
    .then(res =>{
      setVehiculos(res.data);
    })
    .catch(error =>{
      console.error("Error al obtener los vehiculos",error);
    })

  },[]);

  useEffect(()=>{
    axios.get("http://localhost:8000/api/barrios")
    .then(res =>{
      setBarrios(res.data);
    })
    .catch(error =>{
      console.error("Error al obtener los barrios",error);
    })

  },[]);

  useEffect(()=>{
    axios.get("http://localhost:8000/api/tiposVehiculo")
    .then(res =>{
      console.log("Tipos de vehículo obtenidos del API:", res.data);
      setTipoVehiculo(res.data);
    })
    .catch(error =>{
      console.error("Error al obtener los tipos de vehiculo",error);
    })

  },[]);

  useEffect(()=>{
    axios.get("http://localhost:8000/api/marcas")
    .then(res =>{
      console.log("Marcas obtenidas del API:", res.data);
      setMarcas(res.data);
    })
    .catch(error =>{
      console.error("Error al obtener las marcas",error);
    })

  },[]);


  useEffect(() => {
    axios.get("http://localhost:8000/api/top/barrios")
      .then(res => {
        setTopBarrios(res.data);
      })
      .catch(error => {
        console.error("Error al obtener los top barrios:", error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/top/vehiculos")
      .then(res => {
        setTopVehiculos(res.data);
      })
      .catch(error => {
        console.error("Error al obtener los top vehiculos:", error);
      });
  }, []);


  const [usuarios, setUsuarios] = useState([]);

  const [vehiculos, setVehiculos] = useState([]);

  const [barrios, setBarrios] = useState([]);

  const [tipoVehiculo, setTipoVehiculo] = useState([]);

  const [marcas, setMarcas] = useState([]);

  const [topBarrios, setTopBarrios] = useState([]);

  const [topVehiculos, setTopVehiculos] = useState([]);

  console.log(vehiculos);
  console.log(barrios);

  const [usuarioActivo, setUsuarioActivo] = useState(
    JSON.parse(localStorage.getItem('usuarioActivo')) || null
  );
  const [consultas, setConsultas] = useState(
    JSON.parse(localStorage.getItem('consultas')) || []
  );


  const agregarUsuario = (nuevo) => {
    console.log("Nuevo usuario a agregar:", nuevo);
    return axios.post('http://localhost:8000/api/usuarios', nuevo)
      .then(response => {
        setUsuarios(prev => [...prev, response.data]);
        return response.data;
      })
      .catch(error => {
        console.error('Error al agregar el usuario:', error);
        throw error;
      });
  };

  const eliminarUsuario = (id) => {
    axios.delete(`http://localhost:8000/api/usuarios/${id}`)
      .then(() => {
        setUsuarios(prev => prev.filter(usuario => usuario._id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  const editarUsuario = (id, datosActualizados) => {
    axios.put(`http://localhost:8000/api/usuarios/${id}`, datosActualizados)
      .then(response => {
        setUsuarios(prev =>
          prev.map(usuario =>
            usuario._id === id ? response.data : usuario
          )
        );
      })
      .catch(error => {
        console.error('Error al editar el usuario:', error);
      });
  };


const agregarVehiculo = (nuevoVehiculo) => {
  axios.post("http://localhost:8000/api/vehiculos",nuevoVehiculo)
  .then((res)=>setVehiculos(prev =>[...prev,res.data]))
  .catch((error)=>console.error("Error al agregar el vehiculo:",error));
};

const eliminarVehiculo = (id)=>{
  axios.delete("http://localhost:8000/api/vehiculos/" + id)
  .then(()=>setVehiculos(prev=>prev.filter(rest=>rest._id !== id)))
  .catch((error)=>console.error("Error al eliminar un vehiculo",error));
};

const editarVehiculo = (id,vehiculoActualizado)=>{
  return axios.put("http://localhost:8000/api/vehiculos/" + id,vehiculoActualizado)
  .then((res)=>setVehiculos(prev=>prev.map(rest=> rest._id == id ? res.data:rest)))
  .catch((error)=>console.error("Error al actualizar el vehiculo",error))
};

const agregarBarrio = (nuevoBarrio) => {
  axios.post("http://localhost:8000/api/barrios", nuevoBarrio)
    .then((res) => setBarrios(prev => [...prev, res.data]))
    .catch((error) => console.error("Error al agregar el barrio:", error));
};

const eliminarBarrio = (id) => {
  axios.delete(`http://localhost:8000/api/barrios/${id}`)
    .then(() => setBarrios(prev => prev.filter(barrio => barrio._id !== id)))
    .catch((error) => console.error("Error al eliminar el barrio:", error));
};

const editarBarrio = (id, barrioActualizado) => {
  return axios.put(`http://localhost:8000/api/barrios/${id}`, barrioActualizado)
    .then((res) => setBarrios(prev => prev.map(barrio => barrio._id === id ? res.data : barrio)))
    .catch((error) => console.error("Error al actualizar el barrio:", error));
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

          <Route path="/Inicio" element={<Inicio usuario={usuarioActivo} vehiculos={vehiculos} consultas={consultas} setConsultas={setConsultas} agregarVehiculo={agregarVehiculo} barrios={barrios} BarriosPeligrosos={topBarrios} topVehiculos={topVehiculos} tipoVehiculo={tipoVehiculo} marcas={marcas} />} />
          <Route path="/Registro" element={<Registro agregarUsuario={agregarUsuario} usuarios={usuarios} />} />
          <Route path="/MiAutoCheck" element={<MiAutoCheck usuario={usuarioActivo} consultas={consultas} eliminarConsulta={eliminarConsulta} setUsuarioActivo={setUsuarioActivo} setConsultas={setConsultas} />} />
          <Route path="/ForoVecinal" element={<ForoVecinal />} />
          <Route path="/ReporteVehiculo" element={<ReporteVehiculo agregarVehiculo={agregarVehiculo} tipoVehiculo={tipoVehiculo} barrios={barrios} marcas={marcas} />} />
          <Route path="/MapaReportes" element={<MapaReportes BarriosPeligrosos={topBarrios} topVehiculos={topVehiculos} />} />
          <Route path="/VerificarVehiculo" element={<VerificarVehiculo vehiculos={vehiculos} consultas={consultas} setConsultas={setConsultas} />} />
          <Route path="/Configuracion" element={<Configuracion />} />
          <Route path="/MiZona" element={<MiZona barrios={barrios} />} />
          <Route path="/RecuperacionContra" element={<RecuperacionContra usuarios={usuarios} />} />
          <Route path="/PanelAdmin" element={<PanelAdmin />} />
          <Route path="/GestionZonas" element={<GestionZonas barrios={barrios} agregarBarrio={agregarBarrio} eliminarBarrio={eliminarBarrio} editarBarrio={editarBarrio} />} />
          <Route path="/ListaUsuarios" element={<ListaUsuarios usuarios={usuarios} eliminarUsuario={eliminarUsuario} editarUsuario={editarUsuario}  agregarUsuario={agregarUsuario}/>} />
          <Route path="/ListaVehiculos" element={<ListaVehiculos vehiculos={vehiculos} eliminarVehiculo={eliminarVehiculo} editarVehiculo={editarVehiculo} agregarVehiculo={agregarVehiculo} />}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
