// Importaciones necesarias para el componente
import React, { useState, useEffect } from "react";
import '../Estilos/MapaReportes.css';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Polygon, Popup, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configuración para arreglar los iconos de Leaflet en React
// Esto soluciona un problema conocido donde los marcadores no se muestran correctamente
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/**
 * Componente MapaReportes: Muestra un mapa interactivo con barrios peligrosos y listas de información
 * @param {Array} BarriosPeligrosos - Lista de barrios con sus niveles de riesgo
 * @param {Array} topVehiculos - Lista de vehículos más robados
 * @param {Function} onClose - Función para cerrar el modal
 */
function MapaReportes({ BarriosPeligrosos, topVehiculos, onClose }) {
  const navigate = useNavigate(); // Hook para navegación entre páginas
  
  // Estados para controlar si las listas están desplegadas o colapsadas
  const [barrioDesplegado, setBarrioDesplegado] = useState(false);
  const [autosDesplegado, setAutosDesplegado] = useState(false);
  
  // Estado para almacenar las coordenadas de cada barrio (se obtienen dinámicamente)
  const [coordenadasBarrios, setCoordenadasBarrios] = useState({});

  // Debug: Imprimir en consola los datos que llegan al componente para verificar
  console.log("BarriosPeligrosos en MapaReportes:", BarriosPeligrosos);
  console.log("topVehiculos en MapaReportes:", topVehiculos);

  /**
   * Función para buscar coordenadas reales de un barrio usando la API de OpenStreetMap
   * @param {string} nombreBarrio - Nombre del barrio a buscar
   * @returns {Object|null} - Objeto con coordenadas y radio o null si no se encuentra
   */
  const buscarCoordenadasReales = async (nombreBarrio) => {
    try {
      // Construir la consulta para buscar el barrio en Quito, Ecuador
      const query = encodeURIComponent(`${nombreBarrio}, Quito, Ecuador`);
      
      // Hacer petición a la API de geocodificación de OpenStreetMap
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&addressdetails=1`
      );
      const data = await response.json();
      
      // Si encontramos resultados, extraer las coordenadas
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        console.log(`Coordenadas encontradas para ${nombreBarrio}:`, lat, lon);
        
        // Retornar coordenadas del centro y radio para dibujar el círculo
        return {
          center: [lat, lon],
          radius: 800 // Radio de 800 metros para el área de riesgo
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

  // useEffect: Se ejecuta cuando cambian los BarriosPeligrosos
  // Su función es buscar las coordenadas reales de cada barrio
  useEffect(() => {
    const buscarTodasLasCoordenadas = async () => {
      // Solo ejecutar si tenemos barrios para procesar
      if (BarriosPeligrosos && BarriosPeligrosos.length > 0) {
        const nuevasCoordenadas = {};
        
        // Recorrer cada barrio y buscar sus coordenadas
        for (let i = 0; i < BarriosPeligrosos.length; i++) {
          const barrio = BarriosPeligrosos[i];
          
          // Intentar obtener coordenadas reales de la API
          const coordenadas = await buscarCoordenadasReales(barrio.nombre);
          
          if (coordenadas) {
            // Si encontramos coordenadas reales, usarlas
            nuevasCoordenadas[barrio.nombre] = coordenadas;
          } else {
            // Si no, usar coordenadas generadas automáticamente
            nuevasCoordenadas[barrio.nombre] = generarCoordenadasPorNombre(barrio.nombre, i);
          }
          
          // Pausa pequeña para no saturar la API externa
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Actualizar el estado con todas las coordenadas obtenidas
        setCoordenadasBarrios(nuevasCoordenadas);
      }
    };

    buscarTodasLasCoordenadas();
  }, [BarriosPeligrosos]); // Solo se ejecuta cuando cambian los barrios

  /**
   * Función fallback para generar coordenadas cuando no se encuentran en la API
   * Crea coordenadas consistentes basándose en el nombre del barrio
   * @param {string} nombreBarrio - Nombre del barrio
   * @param {number} index - Índice del barrio en la lista
   * @returns {Object} - Objeto con coordenadas y radio
   */
  const generarCoordenadasPorNombre = (nombreBarrio, index) => {
    // Coordenadas base del centro de Quito
    const latBase = -0.2;
    const lonBase = -78.5;
    
    // Crear un "hash" simple del nombre para generar coordenadas consistentes
    // Esto asegura que el mismo barrio siempre tenga las mismas coordenadas
    let hash = 0;
    for (let i = 0; i < nombreBarrio.length; i++) {
      const char = nombreBarrio.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convertir a entero de 32 bits
    }
    
    // Usar el hash para generar desplazamientos únicos
    const offsetLat = ((hash % 100) / 1000) - 0.05; // Rango de -0.05 a 0.05
    const offsetLon = (((hash / 100) % 100) / 1000) - 0.05; // Rango de -0.05 a 0.05
    
    // Agregar desplazamiento basado en el índice para evitar superposiciones
    const indexOffsetLat = (index * 0.01) - 0.02;
    const indexOffsetLon = ((index % 4) * 0.01) - 0.015;
    
    // Calcular coordenadas finales
    const centerLat = latBase + offsetLat + indexOffsetLat;
    const centerLon = lonBase + offsetLon + indexOffsetLon;
    
    // Retornar centro y radio para dibujar el círculo en el mapa
    return {
      center: [centerLat, centerLon],
      radius: 800 // Radio en metros
    };
  };

  /**
   * Función para determinar el color según el nivel de riesgo del barrio
   * @param {number} riesgo - Nivel de riesgo (1=bajo, 2=medio, 3=alto)
   * @returns {string} - Color correspondiente
   */
  const getColorByRiesgo = (riesgo) => {
    switch(riesgo) {
      case 3: return 'red';      // Riesgo alto - color rojo
      case 2: return 'orange';   // Riesgo medio - color naranja
      case 1: return 'yellow';   // Riesgo bajo - color amarillo
      default: return 'gray';    // Sin datos - color gris
    }
  };

  /**
   * Función para cerrar el modal y regresar
   */
  const handleClose = () => {
    if (onClose) {
      onClose(); // Usar la función de cierre proporcionada
    } else {
      navigate('/'); // O navegar al inicio como fallback
    }
  };

  /**
   * Función para alternar el estado desplegado/colapsado de la lista de barrios
   */
  const toggleBarrios = () => {
    setBarrioDesplegado(!barrioDesplegado);
  };

  /**
   * Función para alternar el estado desplegado/colapsado de la lista de autos
   */
  const toggleAutos = () => {
    setAutosDesplegado(!autosDesplegado);
  };

  return (
    // Contenedor principal del modal
    <div className="mapa-reportes-modal">
      <div className="mapa-reportes-container">
        {/* Encabezado con título y botón de cierre */}
        <div className="encabezado">
          <h1>🗺️ Mapa de reportes</h1>
          <button className="btn-negro" onClick={handleClose}>
            Regresar al inicio
          </button>
        </div>

        {/* Contenido principal dividido en mapa y listas */}
        <div className="contenido-principal">
          {/* Contenedor del mapa interactivo */}
          <div className="mapa-container-modal">
            {/* Componente de mapa de Leaflet */}
            <MapContainer 
              center={[-0.2, -78.5]} // Centro en Quito, Ecuador
              zoom={12} // Nivel de zoom inicial
              style={{ height: '100%', width: '100%', borderRadius: '15px' }}
            >
              {/* Capa de tiles (el mapa base) */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/* Renderizar círculos para cada barrio peligroso */}
              {BarriosPeligrosos && BarriosPeligrosos.map((barrio, index) => {
                // Obtener las coordenadas del barrio (si ya están disponibles)
                const coordenadas = coordenadasBarrios[barrio.nombre];
                
                // Solo renderizar si ya tenemos las coordenadas calculadas
                if (!coordenadas) return null;
                
                return (
                  <Circle
                    key={index}
                    center={coordenadas.center} // Centro del círculo
                    radius={coordenadas.radius} // Radio en metros
                    pathOptions={{
                      color: getColorByRiesgo(barrio.riesgo), // Color del borde
                      fillColor: getColorByRiesgo(barrio.riesgo), // Color de relleno
                      fillOpacity: 0.6, // Transparencia del relleno
                      weight: 2, // Grosor del borde
                      opacity: 0.8 // Transparencia del borde
                    }}
                  >
                    {/* Popup que aparece al hacer clic en el círculo */}
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
            
            {/* Leyenda del mapa - Explica qué significa cada color */}
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

          {/* Contenedor de listas desplegables */}
          <div className="listas-container">
            {/* Lista de barrios más peligrosos */}
            <div className="lista-seccion">
              {/* Header clickeable para expandir/colapsar */}
              <div className="lista-header" onClick={toggleBarrios}>
                <h2>Barrios más peligrosos</h2>
                <span className={`toggle-icon ${barrioDesplegado ? 'rotated' : ''}`}>▼</span>
              </div>
              {/* Contenido de la lista (se muestra/oculta según el estado) */}
              <div className={`lista-content ${barrioDesplegado ? 'expanded' : 'collapsed'}`}>
                <ul>
                  {BarriosPeligrosos && BarriosPeligrosos.length > 0 ? (
                    // Renderizar cada barrio si tenemos datos
                    BarriosPeligrosos.map((barrio, index) => (
                      <li key={index}>
                        {barrio.nombre}
                      </li>
                    ))
                  ) : (
                    // Mensaje cuando no hay datos
                    <li>No hay barrios disponibles</li>
                  )}
                </ul>
              </div>
            </div>
            
            {/* Lista de autos más robados */}
            <div className="lista-seccion">
              {/* Header clickeable para expandir/colapsar */}
              <div className="lista-header" onClick={toggleAutos}>
                <h2>Autos más robados</h2>
                <span className={`toggle-icon ${autosDesplegado ? 'rotated' : ''}`}>▼</span>
              </div>
              {/* Contenido de la lista (se muestra/oculta según el estado) */}
              <div className={`lista-content ${autosDesplegado ? 'expanded' : 'collapsed'}`}>
                <ul>
                  {topVehiculos && topVehiculos.length > 0 ? (
                    // Renderizar cada vehículo si tenemos datos
                    topVehiculos.map((vehiculo, index) => (
                      <li key={index}>
                        {vehiculo.auto}
                      </li>
                    ))
                  ) : (
                    // Mensaje cuando no hay datos
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
