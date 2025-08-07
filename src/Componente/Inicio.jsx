// Importaciones principales de React
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para navegación programática

// Importaciones de estilos e imágenes
import '../Estilos/Inicio.css'; // Estilos específicos para la pantalla de inicio
import fondo from '../Imagenes/fondo.jpg'; // Imagen de fondo principal
import logo from '../Imagenes/LogoAzul.svg'; // Logo de la aplicación
import mapa from '../Imagenes/mapa.png'; // Imagen del mapa (no se usa en el código actual)
import verificar from '../Imagenes/verificar.png'; // Icono para verificar vehículos
import reportar from '../Imagenes/reportar.png'; // Icono para reportar vehículos
import zonas from '../Imagenes/zonas.png'; // Icono para zonas conflictivas

// Importaciones de componentes modales
import VerificarVehiculo from './VerificarVehiculo';
import ReporteVehiculo from './ReporteVehiculo';
import MapaReportes from './MapaReportes';
import Configuracion from './Configuracion';
import MiZona from './MiZona';

// Importaciones para el mapa interactivo de Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Estilos CSS de Leaflet
import L from 'leaflet'; // Librería principal de Leaflet

// Configuración para arreglar los iconos de Leaflet en React
// Esto soluciona un problema conocido donde los marcadores no se muestran correctamente
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/**
 * Componente Inicio - Pantalla principal de la aplicación AutoCheck
 * @param {Object} usuario - Usuario actualmente logueado
 * @param {Array} vehiculos - Lista de vehículos reportados
 * @param {Array} consultas - Historial de consultas del usuario
 * @param {Function} setConsultas - Función para actualizar las consultas
 * @param {Function} agregarVehiculo - Función para agregar nuevos vehículos
 * @param {Array} barrios - Lista de barrios/zonas disponibles
 * @param {Array} BarriosPeligrosos - Lista de barrios más peligrosos
 * @param {Array} topVehiculos - Lista de vehículos más robados
 * @param {Array} tipoVehiculo - Tipos de vehículos disponibles
 * @param {Array} marcas - Marcas de vehículos disponibles
 */
