import React, { useState, useEffect } from "react";
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
  const [coordenadasBarrios, setCoordenadasBarrios] = useState({});

  // Debug: ver qué datos están llegando
  console.log("BarriosPeligrosos en MapaReportes:", BarriosPeligrosos);
  console.log("topVehiculos en MapaReportes:", topVehiculos);

  // Función para buscar coordenadas reales del barrio usando geocodificación
  const buscarCoordenadasReales = async (nombreBarrio) => {
    try {
      const query = encodeURIComponent(`${nombreBarrio}, Quito, Ecuador`);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        console.log(`Coordenadas encontradas para ${nombreBarrio}:`, lat, lon);
        return {
          center: [lat, lon],
          radius: 800
        };
      } else {
        console.log(`No se encontraron coordenadas para ${nombreBarrio}, usando fallback`);
        return null;
      }
    } catch (error) {
      console.error(`Error buscando coordenadas para ${nombreBarrio}:`, error);
      return null;
    }
  };

  // useEffect para buscar coordenadas reales cuando cambian los barrios
  useEffect(() => {
    const buscarTodasLasCoordenadas = async () => {
      if (BarriosPeligrosos && BarriosPeligrosos.length > 0) {
        const nuevasCoordenadas = {};
        
        for (let i = 0; i < BarriosPeligrosos.length; i++) {
          const barrio = BarriosPeligrosos[i];
          const coordenadas = await buscarCoordenadasReales(barrio.nombre);
          
          if (coordenadas) {
            nuevasCoordenadas[barrio.nombre] = coordenadas;
          } else {
            // Fallback si no se encuentran coordenadas reales
            nuevasCoordenadas[barrio.nombre] = generarCoordenadasPorNombre(barrio.nombre, i);
          }
          
          // Pequeña pausa para no sobrecargar la API
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        setCoordenadasBarrios(nuevasCoordenadas);
      }
    };

    buscarTodasLasCoordenadas();
  }, [BarriosPeligrosos]);

  // Función para generar coordenadas automáticamente basándose en el nombre del barrio (fallback)
  const generarCoordenadasPorNombre = (nombreBarrio, index) => {
    // Centro base de Quito
    const latBase = -0.2;
    const lonBase = -78.5;
    
    // Crear un "hash" simple del nombre del barrio para generar coordenadas consistentes
    let hash = 0;
    for (let i = 0; i < nombreBarrio.length; i++) {
      const char = nombreBarrio.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convertir a entero de 32 bits
    }
    
    // Usar el hash para generar offsets consistentes
    const offsetLat = ((hash % 100) / 1000) - 0.05; // Rango de -0.05 a 0.05
    const offsetLon = (((hash / 100) % 100) / 1000) - 0.05; // Rango de -0.05 a 0.05
    
    // Combinar con el índice para evitar superposiciones
    const indexOffsetLat = (index * 0.01) - 0.02;
    const indexOffsetLon = ((index % 4) * 0.01) - 0.015;
    
    const centerLat = latBase + offsetLat + indexOffsetLat;
    const centerLon = lonBase + offsetLon + indexOffsetLon;
    
    // Retornar centro y radio para círculo
    return {
      center: [centerLat, centerLon],
      radius: 800 // Radio en metros
    };
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
                const coordenadas = coordenadasBarrios[barrio.nombre];
                
                // Solo renderizar si ya tenemos las coordenadas
                if (!coordenadas) return null;
                
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
                <span>Alto</span>
              </div>
              <div className="leyenda-item">
                <span className="color-box" style={{backgroundColor: 'orange'}}></span>
                <span>Medio</span>
              </div>
              <div className="leyenda-item">
                <span className="color-box" style={{backgroundColor: 'yellow'}}></span>
                <span>Bajo</span>
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
