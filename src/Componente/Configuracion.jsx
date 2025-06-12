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

      <div className="fila-config">
        <div className="box-config">
          <h3>🔔 Notificaciones</h3>
          <div className="fila-item">
            <span>Notificaciones por correo</span>
            <label className="switch">
              <input type="checkbox" checked={correo} onChange={() => setCorreo(!correo)} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="fila-item">
            <span>Notificaciones en el navegador</span>
            <label className="switch">
              <input type="checkbox" checked={navegador} onChange={() => setNavegador(!navegador)} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="fila-item texto-frecuencia">
            <span>Frecuencia de alertas</span>
            <span className="frecuencia">Diario</span>
          </div>
        </div>

        <div className="box-config">
          <h3>👤 Privacidad</h3>
          <div className="fila-item">
            <span>Realizar reportes anónimamente</span>
            <label className="switch">
              <input type="checkbox" checked={anonimo} onChange={() => setAnonimo(!anonimo)} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="fila-item">
            <span>Permitir mensajes directos</span>
            <label className="switch">
              <input type="checkbox" checked={mensajes} onChange={() => setMensajes(!mensajes)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="fila-config">
        <div className="box-config">
          <h3>🔒 Seguridad</h3>
          <button className="boton-secundario">Cambiar contraseña</button>
        </div>

        <div className="box-config">
          <h3>⚙️ Cuenta</h3>
          <div className="botones-cuenta">
            <button className="boton-rojo">Eliminar cuenta</button>
            <button className="boton-secundario">Cerrar sesión</button>
          </div>
        </div>
      </div>
      <div>
      <button className="btn-volver" onClick={() => navigate("/Inicio")}>Volver al Inicio</button>
</div>
      <footer className="footer">
        <span>AutoCheck</span>
        <span>Juntos hacemos las calles más seguras</span>
      </footer>
    </div>
  );
}

export default Configuracion;