function Inicio({usuario, vehiculos, consultas, setConsultas, agregarVehiculo, barrios, BarriosPeligrosos, topVehiculos, tipoVehiculo, marcas}) {
  // Hook para navegación entre páginas
  const navigate = useNavigate();
  
  // ========== ESTADOS PARA CONTROLAR MODALES ==========
  // Estados para mostrar/ocultar cada modal de funcionalidad
  const [mostrarVerificarVehiculo, setMostrarVerificarVehiculo] = useState(false);
  const [mostrarReporteVehiculo, setMostrarReporteVehiculo] = useState(false);
  const [mostrarMapaReportes, setMostrarMapaReportes] = useState(false);
  const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
  const [mostrarMiZona, setMostrarMiZona] = useState(false);
  
  // ========== ESTADOS PARA GEOLOCALIZACIÓN ==========
  // Estados para manejar la ubicación del usuario en el mapa
  const [ubicacionUsuario, setUbicacionUsuario] = useState(null); // Coordenadas del usuario
  const [cargandoUbicacion, setCargandoUbicacion] = useState(true); // Estado de carga
  const [errorUbicacion, setErrorUbicacion] = useState(null); // Mensajes de error

  // ========== EFECTO PARA OBTENER GEOLOCALIZACIÓN ==========
  // useEffect que se ejecuta al montar el componente para obtener la ubicación del usuario
  useEffect(() => {
    // Verificar si el navegador soporta geolocalización
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Función de éxito: se ejecuta cuando se obtiene la ubicación
        (position) => {
          setUbicacionUsuario({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setCargandoUbicacion(false);
        },
        // Función de error: se ejecuta si falla la geolocalización
        (error) => {
          console.error("Error obteniendo ubicación:", error);
          // Establecer ubicación por defecto en Quito, Ecuador
          setUbicacionUsuario({
            lat: -0.2201641,
            lng: -78.5123274
          });
          setErrorUbicacion("No se pudo obtener tu ubicación. Mostrando Quito por defecto.");
          setCargandoUbicacion(false);
        },
        // Opciones de configuración para la geolocalización
        {
          enableHighAccuracy: true, // Solicitar alta precisión
          timeout: 10000, // Tiempo límite de 10 segundos
          maximumAge: 60000 // Usar ubicación guardada si es menor a 1 minuto
        }
      );
    } else {
      // Si el navegador no soporta geolocalización, usar ubicación por defecto
      setUbicacionUsuario({
        lat: -0.2201641,
        lng: -78.5123274
      });
      setErrorUbicacion("Tu navegador no soporta geolocalización. Mostrando Quito por defecto.");
      setCargandoUbicacion(false);
    }
  }, []); // Array vacío significa que solo se ejecuta una vez al montar

  // ========== FUNCIONES PARA MANEJAR MODALES ==========
  
  /**
   * Función para abrir el modal de verificar vehículo
   */
  const abrirVerificarVehiculo = () => {
    setMostrarVerificarVehiculo(true);
  };

  /**
   * Función para cerrar el modal de verificar vehículo
   */
  const cerrarVerificarVehiculo = () => {
    setMostrarVerificarVehiculo(false);
  };

  /**
   * Función para abrir el modal de reportar vehículo
   */
  const abrirReporteVehiculo = () => {
    setMostrarReporteVehiculo(true);
  };

  /**
   * Función para cerrar el modal de reportar vehículo
   */
  const cerrarReporteVehiculo = () => {
    setMostrarReporteVehiculo(false);
  };

  /**
   * Función para abrir el modal de mapa de reportes
   */
  const abrirMapaReportes = () => {
    setMostrarMapaReportes(true);
  };

  /**
   * Función para cerrar el modal de mapa de reportes
   */
  const cerrarMapaReportes = () => {
    setMostrarMapaReportes(false);
  };

  /**
   * Función para abrir el modal de configuración
   */
  const abrirConfiguracion = () => {
    setMostrarConfiguracion(true);
  };

  /**
   * Función para cerrar el modal de configuración
   */
  const cerrarConfiguracion = () => {
    setMostrarConfiguracion(false);
  };

  // ========== RENDERIZADO DEL COMPONENTE ==========
  
  return (
    // Contenedor principal con imagen de fondo
    <div className="home-container" style={{ backgroundImage: `url(${fondo})` }}>
      {/* ========== BARRA DE NAVEGACIÓN SUPERIOR ========== */}
      <div className="header-menu">
        {/* Contenedor del logo */}
        <div className="logo-container">
          <img src={logo} alt="Logo AutoCheck" className="logo-img" />
          <span className="logo-text">AutoCheck</span>
        </div>
        
        {/* Menú de navegación */}
        <div className="nav-box">
          <span className="nav-item" onClick={() => navigate('/')}>🚪 Salir</span>
          <span className="nav-item" onClick={() => navigate('/ForoVecinal')}>💬 Foro Vecinal</span>
          <span className="nav-item" onClick={() => navigate('/MiAutoCheck')}>🚗 MiAutoCheck</span>
          {/* Mostrar opción de administrador solo si el usuario tiene ese rol */}
          {usuario && usuario.rol === 'administrador' && (
            <span className="nav-item" onClick={() => navigate('/PanelAdmin')}>👤 Administrador</span>
          )}
        </div>
      </div>

      {/* ========== CONTENIDO PRINCIPAL ========== */}
      <main className="main-content">
        {/* Título y subtítulo principales */}
        <h1>Protege tu Comunidad</h1>
        <p className="subtitulo">Verifica, Reporta y Mantente Informado</p>

        {/* ========== CONTENEDOR DEL MAPA INTERACTIVO ========== */}
        <div className="mapa-container">
          {cargandoUbicacion ? (
            // Mostrar mensaje de carga mientras se obtiene la ubicación
            <div className="mapa-cargando">
              <p>Obteniendo tu ubicación...</p>
            </div>
          ) : (
            // Mostrar mapa interactivo cuando ya se tiene la ubicación
            <div className="mapa-interactivo">
              <MapContainer 
                center={[ubicacionUsuario.lat, ubicacionUsuario.lng]} // Centrar en ubicación del usuario
                zoom={18} // Nivel de zoom alto para mostrar detalles
                style={{ height: '300px', width: '100%', borderRadius: '15px' }}
                scrollWheelZoom={false} // Deshabilitar zoom con rueda del mouse
              >
                {/* Capa de tiles del mapa base */}
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* Marcador en la ubicación del usuario */}
                <Marker position={[ubicacionUsuario.lat, ubicacionUsuario.lng]}>
                  <Popup>
                    <div>
                      <strong>Tu ubicación actual</strong><br/>
                      {errorUbicacion ? errorUbicacion : "Estás aquí"}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
              {/* Mostrar mensaje de error si hubo problemas con la geolocalización */}
              {errorUbicacion && (
                <div className="mapa-error">
                  <small>{errorUbicacion}</small>
                </div>
              )}
            </div>
          )}
          {/* Botón para acceder a "Mi zona" */}
          <button className="btn-mizona" onClick={() => setMostrarMiZona(true)}>Mi zona</button>
        </div>

        {/* ========== OPCIONES PRINCIPALES ========== */}
        {/* Grid con las tres funcionalidades principales de la aplicación */}
        <div className="opciones">
          {/* Opción 1: Verificar si un vehículo está reportado */}
          <div className="opcion" onClick={abrirVerificarVehiculo}>
            <img src={verificar} alt="Verificar Vehículo"  />
            <p>Verificar Vehículo</p>
          </div>
          
          {/* Opción 2: Reportar un vehículo robado */}
          <div className="opcion" onClick={abrirReporteVehiculo}>
            <img src={reportar} alt="Reportar Vehículo" />
            <p>Reportar Vehículo</p>
          </div>
          
          {/* Opción 3: Ver mapa de zonas conflictivas */}
          <div className="opcion" onClick={abrirMapaReportes}>
            <img src={zonas} alt="Zonas Conflictivas" />
            <p>Mapa de Zonas Conflictivas</p>
          </div>
        </div>
      </main>

      {/* ========== PIE DE PÁGINA ========== */}
      <footer className="footer">
        <span>AutoCheck</span>
        <span>Juntos hacemos las calles más seguras</span>
      </footer>

      {/* ========== MODALES CONDICIONALES ========== */}
      {/* Los siguientes modales se muestran solo cuando su estado correspondiente es true */}
      
      {/* Modal para verificar vehículos */}
      {mostrarVerificarVehiculo && (
        <VerificarVehiculo 
          vehiculos={vehiculos}
          consultas={consultas}
          setConsultas={setConsultas}
          onClose={cerrarVerificarVehiculo}
        />
      )}

      {/* Modal para reportar vehículos */}
      {mostrarReporteVehiculo && (
        <ReporteVehiculo 
          agregarVehiculo={agregarVehiculo}
          tipoVehiculo={tipoVehiculo}
          barrios={barrios}
          marcas={marcas}
          onClose={cerrarReporteVehiculo}
        />
      )}

      {/* Modal para ver mapa de reportes y zonas conflictivas */}
      {mostrarMapaReportes && (
        <MapaReportes 
          BarriosPeligrosos={BarriosPeligrosos || []} // Usar array vacío como fallback
          topVehiculos={topVehiculos || []} // Usar array vacío como fallback
          onClose={cerrarMapaReportes}
        />
      )}

      {/* Modal para configuración de la aplicación */}
      {mostrarConfiguracion && (
        <Configuracion 
          onClose={cerrarConfiguracion}
        />
      )}

      {/* Modal para gestionar "Mi Zona" */}
      {mostrarMiZona && (
        <MiZona 
          barrios={barrios}
          onClose={() => setMostrarMiZona(false)}
        />
      )}
    </div>
  );
}

// Exportar el componente para poder usarlo en otras partes de la aplicación
export default Inicio;
