// Importaciones principales
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

// Importación de todos los componentes de la aplicación
import Inicio from './Componente/Inicio.jsx';
import Login from './Componente/Login.jsx';
import Registro from './Componente/Registro.jsx';
import MiAutoCheck from './Componente/MiAutoCheck.jsx';
import ForoVecinal from './Componente/ForoVecinal.jsx';
import MapaReportes from './Componente/MapaReportes.jsx';
import ReporteVehiculo from './Componente/ReporteVehiculo.jsx';
import VerificarVehiculo from './Componente/VerificarVehiculo.jsx';
import Configuracion from './Componente/Configuracion.jsx';
import RecuperacionContra from './Componente/RecuperacionContra.jsx';
import PanelAdmin from './Componente/PanelAdmin.jsx';
import GestionZonas from './Componente/GestionZonas.jsx';
import ListaUsuarios from './Componente/ListaUsuarios.jsx';
import ListaVehiculos from './Componente/ListaVehiculos.jsx';

// Importación de axios para realizar peticiones HTTP a la API
import axios from 'axios';

/**
 * Componente principal de la aplicación
 * Maneja todo el estado global y las comunicaciones con la API
 * Distribuye datos y funciones a todos los componentes hijos
 */
function App() {

  // ========== EFECTOS PARA CARGAR DATOS DE LA API ==========
  
  // useEffect #1: Cargar lista de usuarios al iniciar la aplicación
  useEffect(() => {
    axios.get('http://172.29.49.83:8000/api/usuarios')
      .then(response => {
        setUsuarios(response.data);
        console.log('Usuarios obtenidos:', response.data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      })
  }, []); // Se ejecuta solo una vez al montar el componente

  // useEffect #2: Cargar lista de vehículos
  useEffect(()=>{
    axios.get("http://172.29.49.83:8000/api/vehiculos")
    .then(res =>{
      setVehiculos(res.data);
    })
    .catch(error =>{
      console.error("Error al obtener los vehiculos",error);
    })
  },[]);

  // useEffect #3: Cargar lista de barrios/zonas
  useEffect(()=>{
    axios.get("http://172.29.49.83:8000/api/barrios")
    .then(res =>{
      setBarrios(res.data);
    })
    .catch(error =>{
      console.error("Error al obtener los barrios",error);
    })
  },[]);

  // useEffect #4: Cargar tipos de vehículo (auto, moto, etc.)
  useEffect(()=>{
    axios.get("http://172.29.49.83:8000/api/tiposVehiculo")
    .then(res =>{
      console.log("Tipos de vehículo obtenidos del API:", res.data);
      setTipoVehiculo(res.data);
    })
    .catch(error =>{
      console.error("Error al obtener los tipos de vehiculo",error);
    })
  },[]);

  // useEffect #5: Cargar marcas de vehículos
  useEffect(()=>{
    axios.get("http://172.29.49.83:8000/api/marcas")
    .then(res =>{
      console.log("Marcas obtenidas del API:", res.data);
      setMarcas(res.data);
    })
    .catch(error =>{
      console.error("Error al obtener las marcas",error);
    })
  },[]);

  // useEffect #6: Cargar sectores geográficos
  useEffect(()=>{
    axios.get("http://172.29.49.83:8000/api/sectores")
    .then(res =>{
      console.log("Sectores obtenidos del API:", res.data);
      setSectores(res.data);
    })
    .catch(error =>{
      console.error("Error al obtener los sectores",error);
    })
  },[]);

  // useEffect #7: Cargar niveles de riesgo para los barrios
  useEffect(()=>{
    axios.get("http://172.29.49.83:8000/api/nivelesRiesgo")
    .then(res =>{
      console.log("Niveles de riesgo obtenidos del API:", res.data);
      setNivelesRiesgo(res.data);
    })
    .catch(error =>{
      console.error("Error al obtener los niveles de riesgo",error);
    })
  },[]);

  // useEffect #8: Cargar estadísticas de barrios más peligrosos
  useEffect(() => {
    axios.get("http://172.29.49.83:8000/api/top/barrios")
      .then(res => {
        setTopBarrios(res.data);
      })
      .catch(error => {
        console.error("Error al obtener los top barrios:", error);
      });
  }, []);

  // useEffect #9: Cargar estadísticas de vehículos más robados
  useEffect(() => {
    axios.get("http://172.29.49.83:8000/api/top/vehiculos")
      .then(res => {
        setTopVehiculos(res.data);
      })
      .catch(error => {
        console.error("Error al obtener los top vehiculos:", error);
      });
  }, []);

  // useEffect #10: Cargar tipos de incidentes para el foro
  useEffect(()=>{
    axios.get("http://172.29.49.83:8000/api/tipo-incidente")
    .then(res =>{
      console.log("Tipos de incidente obtenidos del API:", res.data);
      setTipoIncidente(res.data);
    })
    .catch(error =>{
      console.error("Error al obtener los tipos de incidente",error);
    })
  },[]);

  // useEffect #11: Cargar publicaciones del foro vecinal
  useEffect(()=>{
    axios.get("http://172.29.49.83:8000/api/publicaciones")
    .then(res =>{
      console.log("Publicaciones obtenidas del API:", res.data);
      setPublicaciones(res.data);
    })
    .catch(error =>{
      console.error("Error al obtener las publicaciones",error);
    })
  },[]);

  // ========== ESTADOS PARA ALMACENAR TODOS LOS DATOS ==========
  
  // Estados para entidades principales
  const [usuarios, setUsuarios] = useState([]); // Lista de todos los usuarios registrados
  const [vehiculos, setVehiculos] = useState([]); // Lista de todos los vehículos reportados
  const [barrios, setBarrios] = useState([]); // Lista de todos los barrios/zonas
  const [publicaciones, setPublicaciones] = useState([]); // Publicaciones del foro vecinal

  // Estados para datos de catálogo (combos/selects)
  const [tipoVehiculo, setTipoVehiculo] = useState([]); // Tipos: auto, moto, camión, etc.
  const [marcas, setMarcas] = useState([]); // Marcas de vehículos: Toyota, Chevrolet, etc.
  const [sectores, setSectores] = useState([]); // Sectores geográficos
  const [nivelesRiesgo, setNivelesRiesgo] = useState([]); // Niveles de riesgo: alto, medio, bajo
  const [tipoIncidente, setTipoIncidente] = useState([]); // Tipos de incidentes para el foro

  // Estados para estadísticas y rankings
  const [topBarrios, setTopBarrios] = useState([]); // Barrios más peligrosos
  const [topVehiculos, setTopVehiculos] = useState([]); // Vehículos más robados

  // Debug: Imprimir algunos datos importantes en consola
  console.log(vehiculos);
  console.log(barrios);

  // Estados para manejo de sesión y datos locales
  const [usuarioActivo, setUsuarioActivo] = useState(
    JSON.parse(localStorage.getItem('usuarioActivo')) || null // Usuario logueado actualmente
  );
  const [consultas, setConsultas] = useState(
    JSON.parse(localStorage.getItem('consultas')) || [] // Historial de consultas de vehículos
  );

  // ========== FUNCIONES CRUD PARA USUARIOS ==========

  /**
   * Agregar un nuevo usuario al sistema
   * @param {Object} nuevo - Datos del nuevo usuario
   * @returns {Promise} - Promesa con el resultado de la operación
   */
  const agregarUsuario = (nuevo) => {
    console.log("Nuevo usuario a agregar:", nuevo);
    return axios.post('http://172.29.49.83:8000/api/usuarios', nuevo)
      .then(response => {
        setUsuarios(prev => [...prev, response.data]); // Actualizar estado local
        return response.data;
      })
      .catch(error => {
        console.error('Error al agregar el usuario:', error);
        throw error;
      });
  };

  /**
   * Eliminar un usuario del sistema
   * @param {string} id - ID del usuario a eliminar
   */
  const eliminarUsuario = (id) => {
    axios.delete(`http://172.29.49.83:8000/api/usuarios/${id}`)
      .then(() => {
        setUsuarios(prev => prev.filter(usuario => usuario._id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  /**
   * Editar datos de un usuario existente
   * @param {string} id - ID del usuario a editar
   * @param {Object} datosActualizados - Nuevos datos del usuario
   */
  const editarUsuario = (id, datosActualizados) => {
    axios.put(`http://172.29.49.83:8000/api/usuarios/${id}`, datosActualizados)
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

// ========== FUNCIONES CRUD PARA VEHÍCULOS ==========

/**
 * Agregar un nuevo vehículo reportado
 * @param {Object} nuevoVehiculo - Datos del vehículo a reportar
 */
const agregarVehiculo = (nuevoVehiculo) => {
  axios.post("http://172.29.49.83:8000/api/vehiculos",nuevoVehiculo)
  .then((res)=>setVehiculos(prev =>[...prev,res.data])) // Actualizar lista local
  .catch((error)=>console.error("Error al agregar el vehiculo:",error));
};

/**
 * Eliminar un vehículo del sistema
 * @param {string} id - ID del vehículo a eliminar
 */
const eliminarVehiculo = (id)=>{
  axios.delete("http://172.29.49.83:8000/api/vehiculos/" + id)
  .then(()=>setVehiculos(prev=>prev.filter(rest=>rest._id !== id)))
  .catch((error)=>console.error("Error al eliminar un vehiculo",error));
};

/**
 * Editar datos de un vehículo existente
 * @param {string} id - ID del vehículo a editar
 * @param {Object} vehiculoActualizado - Nuevos datos del vehículo
 * @returns {Promise} - Promesa con el resultado de la operación
 */
const editarVehiculo = (id,vehiculoActualizado)=>{
  return axios.put("http://172.29.49.83:8000/api/vehiculos/" + id,vehiculoActualizado)
  .then((res)=>setVehiculos(prev=>prev.map(rest=> rest._id == id ? res.data:rest)))
  .catch((error)=>console.error("Error al actualizar el vehiculo",error))
};

// ========== FUNCIONES CRUD PARA BARRIOS/ZONAS ==========

/**
 * Agregar un nuevo barrio al sistema
 * @param {Object} nuevoBarrio - Datos del nuevo barrio
 */
const agregarBarrio = (nuevoBarrio) => {
  axios.post("http://172.29.49.83:8000/api/barrios", nuevoBarrio)
    .then((res) => setBarrios(prev => [...prev, res.data]))
    .catch((error) => console.error("Error al agregar el barrio:", error));
};

/**
 * Eliminar un barrio del sistema
 * @param {string} id - ID del barrio a eliminar
 */
const eliminarBarrio = (id) => {
  axios.delete(`http://172.29.49.83:8000/api/barrios/${id}`)
    .then(() => setBarrios(prev => prev.filter(barrio => barrio._id !== id)))
    .catch((error) => console.error("Error al eliminar el barrio:", error));
};

/**
 * Editar datos de un barrio existente
 * @param {string} id - ID del barrio a editar
 * @param {Object} barrioActualizado - Nuevos datos del barrio
 * @returns {Promise} - Promesa con el resultado de la operación
 */
const editarBarrio = (id, barrioActualizado) => {
  return axios.put(`http://172.29.49.83:8000/api/barrios/${id}`, barrioActualizado)
    .then((res) => setBarrios(prev => prev.map(barrio => barrio._id === id ? res.data : barrio)))
    .catch((error) => console.error("Error al actualizar el barrio:", error));
};

// ========== FUNCIONES PARA PUBLICACIONES DEL FORO ==========

/**
 * Agregar una nueva publicación al foro vecinal
 * @param {Object} nuevaPublicacion - Datos de la nueva publicación
 * @returns {Promise} - Promesa con el resultado de la operación
 */
const agregarPublicacion = (nuevaPublicacion) => {
  return axios.post("http://172.29.49.83:8000/api/publicaciones", nuevaPublicacion)
    .then((res) => {
      setPublicaciones(prev => [res.data, ...prev]); // Añadir al inicio para que aparezca primero
      return res.data;
    })
    .catch((error) => {
      console.error("Error al agregar la publicación:", error);
      throw error;
    });
};

// ========== FUNCIONES PARA CONSULTAS DE VEHÍCULOS ==========

/**
 * Eliminar una consulta del historial local
 * @param {string} placa - Placa del vehículo consultado
 */
const eliminarConsulta = (placa) => {
  const nuevasConsultas = consultas.filter(c => c.placa !== placa);
  setConsultas(nuevasConsultas);
  localStorage.setItem("consultas", JSON.stringify(nuevasConsultas)); // Persistir en localStorage
};

  // ========== RENDERIZADO DE LA APLICACIÓN ==========
  
  return (
    <div className="App">
      {/* Router principal que maneja toda la navegación */}
      <BrowserRouter>
        <Routes>
          {/* ========== RUTAS PRINCIPALES ========== */}
          
          {/* Ruta por defecto: Login */}
          <Route path="/" element={<Login usuarios={usuarios} setUsuarioActivo={setUsuarioActivo} />} />

          {/* Pantalla principal con estadísticas y funcionalidades */}
          <Route path="/Inicio" element={<Inicio usuario={usuarioActivo} vehiculos={vehiculos} consultas={consultas} setConsultas={setConsultas} agregarVehiculo={agregarVehiculo} barrios={barrios} BarriosPeligrosos={topBarrios} topVehiculos={topVehiculos} tipoVehiculo={tipoVehiculo} marcas={marcas} />} />
          
          {/* Registro de nuevos usuarios */}
          <Route path="/Registro" element={<Registro agregarUsuario={agregarUsuario} usuarios={usuarios} />} />
          
          {/* Perfil de usuario y consultas */}
          <Route path="/MiAutoCheck" element={<MiAutoCheck usuario={usuarioActivo} consultas={consultas} eliminarConsulta={eliminarConsulta} setUsuarioActivo={setUsuarioActivo} setConsultas={setConsultas} />} />
          
          {/* Foro vecinal para reportes comunitarios */}
          <Route path="/ForoVecinal" element={<ForoVecinal barrios={barrios} tipoIncidente={tipoIncidente} usuario={usuarioActivo} publicaciones={publicaciones} agregarPublicacion={agregarPublicacion} />} />
          
          {/* Reportar un vehículo robado */}
          <Route path="/ReporteVehiculo" element={<ReporteVehiculo agregarVehiculo={agregarVehiculo} tipoVehiculo={tipoVehiculo} barrios={barrios} marcas={marcas} />} />
          
          {/* Mapa interactivo con zonas de riesgo */}
          <Route path="/MapaReportes" element={<MapaReportes BarriosPeligrosos={topBarrios} topVehiculos={topVehiculos} />} />
          
          {/* Verificar si un vehículo está reportado */}
          <Route path="/VerificarVehiculo" element={<VerificarVehiculo vehiculos={vehiculos} consultas={consultas} setConsultas={setConsultas} />} />
          
          {/* Configuración de la aplicación */}
          <Route path="/Configuracion" element={<Configuracion />} />
          
          {/* Recuperación de contraseña */}
          <Route path="/RecuperacionContra" element={<RecuperacionContra usuarios={usuarios} />} />
          
          {/* ========== RUTAS DE ADMINISTRACIÓN ========== */}
          
          {/* Panel principal de administración */}
          <Route path="/PanelAdmin" element={<PanelAdmin />} />
          
          {/* Gestión de zonas/barrios */}
          <Route path="/GestionZonas" element={<GestionZonas barrios={barrios} agregarBarrio={agregarBarrio} eliminarBarrio={eliminarBarrio} editarBarrio={editarBarrio} sectores={sectores} nivelesRiesgo={nivelesRiesgo} />} />
          
          {/* Lista y gestión de usuarios */}
          <Route path="/ListaUsuarios" element={<ListaUsuarios usuarios={usuarios} eliminarUsuario={eliminarUsuario} editarUsuario={editarUsuario}  agregarUsuario={agregarUsuario}/>} />
          
          {/* Lista y gestión de vehículos reportados */}
          <Route path="/ListaVehiculos" element={<ListaVehiculos vehiculos={vehiculos} eliminarVehiculo={eliminarVehiculo} editarVehiculo={editarVehiculo} agregarVehiculo={agregarVehiculo} tipoVehiculo={tipoVehiculo} marcas={marcas} barrios={barrios} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
