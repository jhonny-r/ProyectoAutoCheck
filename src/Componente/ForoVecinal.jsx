import React from 'react';
import '../Estilos/Foro.css';
import { useNavigate } from 'react-router-dom';
import logo from '../Imagenes/logo-autocheck.png';
import user1 from '../Imagenes/user1.png';
import user2 from '../Imagenes/user2.png';
import user3 from '../Imagenes/user3.png';
import userAnonimo from '../Imagenes/userAnonimo.png';
import moto from '../Imagenes/moto.png';

function ForoVecinal() {
  const navigate = useNavigate();

  return (
    <div className="foro-container">
      {/* BARRA SUPERIOR GRIS */}
      <div className="foro-header">
        <div className="barra-header">
          <img src={logo} alt="Logo" className="logo-header" />
          <span className="texto-header">AutoCheck</span>
        </div>
      </div>

      {/* CONTENEDOR CON TITULO Y CONTROLES */}
      <div className="foro-header-row">
        <div className="contenido-col">
          <h1 className="foro-titulo">FORO VECINAL</h1>
          <p className="foro-subtitulo">Comparte y Mantente al tanto de lo que sucede en tu zona</p>
          <div className="foro-controles">
            <select className="zona-select">
              <option>La Floresta</option>
              <option>El Batán</option>
              <option>El Recreo</option>
            </select>
            <button className="publicar-btn" onClick={() => navigate("/NuevaEntradaForo")}>Nueva Publicación</button>
          </div>
        </div>

        {/* BOTÓN MOVIDO ABAJO A LA DERECHA */}
        <div className="btn-lateral">
          <button className="volver-btn" onClick={() => navigate('/Inicio')}>Volver al Inicio</button>
        </div>
      </div>

      {/* PUBLICACIONES */}
      <div className="publicaciones-grid">
        <div className="pub-card">
          <img src={user1} alt="Antonio" className="pub-img-user" />
          <p className="pub-autor">Antonio</p>
          <p className="pub-meta">26 de abr. 15:30 - Sector Bosque</p>
          <p className="pub-texto">Vi a alguien intentando abrir un auto blanco estacionado en la calle. ¿Alguien más lo notó?</p>
          <div className="pub-acciones">
            <button>Responder</button>
            <button>Reportar</button>
          </div>
        </div>

        <div className="pub-card">
          <img src={user2} alt="María" className="pub-img-user" />
          <p className="pub-autor">María</p>
          <p className="pub-meta">26 de abr. 17:30 - El Batán</p>
          <p className="pub-texto">Les recomiendo a todos asegurar bien sus bicis si las dejan afuera.</p>
          <div className="pub-acciones">
            <button>Responder</button>
            <button>Reportar</button>
          </div>
        </div>

        <div className="pub-card">
          <img src={userAnonimo} alt="Anónimo" className="pub-img-user" />
          <p className="pub-autor">Anónimo</p>
          <p className="pub-meta">27 de abr. 11:30 - El Recreo</p>
          <p className="pub-texto">Encontré esta moto abandonada en la esquina. Está bien deteriorada. ¿Alguien la reconoce?</p>
          <img src={moto} alt="Moto" className="pub-img" />
          <div className="pub-acciones">
            <button>Responder</button>
            <button>Reportar</button>
          </div>
        </div>

        <div className="pub-card">
          <img src={user3} alt="Antonio" className="pub-img-user" />
          <p className="pub-autor">Antonio</p>
          <p className="pub-meta">26 de abr. 15:30 - Sector Bosque</p>
          <p className="pub-texto">Vi a alguien intentando abrir un auto blanco estacionado en la calle. ¿Alguien más lo notó?</p>
          <div className="pub-acciones">
            <button>Responder</button>
            <button>Reportar</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <span>AutoCheck</span>
        <span>Juntos hacemos las calles más seguras</span>
      </footer>
    </div>
  );
}

export default ForoVecinal;
