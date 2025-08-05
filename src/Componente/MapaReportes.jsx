import React, { useState } from "react";
import '../Estilos/MapaReportes.css';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Polygon, Popup, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para los iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapaReportes({ BarriosPeligrosos, topVehiculos, onClose }) {
  const navigate = useNavigate();
  const [barrioDesplegado, setBarrioDesplegado] = useState(false);
  const [autosDesplegado, setAutosDesplegado] = useState(false);

  // Debug: ver qué datos están llegando
  console.log("BarriosPeligrosos en MapaReportes:", BarriosPeligrosos);
  console.log("topVehiculos en MapaReportes:", topVehiculos);

  // Coordenadas de ejemplo para barrios de Quito (deberías reemplazar con datos reales)
  const coordenadasBarrios = {
    "La Floresta": [
      [-0.1815, -78.4851],
      [-0.1825, -78.4851],
      [-0.1825, -78.4841],
      [-0.1815, -78.4841],
      [-0.1815, -78.4851]
    ],
    "Centro Histórico": [
      [-0.2201, -78.5120],
      [-0.2210, -78.5120],
      [-0.2210, -78.5110],
      [-0.2201, -78.5110],
      [-0.2201, -78.5120]
    ],
    "San Roque": [
      [-0.2180, -78.5140],
      [-0.2190, -78.5140],
      [-0.2190, -78.5130],
      [-0.2180, -78.5130],
      [-0.2180, -78.5140]
    ]
  };

  // Función para generar coordenadas automáticamente para cualquier barrio
  const generarCoordenadasBarrio = (index) => {
    // Centro base de Quito
    const latBase = -0.2;
    const lonBase = -78.5;
    
    // Generar un desplazamiento único basado en el índice
    const offsetLat = (index * 0.02) - 0.05; // Distribuir verticalmente
    const offsetLon = ((index % 3) * 0.02) - 0.02; // Distribuir horizontalmente
    
    const centerLat = latBase + offsetLat;
    const centerLon = lonBase + offsetLon;
    
    // Retornar centro y radio para círculo
    return {
      center: [centerLat, centerLon],
      radius: 800 // Radio en metros
    };
  };

  // Función para obtener coordenadas (predefinidas o generadas automáticamente)
  const obtenerCoordenadasBarrio = (nombreBarrio, index) => {
    // Primero intentar usar coordenadas predefinidas (convertidas a círculo)
    if (coordenadasBarrios[nombreBarrio]) {
      const coords = coordenadasBarrios[nombreBarrio];
      // Calcular el centro del polígono predefinido
      const centerLat = coords.reduce((sum, point) => sum + point[0], 0) / coords.length;
      const centerLon = coords.reduce((sum, point) => sum + point[1], 0) / coords.length;
      return {
        center: [centerLat, centerLon],
        radius: 800
      };
    }
    // Si no existe, generar automáticamente
    return generarCoordenadasBarrio(index);
  };

  // Función para obtener color según el nivel de riesgo
  const getColorByRiesgo = (riesgo) => {
    switch(riesgo) {
      case 3: return 'red';      // Riesgo alto
      case 2: return 'orange';   // Riesgo medio
      case 1: return 'yellow';   // Riesgo bajo
      default: return 'gray';
    }
  };


  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  const toggleBarrios = () => {
    setBarrioDesplegado(!barrioDesplegado);
  };

  const toggleAutos = () => {
    setAutosDesplegado(!autosDesplegado);
  };

  return (
    <div className="mapa-reportes-modal">
      <div className="mapa-reportes-container">
        <div className="encabezado">
          <h1>🗺️ Mapa de reportes</h1>
          <button className="btn-negro" onClick={handleClose}>
            Regresar al inicio
          </button>
        </div>

        <div className="contenido-principal">
          <div className="mapa-container-modal">
            <MapContainer 
              center={[-0.2, -78.5]} 
              zoom={12} 
              style={{ height: '100%', width: '100%', borderRadius: '15px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {BarriosPeligrosos && BarriosPeligrosos.map((barrio, index) => {
                const coordenadas = obtenerCoordenadasBarrio(barrio.nombre, index);
                return (
                  <Circle
                    key={index}
                    center={coordenadas.center}
                    radius={coordenadas.radius}
                    pathOptions={{
                      color: getColorByRiesgo(barrio.riesgo),
                      fillColor: getColorByRiesgo(barrio.riesgo),
                      fillOpacity: 0.6,
                      weight: 2,
                      opacity: 0.8
                    }}
                  >
                    <Popup>
                      <div>
                        <strong>{barrio.nombre}</strong><br/>
                        Nivel de riesgo: {barrio.riesgo}
                      </div>
                    </Popup>
                  </Circle>
                );
              })}
            </MapContainer>
            
            {/* Leyenda del mapa */}
            <div className="mapa-leyenda">
              <h4>Nivel de Riesgo</h4>
              <div className="leyenda-item">
                <span className="color-box" style={{backgroundColor: 'red'}}></span>
                <span>Alto (3)</span>
              </div>
              <div className="leyenda-item">
                <span className="color-box" style={{backgroundColor: 'orange'}}></span>
                <span>Medio (2)</span>
              </div>
              <div className="leyenda-item">
                <span className="color-box" style={{backgroundColor: 'yellow'}}></span>
                <span>Bajo (1)</span>
              </div>
            </div>
          </div>

          <div className="listas-container">
            <div className="lista-seccion">
              <div className="lista-header" onClick={toggleBarrios}>
                <h2>Barrios más peligrosos</h2>
                <span className={`toggle-icon ${barrioDesplegado ? 'rotated' : ''}`}>▼</span>
              </div>
              <div className={`lista-content ${barrioDesplegado ? 'expanded' : 'collapsed'}`}>
                <ul>
                  {BarriosPeligrosos && BarriosPeligrosos.length > 0 ? (
                    BarriosPeligrosos.map((barrio, index) => (
                      <li key={index}>
                        {barrio.nombre}
                      </li>
                    ))
                  ) : (
                    <li>No hay barrios disponibles</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="lista-seccion">
              <div className="lista-header" onClick={toggleAutos}>
                <h2>Autos más robados</h2>
                <span className={`toggle-icon ${autosDesplegado ? 'rotated' : ''}`}>▼</span>
              </div>
              <div className={`lista-content ${autosDesplegado ? 'expanded' : 'collapsed'}`}>
                <ul>
                  {topVehiculos && topVehiculos.length > 0 ? (
                    topVehiculos.map((vehiculo, index) => (
                      <li key={index}>
                        {vehiculo.auto}
                      </li>
                    ))
                  ) : (
                    <li>No hay vehículos disponibles</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapaReportes;
