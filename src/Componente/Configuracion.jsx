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

  const [mostrarCambio, setMostrarCambio] = useState(false);
  const [contraAntigua, setContraAntigua] = useState('');
  const [contraNueva, setContraNueva] = useState('');
  const [mensajeCambio, setMensajeCambio] = useState('');

  const [mostrarEliminar, setMostrarEliminar] = useState(false);

  const handleGuardarCambio = () => {
    setMensajeCambio('Contraseña actualizada correctamente.');
    setTimeout(() => setMensajeCambio(''), 3000);
  };

  const handleEliminarCuenta = () => {
    if (window.confirm('Estás seguro de eliminar tu cuenta? Esta acción es irreversible.')) {
      navigate('/');
    }
  };

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
          <h2>🔑 Privacidad</h2>
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
          <button className="boton-secundario" onClick={() => setMostrarCambio(!mostrarCambio)}>
            Cambiar contraseña
          </button>

          {mostrarCambio && (
            <div className="cambio-contra">
              <input
                type="password"
                placeholder="Contraseña antigua"
                value={contraAntigua}
                onChange={(e) => setContraAntigua(e.target.value)}
              />
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={contraNueva}
                onChange={(e) => setContraNueva(e.target.value)}
              />
              <button className="boton-guardar" onClick={handleGuardarCambio}>Guardar</button>
              {mensajeCambio && <p className="mensaje-exito">{mensajeCambio}</p>}
            </div>
          )}
        </div>

        <div className="seccion-box grande">
          <h2>⚙️ Cuenta</h2>
          <div className="botones-cuenta">
            <button className="boton-rojo" onClick={() => setMostrarEliminar(!mostrarEliminar)}>Eliminar cuenta</button>
            <button className="boton-secundario">Cerrar sesión</button>
          </div>

          {mostrarEliminar && (
            <div className="eliminar-aviso">
              <p>⚠️ Esta acción eliminará permanentemente tu cuenta.</p>
              <button className="boton-rojo" onClick={handleEliminarCuenta}>Confirmar eliminación</button>
            </div>
          )}
        </div>
      </div>

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