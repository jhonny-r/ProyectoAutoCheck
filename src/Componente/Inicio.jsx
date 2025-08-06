import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Estilos/Inicio.css';
import fondo from '../Imagenes/fondo.jpg';
import logo from '../Imagenes/LogoAzul.svg';
import mapa from '../Imagenes/mapa.png';
import verificar from '../Imagenes/verificar.png';
import reportar from '../Imagenes/reportar.png';
import zonas from '../Imagenes/zonas.png';
import VerificarVehiculo from './VerificarVehiculo';
import ReporteVehiculo from './ReporteVehiculo';
import MapaReportes from './MapaReportes';
import Configuracion from './Configuracion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para los iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Inicio({usuario, vehiculos, consultas, setConsultas, agregarVehiculo, barrios, BarriosPeligrosos, topVehiculos, tipoVehiculo, marcas}) {
  const navigate = useNavigate();
  const [mostrarVerificarVehiculo, setMostrarVerificarVehiculo] = useState(false);
  const [mostrarReporteVehiculo, setMostrarReporteVehiculo] = useState(false);
  const [mostrarMapaReportes, setMostrarMapaReportes] = useState(false);
  const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
  
  // Estados para la ubicación del usuario
  const [ubicacionUsuario, setUbicacionUsuario] = useState(null);
  const [cargandoUbicacion, setCargandoUbicacion] = useState(true);
  const [errorUbicacion, setErrorUbicacion] = useState(null);

  // useEffect para obtener la ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUbicacionUsuario({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setCargandoUbicacion(false);
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
          // Ubicación por defecto (Quito, Ecuador)
          setUbicacionUsuario({
            lat: -0.2201641,
            lng: -78.5123274
          });
          setErrorUbicacion("No se pudo obtener tu ubicación. Mostrando Quito por defecto.");
          setCargandoUbicacion(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      // Geolocalización no soportada
      setUbicacionUsuario({
        lat: -0.2201641,
        lng: -78.5123274
      });
      setErrorUbicacion("Tu navegador no soporta geolocalización. Mostrando Quito por defecto.");
      setCargandoUbicacion(false);
    }
  }, []);

  const abrirVerificarVehiculo = () => {
    setMostrarVerificarVehiculo(true);
  };

  const cerrarVerificarVehiculo = () => {
    setMostrarVerificarVehiculo(false);
  };

  const abrirReporteVehiculo = () => {
    setMostrarReporteVehiculo(true);
  };

  const cerrarReporteVehiculo = () => {
    setMostrarReporteVehiculo(false);
  };

  const abrirMapaReportes = () => {
    setMostrarMapaReportes(true);
  };

  const cerrarMapaReportes = () => {
    setMostrarMapaReportes(false);
  };

  const abrirConfiguracion = () => {
    setMostrarConfiguracion(true);
  };

  const cerrarConfiguracion = () => {
    setMostrarConfiguracion(false);
  };

  return (
    <div className="home-container" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="header-menu">
        <div className="logo-container">
          <img src={logo} alt="Logo AutoCheck" className="logo-img" />
          <span className="logo-text">AutoCheck</span>
        </div>
        <div className="nav-box">
          <span className="nav-item" onClick={() => navigate('/')}>🏠 Salir</span>
          <span className="nav-item" onClick={() => navigate('/ForoVecinal')}>💬 Foro Vecinal</span>
          <span className="nav-item" onClick={() => navigate('/MiAutoCheck')}>🚗 MiAutoCheck</span>
          {usuario && usuario.rol === 'administrador' && (
            <span className="nav-item" onClick={() => navigate('/PanelAdmin')}>👤 Administrador</span>
          )}
        </div>
      </div>

      <main className="main-content">
        <h1>Protege tu Comunidad</h1>
        <p className="subtitulo">Verifica, Reporta y Mantente Informado</p>

        <div className="mapa-container">
          {cargandoUbicacion ? (
            <div className="mapa-cargando">
              <p>Obteniendo tu ubicación...</p>
            </div>
          ) : (
            <div className="mapa-interactivo">
              <MapContainer 
                center={[ubicacionUsuario.lat, ubicacionUsuario.lng]} 
                zoom={18} 
                style={{ height: '300px', width: '100%', borderRadius: '15px' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[ubicacionUsuario.lat, ubicacionUsuario.lng]}>
                  <Popup>
                    <div>
                      <strong>Tu ubicación actual</strong><br/>
                      {errorUbicacion ? errorUbicacion : "Estás aquí"}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
              {errorUbicacion && (
                <div className="mapa-error">
                  <small>{errorUbicacion}</small>
                </div>
              )}
            </div>
          )}
          <button className="btn-mizona" onClick={() => navigate('/MiZona')}>Mi zona</button>
        </div>

        <div className="opciones">
          <div className="opcion" onClick={abrirVerificarVehiculo}>
            <img src={verificar} alt="Verificar Vehículo"  />
            <p>Verificar Vehículo</p>
          </div>
          <div className="opcion" onClick={abrirReporteVehiculo}>
            <img src={reportar} alt="Reportar Vehículo" />
            <p>Reportar Vehículo</p>
          </div>
          <div className="opcion" onClick={abrirMapaReportes}>
            <img src={zonas} alt="Zonas Conflictivas" />
            <p>Mapa de Zonas Conflictivas</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <span>AutoCheck</span>
        <span>Juntos hacemos las calles más seguras</span>
      </footer>

      {mostrarVerificarVehiculo && (
        <VerificarVehiculo 
          vehiculos={vehiculos}
          consultas={consultas}
          setConsultas={setConsultas}
          onClose={cerrarVerificarVehiculo}
        />
      )}

      {mostrarReporteVehiculo && (
        <ReporteVehiculo 
          agregarVehiculo={agregarVehiculo}
          tipoVehiculo={tipoVehiculo}
          barrios={barrios}
          marcas={marcas}
          onClose={cerrarReporteVehiculo}
        />
      )}

      {mostrarMapaReportes && (
        <MapaReportes 
          BarriosPeligrosos={BarriosPeligrosos || []}
          topVehiculos={topVehiculos || []}
          onClose={cerrarMapaReportes}
        />
      )}

      {mostrarConfiguracion && (
        <Configuracion 
          onClose={cerrarConfiguracion}
        />
      )}
    </div>
  );
}

export default Inicio;
