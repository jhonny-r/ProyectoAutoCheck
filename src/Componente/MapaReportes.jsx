import React from "react";
import '../Estilos/MapaReportes.css';
import { useNavigate } from 'react-router-dom';

function MapaReportes({ BarriosPeligrosos }) {
  const navigate = useNavigate();

  const barriosOrdenados = [...BarriosPeligrosos]
    .sort((a, b) => {
      if (b.peligrosidad !== a.peligrosidad) {
        return b.peligrosidad - a.peligrosidad;
      }
      return b.valor - a.valor;
    })
    .slice(0, 6); // 6 para que se vea completo

  return (
    <div className="mapa-reportes-container">
      <div className="encabezado">
        <h1>Mapa de reportes</h1>
        <button className="btn-negro" onClick={() => navigate('/Inicio')}>
          Regresar al inicio
        </button>
      </div>

      <iframe
        className="mapa-redondeado"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-78.48%2C0.17%2C-78.45%2C0.19&layer=mapnik&marker=0.1807,-78.4678">
      </iframe>

      <div className="listas-dos-columnas">
        <div>
          <h2>Barrios más peligrosos</h2>
          <ul>
            {barriosOrdenados.map((barrio, index) => (
              <li key={index}>{barrio.barrio}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Autos más robados</h2>
          <ul>
            {barriosOrdenados.map((barrio, index) => (
              <li key={index}>{barrio.barrio}</li> // Reutilizando la lista como pediste
            ))}
          </ul>
        </div>
      </div>

      <div className="pie-boton">
        <button className="btn-verde">Contrata un seguro ya</button>
      </div>
    </div>
  );
}

export default MapaReportes;
