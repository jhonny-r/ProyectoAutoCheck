import React, { useState } from "react";
import '../Estilos/MapaReportes.css';
import { useNavigate } from 'react-router-dom';

function MapaReportes({ BarriosPeligrosos, onClose }) {
  const navigate = useNavigate();
  const [barrioDesplegado, setBarrioDesplegado] = useState(false);
  const [autosDesplegado, setAutosDesplegado] = useState(false);

  const barriosOrdenados = [...BarriosPeligrosos]
    .sort((a, b) => {
      if (b.peligrosidad !== a.peligrosidad) {
        return b.peligrosidad - a.peligrosidad;
      }
      return b.valor - a.valor;
    })
    .slice(0, 6); // 6 para que se vea completo

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
            <iframe
              className="mapa-redondeado"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-81.0%2C-5.0%2C-75.0%2C2.0&layer=mapnik"
              title="Mapa de Ecuador">
            </iframe>
          </div>

          <div className="listas-container">
            <div className="lista-seccion">
              <div className="lista-header" onClick={toggleBarrios}>
                <h2>Barrios más peligrosos</h2>
                <span className={`toggle-icon ${barrioDesplegado ? 'rotated' : ''}`}>▼</span>
              </div>
              <div className={`lista-content ${barrioDesplegado ? 'expanded' : 'collapsed'}`}>
                <ul>
                  {barriosOrdenados.map((barrio, index) => (
                    <li key={index}>{barrio.barrio}</li>
                  ))}
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
                  <li>Chevrolet Luv Dmax</li>
                  <li>Kia Rio</li>
                  <li>Chevrolet Sail</li>
                  <li>Mitsubishi Lx</li>
                  <li>Ford F150</li>
                  <li>Kia Soluto</li>
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
