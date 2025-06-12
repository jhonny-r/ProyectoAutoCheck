import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Estilos/Inicio.css';
import fondo from '../Imagenes/fondo.jpg';
import logo from '../Imagenes/logo-autocheck.png';
import mapa from '../Imagenes/mapa.png';
import verificar from '../Imagenes/verificar.png';
import reportar from '../Imagenes/reportar.png';
import zonas from '../Imagenes/zonas.png';

function Inicio({usuarioActivo}) {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="header-menu">
        <div className="logo-container">
          <img src={logo} alt="Logo AutoCheck" className="logo-img" />
          <span className="logo-text">AutoCheck</span>
        </div>
        <div className="nav-box">
          <span className="nav-item" onClick={() => navigate('/ForoVecinal')}>Foro Vecinal</span>
          <span className="nav-item" onClick={() => navigate('/configuracion')}>Configuración</span>
          <span className="nav-item" onClick={() => navigate('/MiAutoCheck')}>MiAutoCheck</span>
        </div>
      </div>

      <main className="main-content">
        <h1>Protege tu Comunidad</h1>
        <p className="subtitulo">Verifica, Reporta y Mantente Informado</p>

        <div className="mapa-container">
          <img src={mapa} alt="Mapa" className="imagen-mapa" />
          <button className="btn-mizona">Mi zona</button>
        </div>

        <div className="opciones">
          <div className="opcion">
            <img src={verificar} alt="Verificar Vehículo" />
            <p>Verificar Vehículo</p>
          </div>
          <div className="opcion">
            <img src={reportar} alt="Reportar Vehículo" />
            <p>Reportar Vehículo</p>
          </div>
          <div className="opcion">
            <img src={zonas} alt="Zonas Conflictivas" />
            <p>Mapa de Zonas Conflictivas</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <span>AutoCheck</span>
        <span>Juntos hacemos las calles más seguras</span>
      </footer>
    </div>
  );
}

export default Inicio;
