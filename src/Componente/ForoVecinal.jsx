import React from 'react';
import '../Estilos/Foro.css';
import fondo from '../Imagenes/fondo-configuracion.png';
import { useNavigate } from 'react-router-dom';

function ForoVecinal() {
  const navigate = useNavigate();

  return (
    <div className="foro-container" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="header">
        <button className="volver-btn" onClick={() => navigate('/')}>Volver al Inicio</button>
        <h1>FORO VECINAL</h1>
        <p>Comparte y Mantente al tanto de lo que sucede en tu zona</p>
      </div>

      <div className="foro-controles">
        <select className="zona-select">
          <option>La Floresta</option>
          <option>El Batán</option>
          <option>El Recreo</option>
        </select>
        <button className="publicar-btn">Nueva Publicación</button>
      </div>

      <div className="publicaciones">
        <div className="pub-card">
          <p className="pub-autor">Antonio</p>
          <p className="pub-meta">26 de abr. 15:30 - Sector Bosque</p>
          <p className="pub-texto">Vi a alguien intentando abrir un auto blanco estacionado en la calle. ¿Alguien más lo notó?</p>
          <div className="pub-acciones">
            <button>Responder</button>
            <button>Reportar</button>
          </div>
        </div>

        <div className="pub-card">
          <p className="pub-autor">María</p>
          <p className="pub-meta">26 de abr. 17:30 - El Batán</p>
          <p className="pub-texto">Les recomiendo a todos asegurar bien sus bicis si las dejan afuera.</p>
          <div className="pub-acciones">
            <button>Responder</button>
            <button>Reportar</button>
          </div>
        </div>

        <div className="pub-card">
          <p className="pub-autor">Anónimo</p>
          <p className="pub-meta">27 de abr. 11:30 - El Recreo</p>
          <p className="pub-texto">Encontré esta moto abandonada en la esquina. Está bien deteriorada. ¿Alguien la reconoce?</p>
          <div className="pub-acciones">
            <button>Responder</button>
            <button>Reportar</button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <span>AutoCheck</span>
        <span>Juntos hacemos las calles más seguras</span>
      </footer>
    </div>
  );
}

export default ForoVecinal;
