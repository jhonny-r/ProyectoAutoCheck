import React, { useState } from 'react';
import '../Estilos/Configuracion.css';
import { useNavigate } from 'react-router-dom';
import fondo from '../Imagenes/fondo-configuracion.png';

function Configuracion({ onClose }) {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState(true);
  const [navegador, setNavegador] = useState(true);
  const [anonimo, setAnonimo] = useState(true);
  const [mensajes, setMensajes] = useState(false);

  const [mostrarCambio, setMostrarCambio] = useState(false);
  const [contraAntigua, setContraAntigua] = useState('');
  const [contraNueva, setContraNueva] = useState('');
  const [mensajeCambio, setMensajeCambio] = useState('');
 
  const handleGuardarCambio = () => {
    setMensajeCambio('Contraseña actualizada correctamente.');
    setTimeout(() => setMensajeCambio(''), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-configuracion" onClick={(e) => e.stopPropagation()}>
        <h1 className="titulo">Configuración</h1>

        {/* Sección Notificaciones */}
        <div className="seccion-modal">
          <h2 className="seccion-titulo">🔔 Notificaciones</h2>
          
          <div className="opcion-configuracion">
            <span className="opcion-texto">Notificaciones por correo</span>
            <label className="switch">
              <input type="checkbox" checked={correo} onChange={() => setCorreo(!correo)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="opcion-configuracion">
            <span className="opcion-texto">Notificaciones en el navegador</span>
            <label className="switch">
              <input type="checkbox" checked={navegador} onChange={() => setNavegador(!navegador)} />
              <span className="slider"></span>
            </label>
          </div>

          <p className="frecuencia-texto">Frecuencia de alertas: <strong>Diario</strong></p>
        </div>

        {/* Sección Privacidad */}
        <div className="seccion-modal">
          <h2 className="seccion-titulo">🔑 Privacidad</h2>
          
          <div className="opcion-configuracion">
            <span className="opcion-texto">Realizar reportes anónimamente</span>
            <label className="switch">
              <input type="checkbox" checked={anonimo} onChange={() => setAnonimo(!anonimo)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="opcion-configuracion">
            <span className="opcion-texto">Permitir mensajes directos</span>
            <label className="switch">
              <input type="checkbox" checked={mensajes} onChange={() => setMensajes(!mensajes)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Sección Seguridad */}
        <div className="seccion-modal">
          <h2 className="seccion-titulo">🔒 Seguridad</h2>
          <button className="boton-cambiar-password" onClick={() => setMostrarCambio(!mostrarCambio)}>
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

        {/* Botón Volver al Inicio */}
        <div className="botones-modal">
          <button className="boton-volver-inicio" onClick={onClose}>
            ⬅ Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default Configuracion;