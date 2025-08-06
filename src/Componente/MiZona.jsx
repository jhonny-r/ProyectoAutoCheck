import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Estilos/MiZona.css';
import mapa from '../Imagenes/mapa_zona.jpg';
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

function MiZona({ barrios, onClose }) {
  const navigate = useNavigate();
  const [mostrarCombo, setMostrarCombo] = useState(false);
  const [zonaSeleccionada, setZonaSeleccionada] = useState('');
  const [mensajeZona, setMensajeZona] = useState('');
  const [mensajeFadeOut, setMensajeFadeOut] = useState(false);
  
  // Estados para la ubicación del usuario
  const [ubicacionUsuario, setUbicacionUsuario] = useState(null);
  const [cargandoUbicacion, setCargandoUbicacion] = useState(true);
  const [errorUbicacion, setErrorUbicacion] = useState(null);
  
  // Estados para la ubicación de la zona seleccionada
  const [ubicacionZona, setUbicacionZona] = useState(null);
  const [cargandoZona, setCargandoZona] = useState(false);

  // Función para manejar el cierre del modal
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/Inicio');
    }
  };

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

  // useEffect para establecer la zona por defecto
  useEffect(() => {
    if (barrios && barrios.length > 0 && !zonaSeleccionada) {
      setZonaSeleccionada(barrios[0].nombre);
    }
  }, [barrios, zonaSeleccionada]);

  // Función para buscar coordenadas de una zona en Quito
  const buscarCoordenadasZona = async (nombreZona) => {
    if (!nombreZona) return null;
    
    setCargandoZona(true);
    try {
      const query = `${nombreZona}, Quito, Ecuador`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const coordenadas = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
        setUbicacionZona(coordenadas);
        setCargandoZona(false);
        return coordenadas;
      } else {
        // Si no encuentra la zona específica, usar coordenadas por defecto de Quito
        const coordenadasQuito = { lat: -0.2201641, lng: -78.5123274 };
        setUbicacionZona(coordenadasQuito);
        setCargandoZona(false);
        return coordenadasQuito;
      }
    } catch (error) {
      console.error("Error buscando coordenadas de la zona:", error);
      const coordenadasQuito = { lat: -0.2201641, lng: -78.5123274 };
      setUbicacionZona(coordenadasQuito);
      setCargandoZona(false);
      return coordenadasQuito;
    }
  };

  // useEffect para buscar coordenadas cuando cambia la zona seleccionada
  useEffect(() => {
    if (zonaSeleccionada) {
      buscarCoordenadasZona(zonaSeleccionada);
    }
  }, [zonaSeleccionada]);

  const cambiarZona = () => {
    setMostrarCombo(!mostrarCombo);
    setMensajeZona(''); // Limpiar mensaje al abrir/cerrar el combo
    setMensajeFadeOut(false);
  };
  

  const establecerZona = () => {
    if (zonaSeleccionada) {
      setMensajeZona(`✅ Zona "${zonaSeleccionada}" agregada con éxito.`);
      setMensajeFadeOut(false);
      
      // Ocultar el combo box inmediatamente al establecer la zona
      setMostrarCombo(false);
      
      // Iniciar animación de desaparición después de 2.5 segundos
      setTimeout(() => {
        setMensajeFadeOut(true);
      }, 2500);
      
      // Ocultar completamente el mensaje después de 3 segundos
      setTimeout(() => {
        setMensajeZona('');
        setMensajeFadeOut(false);
      }, 3000);
    } else {
      setMensajeZona('⚠️ Por favor selecciona una zona primero.');
      setMensajeFadeOut(false);
      
      // También hacer que este mensaje desaparezca
      setTimeout(() => {
        setMensajeFadeOut(true);
      }, 2500);
      
      setTimeout(() => {
        setMensajeZona('');
        setMensajeFadeOut(false);
      }, 3000);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content zona-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🏘️ Mi Zona</h2>
          <button type="button" className="btn-volver-inicio" onClick={handleClose}>
            Volver al Inicio
          </button>
        </div>

        <div className="zona-modal-content">
          <p className="zona-subtitulo">
            Gestiona la zona que deseas monitorear y mantente informado de lo que ocurre a tu alrededor.
          </p>

          <div className="zona-centro">
            <div className="zona-mapa-botones">
              <div className="zona-mapa-contenedor">
            {cargandoUbicacion ? (
              <div className="mapa-cargando">
                <p>Obteniendo tu ubicación...</p>
              </div>
            ) : (
              <div className="mapa-interactivo">
                <MapContainer 
                  center={[
                    ubicacionZona ? ubicacionZona.lat : ubicacionUsuario.lat, 
                    ubicacionZona ? ubicacionZona.lng : ubicacionUsuario.lng
                  ]} 
                  zoom={18} 
                  style={{ height: '250px', width: '100%', borderRadius: '12px' }}
                  scrollWheelZoom={true}
                  key={`${ubicacionZona ? ubicacionZona.lat : ubicacionUsuario.lat}-${ubicacionZona ? ubicacionZona.lng : ubicacionUsuario.lng}`}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* Marcador para la ubicación del usuario */}
                  <Marker position={[ubicacionUsuario.lat, ubicacionUsuario.lng]}>
                    <Popup>
                      <div>
                        <strong>Tu ubicación actual</strong><br/>
                        {errorUbicacion ? errorUbicacion : "Aquí te encuentras"}
                      </div>
                    </Popup>
                  </Marker>
                  
                  {/* Marcador para la zona seleccionada (si es diferente a la ubicación del usuario) */}
                  {ubicacionZona && (
                    <Marker 
                      position={[ubicacionZona.lat, ubicacionZona.lng]}
                      icon={L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                      })}
                    >
                      <Popup>
                        <div>
                          <strong>Zona: {zonaSeleccionada}</strong><br/>
                          {cargandoZona ? "Buscando ubicación..." : "Área de monitoreo seleccionada"}
                        </div>
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
                {errorUbicacion && (
                  <div className="mapa-error">
                    <small>{errorUbicacion}</small>
                  </div>
                )}
                {cargandoZona && (
                  <div className="mapa-loading-zona">
                    <small>🔍 Buscando ubicación de {zonaSeleccionada}...</small>
                  </div>
                )}
              </div>
            )}
            {mostrarCombo && (
              <div className="zona-select-overlay">
                <select
                  value={zonaSeleccionada}
                  onChange={(e) => setZonaSeleccionada(e.target.value)}
                  className="zona-select"
                >
                  {barrios && barrios.length > 0 ? (
                    barrios.map((barrio, index) => (
                      <option key={barrio._id || index} value={barrio.nombre}>
                        {barrio.nombre}
                      </option>
                    ))
                  ) : (
                    <option value="">No hay barrios disponibles</option>
                  )}
                </select>
              </div>
            )}
            {mensajeZona && (
              <div className={`mensaje-exito ${mensajeFadeOut ? 'fade-out' : ''}`}>
                {mensajeZona}
              </div>
            )}
          </div>

          <div className="zona-botones-vertical">
            <button className="btn-verde" onClick={cambiarZona}>Cambiar Zona</button>
            <button className="btn-azul" onClick={establecerZona}>Establecer como Principal</button>
          </div>
        </div>
      </div>

          <div className="zona-estadisticas">
            <div className="card-alerta">
              <p className="valor">🚨 5</p>
              <p>Alertas<br />Últimos 7 días</p>
            </div>
            <div className="card-reporte">
              <p className="valor">📋 12</p>
              <p>Reportes<br />Recientes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiZona;
