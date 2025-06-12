import React, { useState } from 'react';
import '../Estilos/Configuracion.css';
import { useNavigate } from 'react-router-dom';
import fondo from '../Imagenes/fondo-configuracion.png';

function Configuracion() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState(true);
  const [navegador, setNavegador] = useState(true);
  const [anonimo, setAnonimo] = useState(true);
  const [mensajes, setMensajes] = useState(false);

  return (
    <div className="config-container" style={{ backgroundImage: `url(${fondo})` }}>
      <h1 className="titulo">Configuración</h1>

      <div className="seccion-row">
        <div className="seccion-box grande">
          <h2>🔔 Notificaciones</h2>
          <label className="switch-label">
            <span>Notificaciones por correo</span>
            <label className="switch">
              <input type="checkbox" checked={correo} onChange={() => setCorreo(!correo)} />
              <span className="slider"></span>
            </label>
          </label>

          <label className="switch-label">
            <span>Notificaciones en el navegador</span>
            <label className="switch">
              <input type="checkbox" checked={navegador} onChange={() => setNavegador(!navegador)} />
              <span className="slider"></span>
            </label>
          </label>

          <p>Frecuencia de alertas: <strong>Diario</strong></p>
        </div>

        <div className="seccion-box grande">
          <h2>👤 Privacidad</h2>
          <label className="switch-label">
            <span>Realizar reportes anónimamente</span>
            <label className="switch">
              <input type="checkbox" checked={anonimo} onChange={() => setAnonimo(!anonimo)} />
              <span className="slider"></span>
            </label>
          </label>

          <label className="switch-label">
            <span>Permitir mensajes directos</span>
            <label className="switch">
              <input type="checkbox" checked={mensajes} onChange={() => setMensajes(!mensajes)} />
              <span className="slider"></span>
            </label>
          </label>
        </div>
      </div>

      <div className="seccion-row">
        <div className="seccion-box grande">
          <h2>🔒 Seguridad</h2>
          <button className="boton-secundario">Cambiar contraseña</button>
        </div>

        <div className="seccion-box grande">
          <h2>⚙️ Cuenta</h2>
          <div className="botones-cuenta">
            <button className="boton-rojo">Eliminar cuenta</button>
            <button className="boton-secundario">Cerrar sesión</button>
          </div>
        </div>
      </div>

      {/* BOTÓN LATERAL DERECHO */}
      <div className="boton-lateral">
        <button className="volver-lateral" onClick={() => navigate('/inicio')}>
          ⬅ Volver al Inicio
        </button>
      </div>

      <footer className="footer">
        <span>AutoCheck</span>
        <span>Juntos hacemos las calles más seguras</span>
      </footer>
    </div>
  );
}

export default Configuracion;
